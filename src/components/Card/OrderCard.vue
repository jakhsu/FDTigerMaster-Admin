<template>
    <b-card id="order-card" :header="orderData.id" @click="onClick">
        <div class="mb-1">
            <span class="order-card-status">{{statusMap[orderData.status]}}</span>
        </div>
        <h6>{{orderData.workingCategoryId}}</h6>
        <div class="order-card-location mb-1">
            <span>
                <font-awesome-icon icon="map-marker-alt" fixed-width />
                {{ `${orderData.addressCity} ${orderData.addressArea} ${orderData.addressStreet}`}}</span>
        </div>
        <div class="order-card-contact mb-1">
            <span>
                <font-awesome-icon icon="user" fixed-width />{{orderData.clientUserName}}</span>
            <span class="ml-2">
                <font-awesome-icon icon="hard-hat" fixed-width />{{masterName}}</span>
        </div>
        <div class="order-card-last-update">
            <font-awesome-icon icon="clock" fixed-width />
            <span>{{updateDate}}</span>
        </div>
    </b-card>
</template>

<script>
    import OrderStatusMap from '@/model/Mapping/OrderStatusMap.js'

    export default {
        name: 'OrderCard',
        props: {
            orderData: {}
        },
        data() {
            return {
                statusMap: OrderStatusMap(),
                masterName: this.orderData.masterUserName || "N/A",
                updateDate: this.orderData.updateDate || "N/A"
            }
        },
        methods: {
            onClick() {
                this.$emit("onClick", this.orderData.id)
            }
        }
    }
</script>

<style>
    #order-card {
        display: flex;
        flex-direction: column;
        margin: 10px 0px;
        color: #172b4d;
        background-color: #fff;
        text-align: left;
        border-radius: 5px;

    }

    #order-card:hover {
        background-color: #f0f0f0;
    }

    #order-card .order-card-status {
        padding: 5px 5px;
        color: #fff;
        background-color: #808080;
        border-radius: 5px;
    }

    #order-card .order-card-location,
    #order-card .order-card-contact,
    #order-card .order-card-last-update,
    #order-card .order-chat-room {
        font-size: 14px;
        color: #6b778c;
    }

    .order-chat-room {
        font-size: 15px;
    }
</style>