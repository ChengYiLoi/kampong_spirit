<template>
  <b-form class="login-form text-left p-4">
    <h1>Log In</h1>
    <button id="google" class="mt-4 d-block mx-auto">
      <span><img src="../assets/google.svg"/></span> Sign in with Google
    </button>
    <b-form-group label="Email Address:" label-for="email" class="my-4">
      <b-form-input
        id="email"
        type="email"
        placeholder="you@example.com"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Password:" label-for="password" class="my-4">
      <b-form-input
        id="password"
        type="password"
        placeholder="Enter your password"
      ></b-form-input>
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
      Don't have an acoount? <a id="sign-up">Sign up</a>
    </p>
  </b-form>
</template>
<style lang="scss">
  .login-form {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);

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
    font-size: 32px;

    color: whitesmoke;
  }
  #sign-up{
    color: #824EA0;
    font-weight: 900;
  }
}
</style>
