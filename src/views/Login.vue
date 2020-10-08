<template>
  <b-container fluid id="login">
    <b-row class="navbar nav-deco p-3 navbar-dark">
      <b-col>
        <router-link class="brand" to="/"><h1>Kampong Spirit</h1></router-link>
      </b-col>
    </b-row>
    <b-container fluid>
      <b-row class="p-3">
        <b-col md="5" align-self="center">
          <div v-if="isSignup">
            <signupForm></signupForm>
          </div>
          <div v-else>
            <loginForm></loginForm>
          </div>
        </b-col>
        <b-col md="" class="text-right">
          <b-img :src="require('../assets/earth.svg')"></b-img>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
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
      isSignup: true,
    };
  },
};
</script>
<style lang="scss">
$text-white: whitesmoke;
.brand {
  color: $text-white;
  font-size: 24px;
  font-weight: bold;
  &:hover {
    text-decoration: none;
    color: $text-white;
  }
}

#login {
  background-color: #f1f3f6;
}
</style>
