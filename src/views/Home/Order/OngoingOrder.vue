<template>
    <Loading v-if="isLoading" />
    <div v-else id="Order">
        <OrderCreateModal>
        </OrderCreateModal>
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
                        <OngoingOrderSearch @startSearch="handleSearchStart" @SuccessfulSearch="handleSearchResult"
                            @createOrder="openOrderCreateModal" @FailedSearch="handleFailedSearch" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col xl="3" sm="6">
                        <TitledCard title="媒合中訂單" bodyBackgroundColor="#457CD6" fluid>
                            <template #title-card-header>
                                <span class="Order-Number-Container">
                                    <span class="Order-Number-Content"><strong>{{matchingOrders.length}}</strong></span>
                                    張訂單
                                </span>
                            </template>
                            <div class="Order-Panel">
                                <scale-loader v-if="isLoadingOrders" />
                                <OrderCard v-else @onClick="onCardClick" v-for="(order, index) in matchingOrders"
                                    :key="index" :orderData="order" class="mt-0" />
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col xl="3" sm="6">
                        <TitledCard title="施工中訂單" bodyBackgroundColor="#457CD6" fluid>
                            <template #title-card-header>
                                <span class="Order-Number-Container">
                                    <span class="Order-Number-Content"><strong>{{ongoingOrders.length}}</strong></span>
                                    張訂單
                                </span>
                            </template>
                            <div class="Order-Panel">
                                <scale-loader v-if="isLoadingOrders" />
                                <OrderCard v-else @onClick="onCardClick" v-for="(order, index) in ongoingOrders"
                                    :key="index" :orderData="order" class="mt-0" />
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col xl="3" sm="6">
                        <TitledCard title="待結帳訂單" bodyBackgroundColor="#457CD6" fluid>
                            <template #title-card-header>
                                <span class="Order-Number-Container">
                                    <span class="Order-Number-Content"><strong>{{ToBePaidOrders.length}}</strong></span>
                                    張訂單
                                </span>
                            </template>
                            <div class="Order-Panel">
                                <scale-loader v-if="isLoadingOrders" />
                                <OrderCard v-else @onClick="onCardClick" v-for="(order, index) in ToBePaidOrders"
                                    :key="index" :orderData="order" class="mt-0">
                                </OrderCard>

                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col xl="3" sm="6">
                        <TitledCard title="特殊訂單" bodyBackgroundColor="#457CD6" fluid>
                            <template #title-card-header>
                                <span class="Order-Number-Container">
                                    <span class="Order-Number-Content"><strong>{{specialOrders.length}}</strong></span>
                                    張訂單
                                </span>
                            </template>
                            <div class="Order-Panel">
                                <scale-loader v-if="isLoadingOrders" />
                                <OrderCard v-else @onClick="onCardClick" v-for="(order, index) in specialOrders"
                                    :key="index" :orderData="order" class="mt-0" />
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
    import OngoingOrderSearch from '@/components/MultiSearch/OngoingOrderSearch.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import OrderCreateModal from '@/components/Modal/Order/OrderCreateModal.vue'
    export default {
        name: "OngoingOrder",
        components: {
            Loading,
            OrderCard,
            TitledCard,
            OngoingOrderSearch,
            OrderCreateModal
        },
        data() {
            OrderCreateModal
            return {
                orders: [],
                isLoadingOrders: false
            }
        },
        created() {
            this.isLoading = true;
            try {
                this.fetchOngoiningOrders();
            } catch (e) {
                console.log(e)
            } finally {
                this.isLoading = false;
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
            handleSearchStart() {
                this.isLoadingOrders = true;
            },
            handleSearchResult(result) {
                this.orders = result.data;
                this.isLoadingOrders = false;
            },
            handleFailedSearch() {
                this.isLoadingOrders = false;
            },
            async fetchOngoiningOrders() {
                this.isLoadingOrders = true;
                let query = tigermaster.database.query("generic_order");
                try {
                    const res = await query.where("generic_order.status", "<", "60").get();
                    this.orders = res.data;

                } catch (e) {
                    this.orders = [];
                } finally {
                    this.isLoadingOrders = false;
                }
            },
            openOrderCreateModal() {
                this.$bvModal.show('Order-Create-Modal');
            }
        },
        computed: {
            matchingOrders() {
                return this.orders.filter((order) => {
                    return [5, 10].includes(order.status);
                });
            },
            ongoingOrders() {
                return this.orders.filter((order) => {
                    return [15, 20, 25, 30, 35, 40, 45, 50].includes(order.status);
                })
            },
            ToBePaidOrders() {
                return this.orders.filter((order) => {
                    return [55].includes(order.status);
                })
            },
            specialOrders() {
                return this.orders.filter((order) => {
                    return order.property === 1;
                })
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
        padding: 0.45rem 10px;
        color: rgb(0, 0, 0);
        background-color: #FFA900;
        border-radius: 10px;
    }

    .Order-Number-Content {
        padding: 0.05em 0.3em;
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