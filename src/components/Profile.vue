<template>
    <div id="profile">
        <div id="banner">
            <h1 class="d-inline pt-4">Profile</h1>
        </div>
        <div class="main h-100 p-3">
            <b-container fluid class="text-left ">
                <div class="py-2">
                    <h2 class="d-inline">First Name: <span>John</span></h2>
                    <h2 class="d-inline ml-5">Last Name: <span>Doe</span></h2>
                </div>

                <h2 class="py-2">
                    Email:
                    <span>{{ this.$store.state.loginForm.form.email }}</span>
                </h2>

                <h2 class="py-2">
                    Password:
                    <span>{{ this.$store.state.loginForm.form.password }}</span>
                </h2>

                <h2 class="py-2">Mobile Number: <span>911</span></h2>
                <h2 class="py-2">
                    Green Points: <span>{{ gPoints }}</span>
                </h2>
                <div class=" py-2">
                    <b-row class="px-5">
                        <b-col class="px-5">
                            <b-progress
                                :value="gPoints"
                                variant="success"
                                striped
                                animated="true"
                            ></b-progress>
                        </b-col>
                    </b-row>
                    <b-row class="text-center">
                        <b-col class="text-left">
                            <b-img :src="require('../assets/bronzeMedal.svg')"></b-img>
                        </b-col>
                        <b-col>
                            <b-img :src="require('../assets/silverMedal.svg')"></b-img>
                        </b-col>
                        <b-col class="text-right">
                            <b-img :src="require('../assets/goldMedal.svg')"></b-img>
                        </b-col>
                    </b-row>
                </div>
            </b-container>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            gPoints: 50,
        };
    },
};
</script>
<style lang="scss">
#profile {
    height: 100vh;
}
</style>
