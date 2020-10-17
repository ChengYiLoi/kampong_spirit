<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center">
        <b-col>
          <button v-on:click="getData()">Get data</button>
        </b-col>
        <b-col cols="8">
          <h1 class="d-inline">
            {{ this.$store.state.isMarketItems ? "Market Place" : "My Items" }}
          </h1>
        </b-col>
        <b-col>
          <b-button id="user-items" v-on:click="displayMyItems()">
            {{
              this.$store.state.isMarketItems
                ? "My Items"
                : "Back to Market Place"
            }}
          </b-button>
        </b-col>
      </b-row>
    </div>

    <b-row v-if="displayMarketItems" class="m-0 main">
      <b-col>
        <b-card-group columns>
          <itemcard
            v-for="item in items"
            :key="item.id"
            :item="item"
          ></itemcard>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <h1>my items</h1>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import itemcard from "../components/ItemCard";
export default {
  components: {
    itemcard,
  },
  data() {
    return {};
  },
  methods: {
    getData() {
      var request = new XMLHttpRequest();
      var url = `getItems.php`;
      var comp = this; //reference to this component because in the onreadystatechange can have only one this which is referencing the request
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          alert("success");
          comp.renderItems(this.responseText);
        }
      };
      request.open("POST", url, true);
      request.send();
    },
    renderItems(data) {
      return (this.$store.state.items = JSON.parse(data));
    },
    displayMyItems() {
      this.$store.state.isMarketItems = !this.$store.state.isMarketItems;
    },
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    displayMarketItems() {
      return this.$store.state.isMarketItems;
    },
  },
};
</script>
<style lang="scss">
#user-items {
  background-color: #6cc49a;
}
</style>
