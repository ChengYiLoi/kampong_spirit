<template>
  <div>
    <div v-if="!isVerification" class="login-form text-left p-3">
      <h2 class="text-lg-left text-center">Sign up</h2>
      <button
        @click="handleSignup"
        id="google"
        class="mt-4 d-block w-100 mx-auto px-3"
      >
        <span><img src="../assets/google.svg"/></span> Sign Up with Google
      </button>
      <b-form @submit.stop.prevent="onSubmit()">
        <b-row class="mt-4">
          <b-col>
            <b-form-group label="First Name: " label-for="fname">
              <b-form-input
                id="fname"
                type="text"
                placeholder="John"
                autocomplete="off"
                v-model="$v.form.fname.$model"
                :state="validateState('fname')"
                aria-describedby="fname-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="fname-feedback"
                >First name is required</b-form-invalid-feedback
              >
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Last Name: " label-for="lname">
              <b-form-input
                id="lname"
                type="text"
                placeholder="Doe"
                autocomplete="off"
                v-model="$v.form.lname.$model"
                :state="validateState('lname')"
                aria-describedby="lname-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="pnumber-feedback"
                >Last name is required</b-form-invalid-feedback
              >
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Mobile Number:" label-for="phoneNum" class="mb-3">
          <b-form-input
            id="phoneNum"
            type="text"
            placeholder="911"
            autocomplete="off"
            v-model="$v.form.pnumber.$model"
            :state="validateState('pnumber')"
            aria-describedby="pnumber-feedback"
          ></b-form-input>
          <b-form-invalid-feedback
            id="pnumber-feedback"
            v-if="!$v.form.pnumber.numeric"
            >Phone number must be numeric</b-form-invalid-feedback
          >
          <b-form-invalid-feedback
            id="pnumber-feedback"
            v-if="!$v.form.pnumber.required"
            >Phone number is required</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label="Email Address:" label-for="email" class="mb-3">
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
            id="pnumber-feedback"
            v-if="!$v.form.email.email"
            >Email must be valid</b-form-invalid-feedback
          >
          <b-form-invalid-feedback
            id="pnumber-feedback"
            v-if="!$v.form.email.required"
            >Email is required</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label="Password:" label-for="password" class="mb-3">
          <b-form-input
            id="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="off"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            aria-describedby="password-feedback"
          ></b-form-input>
          <b-form-invalid-feedback
            v-if="!$v.form.password.minLength"
            id="passsword-feedback"
            >Password must be at least 6 characters</b-form-invalid-feedback
          >
          <b-form-invalid-feedback
            v-if="!$v.form.password.maxLength"
            id="passsword-feedback"
            >Password cannot exceed 12 characters</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          label="Confirm Password:"
          label-for="cpassword"
          class="mb-3"
        >
          <b-form-input
            id="cpassword"
            type="password"
            placeholder="Enter your password"
            autocomplete="off"
            v-model="$v.form.cpassword.$model"
            :state="validateState('cpassword')"
            aria-describedby="cpassword-feedback"
          ></b-form-input>
          <b-form-invalid-feedback
            v-if="!$v.form.password.required"
            id="cpasssword-feedback"
            >Confirm password is required</b-form-invalid-feedback
          >
          <b-form-invalid-feedback
            v-if="!$v.form.cpassword.sameAsPassword"
            id="cpasssword-feedback"
            >Password and confirm password is not the
            same</b-form-invalid-feedback
          >
        </b-form-group>

        <button id="login-button" class="mt-2">
          Sign Up
        </button>
        <p class="mt-4 text-center text-link" v-on:click="switchForm()">
          Back to Login
        </p>
        <b-alert v-if="isTaken" show variant="warning">
          Email is already registered
        </b-alert>
      </b-form>
    </div>
    <div v-else class="login-form p-3">
      <h5 class="p-4">
        A SMS has been sent to your mobile number. <br />
        Please enter the verification code to complete the registration
      </h5>
      <b-form-group label-size="lg" label="Verification Code:" label-cols="4">
        <b-form-input size="lg" v-model="vCode"></b-form-input>
      </b-form-group>
      <p class="text-link"><u>Resend verification code</u></p>
      <b-button id="login-button" @click="addUser">Submit</b-button>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
 
  numeric,
  email,
  maxLength,
  sameAs,
  
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      isVerification: false,
      vCode: null,
      isTaken: false,
    };
  },
  validations: {
    form: {
      fname: {
        required,
      
        
        
      },
      lname: {
        required,
        
      },
      pnumber: {
        required,
        numeric,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12),
      },
      cpassword: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12),
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    addUser() {
      let url = `./database/smsverify.php?enteredcode=${this.vCode}`;
      axios.get(url).then((response) => {
        console.log(response);
        if (response.data.length == 1) {
          let userInputs = this.$v.form.$model;
          url = `./database/registeruser.php?lname=${userInputs["lname"]}&fname=${userInputs["fname"]}&email=${userInputs["email"]}&mobileno=${userInputs["pnumber"]}&password=${userInputs["password"]}`;
          url = encodeURI(url);
          axios.post(url).then(() => {
            alert("Form submitted");
            setTimeout(() => {
              url = `./database/validate.php?email=${userInputs["email"]}&password=${userInputs["password"]}`;
              url = encodeURI(url);
              axios.get(url).then((response) => {
                this.resetFields();
                if (response.data.length == 1) {
                  let data = response.data[0];
                  console.log(data);

                  this.$store.state.dashOptions.marketplace.selected = true;
                  this.createSession(data);
                  this.$router.push({ name: "Main" });
                }
              });
            }, 3000);
          });
        }
      });
    },
    resetFields(){
      this.$v.form.fname.$model = "";
      this.$v.form.lname.$model = "";
      this.$v.form.pnumber.$model = "";

      this.$v.form.email.$model = "";
      this.$v.form.password.$model = "";
      this.$v.form.cpassword.$model = "";

    },
    handleSignup() {
      this.$gAuth.signIn().then((user) => {
        console.log("user", user);
        let email;
        let fname;
        let lname;
        for (var props in user) {
          let substring = props.substring(1);
          if (substring == "t") {
            email = user[props].getEmail();
            fname = user[props].getGivenName();
            lname = user[props].getFamilyName();
            console.log(email);
            console.log(fname);
            console.log(lname);
          }
        }
        let url = `./database/checkemail.php?email=${email}`;
        axios.get(url).then((response) => {
          if (response.data.length >= 1) {
            this.isTaken = true;
          } else {
            let idtoken = user.wc["login_hint"];
            url = `./database/signupgmail.php?lname=${lname}&fname=${fname}&email=${email}&idtoken=${idtoken}`;
            url = encodeURI(url);
            axios.post(url).then(() => {
              setTimeout(() => {
                url = `./database/validateGoogleAuth.php?useremail=${email}&googleidtoken=${idtoken}`;
                url = encodeURI(url);
                axios.get(url).then((response) => {
                  if (response.data.length == 1) {
                    let data = response.data[0];
                    this.$store.state.dashOptions.marketplace.selected = true;
                    this.createSession(data);
                    this.$router.push({ name: "Main" });
                  }
                });
              }, 5000);
            });
          }
        });
      });
    },
    createSession(userInfo) {
      let userInputs = this.$v.form.$model;
      this.getUserRewards(userInputs["email"]);
      userInfo.isLogin = true;
      sessionStorage.setItem("userSession", JSON.stringify(userInfo));
      this.$store.state.userInfo = userInfo;
      if (this.keepLogged) {
        localStorage.setItem("userStorage", JSON.stringify(userInfo));
        alert("local storage created");
      }
    },
    getUserRewards(email) {
      let url = `./database/userrewards.php?email=${email}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
        this.$store.state.userRewards = result.data;
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
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      } else {
        let url = `./database/checkemail.php?email=${this.$v.form.email.$model}`;
        axios.get(url).then((response) => {
          if (response.data.length >= 1) {
            this.isTaken = true;
          } else {
            this.isVerification = true;
            console.log(this.$v.form.pnumber.$model);
            url = `./database/send_sms.php?mobileno=${this.$v.form.pnumber.$model}`;
            axios.post(url);
          }
        });
      }
    },
  },
  computed: {
    form() {
      return this.$store.state.signupForm.form;
    },
  },
};
</script>
<style lang="scss"></style>
