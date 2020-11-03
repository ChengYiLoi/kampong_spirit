<template>
  <div>
    <b-jumbotron class="text-center text-lg-left mb-0 pb-2">
      <b-row>
        <b-col class="px-1">
          <h1 class="display-4">
            Reducing waste has never been easier
          </h1>
        </b-col>
      </b-row>
      <b-row class="pb-5">
        <b-col>
          <b-button-group vertical>
            <a
              href="#features"
              class="my-2 jumbo-button text-center"
              v-smooth-scroll
            >
              <strong>Features</strong>
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
  min-width: 250px;
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
  height: 100vh;
  background-image: url(../assets/jumbo_640.gif);
  background-repeat: no-repeat;
  background-position: 100%;
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

@media only screen and (max-width: 1025px) {
  .col > .display-4 {
    font-size: 3rem;
  }
}
@media only screen and (max-width: 768px){
  .jumbotron{
    background-image: unset;
  }
}
@media only screen and (max-width: 426px) {
  .jumbotron {
    background-image: unset;
    .col > .display-4 {
      text-align: center;
      font-size: 2rem;
    }
  }
}
</style>
