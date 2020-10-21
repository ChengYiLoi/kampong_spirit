<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center" class="px-2">
        <b-col md="9">
          <b-row align-v="center">
            <b-col md="2">
              <dashbar></dashbar>
            </b-col>
            <b-col id="feature-title">
              <h1 class="d-inline">
                {{
                  this.$store.state.isDisplayMarketItems
                    ? "Market Place"
                    : "My Items"
                }}
              </h1>
            </b-col>
          </b-row>
        </b-col>
        
        <b-col md="3" class="p-0">
          <b-row align-v="center" id="market-buttons" class="">
            <b-col cols="6" class="px-0">
              <b-button
                class="px-2 "
                v-on:click="displayMyItems()"
                v-if="displayMarketItems"
              >
                <strong>My Items</strong>
              </b-button>
              <b-button v-on:click="toggleMarketPlace()" v-else>
                <strong>Back to Market Place</strong>
              </b-button>
            </b-col>
            <b-col cols="6" class="px-0">
              <b-button @click="displayUserChat">
                <strong>My Chat</strong>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

    <b-row v-if="displayMarketItems" class="m-0 main d-inline">
      <b-col>
        <b-card-group columns>
          <itemcard
            v-for="item in items"
            :key="item.iID"
            :item="item"
          ></itemcard>
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
    return {};
  },
  mounted() {
    this.checkSession();
  },
  methods: {
    getItems() {
      let url = `getItems.php`;
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
      let url = `getUserItems.php?useremail=${email}`;
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
      if (sessionStorage.getItem("userSession") != null) {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        console.log("user session is");
        this.$store.state["userInfo"] = userSession;
      }
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


@media only screen and (max-width: 426px){
  #feature-title{
    display: none;
  }
  #market-buttons{
    padding-bottom: 1rem;
  }
}
</style>
