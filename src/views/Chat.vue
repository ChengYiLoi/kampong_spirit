<template>
  <div>
    <h1>my chat</h1>
  </div>
</template>

<script>
import postData from "../postData";
export default {
  mounted() {
    this.getChat();
  },
  data() {
    return {};
  },
  methods: {
    getChat() {
      let email = this.$store.state.userInfo["email"];
      let url = `chatlobby.html?user=${email}`;
      postData(url, this.getChatStatus);
    },
    getChatStatus(dataObj) {
      console.log("chat info");
      console.log(JSON.parse(dataObj.responseText));
    },
  },
};
</script>
<style lang="scss"></style>
