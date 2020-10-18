<template>
  <b-container fluid>
    <b-row class="pt-2">
      <b-col></b-col>
      <b-col cols="2">
        <b-button class="w-100 d-block mx-auto">Add new Item</b-button>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-group columns>
          <itemcard v-for="item in userItems" :key="item.iID" :item="item"></itemcard>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import itemcard from "./ItemCard";
export default {
  components: {
    itemcard,
  },
  data() {
    return {};
  },
  computed: {
    userItems() {
      console.log(this.$store.state.userItems);
      return this.$store.state.userItems;
    },
  },
};
</script>
<style lang="scss"></style>
