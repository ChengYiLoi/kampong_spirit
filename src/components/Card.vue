<template>
  <b-card v-bind:title="cardObject.title" class="card-info h-100">
    <b-row>
      <b-col cols="">
        <b-img
          fluid
          :src="require(`../assets/${cardObject.img}`)"
          
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
export default {
  props: ["cardObject"],
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.card-info {
  transition: transform 0.3s linear;
  color: #1D295A;
  &:hover {
    transform: scale(1.05);
  }

}
</style>
