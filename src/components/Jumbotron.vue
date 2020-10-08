<template>
  <div>
    <b-jumbotron class="text-left mb-0 pb-2">
      <b-row class="pb-5">
        <b-col cols="12">
          <h1 class="display-4">Reducing waste has never been easier</h1>

        </b-col>
        <b-col cols="4">
          <b-button-group vertical>
            <router-link to="/login">
              <button variant="info" class="my-2 jumbo-button">
                Discover now
              </button>
            </router-link>

            <a
              href="#features"
              class="my-2 jumbo-button text-center"
              v-smooth-scroll
            >
              View Features
            </a>
          </b-button-group>
        </b-col>
      </b-row>
     
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
$hover-blue: #5bb7de;
.jumbo-button {
  min-width: 350px;
  font-size: 1.75rem;
  border-radius: 10px;
  border: unset;
  background-color: #f4976c;
  color: white !important;
  padding: 8px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.35);
  transition: background-color 0.3s linear;

  &:hover {
    background-color: $hover-blue;
    text-decoration: none;
  }
}
.jumbotron {
  background-color: #6cc49a !important;
  border-radius: unset !important;
  color: white;
  height: 92vh;
  background-image: url(../assets/jumbo_640.gif);
  background-repeat: no-repeat;
  background-position: 98% 50%;
  background-size: 50% 100%;
}

#arrow {
  color: #ff5100;
  width: 100%;
  transition: color 0.3s linear;
  &:hover {
    color: $hover-blue;
  }
}
</style>
