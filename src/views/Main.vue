<template>
  <b-container fluid id="main" class="">
    <b-row align-v="stretch">
      <b-col cols="1" class="p-0">
        <dashbar v-on:updateSelection="updateView($event)"></dashbar>
      </b-col>
      <b-col class="p-0">
        <gmap v-if="views.map"></gmap>
        <events v-else-if="views.events"></events>
        <marketplace v-else-if="views.marketplace"></marketplace>
        <profile v-else-if="views.profile"></profile>
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
    return {
      views: {
        map: true,
        events: false,
        marketplace: false,
        profile: false,
      },
    };
  },
  methods: {
    updateView(type) {
      Object.keys(this.views).forEach((key) => {
        this.views[key] = false;
      });

      this.views[type] = true;
    },
  },
};
</script>
<style lang="scss">
#main {
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
  .main {
    background-color: #aaccaa;
  }
}
</style>
