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
      <b-row class="pt-2">
        <b-col></b-col>
        <b-col>
          <b-dropdown text="Filter" offset="-35">
            <div class="p-2">
              <b-form-checkbox
                @change="toggleFilter('Electronics')"
                v-model="filter['Electronics']"
                >Electronics</b-form-checkbox
              >
              <b-form-checkbox
                @change="toggleFilter('Technology')"
                v-model="filter['Technology']"
                >Technology</b-form-checkbox
              >
              <b-form-checkbox
                @change="toggleFilter(`Books and Stationary`)"
                v-model="filter[`Books and Stationary`]"
                >Books and Sationary</b-form-checkbox
              >
              <b-form-checkbox
                @change="toggleFilter(`Assistive Device`)"
                v-model="filter[`Assistive Device`]"
                >Assistive Device</b-form-checkbox
              >
              <b-form-checkbox
                @change="toggleFilter(`Beauty Accessories`)"
                v-model="filter[`Beauty Accessories`]"
                >Beauty Accessories</b-form-checkbox
              >
              <b-form-checkbox
                @change="toggleFilter('Essentials')"
                v-model="filter['Essentials']"
                >Essentials</b-form-checkbox
              >
              <b-form-checkbox
                @change="toggleFilter(`Others`)"
                v-model="filter[`Others`]"
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
      <b-col>
        <b-card-group columns>
          <div v-for="item in items" :key="item.iID">
            <itemcard v-if="filter[item.category]" :item="item"></itemcard>
          </div>
        </b-card-group>
      </b-col>
    </b-row>

    <b-row v-else>
      <b-col>
        <useritems></useritems>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import dashbar from "../components/Dashbar";
import itemcard from "../components/ItemCard";
import useritems from "../components/UserItems";
import getData from "../getData";
import postData from "../postData";

export default {
  components: {
    dashbar,
    itemcard,
    useritems,
  },
  data() {
    return {
      filter: {
        Electronics: true,
        Technology: true,
        Essentials: true,
        "Books and Stationary": true,
        "Assistive Device": true,
        "Beauty Accessories": true,
        Others: true,
      },
    };
  },
  created(){
    this.checkSession();
  },
  mounted() {
    // this.checkSession();
  },
  methods: {
    toggleFilter(type) {
      this.filter[type] = !this.filter[type];
    },
    getItems() {
      let url = `./database/getItems.php`;
      url = encodeURI(url);
      postData(url, this.renderItems);
    },
    getUserItems() {
      alert("get user items");
      let userSession;
      if (localStorage.getItem("userStorage")) {
        userSession = JSON.parse(localStorage.getItem("userStorage"));
      } else {
        userSession = JSON.parse(sessionStorage.getItem("userSession"));
      }

      let email = userSession["email"];
      let url = `./database/getUserItems.php?useremail=${email}`;
      alert(`get user items email is ${email}`);
      getData(url, this.renderUserItems);
    },

    renderUserItems(data) {
      console.log(JSON.parse(data));
      this.$store.state.userItems = JSON.parse(data);
    },

    renderItems(data) {
      console.log(JSON.parse(data));
      this.$store.state.items = JSON.parse(data);
    },
    displayMyItems() {
      if (!this.validateLogin()) {
        alert("user has not logged in");
        this.$router.push({ name: "Login" });
      } else if (this.$store.state.isDisplayMarketItems) {
        this.getUserItems();
        this.$store.state.isDisplayMarketItems = !this.$store.state
          .isDisplayMarketItems;
      }
    },
    displayUserChat() {
      if (!this.validateLogin()) {
        alert("user has not logged in");
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
      let userSession;
      if (sessionStorage.getItem("userSession") != null) {
        userSession = JSON.parse(sessionStorage.getItem("userSession"));
        console.log("user session is");
        this.$store.state.userInfo = userSession;
      }
      if (localStorage.getItem("userStorage") != null) {
        userSession = JSON.parse(localStorage.getItem("userStorage"));
        this.$store.state.userInfo = userSession;
      }
      console.log(this.$store.state['userInfo']);
      this.getItems();
    },
    toggleMarketPlace() {
      alert("updated market place items");
      this.$store.state.isDisplayMarketItems = !this.$store.state
        .isDisplayMarketItems;
      this.getItems();
    },
  },
  computed: {
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
