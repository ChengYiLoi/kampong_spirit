import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loginForm: {
            form: {
                email: null,
                password: null,
                isLogin: false,
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
//   listedBy: "wad2project@gmail.com"
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
//   listedBy: "wad2project@gmail.com"
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
//   listedBy: "wad2project@gmail.com"
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
//   listedBy: "wad2project@gmail.com"
// },
