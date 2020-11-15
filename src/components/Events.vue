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
              <!-- Image references:
              https://www.cgs.gov.sg/how-can-we-act/volunteer
              http://www.globalstewards.org/environmental-calendar.htm -->
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <b-img fluid :src="require('../assets/carousel-2.png')"></b-img>
              <!-- Image references:
              https://www.facebook.com/CGSingapore/photos/10158455180911855
              https://www.facebook.com/CGSingapore/photos/10158374626811855
              https://www.nea.gov.sg/programmes-grants/events-calendar/past-events/index/clean-green-singapore-launch-ceremony-and-main-carnival-2019
              https://greennudge.sg/green-event/ -->
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <b-img fluid :src="require('../assets/carousel-3.png')"></b-img>
              <!-- Image references:
              https://www.facebook.com/CGSingapore/photos/a.10157489007181855/10157489007701855
              https://www.facebook.com/CGSingapore/photos/a.10157489007181855/10157489007521855
              https://www.facebook.com/CGSingapore/photos/a.390989376854/10158250237241855
              https://www.facebook.com/CGSingapore/photos/a.10157489007181855/10157489007521855 -->
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
        <b-row class="p-2">
          <b-col>
            <b-card-group columns>
              <div v-for="event in events" :key="event.eventID">
                <div v-if="!isAdmin">
                  <eventcard
                    v-if="
                      filter[getMonth(event)] && checkEventAvail(event)
                    "
                    :eventInfo="event"
                  ></eventcard>
                </div>
                <div v-else>
                  <eventcard
                    v-if="filter[getMonth(event)]"
                    :eventInfo="event"
                  ></eventcard>
                </div>
              </div>
              <!-- Image references:
              https://www.science.edu.sg/whats-on/workshops-activities/international-days-at-scs/earth-day-at-scs
              https://www.cgs.gov.sg/how-can-we-act/events/events-details/2017/11/11/default-calendar/clean-green-singapore-(north-west) -->

            </b-card-group>
          </b-col>
        </b-row>
        <eventcreateform></eventcreateform>
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
    // Commented this out so the spinner wont show for local host
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
    checkEventAvail(event) {
      // check the event start date with the current date. 
      //If the current date is later than the start date, the event card will not render
      let currentDate = new Date();
      let eventStartDate = new Date(event["startDatetime"]);
      let max = event['maxcapacity'];
      let current = event['numPart'];
   
      if(eventStartDate > currentDate &&  parseInt(current) < parseInt(max)){
        return true;
      }
      return false;
    },
    toggleLoading() {
      this.$store.commit('toggleLoading');
    },
    displayCreateEventForm() {
      // resets the form inputs and display the create event form modal
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
    getAllEvents() {
      this.toggleLoading();
      let url = `./database/getAllEvents.php?email=${this.getUserEmail}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
        setTimeout(() => {
          this.toggleLoading();
          this.$store.state.events = result.data;
        
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
      if(!this.$store.state.userInfo.isLogin){
        this.$router.push({name: "Login"})
      }else{
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
      }
     
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
