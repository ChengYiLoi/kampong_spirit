<template>
  <b-navbar id="navbar" toggleable="md" type="dark" class="nav-deco p-3">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <router-link class="" to="/">
      <b-navbar-brand>
        <h1 class="ml-3">Kampong Spirit</h1>
      </b-navbar-brand>
    </router-link>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto text-left">
        <b-nav-item class=""
          ><router-link class="link" to="/">About Us</router-link></b-nav-item
        >
        <b-nav-item class=""
          ><router-link class="link" to="/login"
            >Log in or Sign Up</router-link
          ></b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.nav-deco {
  background-color: #666d7e;
  .link {
    color: #1d295a;
    background-color: whitesmoke;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 1.2rem;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
