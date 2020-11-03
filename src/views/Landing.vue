<template>
  <div>
    <navbar :isAbout="true"></navbar>
    <jumbotron></jumbotron>
    <features></features>

    <slider></slider>
  </div>
</template>

<script>
import jumbotron from "../components/Jumbotron";
import features from "../components/Features";

import navbar from "../components/Nav";
import slider from '../components/Slider'
export default {
 
  mounted(){
     this.checkStorage();
  },
  components: {
    jumbotron,
    features,

    navbar,
    slider
  },
  data() {
    return {
      name: "",
    };
  },
  methods:{
    checkStorage() {
      if (localStorage.getItem("userStorage")) {
        let userSession = JSON.parse(localStorage.getItem("userStorage"));
         sessionStorage.setItem('userSession', JSON.stringify(userSession));
        this.$store.state["userInfo"] = userSession;
      }
    },
  }
};
</script>
<style lang="scss">

</style>
