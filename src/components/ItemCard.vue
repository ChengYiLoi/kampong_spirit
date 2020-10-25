<template>
  <b-card
    :title="`${item.name}`"
    class="card-info mt-4"
    @click="showModal(item)"
  >
    <b-row>
      <b-col>
        <b-img class="w-50" fluid :src="'./images/' + `${imgUrl}`"> </b-img>
      </b-col>
    </b-row>
    <hr />
    <b-container fluid class="item-info">
      <b-row class="p-2 text-left">
        <b-col cols="12">Status: {{ item.status }}</b-col>

        <b-col cols="12" v-if="isDisplayMarketItems">
          Listed by: {{ item.fname }}
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          Condition: <strong>{{ item.state }} </strong></b-col
        >
      </b-row>
    </b-container>

    <b-modal :id="`${item.name}`" centered :title="`${item.name}`" hide-footer>
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
        <div>
          <b-row class="pb-2">
            <b-col class="pr-0"
              ><b-button class=" w-100" variant="danger">Close</b-button></b-col
            >
            <b-col class="pl-1"
              ><b-button
                @click="displayChat('CWD')"
                class="w-100"
                variant="success"
                >Chat With Donor</b-button
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
              @click="deleteItem(`${item['iID']}`)"
              variant="danger"
              class="w-100"
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

    <b-modal :id="`${item.name}-edit`" centered title="Edit Item" hide-footer>
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
      </b-form>

      <template>
        <b-row class="pb-2">
          <b-col class="pr-0"
            ><b-button class=" w-100" variant="danger">Cancel</b-button></b-col
          >
          <b-col class="pl-1"
            ><b-button
              class="w-100"
              variant="success"
              @click="updateItemInfo(`${item['iID']}`)"
              >Save</b-button
            ></b-col
          >
        </b-row>
      </template>
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
    };
  },
  methods: {
    displayChat(type) {
      if (!this.validateLogin()) {
        alert("user has not logged in");
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

      let picName = "";
      let email = this.$store.state.userInfo["email"];
      if (this.itemPicture != null) {
        picName = this.itemPicture.name;
      }
      let url = `processedit.php?image=${picName}&itemName=${this.itemName}&itemCat=${this.selectedCategory}&condition=${this.selectedCondition}&description=${this.itemDescription}&DeliveryType=${this.selectedDeliveryType}&iID=${iID}&location=${this.location}`;
      postData(url, this.updateItemInfoCallBack);
      this.$bvModal.hide(`${this.item.name}-edit`);
      console.log(`iID is ${iID}`);
      console.log(`email is ${email}`);
    },
    updateItemInfoCallBack() {
      alert("item info updated");
    },
    updateItemStatus(type, iID) {
      //updates whether it is reserved or open
      let email = this.$store.state.userInfo["email"];
      let url = `updatechatitemstatus.php?newstatus=${type}&email=${email}&iID=${iID}`;

      postData(url, this.itemStatusCallback);
      // this.$bvModal.hide(`${this.item.name}`);
    },
    itemStatusCallback() {
      if (this.$store.state.isDisplayMarketItems) {
        this.getItems();
      } else {
        this.getUserItems();
      }
    },

    showModal(item) {
      // show or hide the modal, if the item is donated, it will not show
      if (item.status != "Donated") {
        this.$bvModal.show(this.item.name);
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
      this.$bvModal.show(`${item.name}-edit`);
    },
    deleteItem(iID) {
      // deletes the item
      let email = this.$store.state.userInfo["email"];
      let url = `deleteitem.php?iID=${iID}&email=${email}`;
      url = encodeURI(url);
      axios.post(url).then(() => {
        if (!this.isDisplayMarketItems) {
          alert("display market place is false");
          url = `getUserItems.php?useremail=${email}`;
          url = encodeURI(url);
          axios.post(url).then((result) => {
            this.$store.state.userItems = result.data;
          });
        } else {
          alert("display market place is true");
          url = `getItems.php`;
          axios.post(url).then((result) => {
            this.$store.state.items = result.data;
          });
          
        }
      });

      this.$bvModal.hide(`${this.item.name}`);
    },
  },

  computed: {
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
    background-color: #aaccaa;
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
</style>
