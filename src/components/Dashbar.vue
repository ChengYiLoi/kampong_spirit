<template>
  <b-container id="sidebar" class="p-2">
    <b-row>
      <b-col>
        <span id="menu" class="pt-4" v-b-toggle.sidebar-backdrop
          ><b-img :src="require(`../assets/menu.svg`)"></b-img
        ></span>
      </b-col>
    </b-row>
    <b-sidebar
      id="sidebar-backdrop"
      :backdrop-variant="variant"
      backdrop
      shadow
      v-model="isSideBarOpen"
    >
      <b-container>
        <b-row>
          <b-col>
            <router-link to="/" id="brand">
              <p class="pt-2">Kampung Spirit</p>
            </router-link>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" v-for="option in dashOptions" :key="option.text">
            <dashOption
            v-if="isAdmin(option)"
              class="isSelected"
              :dashProps="option"
              v-on:updateSelection="updateSelection($event)"
            ></dashOption>
          </b-col>
        </b-row>
      </b-container>
    </b-sidebar>
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
      isSideBarOpen: false,
    };
  },
  methods: {
    isAdmin(event){
      if(event.text == "Profile" && this.$store.state.userInfo.acctype == "Admin"){
        return false;
      }
      return true;
    },
    updateSelection(type) {
      // Updates the sidebar option, if user selects logout, it will redirect to the landing page. 
      // It also removes both the session and local storage as well as the vuex store
      this.isSideBarOpen = false;
      if (type == "logout") {
        this.$store.state.loginForm.form = {
          email: null,
          password: null,
        };
        this.$store.state["userInfo"] = {
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
        };
        this.$store.state.dashOptions.profile["selected"] = false;
        this.$store.state.dashOptions.map["selected"] = false;
        this.$store.state.dashOptions.events["selected"] = false;
        this.$store.state.dashOptions.marketplace["selected"] = true;
        this.$store.state.dashOptions.logout["selected"] = false;

        this.$router.push({ name: "Landing" });
      
        localStorage.removeItem("userStorage");
        sessionStorage.removeItem("userSession");
        
        this.resetStore();
      } else {
        Object.keys(this.dashOptions).forEach((key) => {
          if (this.dashOptions[key].selectName == type) {
            this.dashOptions[key].selected = true;
          } else {
            this.dashOptions[key].selected = false;
          }
        });
      }
      this.$store.state["isDisplayMarketItems"] = true;
    },
    resetStore() {
      // Resets the vuex store to the original state
      this.$store.state = {
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

        items: [],
        isDisplayMarketItems: true,
        isDisplayUserEvents: false,
        userItems: [{}],
        userEvents: [],
        userRewards: [],
        events: [],
        markers: [{}],
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
        cusineRadio: [
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
      };
    },
  },
  computed: {
    dashOptions() {
      return this.$store.state.dashOptions;
    },
  },
};
</script>
<style lang="scss">
#sidebar {
  #menu {
    &:focus {
      outline: none;
    }
  }
}

#sidebar-backdrop {
  background-color: #6cc49a !important;
}
#brand {
  font-size: 1.6rem;
  &:hover{
    color: unset;
    text-decoration: none;
  }
}

@media only screen and (max-width: 1025px) {
  #dashbar #brand {
    font-size: 1.4rem;
  }
}
</style>
