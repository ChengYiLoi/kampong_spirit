import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isSignup: false,
    userInfo: {
      isLogin: false,
      acctype: "",
      email: "",
      fname: "",
      greenpoints: "",
      lname: "",
      mobileno: "",
      password: "",
      profilepic: "NA",
    },
    loginForm: {
      form: {
        email: null,
        password: null,
      },
    },
    signupForm: {
      form: {
        fname: null,
        lname: null,
        pnumber: null,
        email: null,
        password: null,
        cpassword: null,
      },
    },
    dashOptions: {
      profile: {
        text: "Profile",
        url: "profile.svg",
        selectName: "profile",
        selected: false,
      },
      map: {
        text: "Green Map",
        url: "mapIcon.svg",
        selectName: "map",
        selected: false,
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
        selected: true,
      },

      logout: {
        text: "Logout",
        url: "logout.svg",
        selectName: "logout",
        selected: false,
        isLogout: true,
      },
    },
    // views: {
    //   map: true,
    //   events: false,
    //   marketplace: false,
    //   profile: false,
    // },
    items: [],
    isDisplayMarketItems: true,
    userItems: [],
    userEvents: [],
    userRewards: [
     
    ],
    events: [],
    markers: [
      // {
      //  endDatetime: "2020-12-12 02:09:09",
      //  gaID: "123",
      //  host: "dekubhna@gmail.com",
      //  itemDesc: "many different model",
      //  latitude: "1.4279",
      //  locDesc: "outside shopping mall",
      //  longitude: "103.8447",
      //  mimage: "giveaway.svg",
      //  name: "g-shock watch giveaway",
      //  startDatetime: "2020-10-21 02:06:06",
      //  telegramid: "0",
      //  type: "giveAway",
      //  clickable: true,
      //  draggable: false
      // },
      // {
      //   type: "refill",
      //   mimage: "water.svg",
      //   latitude: 1.406688,
      //   longitude: 104.033,
      //   clickable: true,
      //   draggable: false,
      // },
      // {
      //   type: "giveAway",
      //   icon: "giveaway.svg",
      //   lat: 1.406688,
      //   lng: 104.035,
      //   clickable: true,
      //   draggable: false,
      // },
    ],
    refill: [
      {
        type: "refill",
        icon: "water.svg",
        lat: 1.406688,
        lng: 104.033,
        clickable: true,
        draggable: false,
      },
    ],
    food: [
      {
        type: "food",
        icon: "chicken.svg",
        lat: 1.406688,
        lng: 104.03,
        clickable: true,
        draggable: false,
      },
    ],
    giveAway: [
      {
        type: "giveAway",
        icon: "giveaway.svg",
        lat: 1.406688,
        lng: 104.035,
        clickable: true,
        draggable: false,
      },
    ],
    itemCategoryDropdown: [
      { value: null, text: "Please select a category" },
      { value: "Electronics", text: "Electronics" },
      { value: "technology", text: "Technology" },
      { value: "Books and Stationary", text: "Books and Stationary" },
      { value: "Assistive Device", text: "Assistive Device" },
      { value: "Beauty Accessories", text: "Beauty Accessories" },
      { value: "essentials", text: "Essentials" },
      { value: "Others", text: "Others" },
    ],
    itemConditionRadio: [
      { value: "New", text: "New" },
      { value: "Used", text: "Used" },
    ],
    deliveryTypeRadio: [
      { value: "Meet Up", text: "Meet Up" },
      { value: "Postage", text: "Postage" },
    ],
    // eventTypeRadio: [
    //   { value: "", text: "" },
    //   { value: "", text: "" },
    // ],
    chartData: [],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  getters: {},
  mutations: {}, // functions fired from mutations can be tracked in the Vue.js devtools chrome plugin
});

export default store;