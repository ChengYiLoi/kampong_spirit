import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from "vue2-google-maps";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueSmoothScroll from 'vue2-smooth-scroll'
import Vuelidate from 'vuelidate'
import {store} from './store/store'
import GAuth from 'vue-google-oauth2'
import VueGoogleCharts from 'vue-google-charts'

const gauthOption = {
  clientId: '1007004476848-joi8l4bpbddcqufbo7lvrngt8veh0qdc.apps.googleusercontent.com',

  scope: 'profile email',
  prompt: 'select_account'
}



Vue.use(GAuth, gauthOption);
Vue.use(BootstrapVue);
Vue.use(VueSmoothScroll);
Vue.use(Vuelidate);
Vue.use(VueGoogleCharts);



Vue.use(VueGoogleMaps,{
  load:{
    key: "",
  },
  
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// AIzaSyA_X2QcQ2oiNONAXrSFCMwvlL6bFQNzjJs
