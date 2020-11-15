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
      <gmap-map :center="currentPos" :zoom="16" id="map">
        <!-- @click='setMarker' for gmap-map if want to allow user to place marker on map -->
        <gmap-info-window
          :options="infoWindowOptions"
          :position="infoWindowPosition"
          :opened="infoWindowOpened"
          @closeclick="closeWindowMarker"
        >
          <b-modal
            :id="
              activeMarker['gaID'] == undefined
                ? `edit-marker-${activeMarker['bID']}`
                : `edit-marker-${activeMarker['gaID']}`
            "
            title="Edit Marker"
            hide-footer
            centered
          >
          <!-- terneray expression to return the values if the active marker ID is undefined -->
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
                    v-model="editForm['latitude']"
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
                    v-model="editForm['longitude']"
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
                v-model="editForm['postalcode']"
                placeholder=""
                id="pCode"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Location Description:"
              label-cols="4"
              label-for="descriptionInput"
            >
              <b-form-textarea
                v-model="editForm['locDesc']"
                id="descriptionInput"
                placeholder="E.g Void Deck, Residence Corner, Level 5 Lift Lobby"
              >
              </b-form-textarea>
            </b-form-group>
         
            <b-form-group
              label="End Time: "
              label-for="eDateTime"
              label-cols="3"
            >
              <b-form-input
                v-model="editForm['endDatetime']"
                type="datetime-local"
                id="eDateTime"
                :min="currentDateTime"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Event Type:" label-for="eventType">
              <b-form-radio-group
                id="eventType"
                :options="eventTypeRadio"
                v-model="editForm['type']"
                stacked
                disabled
              >
              </b-form-radio-group>
            </b-form-group>

            <b-row v-if="editForm['type'] == 'Buffet'">
              <b-col>
                <b-form-group
                  label="Cuisine Type:"
                  label-for="cType"
                  label-cols="4"
                >
                  <b-form-input
                    id="cType"
                    v-model="editForm['cuisineType']"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group>
                  <b-form-radio-group
                    :options="cuisineRadio"
                    v-model="editForm['halal']"
                    stacked
                    disabled
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row v-if="editForm['type'] == 'Give Away'">
              <b-col cols="12">
                <b-form-group label="Event Name: " label-cols="3">
                  <b-form-input
                    v-model="editForm['name']"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Items Description:" label-cols="4">
                  <b-form-textarea
                    v-model="editForm['itemDesc']"
                    placeholder=""
                    disabled
                  >
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col>
                <b-row>
                  <b-col cols="12" class="text-right">
                    <p id="tele-text">
                      <i>Click this if you don't know your ID</i>
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" class="text-right">
                    <b-img
                      fluid
                      class="pr-1"
                      :src="require(`../assets/arrow.svg`)"
                    ></b-img>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="10">
                <b-form-group
                  label="Telegram user ID: (Number only)"
                  label-for="teleID"
                  label-cols="5"
                >
                  <b-form-input
                    id="teleID"
                    v-model="editForm['telegramid']"
                    placeholder="Optional"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="text-right">
                <span id="tooltip-tele" @click="telegram">
                  <b-img fluid :src="require(`../assets/telegram.svg`)"></b-img>
                </span>
              </b-col>
            </b-row>

            <!-- <b-tooltip target="tooltip-tele">
                    Click this to get your Telegram user ID
                  </b-tooltip> -->

            <template>
              <b-row class="pb-2">
                <b-col class="pr-0"
                  ><b-button
                    class=" w-100"
                    variant="danger"
                    @click="
                      $bvModal.hide(
                        activeMarker['gaID'] == undefined
                          ? `edit-marker-${activeMarker['bID']}`
                          : `edit-marker-${activeMarker['gaID']}`,
                      )
                    "
                    >Cancel</b-button
                  ></b-col
                >
                <b-col class="pl-1"
                  ><b-button
                    class="w-100"
                    variant="success"
                    @click="updateMarker"
                  >
                    <div v-if="!isLoading">Update</div>
                    <b-spinner v-else label="spinner"></b-spinner> </b-button
                ></b-col>
              </b-row>
            </template>
            <b-alert :show="isCreateErrors" class="w-100" variant="warning">
              <ul>
                 <li v-if="editForm['postalcode'] == ''">
                        Postal code cannot be empty
                      </li>
                <li v-if="editForm['locDesc'] == ''">
                  Event description cannot be empty
                </li>
                
                <li v-if="editForm['endDatetime'] == null">
                  End date time cannot be empty
                </li>
                <li v-if="editForm['type'] == null">
                  Event type cannot be empty
                </li>
                <li v-if="isNumber">
                  Telegram ID must be a number
                </li>
                <li
                  v-if="
                    editForm['type'] == 'Buffet' && editForm['halal'] == null
                  "
                >
                  Food is Halal or Non-Halal is required
                </li>
                <li
                  v-if="
                    editForm['type'] == 'Buffet' &&
                      editForm['cuisineType'] == null
                  "
                >
                  Cuisine type is required
                </li>
                <li
                  v-if="
                    editForm['type'] == 'Give Away' && editForm['name'] == ''
                  "
                >
                  Give away event name is required
                </li>
                <li
                  v-if="
                    editForm['type'] == 'Give Away' &&
                      editForm['itemDesc'] == ''
                  "
                >
                  Give away event description is required
                </li>
              </ul>
            </b-alert>
          </b-modal>
          <b-modal
            centered
            :id="
              activeMarker['gaID'] == undefined
                ? `delete-marker-confirm-${activeMarker['bID']}`
                : `delete-marker-confirm-${activeMarker['gaID']}`
            "
            cancel-variant="danger"
            ok-title="Delete"
            ok-variant="success"
            @ok="deleteMarker"
          >
            <h4 class="text-center">Confirm delete marker?</h4>
          </b-modal>
          <div>
            <b-container fluid class="marker-info">
              <b-row>
                <b-col class="py-2 text-left">
                  <p
                    v-if="
                      activeMarker['type'] == 'Buffet' ||
                        activeMarker['type'] == 'Give Away'
                    "
                  >
                    <strong>Location Description: </strong
                    >{{ activeMarker.locDesc }}
                  </p>
                  <div v-if="activeMarker['type'] == 'Give Away'">
                    <p><strong>Event Name: </strong>{{ activeMarker.name }}</p>
                    <p>
                      <strong>Item Description: </strong>
                      {{ activeMarker.itemDesc }}
                    </p>
                  </div>

                  <p
                    v-if="
                      activeMarker['telegramid'] != null &&
                        activeMarker['telegramid'] != '0'
                    "
                  >
                    <strong>Organiser Telegram ID: </strong
                    >{{ activeMarker.telegramid }}
                  </p>
                  <p v-if="activeMarker['cuisineType'] != null">
                    <strong>Cuisine type: </strong
                    >{{ activeMarker.cuisineType }}
                  </p>
                  <p v-if="activeMarker['halal'] != null">
                    <strong>Halal: </strong
                    >{{ activeMarker.halal == 1 ? "Halal" : "Non-Halal" }}
                  </p>
                  <p v-if="activeMarker['endDatetime'] != null">
                    <strong>Event end date: </strong
                    >{{ activeMarker.endDatetime }}
                  </p>
                  <p v-if="activeMarker['endDatetime'] != null">
                    <strong>Time left: </strong> {{ activeMarker.hours }} Hours
                    {{ activeMarker.minutes }} Minutes
                  </p>
                  <p v-if="activeMarker['type'] == 'refill'">
                    <strong>Refill Station</strong>
                  </p>
                </b-col>
              </b-row>
            </b-container>
            <b-row>
              <b-col>
                <b-button
                  class="w-100"
                  variant="info"
                  @click="
                    getDirections(
                      activeMarker['latitude'],
                      activeMarker['longitude'],
                    )
                  "
                  >Get Directions</b-button
                >
              </b-col>
            </b-row>
            <hr v-if="email == activeMarker['host']" />
            <b-row v-if="email == activeMarker['host']" class="my-2">
              <b-col>
                <b-button
                  variant="danger"
                  class="w-100"
                  @click="
                    deletMarkerConfirm(
                      activeMarker['gaID'] == undefined
                        ? `delete-marker-confirm-${activeMarker['bID']}`
                        : `delete-marker-confirm-${activeMarker['gaID']}`,
                    )
                  "
                >
                  Delete Marker
                </b-button>
              </b-col>
              <b-col>
                <b-button
                  variant="primary"
                  class="w-100"
                  @click="
                    showEditMarkerForm(
                      activeMarker['gaID'] == undefined
                        ? `edit-marker-${activeMarker['bID']}`
                        : `edit-marker-${activeMarker['gaID']}`,
                    )
                  "
                >
                  Edit Marker
                </b-button>
              </b-col>
            </b-row>
          </div>
        </gmap-info-window>
        <div v-for="marker in markers" :key="marker.latitude">
          <gmap-marker
            v-if="checkDateTime(marker)"
            :position="
              filter[marker['type']]
                ? {
                    lat: parseFloat(marker.latitude),
                    lng: parseFloat(marker.longitude),
                  }
                : null
            "
            :clickable="true"
            :draggable="false"
            @click="setActiveMarker(marker)"
            :icon="{
              url: require(`../assets/${marker.mimage}`),

              scaledSize: iconScaleSize,
            }"
          >
          </gmap-marker>
          <!-- Image references:
          https://www.flaticon.com/free-icon/chicken_933245?term=fried%20chicken&page=1&position=22
          https://www.flaticon.com/free-icon/picnic_3380781?term=bread%20basket&page=1&position=80
          https://www.flaticon.com/free-icon/water_1582023?term=water%20droplet&page=1&position=21 -->
        </div>
      </gmap-map>

      <b-row class="m-2">
        <b-col></b-col>
        <b-col lg="6" class="filter p-2">
          <b-row>
            <b-col>
              <h4><u>Current Weather</u></h4>
              <b-img
                v-if="weather.img != ''"
                id="weather-img"
                fluid
                :src="require(`../assets/${weather.img}.svg`)"
              ></b-img>
              <!-- Image reference:
              https://www.amcharts.com/free-animated-svg-weather-icons/ -->
              <p class="weather-description">
                <strong>{{ weather.description }}</strong>
              </p>
              <b-row>
                <b-col class="text-center">
                  <p class="weather-text">
                    <strong>{{ weather.temperature }}&#176;C</strong>
                  </p></b-col
                >
                <b-col class="text-center"
                  ><p class="weather-text">
                    <strong>{{ weather.humidity }}%RH</strong>
                  </p></b-col
                >
              </b-row>
            </b-col>

            <b-col class="text-center">
              <b-row align-v="center">
                <b-col>
                  <h4><u>Filter</u></h4>
                </b-col>
              </b-row>
              <b-row class="p-2">
                <b-col md="12" class="p-2">
                  <b-form-checkbox
                    size="lg"
                    v-model="filter['Give Away']"
                    switch
                    @click="updateFilter('Give Away')"
                  >
                    Give Away
                  </b-form-checkbox>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12" class="p-2">
                  <b-form-checkbox
                    size="lg"
                    v-model="filter['Buffet']"
                    switch
                    @click="updateFilter('Buffet')"
                  >
                    Buffet
                  </b-form-checkbox>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12" class="p-2">
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
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-row>
                <b-col align-self="center">
                  <b-button variant="info" @click="validateLogin" class="w-100"
                    >List Event</b-button
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
                      placeholder=""
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
                  <!-- <b-form-group
                    label="Start Time: "
                    label-for="sDateTime"
                    label-cols="3"
                  >
                    <b-form-input
                      v-model="createForm['sDateTime']"
                      type="datetime-local"
                      id="sDateTime"
                    ></b-form-input>
                  </b-form-group> -->
                  <b-form-group
                    label="End Time: "
                    label-for="eDateTime"
                    label-cols="3"
                  >
                    <b-form-input
                      v-model="createForm['eDateTime']"
                      type="datetime-local"
                      id="eDateTime"
                      :min="currentDateTime"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Event Type:" label-for="eType">
                    <b-form-radio v-model="createForm['eType']" value="Buffet"
                      >Buffet</b-form-radio
                    >
                    <b-form-radio
                      v-model="createForm['eType']"
                      value="Give Away"
                      >Give Away</b-form-radio
                    >
                  </b-form-group>

                  <b-row v-if="createForm['eType'] == 'Buffet'">
                    <b-col>
                      <b-form-group
                        label="Cuisine Type:"
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

                  <b-row v-if="createForm['eType'] == 'Give Away'">
                    <b-col cols="12">
                      <b-form-group label="Event Name: " label-cols="3">
                        <b-form-input
                          v-model="createForm['giveAwayName']"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12">
                      <b-form-group label="Items Description:" label-cols="4">
                        <b-form-textarea
                          v-model="createForm['giveAwayDescription']"
                          placeholder=""
                        >
                        </b-form-textarea>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="2"></b-col>
                    <b-col>
                      <b-row>
                        <b-col cols="12" class="text-right">
                          <p id="tele-text">
                            <i>Click this if you don't know your ID</i>
                          </p>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12" class="text-right">
                          <b-img
                            fluid
                            class="pr-1"
                            :src="require(`../assets/arrow.svg`)"
                          ></b-img>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="10">
                      <b-form-group
                        label="Telegram user ID: (Number only)"
                        label-for="teleID"
                        label-cols="5"
                      >
                        <b-form-input
                          id="teleID"
                          v-model="createForm['teleID']"
                          placeholder="Optional"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col class="text-right">
                      <span id="tooltip-tele" @click="telegram">
                        <b-img
                          fluid
                          :src="require(`../assets/telegram.svg`)"
                        ></b-img>
                      </span>
                    </b-col>
                  </b-row>

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
                          @click="createMarker"
                        >
                          <div v-if="!isLoading">Create</div>
                          <b-spinner
                            v-else
                            label="spinner"
                          ></b-spinner> </b-button
                      ></b-col>
                    </b-row>
                  </template>
                  <b-alert
                    :show="isCreateErrors"
                    class="w-100"
                    variant="warning"
                  >
                    <ul>
                      <li v-if="createForm['pCode'] == null">
                        Postal code cannot be empty
                      </li>
                      <li v-if="createForm['description'] == ''">
                        Event description cannot be empty
                      </li>
                 
                      <li v-if="createForm['eDateTime'] == null">
                        End date time cannot be empty
                      </li>
                      <li v-if="createForm['eType'] == null">
                        Event type cannot be empty
                      </li>
                      <li v-if="isNumber">
                        Telegram ID must be a number
                      </li>
                      <li
                        v-if="
                          createForm['eType'] == 'Buffet' &&
                            createForm['isHalal'] == null
                        "
                      >
                        Food is Halal or Non-Halal is required
                      </li>
                      <li
                        v-if="
                          createForm['eType'] == 'Buffet' &&
                            createForm.cType == null
                        "
                      >
                        Cuisine type is required
                      </li>
                      <li
                        v-if="
                          createForm['eType'] == 'Give Away' &&
                            createForm.giveAwayName == ''
                        "
                      >
                        Give away event name is required
                      </li>
                      <li
                        v-if="
                          createForm['eType'] == 'Give Away' &&
                            createForm.giveAwayDescription == ''
                        "
                      >
                        Give away event description is required
                      </li>
                    </ul>
                  </b-alert>
                </b-modal>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col></b-col>
      </b-row>
      <!-- <b-row>
        <b-col></b-col>
        <b-col>
          <b-button id="tooltip-tele2">Tooltip</b-button>
          <b-tooltip show target="tooltip-tele2">Will show</b-tooltip>
        </b-col>
        <b-col></b-col>
      </b-row> -->
    </div>
    <!-- <b-spinner
      v-else
      class="spinner-center"
      style="width: 5rem; height: 5rem"
      label="spinner"
      variant="success"
    ></b-spinner> -->
  </div>
