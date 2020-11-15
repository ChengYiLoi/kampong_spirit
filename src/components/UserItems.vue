<template>
  <b-container fluid>
    <b-row class="pt-2">
      <b-col></b-col>
      <b-col cols="2">
        <b-button class="w-100 d-block mx-auto" @click="toggleAddItemForm"
          >Add new Item</b-button
        >
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-group columns>
          <div v-for="item in userItems" :key="item.iID" :item="item">
            <itemcard v-if="filter[item.category]" :item="item"></itemcard>
          </div>
        </b-card-group>
      </b-col>
    </b-row>
    <b-modal id="addNewItemForm" centered title="New Item" hide-footer>
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
        <b-alert variant="warning" v-if="isCreateErrors" show>
          <ul>
            <li v-if="itemName == null">
              Item name cannot be empty
            </li>
            <li v-if="selectedCategory == null">
              Please select a category
            </li>
            <li v-if="selectedCondition == null">
              Please indicate the item condition
            </li>
            <li v-if="itemDescription == null">
              Item description cannot be empty
            </li>
            <li v-if="selectedDeliveryType == null">
              Please indicate the delivery type
            </li>
          </ul>
        </b-alert>
        <template>
          <div class="mt-2">
            <b-row>
              <b-col class=""
                ><b-button
                  class="w-100"
                  variant="danger"
                  @click="$bvModal.hide('addNewItemForm')"
                  >Cancel</b-button
                ></b-col
              >
              <b-col class=""
                ><b-button @click="addItem" class="w-100" variant="success"
                  >Add</b-button
                ></b-col
              >
            </b-row>
          </div>
        </template>
      </b-form>
    </b-modal>
    <b-modal
      id="image-formats"
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
      isCreateErrors: false,
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
    toggleAddItemForm(){
      this.itemPicture = null;
      this.itemName = null;
      this.selectedCategory = null;
      this.selectedCondition = null;
      this.itemDescription = null;
      this.selectedDeliveryType = null;
      this.location = null;
      this.$bvModal.show('addNewItemForm');
    },
    toggleLoading() {
      this.$store.state.isSpinner = !this.$store.state.isSpinner;
    },
    addItem() {
      this.isCreateErrors = false;
      if (this.itemName == "") {
        this.isCreateErrors = true;
      }
      if (this.selectedCategory == null) {
        this.isCreateErrors = true;
      }
      if (this.selectedCondition == null) {
        this.isCreateErrors = true;
      }
      if (this.itemDescription == null) {
        this.isCreateErrors = true;
      }
      if (this.selectedDeliveryType == null) {
        this.isCreateErrors = true;
      }
      if (!this.isCreateErrors) {
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
          this.$bvModal.show("image-formats");
        }
      } else {
        this.$bvModal.show("addNewItemForm");
      }

      // getData(url, this.itemAdded);
    },
  },
  computed: {
    filter() {
      return this.$store.state.itemFilter;
    },
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
