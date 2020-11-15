<template>
  <b-card
    :title="`${item.name}`"
    class="card-info mt-4 pt-3"
    @click="showModal(item)"
  >
    <b-row>
      <b-col>
        <b-img class="w-50" :src="'./images/' + `${imgUrl}`"> </b-img>
      </b-col>
    </b-row>

    <b-row class=" text-left item-info m-0">
      <b-col cols="6" class="item-info-text">
        <b-row>
          <b-col><strong>Status</strong></b-col>
        </b-row>
        <b-row>
          <b-col>
            {{ item.status }}
          </b-col>
        </b-row>
      </b-col>
      <b-col class="text-left item-info-text">
        <b-row>
          <b-col><strong>Condition</strong></b-col>
        </b-row>
        <b-row>
          <b-col>{{ item.state }}</b-col>
        </b-row>
      </b-col>
      <!-- <b-col cols="6" v-if="isDisplayMarketItems" class="item-info-text">
        Listed by: {{ item.fname }}
      </b-col> -->
      <b-col cols="12"><br /></b-col>
      <b-col cols="12" class="text-right pb-2" v-if="isDisplayMarketItems">
        <b-row>
          <b-col class="listed-info">
            <p>
              <strong> Listed By: </strong>
              <span>
                {{ item.fname }}{{ item.lname }}
                <div id="profile-bg" class="d-inline">
                  <b-avatar
                    :src="'./images/' + `${item.profilepic}`"
                  ></b-avatar>
                  <!-- <b-img
                    id="item-profile"
                    :src="'./images/' + `${item.profilepic}`"
                  ></b-img> -->
                </div>
              </span>
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-modal :id="`${item.iID}`" centered :title="`${item.name}`" hide-footer>
      <b-img
        fluid
        class="d-block mx-auto w-50"
        :src="'./images/' + `${imgUrl}`"
      ></b-img>
      <div class="modal-info p-3">
        <p class="mt-2">Category: {{ item.category }}</p>
        <p>Condition: {{ item.state }}</p>
        <p>Description: {{ item.description }}</p>

        <p>Delivery type: {{ item.deliveryType }}</p>
        <p v-if="item.deliveryType == 'Meet Up'">
          Location: {{ item.location }}
        </p>
      </div>
      <template v-if="!isUserItems">
        <div class="mt-2">
          <b-row>
            <b-col class=""
              ><b-button
                class="w-100"
                variant="danger"
                @click="$bvModal.hide(`${item.iID}`)"
                >Close</b-button
              ></b-col
            >
            <b-col class=""
              ><b-button
                @click="displayChat('CWD')"
                class="w-100"
                variant="success"
                >Chat</b-button
              ></b-col
            >
          </b-row>
        </div>
      </template>

      <template v-else>
        <b-row class="pb-2">
          <b-col class="pr-0"
            ><b-button
              @click="
                updateItemStatus(
                  item.status == 'Reserved' ? 'Open' : 'Reserved',
                  `${item['iID']}`,
                )
              "
              class=" w-100"
              variant="secondary"
              >{{ checkItemStatus }}</b-button
            ></b-col
          >
          <b-col class="pl-1"
            ><b-button
              @click="updateItemStatus('Donated', `${item['iID']}`)"
              class="w-100"
              variant="primary"
              >Mark Donated</b-button
            ></b-col
          >
        </b-row>
        <b-row>
          <b-col class="pr-0"
            ><b-button
              variant="danger"
              class="w-100"
              @click="$bvModal.show(`item-delete-confirmation-${item['iID']}`)"
              >Delete</b-button
            ></b-col
          >

          <b-col class="pl-1"
            ><b-button variant="warning" class="w-100" @click="editItem(item)"
              >Edit</b-button
            ></b-col
          >
        </b-row>
        <b-row class="py-1">
          <b-col cols="12">
            <b-button
              variant="success"
              class="w-100"
              @click="displayChat('VC')"
            >
              View Chat
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-modal>

    <b-modal
      :id="`item-delete-confirmation-${item['iID']}`"
      ok-title="Yes"
      ok-variant="success"
      cancel-variant="danger"
      centered
      hide-header
      size="small"
      @ok="deleteItem(`${item['iID']}`)"
    >
      <p class="text-center">Remove {{ item.name }}?</p>
    </b-modal>

    <b-modal :id="`${item.iID}-edit`" centered title="Edit Item" hide-footer>
      <b-form class="modal-info p-3">
        <b-form-group label="Item Picture:" label-for="itemPicture">
          <b-form-file id="itemPicture" v-model="itemPicture"></b-form-file>
        </b-form-group>
        <b-form-group label="Item Name:" label-for="itemName">
          <b-form-input v-model="itemName" id="itemName" type="text" required>
          </b-form-input>
        </b-form-group>
        <b-form-group label="Category:" label-for="itemCategory">
          <b-form-select
            id="itemCategory"
            required
            v-model="selectedCategory"
            :options="itemCategoryDropdown"
          >
          </b-form-select>
        </b-form-group>
        <b-form-group label="Item Condition: " label-for="itemCondition">
          <b-form-radio-group
            id="itemCondition"
            :options="itemConditionRadio"
            v-model="selectedCondition"
            stacked
          >
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Description: " label-for="itemDescription">
          <b-form-textarea
            id="itemDescription"
            v-model="itemDescription"
            rows="3"
            max-rows="6"
          >
          </b-form-textarea>
        </b-form-group>
        <b-form-group label="Delivery Type: " label-for="deliveryType">
          <b-form-radio-group
            id="deliveryType"
            :options="deliveryTypeRadio"
            v-model="selectedDeliveryType"
            stacked
          >
          </b-form-radio-group>
        </b-form-group>
        <b-form-group
          v-if="selectedDeliveryType == 'Meet Up'"
          label="Location:"
          label-for="location"
        >
          <b-form-input v-model="location" id="location" type="text" required>
          </b-form-input>
        </b-form-group>
        <b-alert :show="isErrors" class="w-100" variant="warning">
          <ul>
            <li v-if="isNameEmpty">Item name cannot be empty</li>
            <li v-if="isDescriptionEmpty">Item description cannot be empty</li>
            <li v-if="isLocationEmpty">Meet up location cannot be empty</li>
          </ul>
        </b-alert>
      </b-form>

      <template>
        <b-row class="pb-2">
          <b-col class="pr-0"
            ><b-button
              @click="resetEditFields(`${item.iID}-edit`)"
              class="w-100"
              variant="danger"
              >Cancel</b-button
            ></b-col
          >
          <b-col class="pl-1"
            ><b-button
              class="w-100"
              variant="success"
              @click="updateItemInfo(`${item['iID']}`)"
            >
              <div v-if="!isButtonLoading">Save</div>
              <b-spinner label="spinning" v-else></b-spinner> </b-button
          ></b-col>
        </b-row>
      </template>
    </b-modal>
    <b-modal
      :id="`image-formats-${item.iID}`"
      ok-only
      ok-title="Close"
      ok-variant="danger"
      hide-header
      centered
    >
      <p class="text-center">
        Image upload only allows file types of
        <strong>GIF, PNG, JPG, JPEG and BMP</strong>
      </p>
    </b-modal>
  </b-card>
