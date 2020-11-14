<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center" class="px-2">
        <b-col lg="3">
          <dashbar></dashbar>
        </b-col>
        <b-col id="feature-title">
          <h1>{{ isDisplayUserEvents ? "My Events" : "Events" }}</h1>
        </b-col>
        <b-col lg="3" class="responsive-col">
          <b-button
            @click="displayCreateEventForm"
            v-if="isAdmin"
            variant="info"
            class="w-100"
            ><strong>Create Event</strong></b-button
          >
          <b-button
            variant="info"
            class="responsive-event-button"
            @click="displayUserEvents"
            v-else
            ><strong>{{
              isDisplayUserEvents ? "View All Events" : "My Events"
            }}</strong></b-button
          >
        </b-col>
      </b-row>
    </div>
    <div v-if="!isLoading">
      <div v-if="accType == 'User'">
        <b-carousel :interval="4000">
          <b-carousel-slide>
            <template #img>
              <b-img fluid :src="require('../assets/carousel-1.png')"></b-img>
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <b-img fluid :src="require('../assets/carousel-2.png')"></b-img>
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <b-img fluid :src="require('../assets/carousel-3.png')"></b-img>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <b-row class="pt-2">
        <b-col></b-col>
        <b-col>
          <b-dropdown text="Filter" offset="-35">
            <div class="p-2">
              <b-form-checkbox v-model="filter['Jan']">
                January
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Feb']">
                February
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Mar']">
                March
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Apr']">
                April
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['May']">
                May
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Jun']">
                June
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Jul']">
                July
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Aug']">
                August
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Sep']">
                September
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Oct']">
                October
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Nov']">
                November
              </b-form-checkbox>
              <b-form-checkbox v-model="filter['Dec']">
                December
              </b-form-checkbox>
            </div>
          </b-dropdown>
        </b-col>
        <b-col></b-col>
      </b-row>
      <userevents v-if="isDisplayUserEvents"></userevents>
      <div class="p-0" v-else>
        <!-- <b-table
        v-if="isAdmin"
        table-variant="light"
        head-variant="dark"
        hover
        striped
        selectable
        select-mode="single"
        stacked="md"
        :items="events"
        @row-selected="updateSelectedEvent"
      >
      </b-table> -->
        <b-row class="p-2">
          <b-col>
            <b-card-group columns>
              <div v-for="event in events" :key="event.eventID">
                <eventcard
                  v-if="filter[getMonth(event)]"
                  :eventInfo="event"
                ></eventcard>
              </div>
            </b-card-group>
          </b-col>
        </b-row>

        <b-modal
          id="confirm-cancel"
          size="sm"
          ok-title="Confirm"
          ok-variant="success"
          cancel-variant="danger"
          hide-header
          centered
          @ok="cancelEvent"
        >
          <p class="text-center">
            <strong>Confirm cancel {{ eventInfo["title"] }}?</strong>
          </p>
        </b-modal>

        <eventcreateform></eventcreateform>

        <!-- <b-modal
        id="create-event-form"
        size="lg"
        title="Create New Event"
        hide-footer
        button-size="lg"
      >
        <b-form class="modal-info p-3">
          <b-form-group label="Event Name:" label-for="eTitle">
            <b-form-input v-model="eventTitle" id="eTitle" type="text">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Event Description:" label-for="eDescription">
            <b-form-textarea v-model="eDescription" id="eDescription">
            </b-form-textarea>
          </b-form-group>
          <b-row>
            <b-col>
              <b-form-group label="Location:" label-for="location">
                <b-form-input v-model="location" id="location" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group label="Postal Code:" label-for="pCode">
                <b-form-input v-model="pCode" id="pCode" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                label="Maximum Participants:"
                label-for="mParticipants"
              >
                <b-form-input
                  v-model="mParticipants"
                  id="mParticipants"
                  type="number"
                  min="0"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Green Points Reward:" label-for="gPoints">
                <b-form-input
                  v-model="gPoints"
                  id="gPoints"
                  type="number"
                  min="0"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-row>
                <b-col>
                  <b-form-group label="Event Type:" label-for="eventType">
                    <b-form-input v-model="eventType" id="eType" type="text">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group label="Start Date Time:" label-for="sDateTime">
                <b-form-input
                  v-model="sDateTime"
                  id="sDateTime"
                  type="datetime-local"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="End Date Time:" label-for="eDateTime">
                <b-form-input
                  v-model="eDateTime"
                  id="eDateTime"
                  type="datetime-local"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
        <b-alert :show="isCreateErrors" class="w-100" variant="warning">
          <ul>
            <li v-if="eventTitle == ''">Event name cannot be empty</li>
            <li v-if="eDescription == ''">Event description cannot be empty</li>
            <li v-if="location == ''">Event location cannot be empty</li>
            <li v-if="pCode == ''">Event postal code cannot be empty</li>
            <li v-if="mParticipants == ''">
              Maximum event participants code cannot be empty
            </li>
            <li v-if="eventType == ''">Event type cannot be empty</li>
            <li v-if="sDateTime == ''">
              Event start date time cannot be empty
            </li>
            <li v-if="eDateTime == ''">Event end date time cannot be empty</li>
          </ul>
        </b-alert>
        <template>
          <b-row class="pb-2">
            <b-col class="pr-0"
              ><b-button class=" w-100" variant="danger"
                >Cancel</b-button
              ></b-col
            >
            <b-col class="pl-1"
              ><b-button class="w-100" variant="success" @click="createNewEvent"
                >Create</b-button
              ></b-col
            >
          </b-row>
        </template>
      </b-modal> -->
      </div>
    </div>
    <b-spinner
      v-else
      class="spinner-center"
      style="width: 5rem; height: 5rem"
      label="spinner"
      variant="success"
    ></b-spinner>
  </div>
