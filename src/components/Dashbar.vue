<template>
  <b-container id="sidebar">
    <b-row>
      <span id="menu" class="d-inline mx-auto pt-2" v-b-toggle.sidebar-backdrop><b-img  :src="require(`../assets/menu.svg`)"></b-img></span>
      <b-sidebar
        id="sidebar-backdrop"
        :backdrop-variant="variant"
        backdrop
        shadow
      >
        <b-container>
          <b-row>
            <b-col>
              <p id="brand" class="pt-2">Kampong Spirit</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <dashOption
                class="isSelected"
                :dashProps="dashOptions.map"
                v-on:updateSelection="updateSelection($event)"
              ></dashOption>
            </b-col>
            <b-col cols="12">
              <dashOption
                :dashProps="dashOptions.marketplace"
                v-on:updateSelection="updateSelection($event)"
              ></dashOption>
            </b-col>
            <b-col cols="12">
              <dashOption
                :dashProps="dashOptions.settings"
                v-on:updateSelection="updateSelection($event)"
              ></dashOption>
            </b-col>
            <b-col cols="12">
              <dashOption
                :dashProps="dashOptions.logout"
                v-on:updateSelection="updateSelection($event)"
              ></dashOption>
            </b-col>
          </b-row>
        </b-container>
      </b-sidebar>
    </b-row>
  </b-container>
</template>
<script>
import dashOption from "../components/DashOption";
export default {
  components: {
    dashOption,
  },
  data() {
    return {
      dashOptions: {
        map: {
          text: "Green Map",
          url: "mapIcon.svg",
          selectName: "green map",
          selected: true,
        },
        marketplace: {
          text: "Marketplace",
          url: "scale.svg",
          selectName: "marketplace",
          selected: false,
        },
        settings: {
          text: "Settings",
          url: "settings.svg",
          selectName: "settings",
          selected: false,
        },
        logout: {
          text: "Logout",
          url: "logout.svg",
          selectName: "logout",
          selected: false,
          isLogout: true,
        },
      },
    };
  },
  methods: {
    updateSelection(type) {
      Object.keys(this.dashOptions).forEach((key) => {
        console.log(key);
        if (this.dashOptions[key].selectName == type) {
          this.dashOptions[key].selected = true;
        } else {
          this.dashOptions[key].selected = false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
#sidebar{
  height: 100vh;
  background-color: #6cc49a;
  #menu{
  &:focus{
    outline: none;
  }
}
}

#sidebar-backdrop {
  background-color: #6cc49a !important;
}
  #brand {
    font-size: 1.6rem;
  }

@media only screen and (max-width: 1025px) {
  #dashbar #brand {
    font-size: 1.4rem;
  }
}
</style>
