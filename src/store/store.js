import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isSignup: false,
    userInfo: {
      isLogin: false,
      accType: "",
      email: "",
      fname: "",
      greenPoints: "",
      lname: "",
      mobileNo: "",
      password: "",
      profilePic: "NA",
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
    events: [
      {
        eventID: "123",
        title: "Clean up",
        type: "clean up",
        startDateTime: "2020-08-08 08:06:16",
        endDateTime: "2020-10-10 07:10:10",
        location: "yishun park playground",
        postalCode: "125697",
        description: "Cleaning up event at nowhere",
        weatherInfo: "Sunny day",
        greenPoints: "10",
        numberOfParticipants: "10",
        createdBy: "wad2project@gmail.com",
        maxcapacity: "20",
        status: "Open",
      },
      {
        eventID: "666",
        title: "Clean up",
        type: "clean up",
        startDateTime: "2021-08-08 08:06:16",
        endDateTime: "2021-10-10 07:10:10",
        location: "playground",
        postalCode: "666",
        description: "Cleaning up event",
        weatherInfo: "Rainy day",
        greenPoints: "1",
        numberOfParticipants: "10",
        createdBy: "wad2project@gmail.com",
        maxcapacity: "20",
        status: "Open",
      },
    ],
    itemCategoryDropdown: [
      { value: null, text: "Please select a category" },
      { value: "electronics", text: "Electronics" },
      { value: "technology", text: "Technology" },
      { value: "Books and Stationary", text: "Books and Stationary" },
      { value: "Assistive Device", text: "Assistive Device" },
      { value: "Beauty Accessories", text: "Beauty Accessories" },
      { value: "essentials", text: "Essentials" },
      { value: "Others", text: "Others" },
    ],
    itemConditionRadio: [
      { value: "new", text: "New" },
      { value: "used", text: "Used" },
    ],
    deliveryTypeRadio: [
      { value: "Meet Up", text: "Meet Up" },
      { value: "Postage", text: "Postage" },
    ],
  },
  getters: {},
  mutations: {}, // functions fired from mutations can be tracked in the Vue.js devtools chrome plugin
});

export default store;

// {
//   iID: "34",
//   name: "gameboy",
//   image: "NA",
//   category: "technology",
//   state: "used",
//   description: "good condition",
//   createDate: "2020-10-22",
//   deliveryType: "Postage",
//   location: "yishun",
//   status: "Open",
//   listedBy: "wad2project@gmail.com",
//   fname: "john"
// },
// {
//   iID: "35",
//   name: "water bottle",
//   image: "NA",
//   category: "essentials",
//   state: "new",
//   description: "good",
//   createDate: "2020-10-29",
//   deliveryType: "Meet Up",
//   location: "africa",
//   status: "Donated",
//   listedBy: "wad2project@gmail.com",
//   fname: "jake"
// },
// {
//   iID: "36",
//   name: "Razor Gaming Mouse",
//   image: "01NlLQzm8PSNlDYAGHYFL8D-1..1575422627.jpg",
//   category: "electronics",
//   state: "used",
//   description: "No longer want to game. Do not want it to go to waste",
//   createDate: "2020-10-10",
//   deliveryType: "Meet Up",
//   location: "Ang Mo Kio avenue 10, Singapore",
//   status: "Open",
//   listedBy: "wad2project@gmail.com",
//   fname: "jill"
// },
// {
//   iID: "37",
//   name: "Foolscap Paper",
//   image: "a78431348a861763d477277b4da4533e.jpg",
//   category: "Books and Stationary",
//   state: "new",
//   description: "I am working now, I do not need this anymore",
//   createDate: "2020-10-10",
//   deliveryType: "Mee Up",
//   location: "Dakota crescent Singapore",
//   status: "Open",
//   listedBy: "wad2project@gmail.com",
//   fname: "james"
// },
