import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    form: {
      email: null,
      password: null,
      isLogin: true,
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
    items: [],
  },
  getters: {},
  mutations: {}, // functions fired from mutations can be tracked in the Vue.js devtools chrome plugin
});

export default store;


// simulate data [
//   {
//     id: 34,
//     name: "gameboy",
//     image: "https://picsum.photos/id/239/800/300",
//     category: "technology",
//     state: "used",
//     description: "good condition",
//     createDate: "2020-10-22",
//     deliveryType: "Postage",
//     location: "yishun",
//     status: "Open",
//     listedBy: "foodpls@gmail.com",
//   },
//   {
//     id: 35,
//     name: "water bottle",
//     image: "NA",
//     category: "essentials",
//     state: "new",
//     description: "good",
//     createDate: "2020-10-29",
//     deliveryType: "Meet up",
//     location: "africa",
//     status: "Donated",
//     listedBy: "trump@gmail.com",
//   },
//   {
//     id: 36,
//     name: "dog meat",
//     image: "https://picsum.photos/id/238/800/300",
//     category: "essentials",
//     state: "new",
//     description: "good",
//     createDate: "2020-10-29",
//     deliveryType: "Meet up",
//     location: "china",
//     status: "Donated",
//     listedBy: "trump@gmail.com",
//   },
//   {
//     id: 37,
//     name: "mc nuggets",
//     image: "NA",
//     category: "essentials",
//     state: "new",
//     description: "good",
//     createDate: "2020-10-29",
//     deliveryType: "Meet up",
//     location: "china",
//     status: "Donated",
//     listedBy: "trump@gmail.com",
//   },
// ],