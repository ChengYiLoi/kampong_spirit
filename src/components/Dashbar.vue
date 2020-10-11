<template>
  <b-container id="sidebar">
    <b-row>
      <span id="menu" class="d-inline mx-auto pt-4" v-b-toggle.sidebar-backdrop
        ><b-img :src="require(`../assets/menu.svg`)"></b-img
      ></span>
      <b-sidebar
        id="sidebar-backdrop"
        :backdrop-variant="variant"
        backdrop
        shadow
      >
        <b-container>
          <b-row>
            <b-col>
              <p id="brand" class="pt-2">Kampong Spirit</p>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" v-for="option in dashOptions" :key="option.text">
              <dashOption
                class="isSelected"
                :dashProps="option"
                v-on:updateSelection="updateSelection($event)"
              ></dashOption>
            </b-col>
          </b-row>
        </b-container>
      </b-sidebar>
    </b-row>
  </b-container>
</template>
<script>
import dashOption from "../components/DashOption";
export default {
  components: {
    dashOption,
  },
  data() {
    return {
      
    };
  },
  methods: {
    updateSelection(type) {
      Object.keys(this.dashOptions).forEach((key) => {
      
        if (this.dashOptions[key].selectName == type) {
          this.dashOptions[key].selected = true;
        } else {
          this.dashOptions[key].selected = false;
        }
      });
      this.$emit('updateSelection', type);
    },
  },
  computed:{
    dashOptions(){
      return this.$store.state.dashOptions;
    }
  }
};
</script>
<style lang="scss">
#sidebar {
  height: 100vh;
  #menu {
    &:focus {
      outline: none;
    }
  }
}

#sidebar-backdrop {
  background-color: #6cc49a !important;
}
#brand {
  font-size: 1.6rem;
}

@media only screen and (max-width: 1025px) {
  #dashbar #brand {
    font-size: 1.4rem;
  }
}
</style>