</template>
<script>
import postData from "../postData";
var axios = require("axios");
export default {
  props: ["item"],

  data() {
    return {
      itemPicture: null,
      itemName: null,
      selectedCategory: null,
      selectedCondition: null,
      itemDescription: null,
      selectedDeliveryType: null,
      location: null,
      isErrors: false,
      isNameEmpty: false,
      isDescriptionEmpty: false,
      isLocationEmpty: false,
    };
  },
  methods: {
    toggleButtonLoading() {
      this.$store.commit("toggleButtonLoading");
    },
    resetEditFields(modalName) {
      // reset the edit form fields and displaying the modal
      this.itemName = null;
      this.selectedCategory = null;
      this.selectedCondition = null;
      this.itemDescription = null;
      this.selectedDeliveryType = null;
      this.location = null;
      this.$bvModal.hide(modalName);
    },
    displayChat(type) {
      // redirects to the chat function
      if (!this.validateLogin()) {
        this.$router.push({ name: "Login" });
      } else {
        if (type == "CWD") {
          window.location.replace(
            `chat.html?receiver=${this.item.listedBy}&iID=${this.item.iID}&sender=${this.currentUserEmail}`,
          );
        } else {
          window.location.replace(
            `itemchatlobby.html?user=${this.item["listedBy"]}&iID=${this.item["iID"]}`,
          );
        }
      }
    },
    validateLogin() {
      let isLogged = false;
      if (localStorage.getItem("userStorage") != null) {
        isLogged = true;
      } else if (sessionStorage.getItem("userSession") != null) {
        isLogged = true;
      }
      return isLogged;
    },
    updateItemInfo(iID) {
      this.isErrors = false;
      let picName = "";

      let email = this.$store.state.userInfo["email"];
      if (this.itemName == "") {
        this.isErrors = true;
        this.isNameEmpty = true;
      }
      if (this.itemDescription == "") {
        this.isErrors = true;
        this.isDescriptionEmpty = true;
      }
      if (this.selectedDeliveryType == "Meet Up" && this.location == "") {
        this.isErrors = true;
        this.isLocationEmpty = true;
      }

      if (!this.isErrors) {
        // if there are no validation errors, append the image file to the form data obj
        let url;
        if (this.itemPicture != null) {
          picName = this.itemPicture.name;
          let fd = new FormData();
          fd.append("itemPicture", this.itemPicture);
          url = `./database/addimage.php?`;
          url = encodeURI(url);
          let itemPictureName = this.itemPicture["name"];
          let extension = itemPictureName
            .substring(itemPictureName.lastIndexOf(".") + 1)
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
            axios.post(url, fd);
            url = `./database/processedit.php?image=${picName}&itemName=${this.itemName}&itemCat=${this.selectedCategory}&condition=${this.selectedCondition}&description=${this.itemDescription}&DeliveryType=${this.selectedDeliveryType}&iID=${iID}&location=${this.location}`;
            url = encodeURI(url);
            this.toggleButtonLoading();
            axios.post(url).then(() => {
              setTimeout(() => {
                this.toggleButtonLoading();
                if (this.$store.state.isDisplayMarketItems) {
                  url = `./database/getItems.php`;
                } else {
                  url = `./database/getUserItems.php?useremail=${email}`;
                }
                url = encodeURI(url);
                axios.get(url).then((result) => {
                  this.$bvModal.hide(`${this.item.iID}-edit`);
                  if (this.$store.state.isDisplayMarketItems) {
                    this.$store.state.items = result.data;
                  } else {
                    this.$store.state.userItems = result.data;
                  }
                });
              }, 1300);
            });
          }
          else{
            this.$bvModal.show(`image-formats-${this.item.iID}`);
          }
        }

        // postData(url, this.updateItemInfoCallBack);
      }
    },

    updateItemStatus(type, iID) {
      //updates whether it is reserved or open
      this.$bvModal.hide(`${this.item.iID}`);
      let email = this.$store.state.userInfo["email"];
      let url = `./database/updatechatitemstatus.php?newstatus=${type}&email=${email}&iID=${iID}`;
      url = encodeURI(url);
      postData(url, this.itemStatusCallback);
    },
    itemStatusCallback() {
      let url;
      if (this.$store.state.isDisplayMarketItems) {
        
        url = `./database/getItems.php`;
        axios.get(url).then((response) => {
          this.$store.state.items = response.data;
        });
      } else {
        let email = this.currentUserEmail;
        url = `./database/getUserItems.php?useremail=${email}`;
        axios.get(url).then((response) => {
          this.$store.state.userItems = response.data;
        });
    
      }
    },

    showModal(item) {
      // show or hide the modal, if the item is donated, it will not show
      if (item.status != "Donated") {
        this.$bvModal.show(this.item.iID);
      }
    },
    editItem(item) {
      //displays the modal of the edit item form
      this.itemName = item.name;
      this.selectedCategory = item.category;
      this.selectedCondition = item.state;
      this.itemDescription = item.description;
      this.selectedDeliveryType = item.deliveryType;
      this.location = item.location;
      this.$bvModal.hide(`${item.name}`);
      this.$bvModal.show(`${item.iID}-edit`);
    },
    deleteItem(iID) {
      // deletes the item
      let email = this.$store.state.userInfo["email"];
      let url = `./database/deleteitem.php?iID=${iID}&email=${email}`;
      url = encodeURI(url);
      axios.post(url).then(() => {
        if (!this.isDisplayMarketItems) {
          url = `./database/getUserItems.php?useremail=${email}`;
          url = encodeURI(url);
          axios.post(url).then((result) => {
            this.$store.state.userItems = result.data;
          });
        } else {
          url = `./database/getItems.php`;
          axios.post(url).then((result) => {
            this.$store.state.items = result.data;
          });
        }
      });

      this.$bvModal.hide(`${this.item.name}`);
    },
  },

  computed: {
    isButtonLoading() {
      return this.$store.state.isButtonSpinner;
    },
    checkItemStatus() {
      var result = "Mark as Reserved";
      if (this.item.status == "Reserved") {
        result = "Mark as Open";
      }
      return result;
    },
    isDisplayMarketItems() {
      return this.$store.state.isDisplayMarketItems;
    },
    imgUrl() {
      var url = this.item.image;
      if (this.item.image == "NA") {
        return "noimage.png";
      }
      return url;
    },
    isUserItems() {
      let result = false;
      let user = "";
      if (localStorage.getItem("userStorage") != null) {
        user = JSON.parse(localStorage.getItem("userStorage"));
      } else if (sessionStorage.getItem("userSession") != null) {
        user = JSON.parse(sessionStorage.getItem("userSession"));
      }
      if (user["email"] == this.item.listedBy) {
        result = true;
      }

      return result;
    },
    itemCategoryDropdown() {
      return this.$store.state.itemCategoryDropdown;
    },
    itemConditionRadio() {
      return this.$store.state.itemConditionRadio;
    },
    deliveryTypeRadio() {
      return this.$store.state.deliveryTypeRadio;
    },
    currentUserEmail() {
      if (sessionStorage.getItem("userSession") != null) {
        let user = JSON.parse(sessionStorage.getItem("userSession"));
        return user["email"];
      }
      return "";
    },
  },
};
</script>
<style lang="scss">
$white: rgb(245, 245, 245);

