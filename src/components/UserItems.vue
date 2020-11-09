<template>
  <b-container fluid>
    <b-row class="pt-2">
      <b-col></b-col>
      <b-col cols="2">
        <b-button class="w-100 d-block mx-auto" v-b-modal="'addNewItemForm'"
          >Add new Item</b-button
        >
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-group columns>
          <itemcard
            v-for="item in userItems"
            :key="item.iID"
            :item="item"
          ></itemcard>
        </b-card-group>
      </b-col>
    </b-row>
    <b-modal
      id="addNewItemForm"
      centered
      title="New Item"
      ok-title="Add"
      @ok="onSubmit"
    >
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
    </b-modal>
  </b-container>
</template>
<script>
import itemcard from "./ItemCard";
// import getData from "../getData";
var axios = require("axios");
export default {
  components: {
    itemcard,
  },

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
    toggleLoading() {
      this.$store.state.isSpinner = !this.$store.state.isSpinner;
    },
    onSubmit() {
      var fd = new FormData();

      fd.append("itemPicture", this.itemPicture);
      if (this.itemPicture == null) {
        this.itemPicture = { name: "noimage.png" };
      }
      let itemPictureName = this.itemPicture["name"];
      var extension = itemPictureName
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
        this.toggleLoading();
        let url = `./database/addItems.php?pictureName=${itemPictureName}&itemName=${this.itemName}&selectedCategory=${this.selectedCategory}&selectedCondition=${this.selectedCondition}&itemDescription=${this.itemDescription}&selectedDeliveryType=${this.selectedDeliveryType}&location=${this.location}&userEmail=${this.userEmail}`;
        url = encodeURI(url);
        axios.post(url).then(() => {
          url = `./database/addimage.php?`;
          axios.post(url, fd).then(() => {
            url = `./database/getUserItems.php?useremail=${this.userEmail}`;
            axios.get(url).then((result) => {
              setTimeout(() => {
                this.toggleLoading();
                console.log(result);
                this.$store.state.userItems = result.data;
              }, 1800);
            });
          });
        });
      } else {
        alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP.");
      }
      // getData(url, this.itemAdded);
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isSpinner;
    },
    userItems() {
      return this.$store.state.userItems;
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
    userEmail() {
      let user = JSON.parse(sessionStorage.getItem("userSession"));
      return user["email"];
    },
  },
};
</script>
<style lang="scss"></style>
