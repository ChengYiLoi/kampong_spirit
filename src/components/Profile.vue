<template>
  <div id="full-height">
    <div id="banner">
      <h1 class="d-inline pt-4">Profile</h1>
    </div>
    <div class="main h-100 p-4">
      <b-container fluid class="text-left user-info p-3">
        <div class="py-2">
          <h2 class="d-inline">
            <strong>First Name: </strong> <span>John</span>
          </h2>
          <h2 class="d-inline ml-5">
            <strong>Last Name: </strong> <span>Doe</span>
          </h2>
        </div>

        <h2 class="py-2">
          <strong>Email: </strong>
          <span>{{ this.$store.state.loginForm.form.email }}</span>
        </h2>

        <h2 class="py-2">
          <strong>Password: </strong>
          <span>{{ hiddenPass }}</span>
          <span class=" ml-5" v-on:click="toggleVisibility()"
            ><b-img
              fluid
              :src="
                require('../assets/' +
                  `${isVisible ? 'hidden.svg' : 'visible.svg'}`)
              "
            ></b-img
          ></span>
        </h2>

        <h2 class="py-2"><strong>Mobile Number: </strong> <span>911</span></h2>
        <h2 class="py-2">
          <strong>Green Points: </strong>
          <span>{{ gPoints }}</span>
        </h2>
      </b-container>
      <div class=" py-2 mt-4">
        <b-row class="px-5">
          <b-col class="px-5">
            <b-progress
              :value="gPoints"
              variant="warning"
              striped
              animated="true"
            ></b-progress>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col class="text-left">
            <b-img :src="require('../assets/bronzeMedal.svg')"></b-img>
          </b-col>
          <b-col>
            <b-img :src="require('../assets/silverMedal.svg')"></b-img>
          </b-col>
          <b-col class="text-right">
            <b-img :src="require('../assets/goldMedal.svg')"></b-img>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gPoints: 50,
      isVisible: false,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
  computed: {
    hiddenPass() {
      if (!this.isVisible) {
        let pass = this.$store.state.loginForm.form.password;
        let hiddenPass = "";
        for (let x = 0; x < pass.length; x++) {
          hiddenPass += "*";
        }
        return hiddenPass;
      }
      return this.$store.state.loginForm.form.password;
    },
  },
};
</script>
<style lang="scss">

.user-info {
  background-color: #f1f3f6 !important;
  border-radius: 1rem;
}
</style>
