<template>
    <b-card
        :title="`${item.name}`"
        class="card-info mt-4"
        bg-variant="light"
        border-variant="secondary"
    >
        <b-row>
            <b-col>
                <b-img fluid :src="require('../uploads/' + `${imgUrl}`)">
                </b-img>
            </b-col>
        </b-row>
        <b-row class="py-3 ">
            <b-col class="text-left"> Location: {{ item.location }} </b-col>
            <b-col class="text-right"> State: {{ item.state }} </b-col>
        </b-row>
    </b-card>
</template>
<script>
export default {
    props: ["item"],
    data() {
        return {};
    },
    computed: {
        imgUrl() {
            var url = this.item.image;
            if (this.item.image == "NA") {
                return "cat.jpg";
            }
            return url;
        },
    },
};
</script>
<style lang="scss"></style>
