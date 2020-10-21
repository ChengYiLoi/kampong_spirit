<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center" class="px-2">
        <b-col md="2">
          <dashbar></dashbar>
        </b-col>
        <b-col>
          <h1>Events</h1>
        </b-col>
        <b-col cols="2">
          <b-button><strong>Create Event</strong></b-button>
        </b-col>
      </b-row>
    </div>
    <div class="p-0">
      <b-table
        bordered
        outlined
        hover
        striped
        dark
        selectable
        stacked="md"
        :items="events"
        @row-selected="selectedEvent"
      >
      </b-table>
      <b-modal
        id="event-modal"
       
        centered
        cancel-title="Close"
        ok-title="Join Event"
        cancel-variant="danger"
        ok-variant="success"
        size="md"
        button-size="lg"
      >
      <h4 class="text-center">Confirm joining {{eventInfo['title']}}?</h4>
        <!-- <div class="event-info p-2">
          <p><strong>Type:</strong> {{eventInfo.type}}</p>
          <p><strong>Start Date Time:</strong> {{eventInfo.startDateTime}}</p>
          <p><strong>End Date Time:</strong> {{eventInfo.endDateTime}}</p>
          <p><strong>Green Points Reward:</strong> {{eventInfo.pointsEarned}}</p>
        </div> -->
      </b-modal>
    </div>
  </div>
</template>
<script>
import dashbar from "../components/Dashbar";
export default {
  components: {
    dashbar,
  },
  data() {
    return {
      eventInfo: {
       
      },
    };
  },
  methods: {
    selectedEvent(selectedEventInfo) {
      this.eventInfo = selectedEventInfo[0];
      console.log(this.eventInfo);
      this.$bvModal.show("event-modal");
    },
  },
  computed: {
    events() {
      let output = [];
      let events = [];
      events = this.$store.state.events;
      if (!this.isAdmin) {
        events.forEach((event) => {
          output.push({
            title: event["title"],
            type: event["type"],
            startDateTime: event["startDateTime"],
            endDateTime: event["endDateTime"],
            pointsEarned: event["title"],
            numberOfParticipants: event["numberOfParticipants"],
            maximumParticipants: event["maxcapacity"],
            status: event["status"],
          });
        });
      } else {
        output = events;
      }
      return output;
    },
    isAdmin() {
      let boo = true;
      if (
        !this.$store.state.userInfo.isLogin ||
        this.$store.userInfo.accType == "User"
      ) {
        boo = false;
      }
      return boo;
    },
  },
};
</script>
<style lang="scss">
.event-info {
  background-color: #aaccaa;
  border-radius: 5px;
}
</style>
