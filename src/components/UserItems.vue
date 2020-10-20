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
          v-if="selectedDeliveryType == 'meetUp'"
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
import getData from '../getData';
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
      userEmail: 'dekubhna@gmail.com'
    };
  },
  methods: {
    onSubmit() {
      if (this.itemPicture == null) {
        this.itemPicture = { name: "noimage.png" };
      }

      let url = `addItems.php?pictureName=${this.itemPicture['name']}&itemName=${this.itemName}&selectedCategory=${this.selectedCategory}&selectedCondition=${this.selectedCondition}&itemDescription=${this.itemDescription}&selectedDeliveryType=${this.selectedDeliveryType}&location=${this.location}&userEmail=${this.userEmail}`;
      url = encodeURI(url);
      getData(url, this.itemAdded);

      
    },
    itemAdded(){
      alert('item added to db');
    }
  },
  computed: {
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
  },
};
</script>
<style lang="scss"></style>
