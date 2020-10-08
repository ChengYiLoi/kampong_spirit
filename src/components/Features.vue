<template>
  <b-container id="features" fluid class="pt-3">
    <h3 id="title" class="pb-4">Features</h3>
    <b-container fluid class="">
      <b-row class="justify-content-center">
        <b-col v-for="cardObject in cardObjects" :key="cardObject.name" md="3">
          <!-- for loop that creates a card component based on the length of the cardObjects array -->
          <card :cardObject="cardObject"></card>
        </b-col>
          <b-col cols="12" align-self="end">
          <b-container class="text-center mt-4">
            <a id="arrow" href="#navbar" v-smooth-scroll>
              <i class="fas fa-chevron-up fa-5x"></i
            ></a>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
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
        },
        {
          title: "Join or Create Community Clean-up Events",
          img: "team.svg",
          description: [
            "A well organised clean event provides the opportunity for participants to bond together all while do something meaningful for the community and the environment",
          ],
        },
        {
          title: "Sharing is Caring",
          img: "trade.svg",
          description: [
            "Want to donate unwanted items to charities but are too lazy to make the travel?",
            "Trade or just donate with other users",
          ],
        },
    
      ],
    };
  },
};
</script>

<style lang="scss">

#features {
  background-color: #ACACAC;
}
#title {
  color: whitesmoke;
  font-size: 52px;
}

@media screen and (min-width: 768px) {
  #features {
    height: 85vh;
  }
}
</style>
