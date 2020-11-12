<template>
  <b-modal
    id="create-event-form"
    size="lg"
    title="Create New Event"
    hide-footer
    button-size="lg"
  >
    <b-form class="modal-info p-3">
      <b-form-group label="Event Image: ">
        <b-form-file id="eventPicture" v-model="eventPicture"></b-form-file>
      </b-form-group>
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
          <b-form-group label="Maximum Participants:" label-for="mParticipants">
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
            <b-form-input v-model="gPoints" id="gPoints" type="number" min="0">
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
              :min="currentDateTime"
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
              :min="currentDateTime"
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
        <!-- <li v-if="parseEndDate < parseStartDate">End date time cannot be earlier than start date time</li>
        <li v-if="sDateTimeObj > eDateTimeObj">Start date time cannot be later than end date time</li>
        <li v-if="eDateTimeObj < sDateTimeObj">End date time cannot be earlier than start date time</li>
        <li v-if="sDateTimeObj < currentDate">Start date time cannot be earlier than current date time</li>
        <li v-if="eDateTimeObj < currentDate">End date time cannot be earlier than current date time</li> -->
      </ul>
    </b-alert>
    <template>
      <b-row class="pb-2">
        <b-col class="pr-0"
          ><b-button class=" w-100" variant="danger">Cancel</b-button></b-col
        >
        <b-col class="pl-1"
          ><b-button class="w-100" variant="success" @click="createNewEvent"
            >Create</b-button
          ></b-col
        >
      </b-row>
    </template>
  </b-modal>
</template>
<script>
var axios = require("axios");
export default {
  data() {
    return {
      isCreateErrors: false,
      eventPicture: null,
      eventPictureName: null,
      eventTitle: "",
      eDescription: "",
      location: "",
      pCode: "",
      mParticipants: 1,
      gPoints: 0,
      eventType: "",
      sDateTime: "",
      eDateTime: "",
     
    };
  },
  methods: {
    resetCreateForm(){
      this.eventPicture = null;
      this.eventTitle = null,
      this.eventPictureName = null;
      this.eDescription = null;
      this.location = "";
      this.pCode = "";
      this.mParticipants = "";
      this.gPoints = 0;
      this.eventType = "";
      this.isCreateErrors = false;
      this.sDateTime = "";
      this.eDateTime = "";
    },
    createNewEvent() {
       this.parseStartDate = Date.parse(this.sDateTime);
      this.parseEndDate = Date.parse(this.eDateTime);
    //   this.sDateTimeObj = new Date(this.sDateTime);
    // this.eDateTimeObj  = new Date(this.eDateTime);
      
      console.log(this.sDateTime < this.currentDate);
      
      this.isCreateErrors = false;
      if (this.eventTitle == "") {
        this.isCreateErrors = true;
      }
      if (this.eDescription == "") {
        this.isCreateErrors = true;
      }
      if (this.location == "") {
        this.isCreateErrors = true;
      }
      if (this.pCode == "") {
        this.isCreateErrors = true;
      }
      if (this.mParticipants == "") {
        this.isCreateErrors = true;
      }
      if (this.eventType == "") {
        this.isCreateErrors = true;
      }
      if (this.sDateTime == "") {
        this.isCreateErrors = true;
      }
      if (this.eDateTime == "") {
        this.isCreateErrors = true;
      }
     
      if (this.parseEndDate < this.parseStartDate) {
        console.log(`End date is smaller than start date ${this.parseEndDate < this.parseStartDate}`)
        this.isCreateErrors = true;
      }
     
    //   if(this.sDateTime > this.eDateTime){
    //     console.log(`Start date time is earlier than end date time ${this.sDateTime > this.eDateTime}`)
    //     this.isCreateErrors = true;
    //   }
    //   if(this.eDateTime < this.sDateTime){
    //     console.log(`End date time is earlier than `)
    //     this.isCreateErrors = true;
    //   }
    //   if(this.sDateTime < this.eDateTime){
    //     this.isCreateErrors = true;
    //   }
    // if(this.eDateTime <this.currentDate){
    //     this.isCreateErrors = true;
    //   }

      if (!this.isCreateErrors) {
        var fd = new FormData();
        if (this.eventPicture != null) {
          fd.append("eventPicture", this.eventPicture);
          this.eventPictureName = this.eventPicture.name;
        } else {
          this.eventPictureName = "noimage.png";
        }

        

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
          let url = `./database/addimageevent.php`;
          axios.post(url, fd).then(() => {
            url = `./database/create_event.php?title=${this.eventTitle}&type=${this.eventType}&startDateTime=${this.sDateTime}&endDateTime=${this.eDateTime}&location=${this.location}&postalCode=${this.pCode}&description=${this.eDescription}&pointsEarn=${this.gPoints}&maxcapacity=${this.mParticipants}&image=${this.eventPictureName}`;
            url = encodeURI(url);
            axios.post(url).then(() => {
              this.$bvModal.hide("create-event-form");
              alert("event has been created");
              this.resetCreateForm();
              url = `./database/getAllEvents.php?email=${this.getUserEmail}`;
              url = encodeURI(url);
              axios.get(url).then((response) => {
                this.$store.state.events = response.data;
              });
            });
          });
        }
      }
    },
  },
  computed: {
    currentDate(){
      var date = new Date();
      return date;
    },
    currentDateTime(){
      let date = new Date();
      let hours = date.getHours();
      if(hours < 10){
        hours = "0" + hours;
      } 
      let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${hours}:${date.getMinutes()}`;
      return dateString;
    }
  },
};
</script>
<style lang="scss"></style>
