<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center" class="px-2">
        <b-col md="2">
          <dashbar></dashbar>
        </b-col>
        <b-col id="feature-title">
          <h1 class="d-inline pt-4">Green Map</h1></b-col
        >
        <b-col md="2"></b-col>
      </b-row>
    </div>
    <div class="main">
      <gmap-map
        :center="{ lat: 1.406688, lng: 104.029381 }"
        :zoom="16"
        id="map"
        @click="setMarker"
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

            scaledSize: iconScaleSize,
          }"
        >
        </gmap-marker>
      </gmap-map>
      <p>{{ filter }}</p>
      <b-row>
        <b-col></b-col>
        <b-col cols="4">
          <b-container>
            <b-row>
              <b-col align-self="center">
                <b-button
                  :disabled="!isSelectedMarker"
                  variant="info"
                  v-b-modal="'create-event-form'"
                  >Create Event</b-button
                >
              </b-col>
              <b-col>
                <b-row>
                  <b-col>
                    <h4 class="text-left"><u>Filter Events</u></h4>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-left">
                    <b-form-checkbox
                      size="lg"
                      v-model="filter['giveAway']"
                      switch
                      @click="updateFilter('giveAway')"
                    >
                      Give Away
                    </b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-left">
                    <b-form-checkbox
                      size="lg"
                      v-model="filter['refill']"
                      switch
                      @click="updateFilter('giveAway')"
                    >
                      Buffet
                    </b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-left">
                    <b-form-checkbox
                      size="lg"
                      v-model="filter['food']"
                      switch
                      @click="updateFilter('giveAway')"
                    >
                      Refill Station
                    </b-form-checkbox>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
          <b-modal
            title="List New Event"
            id="create-event-form"
            centered
            hide-footer
          >
            <b-row>
              <b-col><p class="text-center">Marker Coordinates</p></b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  label="Latitude: "
                  label-for="latitude"
                  label-cols="2"
                >
                  <b-form-input
                    id="latitude"
                    disabled
                    v-model="createForm['lat']"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  label="Longitude: "
                  label-for="longitude"
                  label-cols="2"
                >
                  <b-form-input
                    id="longitude"
                    disabled
                    v-model="createForm['lng']"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group
              label="Location Description:"
              label-cols="4"
              label-for="descriptionInput"
            >
              <b-form-textarea
                v-model="createForm['description']"
                id="descriptionInput"
                placeholder="Briefly describe your event"
              >
              </b-form-textarea>
            </b-form-group>
            <b-form-group label="Start Time: " label-for="sDateTime">
              <b-form-input
                v-model="createForm['sDateTime']"
                type="datetime-local"
                id="sDateTime"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="End Time: " label-for="eDateTime">
              <b-form-input
                v-model="createForm['eDateTime']"
                type="datetime-local"
                id="eDateTime"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Event Type:" label-for="eType">
              <b-form-radio v-model="createForm['eType']" value="Buffet"
                >Buffet</b-form-radio
              >
              <b-form-radio v-model="createForm['eType']" value="Give Away"
                >Give Away</b-form-radio
              >
            </b-form-group>
            <b-form-group label="Telegram user ID" label-for="teleID">
              <b-form-input id="teleID"></b-form-input>
              <a href="https://t.me/Kampung_Spirit_bot">
                <b-img fluid :src="require(`../assets/telegram.svg`)"></b-img
              ></a>
            </b-form-group>
            <b-row v-if="createForm['eType'] == 'Buffet'">
              <b-col>
                <b-form-group>
                  <b-form-radio
                    name="isHalal"
                    value="1"
                    v-model="createForm['isHalal']"
                    >Halal</b-form-radio
                  >
                  <b-form-radio
                    value="0"
                    name="isHalal"
                    v-model="createForm['isHalal']"
                    >Non-Halal</b-form-radio
                  >
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Cusine Type:" label-for="cType">
                  <b-form-input
                    id="cType"
                    v-model="createForm['cType']"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <template>
              <b-row class="pb-2">
                <b-col class="pr-0"
                  ><b-button class=" w-100" variant="danger"
                    >Cancel</b-button
                  ></b-col
                >
                <b-col class="pl-1"
                  ><b-button
                    class="w-100"
                    variant="success"
                    @click="createEvent"
                    >Create</b-button
                  ></b-col
                >
              </b-row>
            </template>
            <b-alert :show="isCreateErrors" class="w-100" variant="warning">
              <ul>
                <li v-if="createForm['description'] == ''">
                  Event description cannot be empty
                </li>
                <li v-if="createForm['sDateTime'] == null">
                  Start date time cannot be empty
                </li>
                <li v-if="createForm['eDateTime'] == null">
                  End date time cannot be empty
                </li>
                <li v-if="createForm['eType'] == null">
                  Event type cannot be empty
                </li>
              </ul>
            </b-alert>
          </b-modal>
        </b-col>
        <b-col></b-col>
      </b-row>

      <!-- <b-container>
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
      </b-container> -->
    </div>
  </div>
