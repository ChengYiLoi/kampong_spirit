<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center" class="w-100 mx-0">
        <b-col lg="3">
          <dashbar></dashbar>
        </b-col>
        <b-col id="feature-title" class="px-0">
          <h1 class="d-inline">
            {{
              this.$store.state.isDisplayMarketItems
                ? "Market Place"
                : "My Items"
            }}
          </h1>
        </b-col>

        <b-col lg="3">
          <b-row align-v="center" id="market-buttons">
            <b-col cols="6" class="px-0">
              <b-button
                class="p-2  responsive-market-button"
                variant="info"
                v-on:click="displayMyItems()"
                v-if="displayMarketItems"
              >
                <strong>My Items</strong>
              </b-button>
              <b-button
                v-on:click="toggleMarketPlace()"
                class="responsive-market-button p-2"
                v-else
                variant="info"
              >
                <strong>Market Place</strong>
              </b-button>
            </b-col>
            <b-col cols="6" class="px-0">
              <b-button
                @click="displayUserChat"
                class="p-2 button-border-left  responsive-market-button"
                variant="info"
              >
                <strong>My Chat</strong>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div>
      <div v-if="!isLoading">
        <div>
          <b-row class="pt-2" v-if="displayMarketItems">
            <b-col></b-col>
            <b-col lg="8" class="mx-2">
              <b-input-group>
                <template #prepend>
                  <b-form-select
                    v-model="searchFilter"
                    :options="searchOptions"
                  >
                  </b-form-select>
                  <!-- <b-dropdown :text="searchSelected" variant="info">
                    <b-dropdown-item v-model="searchSelected">User</b-dropdown-item>
                  </b-dropdown> -->
                </template>
                <b-form-input
                  v-model="searchInput"
                  placeholder="Search by item name / username"
                ></b-form-input>
                <template>
                  <b-button variant="success" @click="search">
                    <div v-if="!isButtonLoading">
                      Search
                    </div>
                    <b-spinner
                      v-else
                      label="spinning"
                      style="width: 1.0rem; height: 1.0rem"
                    ></b-spinner>
                  </b-button>
                </template>
              </b-input-group>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col></b-col>
            <b-col>
              <b-dropdown text="Filter" offset="-35">
                <div class="p-2">
                  <b-form-checkbox v-model="filter['Electronics']"
                    >Electronics</b-form-checkbox
                  >
                  <b-form-checkbox
                    @change="toggleFilter('Technology')"
                    v-model="filter['Technology']"
                    >Technology</b-form-checkbox
                  >
                  <b-form-checkbox v-model="filter[`Books and Stationary`]"
                    >Books and Sationary</b-form-checkbox
                  >
                  <b-form-checkbox v-model="filter[`Assistive Device`]"
                    >Assistive Device</b-form-checkbox
                  >
                  <b-form-checkbox v-model="filter[`Beauty Accessories`]"
                    >Beauty Accessories</b-form-checkbox
                  >
                  <b-form-checkbox v-model="filter['Essentials']"
                    >Essentials</b-form-checkbox
                  >
                  <b-form-checkbox v-model="filter[`Others`]"
                    >Others</b-form-checkbox
                  >
                  <!-- <b-row>
                <b-col cols="6">
                  <b-form-checkbox>Electronics</b-form-checkbox>
                </b-col>
                <b-col>
                  <b-form-checkbox>Technology</b-form-checkbox>
                </b-col>
              </b-row> -->
                </div>
              </b-dropdown>
            </b-col>
            <b-col></b-col>
          </b-row>
        </div>
        <b-row v-if="displayMarketItems" class="m-0 main d-inline">
          <b-col v-if="items.length > 0">
            <b-card-group columns>
              <div v-for="item in items" :key="item.iID">
                <itemcard v-if="filter[item.category]" :item="item"></itemcard>
                <!-- Image references:
                https://www.businessinsider.com/hydro-flask-oasis-jug-review
                https://www.pinterest.com/pin/259801472238548631/
                https://www.narcecases.com/products/real-pressed-dried-flowers-transparent-silicone-phone-case
                https://www.2knowandvote.com/how-to-wear-a-herschel-little-america-backpack/
                https://www.msn.com/en-sg/lifestyle/lifestyle/malaysian-comedian-behind-viral-uncle-roger-video-on-youtube-super-grateful-people-love-his-work/ar-BB18kGPv?li=BBr8Cnr
                https://www.universalstudentliving.com/graduate-linkedin-profile-top-tips/
                https://www.gentlemanstationer.com/blog/2019/7/5/top-five-mechanical-pencils-for-when-you-really-want-to-write-small
                https://bleacherreport.com/articles/2904832-khabib-says-conor-mcgregor-is-a-better-striker-than-ufc-champ-justin-gaethje 
                https://www.etsy.com/sg-en/listing/627437476/mens-leather-wallet-mens-wallet-slim
                -->
              </div>
            </b-card-group>
          </b-col>
          <b-col v-else class="mt-5">
            <b-row>
              <b-col cols="12">
                <b-img fluid :src="require('../assets/empty.svg')"></b-img>
                <!-- Image reference:
                https://undraw.co/search -->
              </b-col>
              <b-col cols="12">
                The item you are looking for is not available
              </b-col>
            </b-row>
            
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col>
            <useritems></useritems>
          </b-col>
        </b-row>
      </div>
      <b-spinner
        class="spinner-center"
        style="width: 5rem; height: 5rem"
        label="spinner"
        variant="success"
        v-else
      ></b-spinner>
    </div>
  </div>
