<template>
  <div>
    <navbar :isAbout="false"></navbar>
    <b-container fluid class="about-container">
      <b-row>
        <b-col>
          <router-link id="back" to="/" tag="img" :src="require(`../assets/back.svg`)">
            <!-- <b-img :src="require(`../assets/back.svg`)"> </b-img> -->
          </router-link>
        </b-col>
      </b-row>
      <b-row align-v="center" class="h-75">
        <b-col class="mt-2">
          <b-container class="about-info px-5 py-3">
            <b-row>
              <b-col>
                <h1><u>About Us</u></h1>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <span
                  >Kampung Spirit is a platform for people that want to do their
                  part in fighting climate change by
                  <strong>reducing waste.</strong></span
                >
                <br /><br />
                <span
                  >As the yearly increase in wastage and limited wasteland size
                  in <strong>Semakau island</strong> is projected to be
                  <strong>full by 2035</strong>, Kampung Spirit aims to reduce
                  wastage in terms of providing users a platform to donate
                  unwanted items for others to reuse / recycle, minimze food
                  wastage by allowing others to consume the excess food (such as
                  buffet events).</span
                >
                <br /><br />
                <span
                  >Additionally, people that want to actively do that part in
                  minimizing the impacts of climate change as well as making
                  Singapore cleaner can do so with the
                  <strong>Green Map</strong>
                  which displays events such as cleanup events which provides
                  opportunities for people to bond together all while doing
                  something <strong>meaningful</strong> for the community and
                  the environment
                </span>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import navbar from "../components/Nav";
export default {
  components: {
    navbar,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.about-container {
  background-color: #6cc49a;
  min-height: 100vh;
  .about-info {
    background-color: #f1f3f6;
    border-radius: 10px;
    font-size: 1.8rem;
  }
}
#back{
    cursor: pointer;
}

@media only screen and (max-width: 768px) {
 .about-container  .about-info{
    font-size: 1.0rem;
  }
}
</style>
