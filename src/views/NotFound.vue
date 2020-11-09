<template>
  <div>
    <b-row>
      <b-col>
        <b-img fluid :src="require('../assets/notFound.gif')"></b-img>
      </b-col>
    </b-row>
    <b-row class="p-3">
      <b-col>
        <h2>The page you are looking for is not available.</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-link to="/">
          <b-button variant="primary">Back to Home</b-button>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
