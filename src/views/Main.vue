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
  mounted() {
    
    this.checkSessionOrLocalStorage();
  },
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
    checkSessionOrLocalStorage() {
      let user;
      if (localStorage.getItem("userStorage") != null) {
        user = JSON.parse(localStorage.getItem("userStorage"));
        this.$store.state.userInfo = user;
      } else if (sessionStorage.getItem("userStorage") != null) {
        alert("session found");
        user = JSON.parse(sessionStorage.getItem("userSession"));
        this.$store.state.userInfo = user;
      }
    },
  },
};
</script>
<style lang="scss">
.main::-webkit-scrollbar {
  display: none;
}
.main {
  background-color: #d9e2ef;
  overflow-y: scroll;
  overflow-x: hidden !important;
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
.button-link {
  color: whitesmoke;
  &:hover {
    text-decoration: none;
    color: unset;
  }
}
</style>
