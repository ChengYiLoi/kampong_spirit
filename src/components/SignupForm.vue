<template>
  <b-form @submit.stop.prevent="onSubmit()" class="login-form text-left p-3">
    <h2 class="text-lg-left text-center">Sign up</h2>
    <button
      @click="handleSignup"
      id="google"
      class="mt-4 d-block w-100 mx-auto px-3"
    >
      <span><img src="../assets/google.svg"/></span> Sign Up with Google
    </button>
    <b-row class="mt-4">
      <b-col>
        <b-form-group label="First Name" label-for="fname">
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
        <b-form-group label="Last Name" label-for="lname">
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
      <b-form-invalid-feedback id="pnumber-feedback" v-if="!$v.form.email.email"
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

    <b-form-group label="Confirm Password:" label-for="cpassword" class="mb-3">
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
        >Password and confirm password is not the same</b-form-invalid-feedback
      >
    </b-form-group>

    <button id="login-button" class="mt-2">
      Sign Up
    </button>
    <p class="mt-4 text-center text-link" v-on:click="switchForm()">
      Back to Login
    </p>
  </b-form>
</template>
<script>
const axios = require("axios");
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  alpha,
  numeric,
  email,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {};
  },
  validations: {
    form: {
      fname: {
        required,
        alpha,
      },
      lname: {
        required,
        alpha,
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

        let idtoken = user.wc["login_hint"];
        let url = `signupgmail.php?lname=${lname}&fname=${fname}&email=${email}&idtoken=${idtoken}`;
        axios.post(url).then((result) => {
          if (result.data.length == 1) {
            alert("Sign up successful");
            this.$router.push({ name: "Main" });
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
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      } else {
        let userInputs = this.$v.form.$model;

        let url = `registeruser.php?lname=${userInputs["lname"]}&fname=${userInputs["fname"]}&email=${userInputs["email"]}&mobileno=${userInputs["pnumber"]}&password=${userInputs["password"]}`;
        axios.post(url).then(() => {
          alert("Form submitted");
          this.$router.push({ name: "Main" });
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