</template>
<script>
import dashbar from "../components/Dashbar";
import itemcard from "../components/ItemCard";
import useritems from "../components/UserItems";
import getData from "../getData";
import postData from "../postData";
var axios = require("axios");
export default {
  components: {
    dashbar,
    itemcard,
    useritems,
  },
  data() {
    return {
      searchOptions: [
        { value: "item", text: "Item" },
        { value: "user", text: "User" },
      ],
      searchFilter: "item",
      searchInput: "",
      // filter: {
      //   Electronics: true,
      //   Technology: true,
      //   Essentials: true,
      //   "Books and Stationary": true,
      //   "Assistive Device": true,
      //   "Beauty Accessories": true,
      //   Others: true,
      // },
    };
  },
  created() {
    this.checkSession();
  },
  mounted() {
    // this.checkSession();
  },
  methods: {
    search() {
      this.toggleButtonLoading();
      if (this.searchInput != "") {
        let url = `./database/search.php?dropdown=${this.searchFilter}&search=${this.searchInput}`;
        url = encodeURI(url);
        axios.get(url).then((response) => {
          setTimeout(() => {
            this.toggleButtonLoading();
          
            this.searchInput = "";
            this.$store.state.items = response.data;
          }, 1500);
        });
      } else {
        this.toggleButtonLoading();
        this.getItems();
      }
    },
    toggleButtonLoading() {
       this.$store.commit('toggleButtonLoading');
    },
    toggleLoading() {
      this.$store.commit('toggleLoading');
    },
    getItems() {
      this.toggleLoading();
      let url = `./database/getItems.php`;
      url = encodeURI(url);
      postData(url, this.renderItems);
    },
    getUserItems() {
      this.toggleLoading();
      // alert("get user items");
      let userSession;
      if (localStorage.getItem("userStorage")) {
        userSession = JSON.parse(localStorage.getItem("userStorage"));
      } else {
        userSession = JSON.parse(sessionStorage.getItem("userSession"));
      }

      let email = userSession["email"];
      let url = `./database/getUserItems.php?useremail=${email}`;
      // alert(`get user items email is ${email}`);
      getData(url, this.renderUserItems);
    },

    renderUserItems(data) {
      setTimeout(() => {
       
        this.toggleLoading();
        this.$store.state.userItems = JSON.parse(data);
      }, 1800);
    },

    renderItems(data) {
      setTimeout(() => {
        this.toggleLoading();
       
        this.$store.state.items = JSON.parse(data);
      }, 1800);
    },
    displayMyItems() {
      if (!this.validateLogin()) {
        this.$router.push({ name: "Login" });
      } else if (this.$store.state.isDisplayMarketItems) {
        this.getUserItems();
        this.$store.state.isDisplayMarketItems = !this.$store.state
          .isDisplayMarketItems;
      }
    },
    displayUserChat() {
      if (!this.validateLogin()) {
        
        this.$router.push({ name: "Login" });
      } else {
        window.location.replace(
          `http://www.wad2kampungspirit.xyz/chatlobby.html?user=${this.email}`,
        );
      }
    },
    validateLogin() {
      let isLogged = false;
      if (localStorage.getItem("userStorage") != null) {
        isLogged = true;
      } else if (sessionStorage.getItem("userSession") != null) {
        isLogged = true;
      }
      return isLogged;
    },
    checkSession() {
      // this.toggleLoading();
      let userSession;
      if (sessionStorage.getItem("userSession") != null) {
        userSession = JSON.parse(sessionStorage.getItem("userSession"));
       
        this.$store.state.userInfo = userSession;
      }
      if (localStorage.getItem("userStorage") != null) {
        userSession = JSON.parse(localStorage.getItem("userStorage"));
        this.$store.state.userInfo = userSession;
      }
     
      this.getItems();
    },
    toggleMarketPlace() {
      this.$store.state.isDisplayMarketItems = !this.$store.state
        .isDisplayMarketItems;
      this.getItems();
    },
  },
  computed: {
    filter() {
      return this.$store.state.itemFilter;
    },
    isButtonLoading() {
      return this.$store.state.isButtonSpinner;
    },
    isLoading() {
      return this.$store.state.isSpinner;
    },
    items() {
      return this.$store.state.items;
    },
    displayMarketItems() {
      return this.$store.state.isDisplayMarketItems;
    },
    email() {
      let email = "";
      if (sessionStorage.getItem("userSession") != null) {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        email = userSession["email"];
      }

      return email;
    },
  },
};
</script>
<style lang="scss">
@media only screen and (max-width: 768px) {
  .button-border-left {
    border-left: 1px solid #128ea3;
  }
  #feature-title {
    display: none;
  }
  // #market-buttons {
  //   padding-bottom: 1rem;
  // }
  .responsive-market-button {
    width: 100%;
    border-radius: unset;
  }
}
</style>
