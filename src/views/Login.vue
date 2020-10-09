<template>
<div>
  <b-row class="navbar nav-deco pt-2 navbar-dark">
      <b-col>
        <router-link class="brand" to="/"><h1>Kampong Spirit</h1></router-link>
      </b-col>
    </b-row>
    
      <b-row id="login" class=" p-4" align-v="center">
        <b-col lg="5" >
          <div v-if="isSignup">
            <signupForm v-on:switchForm="switchForm($event)"></signupForm>
          </div>
          <div v-else>
            <loginForm
              :isSignup="isSignup"
              v-on:switchForm="switchForm($event)"
            ></loginForm>
            <!-- v-on fires when user clicks on sign up -->
          </div>
        </b-col>
        <b-col class="text-right d-none d-lg-block">
          <b-img
            fluid
            :src="require('../assets/earth.svg')"
          
          ></b-img>
        </b-col>
      </b-row>

</div>
  

</template>

<script>
import loginForm from "../components/LoginForm";
import signupForm from "../components/SignupForm";
export default {
  components: {
    loginForm,
    signupForm,
  },
  data() {
    return {
      isSignup: false,
    };
  },
  methods: {
    switchForm(event) {
      this.isSignup = event;
    },
  },
};
</script>
<style lang="scss">
$text-white: whitesmoke;
.brand {
  color: $text-white;

  font-weight: bold;
  h1 {
    font-size: 1.5rem;
  }
  &:hover {
    text-decoration: none;
    color: $text-white;
  }
}

#login {
  background-color: #f1f3f6;
  height: 100vh;
}

@media only screen and (max-width: 426px) {
  #login{
    overflow: visible;
  }
}

@media only screen and (max-width: 376px) {
  .brand > h1 {
    font-size: 2rem;
  }
}
</style>
