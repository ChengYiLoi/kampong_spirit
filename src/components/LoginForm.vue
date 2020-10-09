<template>
  <b-form class="login-form text-left p-3">
    <h2 class="text-lg-left text-center">Log In</h2>
  
      <button id="google" class="mt-4 d-block w-100 mx-auto px-3">
        <span><img src="../assets/google.svg"/></span> Sign in with Google
      </button>
   

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
    <b-form-checkbox value="remember" class="my-3"
      >Keep me logged In</b-form-checkbox
    >
    <router-link to="/main">
      <button id="login-button" class="mt-4">
        Log In
      </button></router-link
    >
    <p class="mt-4 text-center">
      Don't have an acoount?
      <span v-on:click="switchForm()" class="text-link">Sign up</span>
    </p>
  </b-form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  props: ["isSignup"],
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
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
    switchForm() {
      this.$emit("switchForm", true); // emits to the parent component to show the sigup form
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.$router.push({ name: "Main" });
      alert("Form submitted!");
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
  .login-form{
    font-size: 0.7rem;
    #login-button{
      font-size: 0.9rem;
    }
    p{
      font-size: 0.6rem;
    }
  }

}
</style>
