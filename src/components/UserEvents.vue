<template>
  <div class="p-0">
    <b-row class="p-2">
      <b-col>
        <b-card-group columns>
          <eventcard
            v-for="event in userEvents"
            :key="event.eventID"
            :eventInfo="event"
          ></eventcard>
        </b-card-group>
      </b-col>
    </b-row>

    <!-- <b-table
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
    </b-table> -->

   
  </div>
</template>
<script>

import eventcard from "../components/eventCard";
export default {
  components: {
    eventcard,
  },
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
    
  },
  computed: {
    userEvents() {
      return this.$store.state.userEvents;
    },
    // getUserEmail() {
    //   let email = "";
    //   if (sessionStorage.getItem("userSession") != null) {
    //     let userSession = JSON.parse(sessionStorage.getItem("userSession"));
    //     email = userSession["email"];
    //   }
    //   return email;
    // },
  },
};
</script>
<style lang="scss"></style>
