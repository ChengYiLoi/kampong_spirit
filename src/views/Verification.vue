<template>
    <div id="full-height">
        <b-form-group label="Verification Code">
            <b-form-input v-model="vCode"></b-form-input>
        </b-form-group>
        <b-button @click="verifyCode">Verify</b-button>
    </div>
</template>
<script>
var axios = require('axios');
export default {
    data(){
        return{
            vCode: null
        }
    },
    methods: {
        verifyCode(){
            let url = ``;

        }
    },
}
</script>
<style lang="scss">
    
</style>