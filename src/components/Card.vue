<template>
  <b-card
    v-bind:title="cardObject.title"
    class="card-info h-100"
    v-on:click="renderFeature()"
  >
    <b-row>
      <b-col cols="">
        <b-img fluid :src="require(`../assets/${cardObject.img}`)"
      /></b-col>
      <hr class="w-100" />
      <b-col cols="12">
        <b-card-text
          v-for="description in cardObject.description"
          :key="description"
        >
          {{ description }}
        </b-card-text>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import postData from '../postData';
export default {
  props: ["cardObject"],
  data() {
    return {};
  },
  methods: {
    renderFeature() {
      let selectedName = this.cardObject.dashOption;
      alert(`Selected is ${selectedName}`);
      this.$store.state.dashOptions[selectedName].selected = true;
      if (selectedName == "marketplace") {
        this.getItems();
      }
      this.$router.push({ name: "Main" });
    },
    getItems() {
      let url = `getItems.php`;
      url = encodeURI(url);
      postData(url, this.renderItems);
    },
    renderItems(data) {
      console.log(JSON.parse(data));
      this.$store.state.items = JSON.parse(data);
    },
  },
  
};
</script>
<style lang="scss">
.card-info {
  cursor: pointer;
  transition: transform 0.3s linear;
  color: #1d295a;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
