<template>
  <div id="footer">
    <div class="links">
      <h3>Support</h3>
      <p>FAQ</p>
    </div>
    <div class="links">
      <h3>About</h3>
      <p>Our Story</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<style lang="scss">
#footer {
  background-color: #f4976c;
  display: flex;
  text-align: left;

  justify-content: left;
  .links {
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
    width: 10%;
    background-color: #e6e6e6;
  }
}
</style>
