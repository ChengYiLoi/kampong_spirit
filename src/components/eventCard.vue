<template>
  <div>
    <b-card :title="eventInfo.title" @click="displayModal" class="event-card">
      <b-row>
        <b-col>
          <b-img
            fluid
            :src="`./images/${eventInfo.image}`"
            class="w-50"
          ></b-img>
        </b-col>
      </b-row>
      <b-row class="event-card-info w-100 m-0 p-2">
        <b-col>
          <b-row align-v="center">
            <b-col cols="2" class="px-0 mb-1">
              <b-img :src="require('../assets/calendar.svg')"></b-img>
            </b-col>
            <b-col class="text-left  pl-0">
              {{ startDate }}
            </b-col>
          </b-row>
          <b-row align-v="center">
            <b-col cols="2" class="px-0 mb-1">
              <b-img :src="require('../assets/time.svg')"></b-img>
            </b-col>
            <b-col class="text-left  pl-0">
              {{ startEndTime }}
            </b-col>
          </b-row>
          <b-row align-v="center">
            <b-col cols="2" class="px-0 mb-1">
              <b-img :src="require('../assets/location.svg')"></b-img>
            </b-col>
            <b-col class="text-left  pl-0">
              {{ location }}
            </b-col>
          </b-row>
          <b-row v-if="isAdmin">
            <b-col>
              <p class="text-right">
                <strong>Status: </strong>
                {{eventInfo.status}}
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <eventeditform :eventInfo="eventInfo"></eventeditform>
    <b-modal
      hide-footer
      :id="eventInfo.eventID"
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
        <p><strong>Date:</strong> {{ startDateTime }}</p>
        <p><strong>Time:</strong> {{ endDateTime }}</p>
        <p><strong>Green Points Reward:</strong> {{ eventInfo.pointsEarn }}</p>
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
                @click="$bvModal.hide(`${eventInfo.eventID}`)"
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
              >
                <div v-if="!isButtonLoading">
                  Join
                </div>
                <b-spinner
                  style="width: 1.0rem; height: 1.0rem"
                  v-else
                  label="spinning"
                ></b-spinner> </b-button
            ></b-col>
          </b-row>
        </template>
      </div>
    </b-modal>

    <b-modal
      :id="`event-modal-info-${eventInfo.eventID}`"
      centered
      hide-footer
      size="md"
      button-size="lg"
      :title="eventInfo['title']"
    >
      <div class="event-info p-2">
        <p><strong>Type:</strong> {{ eventInfo.type }}</p>
        <p><strong>Description:</strong> {{ eventInfo.description }}</p>
        <p><strong>Location:</strong> {{ eventInfo.location }}</p>
        <p><strong>Postal Code:</strong> {{ eventInfo.postalCode }}</p>
        <p><strong>Start Date Time:</strong> {{ startDateTime }}</p>
        <p><strong>End Date Time:</strong> {{ endDateTime }}</p>
        <p><strong>Green Points Reward:</strong> {{ eventInfo.pointsEarn }}</p>

        <p>
          <strong>Current Number of Participants Joined:</strong>
          {{ eventInfo.numPart }}
        </p>
        <!-- <p>
          <strong>Maximum Number of Participants Joined:</strong>
          {{ eventInfo.maxcapacity }}
        </p> -->
        <template>
          <b-row class="pb-2">
            <b-col
              ><b-button
                class=" w-100"
                variant="danger"
                @click="$bvModal.hide(`event-modal-info-${eventInfo.eventID}`)"
                >Close</b-button
              ></b-col
            >
            <b-col class="pl-1"
              ><b-button class="w-100" variant="success" @click="withdrawEvent">
                <div v-if="!isButtonLoading">Withdraw</div>
                <b-spinner
                  v-else
                  label="spinner"
                  style="width: 1.0rem; height: 1.0rem"
                ></b-spinner> </b-button
            ></b-col>
          </b-row>
        </template>
      </div>
    </b-modal>
    <b-modal
      :id="`event-join-confirmation-${eventInfo.eventID}`"
      ok-only
      ok-title="Close"
      ok-variant="danger"
      centered
    >
      <p class="text-center">
        Successfully Joined <strong>{{ eventInfo.title }}</strong
        >. Please check your email to confirm your attendance via the link
        attached in the email.
      </p>
    </b-modal>
  </div>
