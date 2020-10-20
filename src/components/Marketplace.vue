<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center">
        <b-col>
          <dashbar></dashbar>
        </b-col>
        <b-col cols="8">
          <h1 class="d-inline">
            {{
              this.$store.state.isDisplayMarketItems
                ? "Market Place"
                : "My Items"
            }}
          </h1>
        </b-col>
        <b-col md="">
          <b-row>
            <b-col>
              <b-button v-on:click="displayMyItems()" v-if="displayMarketItems">
                <strong>My Items</strong>
              </b-button>
              <b-button v-on:click="toggleMarketPlace()" v-else>
                <strong>Back to Market Place</strong>
              </b-button>
            </b-col>
            <b-col>
              <b-button>
                <a class="button-link" :href="`chatlobby.html?user=${email}`">
                  <strong>My Chat</strong>
                </a>
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
import dashbar from '../components/Dashbar';
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
      if (localStorage.getItem("userStorage")) {
        if (this.$store.state.isDisplayMarketItems) {
          this.getUserItems();
          this.$store.state.isDisplayMarketItems = !this.$store.state
            .isDisplayMarketItems;
        }
      } else if (!sessionStorage.getItem("userSession")) {
        alert("user has not logged in");
        this.$router.push({ name: "Login" });
      } else if (this.$store.state.isDisplayMarketItems) {
        this.getUserItems();
        this.$store.state.isDisplayMarketItems = !this.$store.state
          .isDisplayMarketItems;
      }
    },
    checkSession() {
      if (sessionStorage.getItem("userSession")) {
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
      let email;
      if (sessionStorage.getItem("userSession")) {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        email = userSession["email"];
      } else {
        email = "";
      }

      return email;
    },
  },
};
</script>
<style lang="scss"></style>
