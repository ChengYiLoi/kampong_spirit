<template>
  <div id="dashbar" class="p-3">
    <b-row class="mb-5">
      <b-col><h1 id="brand">Kampong Spirit</h1></b-col>
    </b-row>
    <dashOption
      class="isSelected"
      :dashProps="dashOptions.map"
      v-on:updateSelection="updateSelection($event)"
    ></dashOption>
    <dashOption
      :dashProps="dashOptions.marketplace"
      v-on:updateSelection="updateSelection($event)"
    ></dashOption>
    <dashOption
      :dashProps="dashOptions.settings"
      v-on:updateSelection="updateSelection($event)"
    ></dashOption>

    <dashOption
      :dashProps="dashOptions.logout"
      v-on:updateSelection="updateSelection($event)"
    ></dashOption>
  </div>
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
          isLogout: true
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
#dashbar {
  height: 100vh;
  background-color: #6cc49a;
  border-radius: 0px 20px 0px 0px;
}
</style>
