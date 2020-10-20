<template>
  <div id="full-height">
    <div id="banner">
      <b-row>
        <b-col>
          <dashbar></dashbar>
        </b-col>
        <b-col cols="8">
          <h1 class="d-inline pt-4">Profile</h1>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
    <div class="main h-100 p-4">
      <b-container fluid class="text-left user-info p-3">
        <b-row align-v="center">
          <b-col cols="10">
            <div class="py-2">
              <h2 class="d-inline">
                <strong>First Name: </strong> <span>{{ fname }}</span>
              </h2>
              <h2 class="d-inline ml-5">
                <strong>Last Name: </strong> <span>{{ lname }}</span>
              </h2>
            </div>
          </b-col>
          <b-col>
            <b-button class="w-100" v-b-modal="'user-name'" variant="success"
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
          <b-col>
            <h2 class="py-2">
              <strong>Email: </strong>
              <span>{{ email }}</span>
            </h2>
          </b-col>
        </b-row>
        <b-row align-v="center">
          <b-col cols="10">
            <h2 class="py-2">
              <strong>Password: </strong>
              <span>{{ hiddenPass }}</span>
              <span class=" ml-5" v-on:click="toggleVisibility()"
                ><b-img
                  fluid
                  :src="
                    require('../assets/' +
                      `${isVisible ? 'hidden.svg' : 'visible.svg'}`)
                  "
                ></b-img
              ></span>
            </h2>
          </b-col>
          <b-col>
            <b-button
              v-b-modal="'user-password'"
              variant="success"
              class="w-100"
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
          <b-col cols="10">
            <h2 class="py-2">
              <strong>Mobile Number: </strong> <span>{{ mobileNo }}</span>
            </h2>
          </b-col>
          <b-col>
            <b-button class="w-100" v-b-modal="'phonenum'" variant="success"
              >Change Phone Number</b-button
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

        <h2 class="py-2">
          <strong>Green Points: </strong>
          <span>{{ gPoints }}</span>
        </h2>
      </b-container>
      <div class=" py-2 mt-4">
        <b-row class="px-5">
          <b-col class="px-5">
            <b-progress
              :value="gPoints"
              variant="warning"
              striped
              animated="true"
            ></b-progress>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col class="text-left">
            <b-img fluid :src="require('../assets/bronzeMedal.svg')"></b-img>
          </b-col>
          <b-col>
            <b-img fluid :src="require('../assets/silverMedal.svg')"></b-img>
          </b-col>
          <b-col class="text-right">
            <b-img fluid :src="require('../assets/goldMedal.svg')"></b-img>
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
export default {
  components: {
    dashbar,
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
    };
  },
  methods: {
    updateInfo() {
      console.log(this.newpassword);

      alert("about to send data");
      let url = `editprofile.php?fname=${this.newfname}&lname=${this.newlname}&email=${this.email}&mobileno=${this.newmobileno}&password=${this.newpassword}`;
      url = encodeURI(url);
      postData(url, this.updateUsernameCallBack);
    },
    updateUsernameCallBack() {
      alert("call back success");
      let url = `updatedprofile.php?email=${this.email}`;
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
    },
  },
  computed: {
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
  },
};
</script>
<style lang="scss">
.user-info {
  background-color: #f1f3f6 !important;
  border-radius: 1rem;
}
</style>
