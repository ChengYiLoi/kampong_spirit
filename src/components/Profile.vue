<template>
  <div id="full-height">
    <div id="banner">
      <b-row align-v="center">
        <b-col lg="2">
          <dashbar></dashbar>
        </b-col>
        <b-col id="feature-title">
          <h1 class="d-inline pt-4">Profile</h1>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </div>
    <div class="main h-100 p-4">
      <b-container fluid class="text-left user-info p-3">
        <b-row align-v="center">
          <b-col lg="9">
            <row class="py-2">
              <b-col class="pl-0"
                ><h2 class="responsive-text">
                  <strong>First Name: </strong> <span>{{ fname }}</span>
                </h2></b-col
              >
              <b-col class="pl-0">
                <h2 class="responsive-text">
                  <strong>Last Name: </strong> <span>{{ lname }}</span>
                </h2></b-col
              >
            </row>
          </b-col>
          <b-col lg="3">
            <b-button
              class="w-100 responsive-button-text"
              v-b-modal="'user-name'"
              variant="success"
              >Change Name</b-button
            >
          </b-col>
          <b-modal
            id="user-name"
            centered
            title="Change Name"
            ok-title="Update"
            @ok="updateInfo"
          >
            <b-form-group label="First Name: " label-for="fname">
              <b-form-input
                v-model="newfname"
                id="fname"
                type="text"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Last Name: " label-for="lname">
              <b-form-input
                v-model="newlname"
                id="lname"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-modal>
        </b-row>
        <b-row align-v="center">
          <b-col lg="9">
            <h2 class="py-2 responsive-text">
              <strong>Email: </strong>
              <span>{{ email }}</span>
            </h2>
          </b-col>
        </b-row>
        <b-row v-if="hiddenPass != ''" align-v="center">
          <b-col lg="9">
            <h2 class="py-2  responsive-text">
              <strong>Password: </strong>
              <span
                >{{ hiddenPass }}
                <span class="ml-3" v-on:click="toggleVisibility()"
                  ><b-img
                    fluid
                    :src="
                      require('../assets/' +
                        `${isVisible ? 'hidden.svg' : 'visible.svg'}`)
                    "
                  ></b-img></span
              ></span>
            </h2>
          </b-col>

          <b-col lg="3">
            <b-button
              v-b-modal="'user-password'"
              variant="success"
              class="w-100 responsive-button-text"
              >Change Password</b-button
            >
          </b-col>
          <b-modal
            id="user-password"
            centered
            title="Change password"
            ok-title="Update"
            @ok="updateInfo"
          >
            <b-form-group label="New Password: " label-for="nPassword">
              <b-form-input
                v-model="newpassword"
                id="nPassword"
                type="text"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Old Password: " label-for="oPassword">
              <b-form-input
                v-model="oldpassword"
                id="oPassword"
                type="text"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Confirm Password: " label-for="cPassword">
              <b-form-input
                v-model="confirmpassword"
                id="cPassword"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-modal>
        </b-row>

        <b-row align-v="center">
          <b-col lg="9">
            <h2 class="py-2 responsive-text">
              <strong>Mobile Number: </strong>
              <span>{{ mobileNo != "0" ? mobileNo : "" }}</span>
            </h2>
          </b-col>
          <b-col lg="3">
            <b-button
              class="w-100 responsive-button-text"
              v-b-modal="'phonenum'"
              variant="success"
              >{{
                mobileNo != "0" ? "Change Phone Number" : "Add Phone Number"
              }}</b-button
            >
          </b-col>
          <b-modal
            id="phonenum"
            centered
            title="Change Phone Number"
            ok-title="Update"
            @ok="updateInfo"
          >
            <b-form-group label="New Phone Number: " label-for="newNumber">
              <b-form-input
                v-model="newmobileno"
                id="newNumber"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-modal>
        </b-row>

        <b-row align-v="center">
          <b-col lg="9">
            <h2 class="py-2 responsive-text">
              <strong>Green Points: </strong>
              <span>{{ gPoints }}</span>
            </h2>
          </b-col>
          <b-col lg="3">
            <b-button
              class="w-100 responsive-button-text"
              v-b-modal="'gPointsReward'"
              variant="success"
              >Claim Rewards</b-button
            >
          </b-col>
          <b-modal
            id="gPointsReward"
            centered
            title="Green Points Rewards"
            hide-footer
          >
            <b-container>
              <b-button
                :disabled="gPoints < 50 ? true : false"
                v-b-modal="'aCouponCode'"
                class="w-100"
                variant="primary"
                @click="deductPoints(50, '10OOFF', 'Amazon $10 off')"
                >Generate Amazon coupon code (50 Green Points)</b-button
              >
            </b-container>

            <b-modal
              id="coupon-deducted"
              ok-only
              ok-title="close"
              ok-variant="danger"
            >
              <p class="w-100">Green points have been successfully deducted</p>
            </b-modal>
          </b-modal>
        </b-row>

        <b-row class="pt-2 mt-5">
          <b-col class="text-center">
            <b-button v-b-modal="'view-rewards'" variant="info"
              >View Rewards</b-button
            >
          </b-col>
          <b-modal id="view-rewards" ok-only ok-title="close">
            <b-row v-for="reward in userRewards" :key="reward['rewardcode']">
              <b-col>{{ reward["rewardname"] }}</b-col>
              <b-col>{{ reward["rewardcode"] }}</b-col>
            </b-row>
          </b-modal>
        </b-row>
      </b-container>
      <b-container v-if="isChartData" fluid class="user-info p-3 mt-2">
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
      </b-container>
      <div class=" py-2 mt-4">
        <!-- <b-row class="">
          <b-col class="">
            <b-progress
              :value="gPoints"
              variant="info"
              max="100"
              height="20px"
            ></b-progress>
          </b-col>
        </b-row> -->
        <h3 class="text-center responsive-text">
          <strong>Achivements</strong>
        </h3>
        <b-row>
          <b-col class="" id="tooltip-bronze">
            <b-tooltip target="tooltip-bronze" triggers="hover">
              {{
                eventCount >= 20
                  ? "Achievement for participating 20 events"
                  : "Unlocks when you have participated 20 events"
              }}
            </b-tooltip>
            <b-img
              v-if="eventCount >= 20"
              fluid
              :src="require('../assets/bronzeMedalUnlocked.svg')"
            ></b-img>
            <b-img
              v-else
              fluid
              :src="require('../assets/bronzeMedalLocked.svg')"
            ></b-img>
          </b-col>
          <b-col id="tooltip-silver">
            <b-tooltip target="tooltip-silver" triggers="hover">
              {{
                eventCount >= 50
                  ? "Achievement for participating 50 events"
                  : "Unlocks when you have participated 50 events"
              }}
            </b-tooltip>
            <b-img
              v-if="eventCount >= 50"
              fluid
              :src="require('../assets/silverMedalUnlocked.svg')"
            ></b-img>
            <b-img
              v-else
              fluid
              :src="require('../assets/silverMedalLocked.svg')"
            ></b-img>
          </b-col>
          <b-col id="tooltip-gold">
            <b-tooltip target="tooltip-gold" triggers="hover">
              {{
                eventCount == 100
                  ? "Achievement for participating 1000 events"
                  : "Unlocks when you have participated 1000 events"
              }}
            </b-tooltip>
            <b-img
              v-if="gPoints == 100"
              fluid
              :src="require('../assets/goldMedalUnlocked.svg')"
            ></b-img>
            <b-img
              v-else
              fluid
              :src="require('../assets/goldMedalLocked.svg')"
            ></b-img>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import postData from "../postData";
