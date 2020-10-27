<template>
  <div class="login-form p-5">
    <h2 class="text-lg-left text-center">Log In</h2>

    <button
      @click="handleSignIn"
      id="google"
      class="mt-4 d-block w-100 mx-auto px-3"
    >
      <span><img src="../assets/google.svg"/></span> Sign in with Google
    </button>
    <b-form @submit.stop.prevent="onSubmit()" class="text-left">
      <b-form-group label="Email Address:" label-for="email" class="my-4">
        <b-form-input
          id="email"
          type="email"
          placeholder="you@example.com"
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
          placeholder="Enter your password"
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

      <button id="login-button" class="mt-4">
        Log In
      </button>

      <p class="mt-4 text-center">
        Don't have an acoount?
        <span v-on:click="switchForm()" class="text-link">Sign up</span>
      </p>
    </b-form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import getData from "../getData";
var axios = require("axios");
export default {
  mixins: [validationMixin],
  props: ["isSignup"],
  data() {
    return {
      keepLogged: false,
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
  },
  methods: {
    createSession(userInfo) {
      userInfo.isLogin = true;
      sessionStorage.setItem("userSession", JSON.stringify(userInfo));
      this.$store.state.userInfo = userInfo;
      if (this.keepLogged) {
        localStorage.setItem("userStorage", JSON.stringify(userInfo));
        alert("local storage created");
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
        let data;
        let idtoken = user.wc["login_hint"];
        let url = `validateGoogleAuth.php?useremail=${email}&googleidtoken=${idtoken}`;
        axios.get(url).then((result) => {
          alert("check with DB was done");
          console.log(result.data);
          if (result.data.length == 1) {
            alert("User is authorised");

            data = result.data[0];
            this.$store.state.dashOptions.marketplace.selected = true;
            this.createSession(data);
            this.$router.push({ name: "Main" });
          } else {
            alert("user has not signed up");
          }
        });
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
      let url = `validate.php?email=${email}&password=${password}`;
      url = encodeURI(url);
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      getData(url, this.authLogin);
    },
    authLogin(dataObj) {
      let data = JSON.parse(dataObj);
      console.log(data);
      if (data[0] != null) {
        data = data[0];
        let sessionObj = data;

        alert("auth login");
        alert("session created");
        this.createSession(sessionObj);
        this.$store.state.dashOptions.marketplace.selected = true;
        this.$router.push({ name: "Main" });
      } else {
        alert("Login info incorrect");
        document.getElementById("email").value = null;
        document.getElementById("password").value = null;
      }
    },
  },
  computed: {
    form() {
      return this.$store.state.loginForm.form; //last pointed property needs to be "form" or validation and processing will not work
    },
  },
};
</script>
<style lang="scss">
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
</style>
