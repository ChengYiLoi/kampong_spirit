<template>
  <div class="login-form p-3">
    <h2 class="text-lg-left text-center">Log In</h2>

    <button
      @click="handleSignIn"
      id="google"
      class="mt-4 d-block w-100 mx-auto"
    >
      <span><img src="../assets/google.svg"/></span> Sign in with Google
    </button>
    <b-form @submit.stop.prevent="onSubmit()" class="text-left">
      <b-form-group label="Email Address:" label-for="email" class="my-4">
        <b-form-input
          id="email"
          type="email"
          autocomplete="off"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          aria-describedby="email-feedback"
        ></b-form-input>
        <b-form-invalid-feedback
          id="email-feedback"
          v-if="!$v.form.email.required"
          >Email is required</b-form-invalid-feedback
        >
        <b-form-invalid-feedback id="email-feedback" v-if="!$v.form.email.email"
          >Email is invalid</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group label="Password:" label-for="password" class="my-4">
        <b-form-input
          id="password"
          type="password"
          autocomplete="off"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          aria-describedby="password-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="password-feedback"
          >Password is required</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-checkbox value="remember" class="my-3" v-model="keepLogged"
        >Keep me logged In</b-form-checkbox
      >
      <b-alert show v-if="islogInvalid" variant="warning">
        Log in details is incorrect
      </b-alert>
      <b-row>
        <b-col lg="8">
          <template>
            <vue-recaptcha
              ref="recaptcha"
              class="captcha-size"
              sitekey="6LcSL-EZAAAAALTIqkRuFDRdRI9v0f27DdaSehcr"
              :loadRecaptchaScript="true"
              @verify="onVerify"
            ></vue-recaptcha>
          </template>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-alert
        show
        v-if="!isReCaptcha"
        variant="warning"
        class="mt-2 mb-0 text-center"
      >
        Please do the reCAPTCHA validation before logging in
      </b-alert>
      <button id="login-button" class="mt-4" :disabled="isLoading">
        <b-spinner v-if="isLoading" label="spinning"></b-spinner>

        <div v-else>
          Log In
        </div>
      </button>
      <b-row class="mt-4">
        <b-col></b-col>
        <b-col cols="6">
          <p class=" text-center">
            <u class="text-link" v-b-modal="'password-rest'">Forgot Password</u>
          </p>
        </b-col>
        <b-col></b-col>
      </b-row>

      <p class=" text-center">
        Don't have an account?
        <span v-on:click="switchForm()" class="text-link"><u>Sign up</u></span>
      </p>
    </b-form>
    <b-modal centered title="Reset Password" id="password-rest" hide-footer>
      <b-form-group label="Email: ">
        <b-form-input v-model="resetEmail"></b-form-input>
      </b-form-group>
      <b-alert show variant="warning" v-if="!isEmailValid" class="my-2">
        Email is invalid
      </b-alert>
      <template>
        <b-row>
          <b-col>
            <b-button
              class="w-100"
              variant="danger"
              @click="$bvModal.hide('password-rest')"
              >Cancel</b-button
            >
          </b-col>
          <b-col>
            <b-button
              :disabled="isLoading"
              @click="resetPass"
              class="w-100"
              variant="success"
            >
              <b-spinner v-if="isLoading" label="spinning"></b-spinner>
              <div v-else>
                Reset
              </div>
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-modal>
    <b-modal id="login-error" ok-only>
      Google account not signed up. Please sign up before trying again.
    </b-modal>
    <b-modal id="reset-confirmation" ok-only class="text-center" centered>
      An email will be sent to your email. Please follow the instruction in the
      email to reset your password.
    </b-modal>
  </div>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import getData from "../getData";
