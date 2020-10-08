<template>
  <div>
    <navbar></navbar>
    <jumbotron></jumbotron>
    <features></features>
    <mainFooter></mainFooter>
  </div>
</template>

<script>
import jumbotron from "../components/Jumbotron";
import features from "../components/Features";
import mainFooter from "../components/Footer";
import navbar from "../components/Nav";
export default {
  components: {
    jumbotron,
    features,
    mainFooter,
    navbar,
  },
  data() {
    return {
      name: "",
    };
  },
};
</script>
<style lang="scss"></style>
