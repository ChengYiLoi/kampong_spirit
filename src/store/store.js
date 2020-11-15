import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isButtonSpinner: false,
    isSpinner: false,
    isSignup: false,
    itemFilter: {
      Electronics: true,
      Technology: true,
      Essentials: true,
      "Books and Stationary": true,
      "Assistive Device": true,
      "Beauty Accessories": true,
      Others: true,
    },
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
      numofevents: "",
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
   
    items: [
   
    ],
    isDisplayMarketItems: true,
    isDisplayUserEvents: false,
    userItems: [
     
    ],
    userEvents: [
    
    ],
    userRewards: [],
    events: [
    
    ],
    markers: [
      
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
      { value: "Technology", text: "Technology" },
      { value: "Books and Stationary", text: "Books and Stationary" },
      { value: "Assistive Device", text: "Assistive Device" },
      { value: "Beauty Accessories", text: "Beauty Accessories" },
      { value: "Essentials", text: "Essentials" },
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
    markerEventTypeRadio: [
      {
        value: "Buffet",
        text: "Buffet",
      },
      {
        value: "Give Away",
        text: "Give Away",
      },
    ],
    cuisineRadio: [
      { value: "1", text: "Halal" },
      {
        value: "0",
        text: "Non-Halal",
      },
    ],
   
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
  mutations: {
    toggleLoading: state=>{
      state.isSpinner = !state.isSpinner;
    },
    toggleButtonLoading: state =>{
      state.isButtonSpinner = !state.isButtonSpinner;
    }
  }, // functions fired from mutations can be tracked in the Vue.js devtools chrome plugin
});

export default store;
