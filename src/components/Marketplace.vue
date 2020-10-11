<template>
  <div class="h-100">
    <h1>markeetplace</h1>
    <b-row>
      <b-col> </b-col>
      <b-col>
        <p>my items</p>
      </b-col>
      <b-col>
          <button v-on:click="getData()">Get data</button>
      </b-col>
    </b-row>

    <b-row align-v="stretch" class="h-100">
      <b-col cols="12">
        <b-container fluid id="items" class="h-100 p-4">
          <b-row>
            <b-col cols="3" v-for="item in items" :key="item.id">
              <itemcard :item="item"></itemcard>
            </b-col>
          </b-row>
        </b-container>
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
      var comp = this;
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          alert("success");
          comp.renderItems(this.responseText);
          
        }
      };
      request.open("GET", url, true);
      request.send();
    },
    renderItems(data){
         return this.$store.state.items = JSON.parse(data);
    }
   
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
     
    
  },
};
</script>
<style lang="scss">
#items {
  background-color: #f1f3f6;
}
</style>