</template>
<script>
var axios = require("axios");
import eventeditform from "../components/EventEditForm";
export default {
  components: {
    eventeditform,
  },
  props: ["eventInfo"],
  data() {
    return {
      // selectedParticipants: [],
      // eventParticipants: [],
    };
  },
  methods: {
    toggleButtonLoading() {
      // render the spinner in the button
      this.$store.commit('toggleButtonLoading');
    },
    toggleLoading() {
      // renders the spinner
      this.$store.commit('toggleLoading');
    },

    withdrawEvent() {
      
      this.toggleButtonLoading();
      let eventID = this.eventInfo["eventID"];
      let email = this.getUserEmail;

      let url = `./database/withdraw.php?eventID=${eventID}&email=${email}`;
      url = encodeURI(url);
      axios.post(url).then(() => {
        url = `./database/withdraw_joincount.php?eventID=${eventID}`;
        url = encodeURI(url);
        axios.post(url).then(() => {
          url = `./database/getUserEvents.php?email=${email}`;
          url = encodeURI(url);
          axios.get(url).then((result) => {
            setTimeout(() => {
              this.toggleButtonLoading();
              this.$store.state.userEvents = result.data;
              this.$bvModal.hide(`${this.eventInfo.eventID}`);
            }, 1500);
          });
        });
      });
    },
    displayModal() {
      // displays modals with different options based on whether the user is an admin or not
      if (!this.isAdmin) {
        if (this.isDisplayUserEvents) {
          this.$bvModal.show(`event-modal-info-${this.eventInfo.eventID}`);
        } else {
          this.$bvModal.show(`${this.eventInfo.eventID}`);
        }
      } else {
        this.$bvModal.show(`${this.eventInfo.eventID}-admin`);
      }
    },
    emailConfirmation() {
      //Sends a email to the user has decided to join the event, if the user is not logged in, will redirect to login page
      if (!this.$store.state.userInfo.isLogin) {
        this.$router.push({ name: "Login" });
      } else {
        this.toggleButtonLoading();
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
          setTimeout(() => {
            this.toggleButtonLoading();
            this.$bvModal.hide(`${this.eventInfo.eventID}`);
            this.$bvModal.show(
              `event-join-confirmation-${this.eventInfo.eventID}`,
            );
            url = `./database/insert_join.php?eventID=${eventID}&email=${email}`;
            url = encodeURI(url);
            axios.get(url);
          }, 1200);
        });
      }
    },
  },
  computed: {
    startDateTime() {
      // returns the event start date time
      var options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      let output = new Date(this.eventInfo["startDatetime"]);
      output = output.toLocaleTimeString("en-SG", options);
      
      return output;
    },
    endDateTime() {
      // returns the event end date time
      var options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      let output = new Date(this.eventInfo["endDatetime"]);
      output = output.toLocaleTimeString("en-SG", options);
      return output;
    },
    isButtonLoading() {
      // toggle the boolean to display the button spinner
      return this.$store.state.isButtonSpinner;
    },
    isLoading() {
      // toggle the boolena to display the spinner
      return this.$store.state.isSpinner;
    },
    isDisplayUserEvents() {
      
      return this.$store.state.isDisplayUserEvents;
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
    getUserEmail() {
      let email = "";
      if (sessionStorage.getItem("userSession") != null) {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        email = userSession["email"];
      }
      return email;
    },
    checkIfUserJoined() {
      let userEvents = [];
      let eventID = this.eventInfo["eventID"];
      let isJoined = false;
      userEvents = this.$store.state.userEvents;
      userEvents.forEach((event) => {
       
        if (eventID === event["eventID"]) {
          isJoined = true;
        }
      });
      return isJoined;
    },
    location() {
      return this.eventInfo.location;
    },
    startEndTime() {
      var startDateTimeObj = new Date(this.eventInfo.startDatetime);
      var endDateTimeObj = new Date(this.eventInfo.endDatetime);
      var sHour = startDateTimeObj.toLocaleTimeString("en-SG").split("");
      var eHour = endDateTimeObj.toLocaleTimeString("en-SG").split("");

      sHour = sHour
        .slice(0, sHour[0] == 1 ? 5 : 4)
        .concat([" "])
        .concat(sHour.slice(sHour[0] == 1 ? 8 : 7, 11))
        .join("")
        .toString()
        .toUpperCase();

      // if(endDateTimeObj.getHours() )
      eHour = eHour
        .slice(0, eHour[0] == 1 && eHour[1] != ":" ? 5 : 4)
        .concat([" "])
        .concat(eHour.slice(endDateTimeObj.getHours() >= 13 ? 8 : 8))
        .join("")
        .toString()
        .toUpperCase();

      var output = `${sHour} to ${eHour}`.toString();

      return output;
    },
    startDate() {
      var startDateTime = this.eventInfo.startDatetime;
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
      var dateObj = new Date(startDateTime);
      var date = dateObj.getDate().toString();

      var day = days[dateObj.getDay()];
      var month = months[dateObj.getMonth()];
      var year = dateObj.getFullYear();
      var output = `${day}, ${date} ${month} ${year}`.toString();

      return output;
    },
  },
};
</script>
<style lang="scss">
.event-card {
  cursor: pointer;
  .event-card-info {
    background-color: #e7e6e6;
  }
}
@media only screen and (max-width: 768px) {
  .event-card-info {
    font-size: 0.7rem;
  }
}
@media only screen and (max-width: 425px) {
  .event-card-info {
    font-size: 1rem;
  }
}
</style>
