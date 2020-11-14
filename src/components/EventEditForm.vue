<template>
  <div>
    <b-modal
      :id="`${this.eventInfo.eventID}-admin`"
      hide-footer
      centered
      size="md"
      :title="eventInfo['title']"
    >
      <div class="event-info p-2">
        <p><strong>Type:</strong> {{ eventInfo.type }}</p>
        <p><strong>Description:</strong> {{ eventInfo.description }}</p>
        <p><strong>Location:</strong> {{ eventInfo.location }}</p>
        <p><strong>Postal Code:</strong> {{ eventInfo.postalCode }}</p>
        <p><strong>Date:</strong> {{ startDate }}</p>
        <p><strong>Time:</strong> {{ startEndTime }}</p>
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
                @click="getAllParticipants"
                class="w-100"
                variant="success"
                v-b-modal="`mark-event-form-${eventInfo.eventID}`"
                >Mark Event as Completed</b-button
              ></b-col
            >
          </b-row>
          <b-row>
            <b-col
              ><b-button
                class="w-100"
                variant="primary"
                v-b-modal="`edit-event-form-${this.eventInfo.eventID}`"
                >Edit Event Details</b-button
              ></b-col
            >
          </b-row>
        </template>
      </div>
    </b-modal>
    <b-modal
      :id="`edit-event-form-${eventInfo.eventID}`"
      size="lg"
      title="Edit Event"
      hide-footer
      button-size="lg"
    >
      <b-form class="modal-info p-3">
        <b-form-group label="Event Image: ">
          <b-form-file id="eventPicture" v-model="eventPicture"></b-form-file>
        </b-form-group>
        <b-form-group label="Event Name:" label-for="eTitle">
          <b-form-input v-model="editForm['title']" id="eTitle" type="text">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Event Description:" label-for="eDescription">
          <b-form-textarea v-model="editForm['description']" id="eDescription">
          </b-form-textarea>
        </b-form-group>
        <b-row>
          <b-col>
            <b-form-group label="Location:" label-for="location">
              <b-form-input
                v-model="editForm['location']"
                id="location"
                type="text"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Postal Code:" label-for="pCode">
              <b-form-input
                v-model="editForm['postalCode']"
                id="pCode"
                type="text"
              >
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
                v-model="editForm['maxcapacity']"
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
                v-model="editForm['pointsEarn']"
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
                  <b-form-input
                    v-model="editForm['type']"
                    id="eType"
                    type="text"
                  >
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
                v-model="editForm['startDatetime']"
                id="sDateTime"
                type="datetime-local"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="End Date Time:" label-for="eDateTime">
              <b-form-input
                v-model="editForm['endDatetime']"
                id="eDateTime"
                type="datetime-local"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="warning" v-b-modal="'confirm-cancel'" class="w-100"
          >Cancel Event</b-button
        >
      </b-form>
      <b-alert :show="isEditErrors" class="w-100" variant="warning">
        <ul>
          <li v-if="eventTitle == ''">Event name cannot be empty</li>
          <li v-if="eDescription == ''">Event description cannot be empty</li>
          <li v-if="location == ''">Event location cannot be empty</li>
          <li v-if="pCode == ''">Event postal code cannot be empty</li>
          <li v-if="mParticipants == ''">
            Maximum event participants code cannot be empty
          </li>
          <li v-if="eventType == ''">Event type cannot be empty</li>
        </ul>
      </b-alert>
      <template>
        <b-row class="pb-2">
          <b-col class="pr-0"
            ><b-button
              class=" w-100"
              variant="danger"
              @click="$bvModal.hide(`${eventInfo.eventID}-admin`)"
              >Cancel</b-button
            ></b-col
          >
          <b-col class="pl-1"
            ><b-button class="w-100" variant="success" @click="updateEvent"
              >Save</b-button
            ></b-col
          >
        </b-row>
      </template>
    </b-modal>

    <b-modal
      :id="`mark-event-form-${eventInfo.eventID}`"
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
  </div>
