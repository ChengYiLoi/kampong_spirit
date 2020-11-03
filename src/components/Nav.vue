<template>
  <b-navbar id="navbar" toggleable="lg" type="dark" class="nav-deco p-3">
    <router-link to="/">
      <b-navbar-brand id="brand">
        <strong>Kampong Spirit</strong>
      </b-navbar-brand>
    </router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto text-left">
        <b-nav-item v-if="isAbout" class="my-1"
          ><router-link class="link" to="/about"
            ><strong>About Us</strong></router-link
          ></b-nav-item
        >
        <b-nav-item class="my-1"
          ><router-link class="link" to="/login"
            ><strong>Log in or Sign Up</strong>
          </router-link></b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
   props:['isAbout'],
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

@media only screen and (max-width: 425px) {
  .router-link-active > #brand {
    font-size: 1.5rem;
  }
  .nav-link > .link {
    color: whitesmoke;
    background-color: unset;
    font-size: 1rem;
  }
}
</style>
