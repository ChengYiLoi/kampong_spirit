<template>
    <b-card
        :title="`${item.name}`"
        class="card-info mt-4"
        border-variant="secondary"
        v-b-modal="`${item.name}`"
    >
        <b-row>
            <b-col>
                <b-img fluid :src="'./uploads/' + `${imgUrl}`">
                </b-img>
            </b-col>
        </b-row>
        <hr />
        <b-container fluid class="item-info">
            <b-row class="p-2 text-left">
                <b-col cols="12">Delivery Type: {{ item.deliveryType }}</b-col>
                <b-col cols="12" v-if="item.deliveryType == 'Meet Up'">
                    Location: {{ item.location }}
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-right">
                    State: <strong>{{ item.state }} </strong></b-col
                >
            </b-row>
        </b-container>

        <b-modal
            :id="`${item.name}`"
            centered
            :title="`${item.name}`"
            ok-title="I want this!"
            cancel-title="Close"
            ok-variant="success"
            cancel-variant="danger"
        >
            <b-img
                fluid
                :src="'./uploads/' + `${imgUrl}`"
            ></b-img>
            <div class="modal-info p-3">
                <p class="mt-2">Description: {{ item.description }}</p>
                <p>Condition: {{ item.state }}</p>
                <p>Delivery type: {{ item.deliveryType }}</p>
                <p v-if="item.deliveryType == 'Meet Up'">
                    Location: {{ item.location }}
                </p>
            </div>
        </b-modal>
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
<style lang="scss">
$white: rgb(245, 245, 245);
.card-info {
    cursor: pointer;
    background-color: #f1f3f6;
    hr {
        border-top: 1.5px solid #6cc49a;
    }
    &:focus {
        outline: none;
    }
    .item-info {
        background-color: #aaccaa;
        border-radius: 5px;
    }
}
.modal-content {
    border: unset;

    header {
        background-color: #f4976c;
        color: $white;
        button {
            color: $white;

            &:hover {
                color: $white;
                opacity: 1;
            }
        }
    }
    .modal-info {
        background-color: #F1F3F6;
    }
}
</style>
