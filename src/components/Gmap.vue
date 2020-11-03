<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center" class="px-2">
        <b-col lg="2">
          <dashbar></dashbar>
        </b-col>
        <b-col id="feature-title">
          <h1 class="d-inline pt-4">Green Map</h1></b-col
        >
        <b-col md="2"></b-col>
      </b-row>
    </div>
    <div class="main">
      <gmap-map :center="currentPos" :zoom="16" id="map" class="m-1">
        <gmap-info-window
          :options="infoWindowOptions"
          :position="infoWindowPosition"
          :opened="infoWindowOpened"
          @closeclick="closeWindowMarker"
        >
          <div>
            <h2>{{ activeMarker.type }}</h2>
            <b-button variant="info">Get Directions</b-button>
          </div>
        </gmap-info-window>
        <gmap-marker
          v-for="marker in markers"
          :key="marker.type"
          :position="
            filter[marker['type']] ? { lat: marker.lat, lng: marker.lng } : null
          "
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

      <b-row class="m-2">
        <b-col></b-col>
        <b-col lg="6" class="filter p-2">
          <b-row align-v="center">
            <b-col>
              <h4><u>Filter Events</u></h4>
            </b-col>
          </b-row>

          <b-row class="p-2">
            <b-col md="4" class="p-2">
              <b-form-checkbox
                size="lg"
                v-model="filter['giveAway']"
                switch
                @click="updateFilter('giveAway')"
              >
                Give Away
              </b-form-checkbox>
            </b-col>
            <b-col md="4" class="p-2">
              <b-form-checkbox
                size="lg"
                v-model="filter['food']"
                switch
                @click="updateFilter('food')"
              >
                Buffet
              </b-form-checkbox>
            </b-col>
            <b-col md="4" class="p-2">
              <b-form-checkbox
                size="lg"
                v-model="filter['refill']"
                switch
                @click="updateFilter('refill')"
              >
                Refill Station
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col align-self="center">
              <b-button variant="info" v-b-modal="'create-event-form'"
                >Create Event</b-button
              >
            </b-col>
            <b-modal
              title="List New Event"
              id="create-event-form"
              centered
              hide-footer
            >
              <b-row>
                <b-col>
                  <b-form-group
                    label="Latitude: "
                    label-for="latitude"
                    label-cols="2"
                    class="d-none"
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
                    class="d-none"
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
                label="Postal Code: "
                label-for="pCode"
                label-cols="3"
              >
                <b-form-input
                  v-model="createForm['pCode']"
                  id="pCode"
                ></b-form-input>
              </b-form-group>
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
              <b-form-group
                label="Start Time: "
                label-for="sDateTime"
                label-cols="3"
              >
                <b-form-input
                  v-model="createForm['sDateTime']"
                  type="datetime-local"
                  id="sDateTime"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="End Time: "
                label-for="eDateTime"
                label-cols="3"
              >
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

              <b-row v-if="createForm['eType'] == 'Buffet'">
                <b-col>
                  <b-form-group
                    label="Cusine Type:"
                    label-for="cType"
                    label-cols="4"
                  >
                    <b-form-input
                      id="cType"
                      v-model="createForm['cType']"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="4">
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
              </b-row>

              <b-row>
                <b-col cols="10">
                  <b-form-group
                    label="Telegram user ID: "
                    label-for="teleID"
                    label-cols="5"
                  >
                    <b-form-input id="teleID"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <span id="tooltip-tele">
                    <b-img
                      fluid
                      :src="require(`../assets/telegram.svg`)"
                    ></b-img>
                  </span>
                </b-col>
              </b-row>

              <b-tooltip target="tooltip-tele" triggers="hover" show>
                Click this to get your Telegram user ID
              </b-tooltip>

              <template>
                <b-row class="pb-2">
                  <b-col class="pr-0"
                    ><b-button
                      class=" w-100"
                      variant="danger"
                      @click="$bvModal.hide('create-event-form')"
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
          </b-row>
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
  mounted() {
    this.getCurrentLocation();
  },
  components: {
    dashbar,
  },
  data() {
    return {
      currentPos: { lat: 1.406688, lng: 104.029381 },
      filter: {
        giveAway: true,
        refill: true,
        food: true,
      },

      selectedMarker: {
        lat: null,
        lng: null,
      },

      allLocations: {},
      isCreateErrors: false,
      createForm: {
        pCode: null,
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
          width: 0,
          height: -35,
        },
      },
      activeMarker: {},
      infoWindowOpened: false,
    };
  },
  methods: {
    getCurrentLocation() {
      alert('getting current location');
      navigator.geolocation.getCurrentPosition((position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // this.createForm['lat'] = pos.lat;
        // this.createForm['lng'] = pos.lng;
        this.currentPos = pos;
      });
      this.resetFields();
    },
    resetFields() {
      alert("fields reset");
      this.createForm = {
        pCode: null,
        description: "",
        sDateTime: null,
        eDateTime: null,
        eType: null,
        isHalal: null,
        cType: null,
        lat: null,
        lng: null,
      };
    },
    createEvent() {
      this.isCreateErrors = false;
      if (this.createForm.pCode == "") {
        this.isCreateErrors = true;
      }
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
        var data;
        let key = "AIzaSyBum4Aau6RFj_MyiKFERdj5xKq812WJfVU";
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.createForm["pCode"]}&key=${key}`;
        axios.get(url).then((response) => {
          if (response["status"] == 200) {
            data = response.data.results[0];
            this.createForm["lat"] = data.geometry.location.lat;
            this.createForm["lng"] = data.geometry.location.lng;

            //  url = `./database/createmarkers.php?email=${this.email}&locDesc=${this.createForm["description"]}&startDatetime=${this.createForm["sDateTime"]}&endDatetime=${this.createForm["eDateTime"]}&cuisineType=${this.createForm["cType"]}&halal=${this.createForm["isHalal"]}&latitude=${this.createForm["lat"]}&longitude=${this.createForm["lng"]}`;
            // axios.post(url).then(() => {
            //   alert("marker added");
            //   this.$bvModal.hide("create-event-form");
            // });
          }
        });

        console.log(this.createForm["lat"]);
        console.log(this.createForm["lng"]);
        this.$bvModal.hide("create-event-form");
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
.filter {
  background-color: #eeeeee;
  border-radius: 10px;
}
</style>
