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
    <div class="main h-100 p-4" v-if="!isLoading">
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
          <b-modal id="user-name" centered title="Change Name" hide-footer>
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
            <b-alert show v-if="cNameError" variant="warning">
              <ul>
                <li v-if="newfname == ''">First name cannot be empty</li>
                <li v-if="newlname == ''">Last name cannot be empty</li>
              </ul>
            </b-alert>
            <template>
              <b-row>
                <b-col>
                  <b-button
                    class="w-100"
                    @click="$bvModal.hide('user-name')"
                    variant="danger"
                    >Cancel</b-button
                  >
                </b-col>
                <b-col>
                  <b-button
                    class="w-100"
                    @click="validateName"
                    variant="success"
                    >Update</b-button
                  >
                </b-col>
              </b-row>
            </template>
            <!-- <template>
              <div class="mt-2">
                <b-row>
                  <b-col>
                    <b-button
                      variant="danger"
                      @click="$bvModal.hide('user-name')"
                      >Cancel</b-button
                    >
                  </b-col>
                  <b-col>
                    <b-button @click="updateInfo">Update</b-button>
                  </b-col>
                </b-row>
              </div>
            </template> -->
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
            hide-footer
          >
            <b-form-group label="Current Password: " label-for="oPassword">
              <b-form-input
                v-model="oldpassword"
                id="oPassword"
                type="password"
              ></b-form-input>
              <b-form-group label="New Password: " label-for="nPassword">
                <b-form-input
                  v-model="newpassword"
                  id="nPassword"
                  type="password"
                  placeholder="At least 6 characters"
                ></b-form-input>
              </b-form-group>
            </b-form-group>
            <b-form-group label="Confirm Password: " label-for="cPassword">
              <b-form-input
                v-model="confirmpassword"
                id="cPassword"
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-alert variant="warning" show v-if="cPasswordError">
              <ul>
                <li v-if="getPassword != oldpassword">
                  Current password is invalid
                </li>
                <li v-if="newpassword < 6">
                  Password length must be at least 6 characters
                </li>
                <li v-if="newpassword != confirmpassword">
                  New password and confirm password does not match
                </li>
              </ul>
            </b-alert>
            <template>
              <b-row>
                <b-col>
                  <b-button class="w-100" @click="resetPass" variant="danger"
                    >Cancel</b-button
                  >
                </b-col>
                <b-col>
                  <b-button
                    class="w-100"
                    @click="validatePassword"
                    variant="success"
                    >Update</b-button
                  >
                </b-col>
              </b-row>
            </template>
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
            hide-footer
          >
            <b-form-group label="New Phone Number: " label-for="newNumber">
              <b-form-input
                v-model="newmobileno"
                id="newNumber"
                type="text"
              ></b-form-input>
            </b-form-group>
            <b-alert variant="warning" show v-if="cNumberError">
              <ul>
                <li>
                  Number cannot be empty
                </li>
              </ul>
            </b-alert>
            <template>
              <b-row>
                <b-col>
                  <b-button class="w-100" @click="resetNum" variant="danger"
                    >Cancel</b-button
                  >
                </b-col>
                <b-col>
                  <b-button
                    class="w-100"
                    @click="validateNumber"
                    variant="success"
                    >Update</b-button
                  >
                </b-col>
              </b-row>
            </template>
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
                v-for="reward in rewards"
                :key="reward.code"
                :disabled="gPoints < reward['cost'] ? true : false"
                class="w-100 my-1"
                :variant="gPoints < reward['cost'] ? 'dark' : 'success'"
                @click="deductPoints(reward['cost'], reward['cDescription'])"
                >{{ reward["bDescription"] }}</b-button
              >
            </b-container>

            <b-modal
              id="coupon-deducted"
              ok-only
              ok-title="close"
              ok-variant="danger"
              centered
            >
              <p class="w-100 text-center">
                Green points have been successfully deducted. Click
                <strong>View Rewards</strong> to view the coupon code
              </p>
            </b-modal>
          </b-modal>
        </b-row>

        <b-row class="pt-2 mt-5">
          <b-col class="text-center">
            <b-button v-b-modal="'view-rewards'" variant="info"
              >View Rewards</b-button
            >
          </b-col>
          <b-modal id="view-rewards" hide-footer centered>
            <b-table
              hover
              head-variant="light"
              bordered
              :items="userRewards"
              :fields="fields"
              selectable
              @row-selected="onRowSelected"
            >
            </b-table>
            <!-- <b-row v-for="reward in userRewards" :key="reward['rewardcode']">
              <b-col>{{ reward["rewardname"] }}</b-col>
              <b-col>{{ reward["rewardcode"] }}</b-col>
            </b-row> -->
            <template>
              <b-row>
                <b-col>
                  <b-button
                    class="w-100"
                    @click="$bvModal.hide('view-rewards')"
                    variant="danger"
                    >Close</b-button
                  >
                </b-col>
                <b-col v-if="selected.length > 0">
                  <b-button class="w-100" @click="deleteRow" variant="success"
                    >Delete</b-button
                  >
                </b-col>
              </b-row>
            </template>
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
        <div class="user-info p-2">
          <h3 class="text-center responsive-text">
            <strong>Achivements</strong>
          </h3>
          <b-row>
            <b-col class="" id="tooltip-bronze">
              <b-tooltip target="tooltip-bronze" triggers="hover">
                {{
                  eventCount >= 5
                    ? "Achievement for participating 5 events"
                    : "Unlocks when you have participated 5 events"
                }}
              </b-tooltip>
              <b-img
                v-if="eventCount >= 5"
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
                  eventCount >= 10
                    ? "Achievement for participating 10 events"
                    : "Unlocks when you have participated 10 events"
                }}
              </b-tooltip>
              <b-img
                v-if="eventCount >= 10"
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
                  eventCount == 20
                    ? "Achievement for participating 20 events"
                    : "Unlocks when you have participated 20 events"
                }}
              </b-tooltip>
              <b-img
                v-if="eventCount == 20"
                fluid
                :src="require('../assets/goldMedalUnlocked.svg')"
              ></b-img>
              <b-img
                v-else
                fluid
                :src="require('../assets/goldMedalLocked.svg')"
              ></b-img>
            </b-col>
            <!-- Image references:
            https://www.flaticon.com/free-icon/medal_3428106?term=badges%20eco&page=1&position=1 -->
          </b-row>
        </div>
      </div>
    </div>
    <b-spinner
      class="spinner-center"
      style="width: 5rem; height: 5rem"
      label="spinner"
      variant="success"
      v-else
    ></b-spinner>
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
  created() {
    this.toggleLoading();
    this.getUserData();
  },
  data() {
    return {
      rewards: [
        {
          cDescription: "Amazon $10 off",
          bDescription: "Amazon coupon code (50 Green Points)",
          cost: 50,
          code: "10OFF",
        },
        {
          cDescription: "Grab Food $2 off",
          bDescription: "Grab coupon code (10 Green Points)",
          cost: 10,
          code: "2OFF",
        },
        {
          cDescription: "Foodpanda $5 off",
          bDescription: "Foodpanda coupon code (10 Green Points)",
          cost: 10,
          code: "5OFF",
        },
      ],
      fields: [
        {
          key: "rewardname",
          label: "Reward Name",
        },
        {
          key: "rewardcode",
          label: "Reward Code",
        },
      ],
      isVisible: false,
      newfname: "",
      newlname: "",
      newmobileno: "",
      newpassword: "",
      confirmpassword: "",
      oldpassword: "",
      cNameError: false,
      cPasswordError: false,
      cNumberError: false,
      selected: [],
      chartOptions: {
        title: `Number of Events Joined for ${currentYear}`,
      },
    };
  },
  methods: {
    deleteRow() {
      let url;
      this.selected.forEach((obj) => {
        url = `./database/deletereward.php?rewardcode=${obj["rewardcode"]}&email=${this.email}`;
       
        axios.post(url);
      });
      this.getUserRewards();
    },
    onRowSelected(items) {
      this.selected = items;
    
    },
    resetNum() {
      this.newmobileno = "";
      this.$bvModal.hide("phonenum");
    },
    resetPass() {
      this.newpassword = "";
      this.confirmpassword = "";
      this.oldpassword = "";
      this.$bvModal.hide("user-password");
    },
    resetName() {
      this.newfname = "";
      this.newlname = "";
      this.$bvModal.hide("user-name");
    },
    toggleLoading() {
      this.$store.commit('toggleLoading');
    },
    getUserRewards() {
      let url = `./database/userrewards.php?email=${this.email}`;
      axios.get(url).then((result) => {
        this.$store.state.userRewards = result.data;
      
      });
    },
    getUserData() {
      let url = `./database/updatedprofile.php?email=${this.email}`;
      axios.get(url).then((result) => {
        this.getUserRewards();
        this.getUserChartData();
        setTimeout(() => {
          this.toggleLoading();
          let data = result.data[0];
          data.isLogin = true;
         
          // sessionStorage.setItem("userSession", JSON.stringify(data));
          this.$store.state.userInfo = data;
        }, 1800);
      });
    },
    generateCode(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    },
    deductPoints(points, rDescription) {
      let rCode = this.generateCode(5);
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
          this.getUserRewards();
        });
      });
    },
    validateName() {
      this.cNameError = false;

      if (this.newfname == "") {
        this.cNameError = true;
      }
      if (this.newlname == "") {
        this.cNameError = true;
      }
      if (!this.cNameError) {
        this.updateInfo();
        this.newfname = "";
        this.newlname = "";
      }
    },
    validatePassword() {
      this.cPasswordError = false;

      if (this.getPassword != this.oldpassword) {
        this.cPasswordError = true;
      }
      if (this.newpassword.length < 6) {
        this.cPasswordError = true;
      }
      if (this.newpassword != this.confirmpassword) {
        this.cPasswordError = true;
      }
      if (!this.cPasswordError) {
        this.updateInfo();
        this.newpassword = "";
        this.oldpassword = "";
        this.confirmpassword = "";
      } else {
        this.$bvModal.show("user-password");
      }
    },
    validateNumber() {
      this.cNumberError = false;
      if (this.newmobileno == "") {
        this.cNumberError = true;
      }
      if (!this.cNumberError) {
        this.updateInfo();
        this.newmobileno == "";
      } else {
        this.$bvModal.show("phonenum");
      }
    },
    updateInfo() {
     
      let url = `./database/editprofile.php?fname=${this.newfname}&lname=${this.newlname}&email=${this.email}&mobileno=${this.newmobileno}&password=${this.newpassword}`;
      url = encodeURI(url);
      postData(url, this.updateUsernameCallBack);
    },
    updateUsernameCallBack() {
      let url = `./database/updatedprofile.php?email=${this.email}`;
      getData(url, this.getUpdatedProfileInfo);
    },
    updateSession(data) {
      sessionStorage.setItem("userSession", JSON.stringify(data));
      if (localStorage.getItem("userStorage") != null) {
        localStorage.setItem("userStorage", JSON.stringify(data));
      }
    },
    getUpdatedProfileInfo(dataObj) {
      this.toggleLoading();
      setTimeout(() => {
        let data = JSON.parse(dataObj);
        if (data[0] != null) {
          data = data[0];
          data.isLogin = true;
        
          this.updateSession(data);
          this.toggleLoading();
          // sessionStorage.setItem("userSession", JSON.stringify(data));
          this.$store.state.userInfo = data;
        }
      }, 3000);
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    checkSession() {
     
      let user;
      if (sessionStorage.getItem("userSession")) {
        user = JSON.parse(sessionStorage.getItem("userSession"));
      } else if (localStorage.getItem("userStorage")) {
        user = JSON.parse(localStorage.getItem("userStorage"));
      }

     
      this.$store.state.userInfo = user;
      this.getUserData();
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
         

          if (monthsWithEvents[month] === "") {
            // alert("found matching month");
            monthsWithEvents[month] = [month, 1];
          } else {
            monthsWithEvents[month] = [month, monthsWithEvents[month][1] + 1];
          }
         
        });
        for (var month in monthsWithEvents) {
          if (Array.isArray(monthsWithEvents[month])) {
            chartData.push(monthsWithEvents[month]);
          }
        }
       
        this.$store.state.chartData = chartData;
      });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isSpinner;
    },
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
    getPassword() {
      return this.$store.state.userInfo.password;
    },
  },
};
</script>
<style lang="scss">
table {
  tr {
    &:focus {
      outline: none;
    }
  }
}

.user-info {
  background-color: #f1f3f6 !important;
  border-radius: 1rem;
}
#tooltip-bronze,
#tooltip-silver,
#tooltip-gold {
  transition: transform 0.3s linear;
  &:hover {
    transform: scale(1.07);
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