</template>

<script>
import dashbar from "../components/Dashbar";
var axios = require("axios");
export default {
  created() {
    this.getMarkers();
  },
  mounted() {
    this.getCurrentLocation();
    this.getcurrentWeather();
  },
  components: {
    dashbar,
  },
  data() {
    return {
      show: true,
      currentPos: { lat: null, lng: null },
      filter: {
        "Give Away": true,
        refill: true,
        Buffet: true,
        marker: true,
      },
      weather: {
        img: "",
        temperature: null,
        humidity: null,
        description: null,
      },

      selectedMarker: {
        lat: null,
        lng: null,
      },

      allLocations: {},
      isCreateErrors: false,
      isEditErrors: false,
      createForm: {
        pCode: null,
        description: "",
        giveAwayName: "",
        giveAwayDescription: "",
        eDateTime: null,
        eType: null,
        isHalal: null,
        cType: null,
        lat: null,
        lng: null,
        teleID: null,
      },
      editForm: {
        pCode: null,
        description: "",
        giveAwayName: "",
        giveAwayDescription: "",
        eDateTime: null,
        eType: null,
        isHalal: null,
        cType: null,
        lat: null,
        lng: null,
        teleID: null,
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
    checkDateTime(marker) {
      if (marker.type == "refill") {
        return true;
      }
      let currentDate = new Date();
      let eventDateTime = new Date(marker["endDatetime"]);
      return eventDateTime > currentDate;
    },
    deleteMarker() {
      let url = `./database/deletebuffet.php?email=${this.activeMarker["host"]}&bid=${this.activeMarker["bID"]}`;
      if (this.activeMarker["type"] == "Give Away") {
        url = `./database/deletegiveaway.php?email=${this.activeMarker["host"]}&gaid=${this.activeMarker["gaID"]}`;
      }
     
      axios.post(url);
      this.$bvModal.hide(
        this.activeMarker["gaID"] == undefined
          ? `delete-marker-confirm-${this.activeMarker["bID"]}`
          : `delete-marker-confirm-${this.activeMarker["gaID"]}`,
      );
      this.infoWindowOpened = false;
      this.getMarkers();
    },
    deletMarkerConfirm(modal) {
      this.$bvModal.show(modal);
    },
    updateMarker() {
      this.isEditErrors = false;
      if (this.editForm["postalcode"] == "") {
        this.isCreateErrors = true;
      }
      if (this.editForm["locDesc"] == "") {
        this.isCreateErrors = true;
      }
      // if (this.createForm.sDateTime == null) {
      //   this.isCreateErrors = true;
      // }
      if (this.editForm["endDatetime"] == null) {
        this.isCreateErrors = true;
      }
      if (this.editForm["type"] == null) {
        this.isCreateErrors = true;
      }
      if (this.editForm["type"] == "Buffet" && this.editForm["halal"] == null) {
        this.isCreateErrors = true;
      }
      if (
        this.editForm["type"] == "Buffet" &&
        this.editForm["cuisineType"] == null
      ) {
        this.isCreateErrors = true;
      }
      if (this.editForm["type"] == "Give Away" && this.editForm["name"] == "") {
        this.isCreateErrors = true;
      }
      if (
        this.editForm["type"] == "Give Away" &&
        this.editForm["itemDesc"] == ""
      ) {
        this.isCreateErrors = true;
      }
      if (isNaN(this.editForm["telegramid"])) {
        this.isCreateErrors = true;
      }
      if (!this.isEditErrors) {
      
        var data;
        let key = "AIzaSyBum4Aau6RFj_MyiKFERdj5xKq812WJfVU";
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.editForm["postalcode"]}&key=${key}`;
      
        axios.get(url).then((response) => {
          if (response.data.results.length != 0) {
            data = response.data.results[0];
            this.editForm["latitude"] = data.geometry.location.lat;
            this.editForm["longitude"] = data.geometry.location.lng;
            this.currentPos = {
              lat: parseFloat(data.geometry.location.lat),
              lng: parseFloat(data.geometry.location.lng),
            };
            url = `./database/editbuffet.php?email=${this.editForm["host"]}&bid=${this.editForm["bID"]}&locdescription=${this.editForm["locDesc"]}&latitude=${this.editForm["latitude"]}&longitude=${this.editForm["longitude"]}&endtime=${this.editForm["endDatetime"]}&cusinetype=${this.editForm["cuisineType"]}&halalstatus=${this.editForm["halal"]}&pcode=${this.editForm["postalcode"]}`;
            if (this.editForm["type"] == "Give Away") {
              url = `./database/editgiveaway.php?email=${this.editForm["host"]}&gaid=${this.editForm["gaID"]}&locdescription=${this.editForm["locDesc"]}&latitude=${this.editForm["latitude"]}&longitude=${this.editForm["longitude"]}&endtime=${this.editForm["endDatetime"]}&eventname=${this.editForm["name"]}&itemdesc=${this.editForm["itemDesc"]}&pcode=${this.editForm["postalcode"]}`;
            }
           
            url = encodeURI(url);
            axios.post(url).then(() => {
              this.$bvModal.hide(
                this.activeMarker["gaID"] == undefined
                  ? `edit-marker-${this.activeMarker["bID"]}`
                  : `edit-marker-${this.activeMarker["gaID"]}`,
              );
              this.editForm = {};
              this.getMarkers();
              this.infoWindowOpened = false;
            });
          }
        });
      }
    },
    showEditMarkerForm(modal) {
      let markerInfoObj = {};
      for (var property in this.activeMarker) {
        markerInfoObj[property] = this.activeMarker[property];
      }

      this.editForm = markerInfoObj;
      this.editForm["latitude"] = parseFloat(this.editForm["latitude"]);
      this.editForm["longitude"] = parseFloat(this.editForm["longitude"]);
      this.editForm["telegramid"] =
        this.editForm["telegramid"] == "0" ? "" : this.editForm["telegramid"];

      this.$bvModal.show(modal);
    },
    toggleLoading() {
      this.$store.commit('toggleLoading');
    },
    telegram() {
      let url = `https://t.me/kampung_spirit_bot`;
      window.open(url);
    },
    validateLogin() {
      if (this.$store.state.userInfo.isLogin) {
        this.$bvModal.show("create-event-form");
      } else {
        this.$router.push({ name: "Login" });
      }
    },
    getcurrentWeather() {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=59c4666c81f49ccae94014d00279149e&units=metric`;
      axios.get(url).then((response) => {
        let data = response.data;
       
        this.weather["description"] = data.weather[0]["description"];

        this.weather["temperature"] = data.main["temp"].toFixed(1);
        this.weather["humidity"] = data.main["humidity"];
        if (data.weather[0]["main"] == "Rain") {
          this.weather.img = "rainy";
        } else if (data.weather[0]["main"] == "Clouds") {
          let currentTime = new Date().getHours();
        
          if (currentTime > 19 || currentTime < 7) {
            this.weather.img = "cloudy-moon";
          } // if the weather is cloudy and is already past sunset
          else {
            this.weather.img = "cloudy-sun";
          } // if the weather is cloudy and is before sunset
        } else if (data.weather[0]["main"] == "Clear") {
          this.weather.img = "clear";
        } else {
          this.weather.img = "cloudy";
        }
      });
    },
    getDirections(lat, lng) {
      let url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url);
    },
    getMarkers() {
      let url = `./database/getgiftaway.php`;
      let allMarkers = [];
      axios.get(url).then((response) => {
        allMarkers = allMarkers.concat(response.data);
        url = `./database/getbuffet.php`;
        axios.get(url).then((response) => {
          allMarkers = allMarkers.concat(response.data);
          url = `./database/getwatercooler.php`;
          axios.get(url).then((response) => {
            allMarkers = allMarkers.concat(response.data);
            // allMarkers.forEach(marker=>{
            //   marker.clickable = true;
            //   marker.draggable = false;
            // })
            this.$store.state.markers = allMarkers;
        
          });
        });
      });
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // this.createForm['lat'] = pos.lat;
        // this.createForm['lng'] = pos.lng;
        this.currentPos = pos;
      });
    },
    resetFields() {
      this.createForm = {
        pCode: null,
        description: "",
        giveAwayName: "",
        giveAwayDescription: "",

        eDateTime: null,
        eType: null,
        isHalal: null,
        cType: null,
        lat: null,
        lng: null,
        teleID: "",
      };
    },
    createMarker() {
      this.isCreateErrors = false;
      if (this.createForm.pCode == "") {
        this.isCreateErrors = true;
      }
      if (this.createForm.description == "") {
        this.isCreateErrors = true;
      }
      // if (this.createForm.sDateTime == null) {
      //   this.isCreateErrors = true;
      // }
      if (this.createForm.eDateTime == null) {
        this.isCreateErrors = true;
      }
      if (this.createForm.eType == null) {
        this.isCreateErrors = true;
      }
      if (
        this.createForm.eType == "Buffet" &&
        this.createForm.isHalal == null
      ) {
        this.isCreateErrors = true;
      }
      if (this.createForm.eType == "Buffet" && this.createForm.cType == null) {
        this.isCreateErrors = true;
      }
      if (
        this.createForm.eType == "Give Away" &&
        this.createForm.giveAwayName == ""
      ) {
        this.isCreateErrors = true;
      }
      if (
        this.createForm.eType == "Give Away" &&
        this.createForm.giveAwayDescription == ""
      ) {
        this.isCreateErrors = true;
      }
      if (isNaN(this.createForm.teleID)) {
        this.isCreateErrors = true;
      }
      if (!this.isCreateErrors) {
        this.toggleLoading();
        var data;
        let key = "AIzaSyBum4Aau6RFj_MyiKFERdj5xKq812WJfVU";
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.createForm["pCode"]}&key=${key}`;
        axios.get(url).then((response) => {
        
          if (response["status"] == 200) {
            if (response.data.results.length != 0) {
              data = response.data.results[0];
            
              this.createForm["lat"] = data.geometry.location.lat;
              this.createForm["lng"] = data.geometry.location.lng;
              this.currentPos = {
                lat: parseFloat(data.geometry.location.lat),
                lng: parseFloat(data.geometry.location.lng),
              };
              if (this.createForm["eType"] == "Buffet") {
                url = `./database/buffetmarker.php?email=${this.email}&locDesc=${this.createForm["description"]}&endDatetime=${this.createForm["eDateTime"]}&cuisineType=${this.createForm["cType"]}&halal=${this.createForm["isHalal"]}&latitude=${this.createForm["lat"]}&longitude=${this.createForm["lng"]}&telegramid=${this.createForm["teleID"]}&pcode=${this.createForm["pCode"]}`;
              } else {
                url = `./database/giveawaymarker.php?giveawayname=${this.createForm["giveAwayName"]}&locDesc=${this.createForm["description"]}&endDatetime=${this.createForm["eDateTime"]}&itemdesc=${this.createForm["giveAwayDescription"]}&email=${this.email}&latitude=${this.createForm["lat"]}&longitude=${this.createForm["lng"]}&telegramid=${this.createForm["teleID"]}&pcode=${this.createForm["pCode"]}`;
              }
              axios.post(url).then(() => {
                setTimeout(() => {
                  this.toggleLoading();
                  this.resetFields();
                
                  this.$bvModal.hide("create-event-form");
                  this.getMarkers();
                }, 2000);
              });
            } else {
              this.toggleLoading();
            }
          }
        });
      }
      //else {
      //   this.$bvModal.show("create-event-form");
      // }
    },
    setMarker(data) {
     
      let latLng = data.latLng.toJSON();

      let newMarker = {
        type: "marker",
        mimage: "mapPin.svg",
        latitude: latLng["lat"],
        longitude: latLng["lng"],
        clickable: true,
        draggable: false,
      };
      this.isSelectedMarker = true;
      this.createForm["lat"] = latLng["lat"];
      this.createForm["lng"] = latLng["lng"];
     

      if (
        this.markers.length > 0 &&
        this.markers[this.markers.length - 1]["mimage"] == "mapPin.svg"
      ) {
        this.markers.splice(-1, 1);
      }

      this.markers.push(newMarker);
    },
    setActiveMarker(place) {
      let today = new Date();
      var endDatetime = new Date(place["endDatetime"]);
      var diffTime = Math.abs(endDatetime - today);
      var hours = diffTime / (1000 * 60 * 60);
      var minutes = hours - Math.floor(hours);
      minutes = minutes * 60;
      hours = Math.floor(hours);
      minutes = Math.floor(minutes);
      place.hours = hours;
      place.minutes = minutes;
      this.activeMarker = place;
      this.infoWindowOpened = true;
     
    },
    closeWindowMarker() {
      this.activeMarker = {};
      this.infoWindowOpened = false;
    },
    updateFilter(type) {
      if (type == "giveAway") {
        this.filter["Give Away"] = !this.filter["Give Away"];
      } else if (type == "refill") {
        this.filter.refill = !this.filter.refill;
      } else {
        this.filter["Buffet"] = !this.filter["Buffet"];
      }
      this.updateMarkers();
    },
    updateMarkers() {
      var output = [];
      for (var type in this.filter) {
        if (this.filter[type] && type == "Give Away") {
          output = output.concat(this.allLocations.giveAway);
        } else if (this.filter[type] && type == "refill") {
          output = output.concat(this.allLocations.refill);
        } else if (this.filter[type] && type == "Buffet") {
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
    currentDateTime() {
      let date = new Date();
      let hours = date.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      let dateString = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}T${hours}:${date.getMinutes()}`;
      return dateString;
    },
    cuisineRadio() {
      return this.$store.state.cuisineRadio;
    },
    eventTypeRadio() {
      return this.$store.state.markerEventTypeRadio;
    },
    isLoading() {
      return this.$store.state.isSpinner;
    },
    isNumber() {
      return isNaN(this.createForm["teleID"]);
    },
    markers() {
      return this.$store.state.markers;
    },
    infoWindowPosition() {
      return {
        lat: parseFloat(this.activeMarker.latitude),
        lng: parseFloat(this.activeMarker.longitude),
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
.marker-info {
  font-size: 1rem;
}
#weather-img {
  width: 40%;
}
.weather-text {
  font-size: 1.6rem;
}
.weather-description {
  font-size: 1.3rem;
}
// .tooltip{
//   display: absolute !important;
//   z-index: 2000;
// }
#tooltip-tele {
  cursor: pointer;
}
#tele-text {
  color: #f37777;
}
@media only screen and (max-width: 425px) {
  .custom-control-label {
    font-size: 1rem !important;
  }
  .weather-text {
    font-size: 1rem;
  }
}
</style>
