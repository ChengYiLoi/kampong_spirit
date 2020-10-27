<template>
  <div id="full-height">
    <div id="banner">
      <h1 class="d-inline pt-4">Green Map</h1>
    </div>
    <div class="main">
      <gmap-map
        :center="{ lat: 1.406688, lng: 104.029381 }"
        :zoom="16"
        id="map"
      >
        <gmap-info-window
          :options="infoWindowOptions"
          :position="infoWindowPosition"
          :opened="infoWindowOpened"
          @closeclick="closeWindowMarker"
        >
          <div>
            <h2>{{ activeMarker.type }}</h2>
          </div>
        </gmap-info-window>
        <gmap-marker
          v-for="marker in markers"
          :key="marker.type"
          :position="{ lat: marker.lat, lng: marker.lng }"
          :clickable="marker.clickable"
          :draggable="marker.draggable"
          @click="setActiveMarker(marker)"
          :icon="{
            url: require(`../assets/${marker.icon}`),
            size: iconSize,
            scaledSize: iconScaleSize,
          }"
        >
        </gmap-marker>
      </gmap-map>
      <p>{{ filter }}</p>
      <b-container>
        <b-row>
          <b-col>
            <b-form-checkbox size="lg" v-model="filter['giveAway']" switch>
              Give Away
            </b-form-checkbox>
          </b-col>
          <b-col>
            <b-form-checkbox size="lg" v-model="filter['refill']" switch>
              Buffet
            </b-form-checkbox>
          </b-col>
          <b-col>
            <b-form-checkbox size="lg" v-model="filter['food']" switch>
              Refill Station
            </b-form-checkbox>
          </b-col>
        </b-row>
      </b-container>

      <b-container>
        <b-row>
          <b-col class="filter-info">
            <label for="giveAway">Give Away</label>
            <input
              id="giveAway"
              type="checkbox"
              checked
              v-on:click="updateFilter('giveAway')"
              class="ml-4"
            />
          </b-col>
          <b-col>
            <label for="refill">Refill Stations</label>
            <input
              id="refill"
              type="checkbox"
              checked
              v-on:click="updateFilter('refill')"
              class="ml-4"
            />
          </b-col>
          <b-col>
            <label for="food">Food</label>
            <input
              id="food"
              type="checkbox"
              checked
              v-on:click="updateFilter('food')"
              class="ml-4"
            />
          </b-col>
        </b-row>
      </b-container>

      <button v-on:click="getData()">Get Data</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      filter: {
        giveAway: true,
        refill: true,
        food: true,
      },
      markers: [],
      allLocations: {},
      iconSize: { width: 60, height: 90, f: "px", b: "px" },
      iconScaleSize: { width: 30, height: 45, f: "px", b: "px" },
      infoWindowOptions: {
        pixelOffset: {
          width: -15,
          height: -90,
        },
      },
      activeMarker: {},
      infoWindowOpened: false,
    };
  },
  methods: {
    setActiveMarker(place) {
      this.activeMarker = place;
      this.infoWindowOpened = true;
    },
    closeWindowMarker() {
      this.activeMarker = {};
      this.infoWindowOpened = false;
    },
    updateFilter(type) {
      if (type == "giveAway") {
        this.filter.giveAway = !this.filter.giveAway;
      } else if (type == "refill") {
        this.filter.refill = !this.filter.refill;
      } else {
        this.filter.food = !this.filter.food;
      }
      this.updateMarkers();
    },
    updateMarkers() {
      var output = [];
      for (var type in this.filter) {
        if (this.filter[type] && type == "giveAway") {
          output = output.concat(this.allLocations.giveAway);
        } else if (this.filter[type] && type == "refill") {
          output = output.concat(this.allLocations.refill);
        } else if (this.filter[type] && type == "food") {
          output = output.concat(this.allLocations.food);
        }
      }
      this.markers = output;
    },
    getData() {
      var output = {
        allLocations: [
          {
            type: "food",
            icon: "chicken.svg",
            lat: 1.406688,
            lng: 104.03,
            clickable: true,
            draggable: false,
          },
          {
            type: "refill",
            icon: "water.svg",
            lat: 1.406688,
            lng: 104.033,
            clickable: true,
            draggable: false,
          },
          {
            type: "giveAway",
            icon: "giveaway.svg",
            lat: 1.406688,
            lng: 104.035,
            clickable: true,
            draggable: false,
          },
        ],
        refill: [
          {
            type: "refill",
            icon: "water.svg",
            lat: 1.406688,
            lng: 104.033,
            clickable: true,
            draggable: false,
          },
        ],
        food: [
          {
            type: "food",
            icon: "chicken.svg",
            lat: 1.406688,
            lng: 104.03,
            clickable: true,
            draggable: false,
          },
        ],
        giveAway: [
          {
            type: "giveAway",
            icon: "giveaway.svg",
            lat: 1.406688,
            lng: 104.035,
            clickable: true,
            draggable: false,
          },
        ],
      };

      this.markers = output.allLocations;
      this.allLocations = output;
    },
  },

  computed: {
    infoWindowPosition() {
      return {
        lat: this.activeMarker.lat,
        lng: this.activeMarker.lng,
      };
    },
  },
};
</script>

<style lang="scss">
#map {
  height: 50vh;
}
.filter-info {
  font-size: 32px;
}
</style>