import getData from "../getData";
import dashbar from "../components/Dashbar";
import { GChart } from "vue-google-charts";
var axios = require("axios");
var currentYear = new Date().getFullYear();
export default {
  components: {
    dashbar,
    GChart,
  },
  mounted() {
    this.checkSession();
  },
  data() {
    return {
      isVisible: false,
      newfname: "",
      newlname: "",
      newmobileno: "",
      newpassword: "",
      confirmpassword: "",
      oldpassword: "",

      chartOptions: {
        title: `Number of Events Joined for ${currentYear}`,
      },
    };
  },
  methods: {
    // getUserRewards() {
    //   let url = `userrewards.php?email=${this.email}`;
    //   axios.get(url).then((result) => {
    //     this.$store.state.getUserRewards = result.data;
    //   });
    // },
    getUserData() {
      alert('getting user data');

      let url = `./database/updatedprofile.php?email=${this.email}`;
      axios.get(url).then((result) => {
        let data = result.data[0];
        data.isLogin = true;
        console.log('User data is');
        console.log(result.data);
        sessionStorage.setItem("userSession", JSON.stringify(data));
        this.$store.state.userInfo = data;
      });
    },
    deductPoints(points, rCode, rDescription) {
      let url = `./database/deductpoints.php?email=${this.email}&greenpoints=${points}&rewardname=${rDescription}&rewardcode=${rCode}`;
      url = encodeURI(url);
      axios.post(url).then(() => {
        this.$bvModal.show("coupon-deducted");
        url = `./database/updatedprofile.php?email=${this.email}`;
        url = encodeURI(url);
        axios.get(url).then((result) => {
          let data = result.data[0];
          data.isLogin = true;
          sessionStorage.setItem("userSession", JSON.stringify(data));
          this.$store.state.userInfo = data;
        });
      });
    },
    updateInfo() {
      console.log(this.newpassword);

      alert("about to send data");
      let url = `./database/editprofile.php?fname=${this.newfname}&lname=${this.newlname}&email=${this.email}&mobileno=${this.newmobileno}&password=${this.newpassword}`;
      url = encodeURI(url);
      postData(url, this.updateUsernameCallBack);
    },
    updateUsernameCallBack() {
      alert("call back success");
      let url = `./database/updatedprofile.php?email=${this.email}`;
      getData(url, this.getUpdatedProfileInfo);
    },

    getUpdatedProfileInfo(dataObj) {
      alert("user profile update call back");
      let data = JSON.parse(dataObj);
      if (data[0] != null) {
        data = data[0];
        data.isLogin = true;
        console.log(data);
        sessionStorage.setItem("userSession", JSON.stringify(data));
        this.$store.state.userInfo = data;
      }
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    checkSession() {
      alert("checking profile session");
      let user;
      if (sessionStorage.getItem("userSession")) {
        user = JSON.parse(sessionStorage.getItem("userSession"));
      } else if (localStorage.getItem("userStorage")) {
        user = JSON.parse(localStorage.getItem("userStorage"));
      }

      console.log(user);
      this.$store.state.userInfo = user;
      this.getUserData();
      this.getUserChartData();
    },
    getUserChartData() {
      let monthsWithEvents = {
        January: "",
        February: "",
        March: "",
        April: "",
        May: "",
        June: "",
        July: "",
        August: "",
        September: "",
        October: "",
        November: "",
        December: "",
      };
      let chartData = [["Month", "# of Events Joined"]];
      let currentYear = new Date().getFullYear();
      let url = `./database/get_countevent.php?email=${this.email}&year=${currentYear}`;
      url = encodeURI(url);
      axios.get(url).then((result) => {
        result.data.forEach((event) => {
          let date = event.endDatetime;
          let dateArray = date.split(/\D+/);
          let month = dateArray[1];
          month = this.$store.state.monthNames[--month];
          console.log(month);

          if (monthsWithEvents[month] === "") {
            alert("found matching month");
            monthsWithEvents[month] = [month, 1];
          } else {
            monthsWithEvents[month] = [month, monthsWithEvents[month][1] + 1];
          }
          console.log(Array.isArray(monthsWithEvents[month]));
        });
        for (var month in monthsWithEvents) {
          if (Array.isArray(monthsWithEvents[month])) {
            chartData.push(monthsWithEvents[month]);
          }
        }
        console.log(chartData);
        this.$store.state.chartData = chartData;
      });
    },
  },
  computed: {
    isChartData() {
      return this.$store.state.chartData.length > 1;
    },
    chartData() {
      return this.$store.state.chartData;
    },
    hiddenPass() {
      let pass;
      if (!this.isVisible) {
        pass = this.$store.state.userInfo.password;
        console.log(pass);
        let hiddenPass = "";
        for (let x = 0; x < pass.length; x++) {
          hiddenPass += "*";
        }
        return hiddenPass;
      }
      return this.$store.state.userInfo.password;
    },
    userInfo() {
      let userInfo = sessionStorage.getItem("userSession");
      console.log(userInfo);
      return userInfo;
    },

    fname() {
      return this.$store.state.userInfo.fname;
    },
    lname() {
      return this.$store.state.userInfo.lname;
    },
    email() {
      return this.$store.state.userInfo.email;
    },
    mobileNo() {
      return this.$store.state.userInfo.mobileno;
    },
    gPoints() {
      return this.$store.state.userInfo.greenpoints;
    },
    userRewards() {
      return this.$store.state.userRewards;
    },
    eventCount() {
      return this.$store.state.userInfo.numofevents;
    },
  },
};
</script>
<style lang="scss">
.user-info {
  background-color: #f1f3f6 !important;
  border-radius: 1rem;
}
#tooltip-bronze,
#tooltip-silver,
#tooltip-gold {
  transition: transform 0.3s linear;
  &:hover {
    transform: scale(1.2);
  }
}
@media only screen and (max-width: 426px) {
  .responsive-text {
    font-size: 0.7rem;
  }
  .responsive-button-text {
    font-size: 0.7rem;
  }
}
</style>
