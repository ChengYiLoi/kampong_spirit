<template>
<div>
  <div v-if="!isLogin && (dashProps.text == 'Logout' || dashProps.text == 'Profile')">

  </div>
   <b-row v-else>
    <b-col ></b-col>
    <b-col md='12' class="pr-0 my-3">
      <b-row
        align-v="center"
        v-bind:class="{
          selected: dashProps.selected,
          logout: dashProps.isLogout,
        }"
        class="w-100 m-0 p-3 dash-option"
        v-on:click="updateSelection()"
      >
        <b-col cols="2" class="p-0">
          <b-img fluid :src="require(`../assets/${dashProps.url}`)" class="dash-option-img"></b-img>
        </b-col>
        <b-col class="p-0" >
          <p class=" mx-auto dash-text">{{ dashProps.text }}</p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  
 
</div>
 
</template>
<script>
export default {
  props: ["dashProps"],
  data() {
    return {};
  },
  methods: {
    updateSelection() {
      this.$emit("updateSelection", this.dashProps.selectName);
    },
  },
  computed:{
    isLogin(){
      return this.$store.state.userInfo.isLogin;
    }
  }
};
</script>
<style lang="scss">
.dash-option {
  cursor: pointer;
  color: #f5f5f5;
  border-radius: 20px 0px 0px 20px;

  .dash-text {
    font-weight: bold;
    font-size: 1.0rem;
    display: inline;
  }
}
.selected {
  background-color: #f4976c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.logout {
  background-color: #7854f7;
}

@media only screen and (max-width: 1025px) {
  .dash-option  .dash-text{
    font-size: 0.7rem;
  }
 
}

@media only screen and (max-width: 769px) {
  .dash-option  .dash-text{
    font-size: 0.7rem;
  }
 
}
</style>
