<template>
    <Loading v-if="isLoading" />
    <div v-else id="Order">
        <b-container fluid>
            <div class="Order-Area">
                <b-row>
                    <b-col>
                        <div class="Order-Header">
                            <h2>進行中訂單</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <OngoingOrderSearch @SuccessfulSearch="handleSearchResult" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col xl="3" sm="6">
                        <TitledCard title="媒合中訂單" bodyBackgroundColor="#457CD6" fluid>
                            <template #title-card-header>
                                <span class="Order-Number-Container">
                                    <span class="Order-Number-Content"><strong>{{nangangOrders.length}}</strong></span>
                                    張訂單
                                </span>
                            </template>
                            <div class="Order-Panel">
                                <OrderCard @onClick="onCardClick" v-b-modal="'Order-Detail-Modal'"
                                    v-for="(order, index) in nangangOrders" :key="index" :orderData="order"
                                    class="mt-0" />
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col xl="3" sm="6">
                        <TitledCard title="施工中訂單" bodyBackgroundColor="#457CD6" fluid>
                            <template #title-card-header>
                                <span class="Order-Number-Container">
                                    <span class="Order-Number-Content"><strong>5</strong></span>
                                    張訂單
                                </span>
                            </template>
                            <div class="Order-Panel">
                                <OrderCard @onClick="onCardClick" v-b-modal="'Order-Detail-Modal'"
                                    v-for="(order, index) in workingOrders" :key="index" :orderData="order"
                                    class="mt-0" />
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col xl="3" sm="6">
                        <TitledCard title="待結帳訂單" bodyBackgroundColor="#457CD6" fluid>
                            <template #title-card-header>
                                <span class="Order-Number-Container">
                                    <span class="Order-Number-Content"><strong>5</strong></span>
                                    張訂單
                                </span>
                            </template>
                            <div class="Order-Panel">
                                <OrderCard @onClick="onCardClick" v-b-modal="'Order-Detail-Modal'"
                                    v-for="(order, index) in notpayOrders" :key="index" :orderData="order" class="mt-0">
                                    <router-link :to="`/home/order_detail?orderId=202020`">
                                    </router-link>
                                </OrderCard>

                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col xl="3" sm="6">
                        <TitledCard title="特殊訂單" bodyBackgroundColor="#457CD6" fluid>
                            <template #title-card-header>
                                <span class="Order-Number-Container">
                                    <span class="Order-Number-Content"><strong>5</strong></span>
                                    張訂單
                                </span>
                            </template>
                            <div class="Order-Panel">
                                <OrderCard @onClick="onCardClick" v-for="(order, index) in specialOrders" :key="index"
                                    :orderData="order" class="mt-0" />
                            </div>
                        </TitledCard>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import Loading from '@/components/Loading'
    import OrderCard from '@/components/Card/OrderCard.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import OngoingOrderSearch from '@/components/Search/OngoingOrderSearch.vue'

    export default {
        name: "OngoingOrder",
        components: {
            Loading,
            OrderCard,
            TitledCard,
            OngoingOrderSearch
        },
        data() {
            return {
                workingOrders: [{
                    "id": "RO1216",
                    "clientUserId": "benny139",
                    "addressCity": "台北市",
                    "addressArea": "中正區",
                    "addressStreet": "八德路１段",
                    "addressDetail": "1号",
                    "workingCategoryId": "TM-K010101",
                    "status": 25,
                    "updateDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }, {
                    "id": "RO1217",
                    "clientUserId": "jack123",
                    "addressCity": "新北市",
                    "addressArea": "三重區",
                    "addressStreet": "三重路１段",
                    "addressDetail": "5號",
                    "workingCategoryId": "TM-X010101",
                    "status": 30,
                    "updateDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }, {
                    "id": "RO1218",
                    "clientUserId": "rui123",
                    "addressCity": "台中市",
                    "addressArea": "中山區",
                    "addressStreet": "八德路１段",
                    "addressDetail": "2號",
                    "workingCategoryId": "TM-Q010101",
                    "status": 35,
                    "updateDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }],
                notpayOrders: [{
                    "id": "RO1216",
                    "clientUserId": "benny139",
                    "addressCity": "台北市",
                    "addressArea": "中正區",
                    "addressStreet": "八德路１段",
                    "addressDetail": "1号",
                    "workingCategoryId": "TM-K010101",
                    "status": 50,
                    "updateDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }, {
                    "id": "RO1217",
                    "clientUserId": "jack123",
                    "addressCity": "新北市",
                    "addressArea": "三重區",
                    "addressStreet": "三重路１段",
                    "addressDetail": "5號",
                    "workingCategoryId": "TM-X010101",
                    "status": 45,
                    "updateDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }, {
                    "id": "RO1218",
                    "clientUserId": "rui123",
                    "addressCity": "台中市",
                    "addressArea": "中山區",
                    "addressStreet": "八德路１段",
                    "addressDetail": "2號",
                    "workingCategoryId": "TM-Q010101",
                    "status": 45,
                    "updateDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }],
                orders: [],
                isLoading: false
            }
        },
        methods: {
            orderModify() {
                this.$bvModal.hide("Order-Detail-Modal")
            },
            onCardClick(id) {
                this.$router.push({
                    path: '/home/order_detail',
                    query: {
                        orderId: id
                    }
                });
            },
            handleSearchResult(result) {
                this.orders = result.data;
            }
        },
        computed: {
            // this is the implementation of filtering out different sets of orders
            nangangOrders() {
                return this.orders.filter((order) => {
                    return order.addressArea === '南港區';
                    // here I can easily determine what condition to set
                });
            },
            ongoingOrders() {
                return this.orders.filter((order) => {
                    return order.status < 15;
                })
            },
            ToBePaidOrders() {
                return this.orders.filter((order) => {
                    return order.status < 50;
                })
            },
            specialOrders() {
                return 0;
            }
        }
    }
</script>

<style scoped>
    #Order {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Order .Order-Area {
        padding: 0px 10px;
    }

    #Order .Order-Area .Order-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Order .Order-Area {
            padding: 0px;
        }
    }

    .Order-Number-Container {
        padding: 0.5rem 16px;
        color: rgb(0, 0, 0);
        background-color: #FFA900;
        border-radius: 10px;
    }

    .Order-Number-Content {
        padding: 0.1em 0.5em;
        color: rgb(0, 0, 0);
        background-color: #ffffff;
    }

    .Order-Panel {
        max-height: 475px;
        overflow: scroll;
        padding-bottom: 0;
    }

    ::-webkit-scrollbar {
        width: 9px;
    }

    ::-webkit-scrollbar-thumb {
        background: #ff9d00;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
</style>