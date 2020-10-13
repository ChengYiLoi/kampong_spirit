<template>
  <div>
    <navbar></navbar>
    <jumbotron></jumbotron>
    <features></features>
    <mainFooter></mainFooter>
    <slider></slider>
  </div>
</template>

<script>
import jumbotron from "../components/Jumbotron";
import features from "../components/Features";
import mainFooter from "../components/Footer";
import navbar from "../components/Nav";
import slider from '../components/Slider'
export default {
  components: {
    jumbotron,
    features,
    mainFooter,
    navbar,
    slider
  },
  data() {
    return {
      name: "",
    };
  },
};
</script>
<style lang="scss">

</style>
