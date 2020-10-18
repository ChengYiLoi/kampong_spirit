<template>
  <b-container fluid  class="main">
    <b-row align-v="stretch">
      <b-col cols="1" class="p-0">
        <dashbar v-on:updateSelection="updateView($event)"></dashbar>
      </b-col>
      <b-col class="p-0">
        <gmap v-if="this.$store.state.views.map"></gmap>
        <events v-else-if="this.$store.state.views.events"></events>
        <marketplace
          v-else-if="this.$store.state.views.marketplace"
        ></marketplace>
        <profile v-else-if="this.$store.state.views.profile"></profile>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import dashbar from "../components/Dashbar.vue";
import gmap from "../components/Gmap.vue";
import events from "../components/Events.vue";
import marketplace from "../components/Marketplace.vue";
import profile from "../components/Profile.vue";
export default {
  components: {
    gmap,
    dashbar,
    events,
    marketplace,
    profile,
  },
  data() {
    return {};
  },
  methods: {
    updateView(type) {
      Object.keys(this.$store.state.views).forEach((key) => {
        this.$store.state.views[key] = false;
      });

      this.$store.state.views[type] = true;
      console.log(this.$store.state.views);
    },
  },
};
</script>
<style lang="scss">
.main {
  background-color: #aaccaa;
  overflow: hidden;
  #full-height {
    height: 100vh;
    #banner {
      background-color: #f37656;
      h1 {
        font-weight: bold;
        color: whitesmoke;
      }
    }
  }
 
}
</style>
