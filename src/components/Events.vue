<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center" class="px-2">
        <b-col lg="2">
          <dashbar></dashbar>
        </b-col>
        <b-col id="feature-title">
          <h1>{{ isDisplayUserEvents ? "My Events" : "Events" }}</h1>
        </b-col>
        <b-col lg="2" class="responsive-col">
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
    <userevents v-if="isDisplayUserEvents"></userevents>
    <div class="p-0" v-else>
      <b-table
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
      </b-table>
      <div v-else>
        <eventcard v-for="event in events" :key="event.eventID"></eventcard>
      </div>

      <b-modal
        hide-footer
        id="event-modal-user"
        centered
        size="md"
        button-size="lg"
        :title="eventInfo['title']"
      >
        <!-- <h4 class="text-center">Confirm joining {{eventInfo['title']}}?</h4> -->
        <div class="event-info p-2">
          <p><strong>Type:</strong> {{ eventInfo.type }}</p>
          <p><strong>Description:</strong> {{ eventInfo.description }}</p>
          <p><strong>Location:</strong> {{ eventInfo.location }}</p>
          <p><strong>Postal Code:</strong> {{ eventInfo.postalCode }}</p>
          <p><strong>Start Date Time:</strong> {{ eventInfo.startDatetime }}</p>
          <p><strong>End Date Time:</strong> {{ eventInfo.endDatetime }}</p>
          <p>
            <strong>Green Points Reward:</strong> {{ eventInfo.pointsEarn }}
          </p>
          <p>
            <strong>Current Number of Participants Joined:</strong>
            {{ eventInfo.numPart }}
          </p>
          <p>
            <strong>Maximum Number of Participants:</strong>
            {{ eventInfo.maxcapacity }}
          </p>
          <p>
            <strong>Event Status:</strong>
            {{ eventInfo.status }}
          </p>

          <template>
            <b-row class="pb-2">
              <b-col
                ><b-button
                  class=" w-100"
                  variant="danger"
                  @click="$bvModal.hide('event-modal-user')"
                  >{{
                    checkIfUserJoined ? "Already Joined Event" : "Close"
                  }}</b-button
                ></b-col
              >
              <b-col class="pl-1" v-if="!checkIfUserJoined"
                ><b-button
                  class="w-100"
                  variant="success"
                  @click="emailConfirmation"
                  >Create</b-button
                ></b-col
              >
            </b-row>
          </template>
        </div>
      </b-modal>

      <b-modal
        id="mark-event-form"
        centered
        size="md"
        title="Participants"
        cancel-variant="danger"
        ok-title="Distribute Green Points"
        ok-variant="success"
        @ok="distributeGreenPoints"
      >
        <template>
          <div>
            <b-form-checkbox
              v-for="participant in eventParticipants"
              :key="participant.email"
              :value="participant.email"
              v-model="selectedParticipants"
            >
              {{ participant.email }}
            </b-form-checkbox>
          </div>
        </template>
      </b-modal>

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
      <eventeditform :eventInfo="selectedEvent"></eventeditform>

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
</template>
<script>
import eventeditform from "../components/EventEditForm";
import eventcreateform from "../components/EventCreateForm";
import dashbar from "../components/Dashbar";
import userevents from "../components/UserEvents";
import eventcard from "../components/eventCard";
var axios = require("axios");
export default {
  mounted() {
    this.getAllEvents();
  },
  components: {
    eventeditform,
    eventcreateform,
    dashbar,
    userevents,
    eventcard,
  },
  data() {
    return {
      // isCreateErrors: false,
      isEditErrors: false,
      isDisplayUserEvents: false,
      isProcessing: false,
      eventInfo: {},
      selectedParticipants: [],
      eventParticipants: [],
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
    distributeGreenPoints() {
      console.log(`selected partcipants are ${this.selectedParticipants}`);

      this.selectedParticipants.forEach((participantEmail) => {
        let url = `./database/update_greenpoints.php?eventID=${this.eventInfo["eventID"]}&email=${participantEmail}`;
        url = encodeURI(url);

        axios.post(url).then(() => {
          url = `./database/mark_completed.php?eventID=${this.eventInfo["eventID"]}`;
          url = encodeURI(url);
          axios.get(url);
        });
      });
      alert("Green points distributed");
    },
    getAllParticipants() {
      let url = `./database/join.php?eventID=${this.eventInfo["eventID"]}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
        alert("Event participants retrieved");
        console.log(result.data);
        this.eventParticipants = result.data;
      });
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
      let url = `./database/getAllEvents.php?email=${this.getUserEmail}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
        alert("Retrieved all events");
        this.$store.state.events = result.data;
        console.log(result.data);
        url = `./database/getUserEvents.php?email=${this.getUserEmail}`;
        url = encodeURI(url);
        axios.get(url).then((result) => {
          alert("Retrieved user events");
          alert(`User email is ${this.getUserEmail}`);
          this.$store.state.userEvents = result.data;
        });
      });
    },
    emailConfirmation() {
      alert("sending email to user");
      let email = this.getUserEmail;
      let eventID = this.eventInfo["eventID"];
      let title = this.eventInfo["title"];
      let type = this.eventInfo["type"];
      let startDateTime = this.eventInfo["startDatetime"];
      let endDateTime = this.eventInfo["endDatetime"];
      let location = this.eventInfo["location"];
      let postalCode = this.eventInfo["postalCode"];
      let pointsEarn = this.eventInfo["pointsEarn"];
      let url = `./database/send_email.php?email=${email}&eventID=${eventID}&title=${title}&type=${type}&startDatetime=${startDateTime}&endDatetime=${endDateTime}&location=${location}&postalCode=${postalCode}&pointsEarn=${pointsEarn}`;
      url = encodeURI(url);
      axios.get(url).then(() => {
        alert("email has been sent");
        url = `./database/insert_join.php?eventID=${eventID}&email=${email}`;
        url = encodeURI(url);
        axios.get(url).then(() => {
          alert("join events has been updated");
        });
      });
      this.$bvModal.hide("event-modal-user");
    },
    updateSelectedEvent(selectedEventInfo) {
      // this.selectedEvent = selectedEventInfo[0];
      console.log(this.selectedEvent);
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
        let url = `./database/getUserEvents.php?email=${this.getUserEmail}`;
        url = encodeURI(url);
        axios.get(url).then((result) => {
          alert("Retrieved user events");
          alert(`User email is ${this.getUserEmail}`);
          this.$store.state.userEvents = result.data;
        });
      } else {
        this.getAllEvents();
      }

      this.isDisplayUserEvents = !this.isDisplayUserEvents;
    },
  },
  computed: {
    accType() {
      return this.$store.state.userInfo.acctype;
    },
    checkIfUserJoined() {
      let userEvents = [];
      let eventID = this.eventInfo["eventID"];
      let isJoined = false;
      userEvents = this.$store.state.userEvents;
      userEvents.forEach((event) => {
        console.log(event["eventID"]);
        if (eventID === event["eventID"]) {
          alert("event id found");
          isJoined = true;
        }
      });
      return isJoined;
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
