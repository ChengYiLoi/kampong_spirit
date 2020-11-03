<template>
  <b-container id="features" fluid class="pt-3">
    <h3 id="title" class="pb-4">Features</h3>
    <b-row class="justify-content-center px-md-5 px-0">
      <b-col v-for="cardObject in cardObjects" :key="cardObject.name" lg="4" class="w-100 my-xl-0 my-3">
        <!-- for loop that creates a card component based on the length of the cardObjects array -->
        <card :cardObject="cardObject"></card>
      </b-col>
   
    </b-row>
      <a id="arrow" href="#navbar" v-smooth-scroll>
            <i class="fas fa-chevron-up fa-5x"></i
          ></a>
  </b-container>
</template>

<script>
import card from "../components/Card";
export default {
  components: {
    card,
  },
  data() {
    return {
      word: "apple",
      cardObjects: [
        {
          title: "The Green Map",
          img: "map.svg",
          description: [
            "Discover any waste reduction events such as free buffet or giveaways",
          ],
          dashOption: 'map'
        },
        {
          title: "Join Clean-up Events",
          img: "team.svg",
          description: [
            "A well organised cleanup event provides the opportunity for participants to bond together all while do something meaningful for the community and the environment",
          ],
          dashOption: 'events'
        },
        {
          title: "Sharing is Caring",
          img: "trade.svg",
          description: [
            "Want to donate unwanted items to charities but are too lazy to make the travel?",
            "Trade or just donate with other users",
          ],
          dashOption: 'marketplace'
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#features {
  background-color: #acacac;
  
}
#title {
  color: #F1F3F6;
  font-size: 3.0rem;
  text-align: center;
  font-weight: bolder;
}
</style>
