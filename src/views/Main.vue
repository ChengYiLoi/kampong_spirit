<template>
  <b-container fluid class="main">
    <b-row align-v="stretch">
      
      <b-col class="p-0">
        <gmap v-if="this.$store.state.dashOptions.map.selected"></gmap>
        <events
          v-else-if="this.$store.state.dashOptions.events.selected"
        ></events>
        <marketplace
          v-else-if="this.$store.state.dashOptions.marketplace.selected"
        ></marketplace>
        <profile
          v-else-if="this.$store.state.dashOptions.profile.selected"
        ></profile>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>

import gmap from "../components/Gmap.vue";
import events from "../components/Events.vue";
import marketplace from "../components/Marketplace.vue";
import profile from "../components/Profile.vue";
export default {
  
  components: {
    gmap,
 
    events,
    marketplace,
    profile,
  },
  data() {
    return {};
  },
  methods: {
    
  },
};
</script>
<style lang="scss">
.main {
  background-color: #aaccaa;
  overflow-y: scroll;
  overflow-x: hidden;
  #full-height {
    min-height: 100vh;
    #banner {
      background-color: #f37656;
      h1 {
        font-weight: bold;
        color: whitesmoke;
      }
    }
  }
}
.button-link{
  color: whitesmoke;
  &:hover{
    text-decoration: none;
    color: unset;
  }
}
</style>
