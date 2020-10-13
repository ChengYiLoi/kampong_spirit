<template>
    <div>
        <div id="banner">
            <h1 class="d-inline pt-4">Market Place</h1>
            <b-row>
                <b-col> </b-col>
                <b-col>
                    <button v-on:click="getData()">Get data</button>
                </b-col>
                <b-col> </b-col>
            </b-row>
        </div>

        <b-row class="m-0 main">
            <b-col>
                <b-card-group columns>
                    <itemcard
                        v-for="item in items"
                        :key="item.id"
                        :item="item"
                    ></itemcard>
                </b-card-group>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import itemcard from "../components/ItemCard";
export default {
    components: {
        itemcard,
    },
    data() {
        return {};
    },
    methods: {
        getData() {
            var request = new XMLHttpRequest();
            var url = `getItems.php`;
            var comp = this; //reference to this component because in the onreadystatechange can have only one this which is referencing the request
            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("success");
                    comp.renderItems(this.responseText);
                }
            };
            request.open("POST", url, true);
            request.send();
        },
        renderItems(data) {
            return (this.$store.state.items = JSON.parse(data));
        },
    },
    computed: {
        items() {
            return this.$store.state.items;
        },
    },
};
</script>
<style lang="scss">


</style>