.item-options {
  border-radius: 0px;
}

#profile-bg {
  img {
    width: 2.5rem;
  }
}
.card-title {
  font-weight: bold;
}
.card-body {
  padding: 0px !important;
}
.item-bg {
  background-color: #f2f2f2;
}
.card-info {
  cursor: pointer;
  background-color: #f1f3f6;
  hr {
    border-top: 1.5px solid #6cc49a;
  }
  transition: transform 0.3s linear;
  &:hover {
    transform: scale(1.05);
    //Need to restate hover transition because if session exist,
    //Card.vue wont be loaded which has the .card-info with transition properties stated
  }
  &:focus {
    outline: none;
  }

  .item-info {
    background-color: #e7e6e6;
    border-radius: 5px;
  }
}
.modal-content {
  border: unset;

  header {
    background-color: #f4976c;
    color: $white;
    button {
      color: $white;

      &:hover {
        color: $white;
        opacity: 1;
      }
    }
  }
  .modal-info {
    background-color: #eeeff1;
    border-radius: 5px;
  }
}
@media only screen and (max-width: 768px) {
  .item-info-text {
    font-size: 1rem;
  }
  .card-info {
    cursor: pointer;
    transition: unset;
    &:hover {
      transform: unset;
      //Need to restate hover transition because if session exist,
      //Card.vue wont be loaded which has the .card-info with transition properties stated
    }
    &:focus {
      outline: none;
    }
    .listed-info {
      font-size: 0.8rem;
    }
  }
}
@media only screen and (max-width: 425px) {
  .card-info {
    .listed-info {
      font-size: 1.3rem;
    }
  }
}
</style>