var axios = require("axios");
export default {
  mixins: [validationMixin],
  props: ["isSignup"],
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      keepLogged: false,
      resetEmail: null,
      isEmailValid: true,
      islogInvalid: false,
      reCaptcha: "",
      isReCaptcha: true,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
    resetEmail: null,
  },
  methods: {
    onVerify(response) {
      console.log(response);
      this.reCaptcha = response;
    },
    toggleLoading() {
      this.$store.state.isSpinner = !this.$store.state.isSpinner;
    },
    resetPass() {
      this.toggleLoading();
      let url = `./database/checkemail.php?email=${this.resetEmail}`;
      axios.get(url).then((response) => {
        console.log(response);
        if (response.data.length == 1) {
          this.toggleLoading();
          url = `./database/forgetpassword.php?email=${this.resetEmail}`;
          axios.post(url);
          this.$bvModal.show("reset-confirmation");
        } else {
          setTimeout(() => {
            this.toggleLoading();
            this.isEmailValid = false;
          }, 1800);
        }
      });
    },
    getUserRewards(email) {
      let url = `./database/userrewards.php?email=${email}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
        this.$store.state.userRewards = result.data;
      });
    },
    createSession(userInfo) {
      console.log(userInfo);
      this.getUserRewards(userInfo["email"]);
      userInfo.isLogin = true;
      sessionStorage.setItem("userSession", JSON.stringify(userInfo));
      this.$store.state.userInfo = userInfo;
      if (this.keepLogged) {
        localStorage.setItem("userStorage", JSON.stringify(userInfo));
       
      }
    },
    handleSignIn() {
      this.$gAuth.signIn().then((user) => {
        console.log("user", user);
        let email;

        for (var props in user) {
          let substring = props.substring(1);
          if (substring == "t") {
            email = user[props].getEmail();
          }
        }
        if (this.reCaptcha != "") {
          let data;
          let idtoken = user.wc["login_hint"];
          let url = `./database/validateGoogleAuth.php?useremail=${email}&googleidtoken=${idtoken}`;
          url = encodeURI(url);
          axios.get(url).then((result) => {
           
            console.log(result.data);
            if (result.data.length == 1) {
            

              data = result.data[0];
              // this.$store.state.dashOptions.marketplace.selected = true;
              this.createSession(data);
              this.$router.push({ name: "Main" });
            } else {
              this.$bvModal.show("login-error");
            }
          });
        } else {
          this.isReCaptcha = false;
        }
      });
    },
    switchForm() {
      this.$store.state.isSignup = !this.$store.state.isSignup;
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let url = `./database/validate.php?email=${email}&password=${password}`;
      url = encodeURI(url);
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$refs.recaptcha.error();
        return;
      }
      if (this.reCaptcha != "") {
        this.isReCaptcha = true;
        getData(url, this.authLogin);
      } else {
        this.$refs.recaptcha.reset();
        this.isReCaptcha = false;
      }
    },
    authLogin(dataObj) {
      this.toggleLoading();
      let data = JSON.parse(dataObj);
      console.log(data);
      if (data[0] != null) {
        setTimeout(() => {
          data = data[0];
          this.islogInvalid = false;
          let sessionObj = data;
          this.createSession(sessionObj);
          this.toggleLoading();
          this.$store.state.dashOptions.marketplace.selected = true;
          this.$router.push({ name: "Main" });
        }, 2000);
      } else {
        setTimeout(() => {
          this.toggleLoading();
          this.islogInvalid = true;
          this.$v.form.email.$model = "";
          this.$v.form.password.$model = "";
          this.$v.form.email.$error = true;
          this.$v.form.password.$error = true;
          // this.$v.form.$reset;
          // this.$v.$reset;
          // this.$v.$touch;
        }, 1500);
      }
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isSpinner;
    },
    form() {
      return this.$store.state.loginForm.form; //last pointed property needs to be "form" or validation and processing will not work
    },
  },
};
</script>
<style lang="scss">
$white: rgb(245, 245, 245);
.modal-content {
  border: unset;

  header {
    background-color: #f4976c;
    color: $white;
    button {
      color: $white;

      &:hover {
        color: $white;
        opacity: 1;
      }
    }
  }
  .modal-info {
    background-color: #eeeff1;
    border-radius: 5px;
  }
}
.login-form {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  font-size: 0.9rem;

  #google {
    background-color: #f1f3f6;
    color: #1d295a;
    width: 50%;
    span {
      margin-right: 10px;
    }
  }
  button {
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: unset;
    font-weight: bold;
    padding: 10px;
    &:focus {
      outline: unset;
    }
  }

  #login-button {
    background-color: #f37656;
    border-radius: 30px 0px 30px 30px;
    font-size: 1.2rem;

    color: whitesmoke;
  }
  .text-link {
    color: #824ea0;
    font-weight: 900;
    cursor: pointer;
    &:focus {
      outline: transparent;
    }
  }
}

@media only screen and (max-width: 376px) {
  .login-form {
    font-size: 0.7rem;
    #login-button {
      font-size: 0.9rem;
    }
    p {
      font-size: 0.6rem;
    }
  }
}
@media only screen and (max-width: 320px) {
  .captcha-size {
    transform: scale(0.80);
    -webkit-transform: scale(0.80);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }
}
</style>
