import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    form: {
      email: null,
      password: null,
      isLogin: false,
    },
    dashOptions: {
      map: {
        text: "Green Map",
        url: "mapIcon.svg",
        selectName: "map",
        selected: true,
      },
      events: {
        text: "Events",
        url: "event.svg",
        selectName: "events",
        selected: false,
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
  },
});

export default store;
