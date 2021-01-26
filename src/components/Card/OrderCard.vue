<template>
    <b-card id="order-card" :header="orderData.id" @click="onClick">
        <div class="mb-1">
            <span class="order-card-status">{{ statusMap[orderData.status] }}</span>
        </div>
        <h6>{{ orderData.workingCategoryId }}</h6>
        <div class="order-chat-room mb-1">
            <div class="mb-1">
                <span>
                    <font-awesome-icon icon="comments" fixed-width />
                    師傅/客戶
                    <a href="">{{orderData.client2master}}</a>
                </span>
            </div>
            <div class="mb-1">
                <span>
                    <font-awesome-icon icon="comments" fixed-width />
                    師傅/客服
                    <a href="">{{orderData.master2admin}}</a>
                </span>
            </div>
            <div class="mb-1">
                <span>
                    <font-awesome-icon icon="comments" fixed-width />
                    客戶/客服
                    <a href="">{{orderData.client2admin}}</a>
                </span>
            </div>
        </div>
        <div class="order-card-location mb-1">
            <span>
                <font-awesome-icon icon="map-marker-alt" fixed-width />
                {{ `${orderData.addressCity} ${orderData.addressArea} ${orderData.addressStreet}`  }}</span>
        </div>
        <div class="order-card-contact mb-1">
            <span>
                <font-awesome-icon icon="user" fixed-width />0912345678</span>
            <span class="ml-1">
                <font-awesome-icon icon="hard-hat" fixed-width />0923456789</span>
        </div>
        <div class="order-card-last-update">
            <span>{{ orderData.updateDate }}</span>
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
                statusMap: OrderStatusMap()
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