</template>
<script>
var axios = require("axios");
export default {
  props: ["eventInfo"],
  mounted() {
    this.editFormValues();
  },
  data() {
    return {
      isEditErrors: false,
      eventPicture: null,
      eventPictureName: null,
      //   eventTitle: "",
      //   eDescription: "",
      //   location: "",
      //   pCode: "",
      //   mParticipants: "",
      //   gPoints: 0,
      //   eventType: "",
      sDateTime: "",
      eDateTime: "",
      selectedParticipants: [],
      eventParticipants: [],
      editForm: {},
    };
  },
  methods: {
    editFormValues() {
      var obj = {};

      for (var property in this.eventInfo) {
        obj[property] = this.eventInfo[property];
      }

      this.editForm = obj;
    },
    distributeGreenPoints() {
      console.log(`selected partcipants are ${this.selectedParticipants}`);
      this.$bvModal.hide(`${this.eventInfo.eventID}-admin`);
      this.selectedParticipants.forEach((participantEmail) => {
        let url = `./database/update_greenpoints.php?eventID=${this.eventInfo["eventID"]}&email=${participantEmail}`;
        url = encodeURI(url);

        axios.post(url).then(() => {
          url = `./database/mark_completed.php?eventID=${this.eventInfo["eventID"]}`;
          url = encodeURI(url);
          axios.get(url);
        });
      });
      
    },
    getAllParticipants() {
      let url = `./database/join.php?eventID=${this.eventInfo["eventID"]}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
       
        console.log(result.data);
        this.eventParticipants = result.data;
      });
    },
    updateEvent() {
      this.isEditErrors = false;
      if (this.editForm["title"] == "") {
        this.isEditErrors = true;
      }
      if (this.editForm["description"] == "") {
        this.isEditErrors = true;
      }
      if (this.editForm["location"] == "") {
        this.isEditErrors = true;
      }
      if (this.editForm["postalCode"] == "") {
        this.isEditErrors = true;
      }
      if (this.editForm["maxcapacity"] == "") {
        this.isEditErrors = true;
      }
      if (this.editForm["type"] == "") {
        this.isEditErrors = true;
      }
      if (this.editForm["pointsEarn"] == "") {
        this.isEditErrors = true;
      }
      if (this.editForm["pointsEarn"] == "") {
        this.isEditErrors = true;
      }
      if (!this.isEditErrors) {
        let parseStartDate = Date.parse(this.sDateTime);
        let parseEndDate = Date.parse(this.eDateTime);
        var fd = new FormData();

        if (
          (isNaN(parseStartDate) && isNaN(parseEndDate)) ||
          parseStartDate < parseEndDate
        ) {
          let url;
          if (this.eventPicture == null) {
            this.eventPictureName = "";
          } else {
            this.eventPictureName = this.eventPicture.name;
            fd.append("eventPicture", this.eventPicture);

            var extension = this.eventPictureName
              .substring(this.eventPictureName.lastIndexOf(".") + 1)
              .toLowerCase();
            if (
              extension == "gif" ||
              extension == "png" ||
              extension == "bmp" ||
              extension == "jpeg" ||
              extension == "jpg" ||
              extension == "jpg" ||
              extension == "svg"
            ) {
              url = `./database/addImage.php`;
              axios.post(url, fd);
            } else {
              alert("User has entered invalid image file type");
            }
          }
          console.log(this.eventInfo);
          url = `./database/update_event.php?eventID=${this.editForm["eventID"]}&title=${this.editForm["title"]}&type=${this.editForm["type"]}&startDatetime=${this.editForm["startDatetime"]}&endDatetime=${this.editForm["endDatetime"]}&location=${this.editForm["location"]}&postalCode=${this.editForm["postalCode"]}&description=${this.editForm["description"]}&pointsEarn=${this.editForm["pointsEarn"]}&maxcapacity=${this.editForm["maxcapacity"]}&image=${this.eventPictureName}`;
          url = encodeURI(url);
          axios.post(url).then(() => {
          
            this.$bvModal.hide(`edit-event-form-${this.eventInfo.eventID}`);
            // this.getAllEvents();

            url = `./database/getAllEvents.php?email=${this.getUserEmail}`;
            url = encodeURI(url);
            axios.get(url).then((response) => {
             
              this.$store.state.events = response.data;
            });
          });
          //     this.eventTitle = "";
          //     this.eDescription = "";
          //     this.location = "";
          //     this.pCode = "";
          //     this.mParticipants = "";
          //     this.gPoints = 0;
          //     this.eventType = "";
          //     this.sDateTime = "";
          //     this.eDateTime = "";
        } else {
          
          this.$bvModal.show("edit-event-form");
        }
      }
    },
  },
  computed: {
    getUserEmail() {
      let email = "";
      if (sessionStorage.getItem("userSession") != null) {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        email = userSession["email"];
      }
      return email;
    },
    startEndTime() {
      var startDateTimeObj = new Date(this.eventInfo.startDatetime);
      var endDateTimeObj = new Date(this.eventInfo.endDatetime);
      var sHour = startDateTimeObj.toLocaleTimeString("en-SG").split("");
      var eHour = endDateTimeObj.toLocaleTimeString("en-SG").split("");

      sHour = sHour
        .slice(0, startDateTimeObj.getHours() >= 13 ? 4 : 5)
        .concat([" "])
        .concat(sHour.slice(startDateTimeObj.getHours() >= 13 ? 8 : 8, 11))
        .join("")
        .toString()
        .toUpperCase();
      eHour = eHour
        .slice(0, endDateTimeObj.getHours() >= 13 ? 4 : 5)
        .concat([" "])
        .concat(eHour.slice(endDateTimeObj.getHours() >= 13 ? 7 : 8, 11))
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
<style lang="scss"></style>

 startEndTime() {
      var startDateTimeObj = new Date(this.eventInfo.startDatetime);
      var endDateTimeObj = new Date(this.eventInfo.endDatetime);
      var sHour = startDateTimeObj.toLocaleTimeString("en-SG").split("");
      var eHour = endDateTimeObj.toLocaleTimeString("en-SG").split("");

      sHour = sHour
        .slice(0, startDateTimeObj.getHours() >= 13 ? 4 : 5)
        .concat([" "])
        .concat(sHour.slice(startDateTimeObj.getHours() >= 13 ? 8 : 8, 11))
        .join("")
        .toString()
        .toUpperCase();
      eHour = eHour
        .slice(0, endDateTimeObj.getHours() >= 13 ? 4 : 4)
        .concat([" "])
        .concat(eHour.slice(endDateTimeObj.getHours() >= 13 ? 7 : 8, 11))
        .join("")
        .toString()
        .toUpperCase();

      var output = `${sHour} to ${eHour}`.toString();

      return output;
    },
