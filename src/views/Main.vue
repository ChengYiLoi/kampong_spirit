<template>
  <b-container fluid id="main" class="p-0 m-0">
    <b-row align-v="stretch">
      <b-col cols="1">
        <dashbar v-on:updateSelection="updateView($event)"></dashbar>
      </b-col>
      <b-col>
        <gmap v-if="views.map"></gmap>
        <events v-else-if="views.events"></events>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import dashbar from "../components/Dashbar.vue";
import gmap from "../components/Gmap.vue";
import events from "../components/Events.vue";
export default {
  components: {
    gmap,
    dashbar,
    events,
  },
  data() {
    return {
      views: {
        map: true,
        events: false,
        marketplace: false,
        settings: false,
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
}
</style>