</template>
<script>
import eventcreateform from "../components/EventCreateForm";
import dashbar from "../components/Dashbar";
import userevents from "../components/UserEvents";
import eventcard from "../components/eventCard";
var axios = require("axios");
export default {
  mounted() {
    // this.getAllEvents();
  },
  components: {
    eventcreateform,
    dashbar,
    userevents,
    eventcard,
  },
  data() {
    return {
      filter: {
        Jan: true,
        Feb: true,
        Mar: true,
        Apr: true,
        May: true,
        Jun: true,
        Jul: true,
        Aug: true,
        Sep: true,
        Oct: true,
        Nov: true,
        Dec: true,
      },
      // isCreateErrors: false,
      isEditErrors: false,
      isProcessing: false,
      eventInfo: {},

      selectedEvent: {},
      onModalShow: false,
      fields: {
        user: [
          {
            key: "title",
          },
          {
            key: "type",
          },
          {
            key: "startDatetime",
            label: "Start Date Time",
          },
          {
            key: "endDatetime",
            label: "End Date Time",
          },
          {
            key: "location",
          },
          {
            key: "pointsEarn",
            label: "Green Points",
          },
          {
            key: "numPart",
            label: "Number of Participants",
          },
        ],
      },
    };
  },
  methods: {
    toggleLoading() {
      this.$store.state.isSpinner = !this.$store.state.isSpinner;
    },
    displayCreateEventForm() {
      this.eventTitle = "";
      this.eDescription = "";
      this.location = "";
      this.pCode = "";
      this.mParticipants = "";
      this.gPoints = 0;
      this.eventType = "";
      this.sDateTime = "";
      this.eDateTime = "";
      this.$bvModal.show("create-event-form");
    },

    cancelEvent() {
      let url = `./database/join.php?eventID=${this.eventInfo["eventID"]}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
        alert("Event participants retrieved");
        console.log(result.data);
        this.eventParticipants = result.data;
        url = `./database/cancelled_event.php?eventID=${this.eventInfo["eventID"]}`;
        url = encodeURI(url);
        axios.post(url).then(() => {
          console.log(this.eventParticipants);
          let participants = this.eventParticipants;
          for (var participant in participants) {
            console.log(`email is ${participant["email"]}`);
            let email = participants[participant]["email"];
            url = `./database/update_cancel.php?email=${email}&eventID=${this.eventInfo["eventID"]}`;
            url = encodeURI(url);
            axios.get(url);
            url = `./database/cancelled_emailsend.php?email=${email}&title=${this.eventTitle}`;
            url = encodeURI(url);
            axios.get(url);
          }

          //  url = `cancelled_emailsend.php?email=${email}&title=${this.eventTitle}`;
          //  url = `update_cancel.php?email=${email}&eventID=${this.eventInfo['eventID']}`;
          //  axios.get(url).then(()=>{
          //  url = `update_cancel.php?email=${email}&eventID=${this.eventInfo['eventID']}`;
          //  axios.get(url);
        });
      });

      alert("Event has been cancelled");
      this.$bvModal.hide("edit-event-form");
      this.getAllEvents();
    },

    getAllEvents() {
      this.toggleLoading();
      let url = `./database/getAllEvents.php?email=${this.getUserEmail}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
        setTimeout(() => {
          this.toggleLoading();
          this.$store.state.events = result.data;
          console.log(result.data);
        }, 1800);

        url = `./database/getUserEvents.php?email=${this.getUserEmail}`;
        url = encodeURI(url);
        axios.get(url).then((result) => {
          this.$store.state.userEvents = result.data;
        }); // need to get events that the user has joined so cards will display "Already Joined Event"
      });
    },

    updateSelectedEvent(selectedEventInfo) {
      // this.selectedEvent = selectedEventInfo[0];
      alert("update fired");
      this.selectedEvent = {
        description: selectedEventInfo[0].description,
        endDatetime: selectedEventInfo[0].endDatetime,
        eventID: selectedEventInfo[0].eventID,
        image: selectedEventInfo[0].image,
        location: selectedEventInfo[0].location,
        maxcapacity: selectedEventInfo[0].maxcapacity,
        title: selectedEventInfo[0].title,
        numPart: selectedEventInfo[0].numPart,
        pointsEarn: selectedEventInfo[0].pointsEarn,
        postalCode: selectedEventInfo[0].postalCode,
        startDatetime: selectedEventInfo[0].startDatetime,
        type: selectedEventInfo[0].type,
      };
      console.log(this.selectedEvent);
      // this.eventInfo = selectedEventInfo[0];
      // this.eventTitle = selectedEventInfo[0].title;
      // this.eDescription = selectedEventInfo[0].description;
      // this.location = selectedEventInfo[0].location;
      // this.pCode = selectedEventInfo[0].postalCode;
      // this.mParticipants = selectedEventInfo[0].maxcapacity;
      // this.gPoints = selectedEventInfo[0].pointsEarn;
      // this.eventType = selectedEventInfo[0].type;

      this.isAdmin
        ? this.$bvModal.show("event-modal-admin")
        : this.$bvModal.show("event-modal-user");
    },
    displayUserEvents() {
      if (!this.isDisplayUserEvents) {
        this.toggleLoading();
        let url = `./database/getUserEvents.php?email=${this.getUserEmail}`;
        url = encodeURI(url);
        axios.get(url).then((result) => {
          setTimeout(() => {
            this.toggleLoading();

            this.$store.state.userEvents = result.data;
          }, 1800);
        });
      } else {
        this.getAllEvents();
      }
      this.$store.state.isDisplayUserEvents = !this.$store.state
        .isDisplayUserEvents;
    },
    getMonth(event) {
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var dateObj = new Date(event.startDatetime);
      var month = months[dateObj.getMonth()].toString();

      return month;
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isSpinner;
    },
    isDisplayUserEvents() {
      return this.$store.state.isDisplayUserEvents;
    },
    accType() {
      return this.$store.state.userInfo.acctype;
    },

    getUserEmail() {
      let email = "";
      if (sessionStorage.getItem("userSession") != null) {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        email = userSession["email"];
      }
      return email;
    },
    events() {
      // let output = [];
      let events = [];
      events = this.$store.state.events;
      console.log(events);

      return events;
    },
    isAdmin() {
      let boo = true;
      if (
        !this.$store.state.userInfo.isLogin ||
        this.$store.state.userInfo.acctype == "User"
      ) {
        boo = false;
      }
      return boo;
    },
    eventTypeRadio() {
      return this.$store.state.eventTypeRadio;
    },
  },
};
</script>
<style lang="scss">
.event-info {
  background-color: #e7e6e6;
  border-radius: 5px;
}
@media only screen and (max-width: 768px) {
  .responsive-event-button {
    width: 100%;
  }
  .responsive-col {
    padding: 0px;
  }
}
</style>
