<template>
<b-container fluid id="main" class="p-0 m-0">
   <b-row align-v="stretch">
      <b-col cols="1">
        <dashbar></dashbar>
      </b-col>
      <b-col>
         <gmap></gmap>
      </b-col>
    </b-row>
</b-container>
   
   

</template>
<script>
import gmap from "../components/Gmap.vue";
import dashbar from '../components/Dashbar.vue'
export default {
  components: {
    gmap,
    dashbar
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
#main{
  overflow: hidden;
}
</style>