</template>

<script>
import dashbar from "../components/Dashbar";
var axios = require("axios");
export default {
  components: {
    dashbar,
  },
  data() {
    return {
      filter: {
        giveAway: true,
        refill: true,
        food: true,
      },

      selectedMarker: {
        lat: null,
        lng: null,
      },
      isSelectedMarker: false,
      allLocations: {},
      isCreateErrors: false,
      createForm: {
        description: "",
        sDateTime: null,
        eDateTime: null,
        eType: null,
        isHalal: null,
        cType: null,
        lat: null,
        lng: null,
      },
      iconSize: { width: 60, height: 90, f: "px", b: "px" },
      iconScaleSize: { width: 30, height: 30, f: "px", b: "px" },
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
    createEvent() {
      this.isCreateErrors = false;
      if (this.createForm.description == "") {
        this.isCreateErrors = true;
      }
      if (this.createForm.sDateTime == null) {
        this.isCreateErrors = true;
      }
      if (this.createForm.eDateTime == null) {
        this.isCreateErrors = true;
      }
      if (this.createForm.eType == null) {
        this.isCreateErrors = true;
      }
      if (!this.isCreateErrors) {
        let url = `./database/createmarkers.php?email=${this.email}&locDesc=${this.createForm["description"]}&startDatetime=${this.createForm["sDateTime"]}&endDatetime=${this.createForm["eDateTime"]}&cuisineType=${this.createForm["cType"]}&halal=${this.createForm["isHalal"]}&latitude=${this.createForm["lat"]}&longitude=${this.createForm["lng"]}`;
        axios.post(url).then(() => {
          alert("marker added");
          this.$bvModal.hide("create-event-form");
        });
      } else {
        this.$bvModal.show("create-event-form");
      }
    },
    setMarker(data) {
      console.log(data);
      let latLng = data.latLng.toJSON();
      let newMarker = {
        type: "food",
        icon: "mapPin.svg",
        lat: latLng["lat"],
        lng: latLng["lng"],
        clickable: true,
        draggable: false,
      };
      this.isSelectedMarker = true;
      this.createForm["lat"] = latLng["lat"];
      this.createForm["lng"] = latLng["lng"];

      if (
        this.markers.length > 0 &&
        this.markers[this.markers.length - 1]["icon"] == "mapPin.svg"
      ) {
        this.markers.splice(-1, 1);
      }

      this.markers.push(newMarker);
    },
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
        allLocations: [],
      };

      this.markers = output.allLocations;
      this.allLocations = output;
    },
  },

  computed: {
    markers() {
      return this.$store.state.markers;
    },
    infoWindowPosition() {
      return {
        lat: this.activeMarker.lat,
        lng: this.activeMarker.lng,
      };
    },
    email() {
      return this.$store.state.userInfo.email;
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
