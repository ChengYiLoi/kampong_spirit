<template>
  <div class="p-0">
    <b-table
      bordered
      outlined
      hover
      striped
      dark
      selectable
      :fields="user"
      stacked="md"
      :items="userEvents"
      @row-selected="selectedEvent"
    >
    </b-table>
    <b-modal
      id="event-modal-info"
      centered
      cancel-title="Close"
      ok-title="Withdraw"
      cancel-variant="danger"
      ok-variant="success"
      size="md"
      button-size="lg"
      :title="eventInfo['title']"
      @ok="withdrawEvent"
    >
      <div class="event-info p-2">
        <p><strong>Type:</strong> {{ eventInfo.type }}</p>
        <p><strong>Description:</strong> {{ eventInfo.description }}</p>
        <p><strong>Location:</strong> {{ eventInfo.location }}</p>
        <p><strong>Postal Code:</strong> {{ eventInfo.postalCode }}</p>
        <p><strong>Start Date Time:</strong> {{ eventInfo.startDatetime }}</p>
        <p><strong>End Date Time:</strong> {{ eventInfo.endDatetime }}</p>
        <p><strong>Green Points Reward:</strong> {{ eventInfo.pointsEarn }}</p>

        <p>
          <strong>Current Number of Participants Joined:</strong>
          {{ eventInfo.numpart }}
        </p>
        <p>
          <strong>Maximum Number of Participants Joined:</strong>
          {{ eventInfo.maxcapacity }}
        </p>
      </div>
    </b-modal>
  </div>
</template>
<script>
var axios = require("axios");
export default {
  data() {
    return {
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
      eventInfo: {},
    };
  },
  methods: {
    selectedEvent(selectedEventInfo) {
      this.eventInfo = selectedEventInfo[0];
      this.$bvModal.show("event-modal-info");
    },
    withdrawEvent() {
      let eventID = this.eventInfo["eventID"];
      let email = this.getUserEmail;
      console.log(eventID);
      console.log(email);
      let url = `withdraw.php?eventID=${eventID}&email=${email}`;
      axios.post(url).then(() => {
        alert("User has withdrawed");
        url = `withdraw_joincount.php?eventID=${eventID}`;
        axios.post(url).then(() => {
          url = `getUserEvents.php?email=${email}`;
          axios.get(url).then((result) => {
            alert("User events has been updated");
            this.$store.state.userEvents = result.data;
            this.$bvModal.hide('event-modal-info');
          });
        });
      });
      this.$bvModal.hide('event-modal-info');
    },
  },
  computed: {
    userEvents() {
      return this.$store.state.userEvents;
    },
    getUserEmail() {
      let email = "";
      if (sessionStorage.getItem("userSession") != null) {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        email = userSession["email"];
      }
      return email;
    },
  },
};
</script>
<style lang="scss"></style>
