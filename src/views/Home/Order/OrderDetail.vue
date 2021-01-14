<template>
    <Loading v-if="isLoading" />
    <div v-else id="OrderDetail">
        <b-container fluid>
            <div class="OrderDetail-Area">
                <b-row>
                    <b-col>
                        <div class="OrderDetail-Header">
                            <h2>訂單詳情</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-nav tabs>
                    <b-nav-item :active="currentTab == 'basic'" @click="onNavClick('basic')">
                        基本資料
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'master'" @click="onNavClick('master')">
                        符合工項師傅
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'orderPhoto'" @click="onNavClick('orderPhoto')">
                        施工照片
                    </b-nav-item>
                </b-nav>
            </div>
            <component :is="currentComponent" :order="order" :matchedMasters="matchedMasters">
            </component>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import BasicDetail from '@/views/Home/Order/OrderDetailComponent/BasicDetail.vue'
    import AvailableMaster from '@/views/Home/Order/OrderDetailComponent/AvailableMaster.vue'
    import OrderPhoto from '@/views/Home/Order/OrderDetailComponent/OrderPhoto.vue'
    import tigermaster from 'fdtigermaster-admin-sdk'
    import Loading from '@/components/Loading.vue'


    export default {
        components: {
            Loading,
            TitledCard,
            CustomTable
        },
        name: 'OrderDetail',
        data() {
            return {
                currentTab: "basic",
                currentComponent: BasicDetail,
                tabComponentMap: {
                    basic: BasicDetail,
                    master: AvailableMaster,
                    orderPhoto: OrderPhoto
                },
                order: {},
                matchedMasters: [],
                totalCount: 0,
                tableBusy: false,
                isLoading: true,
                fields: [{
                    "key": "phone",
                    "label": "師傅電話"
                }, {
                    "key": "name",
                    "label": "姓名"
                }, {
                    "key": "distance",
                    "label": "師傅距離"
                }, {
                    "key": "email",
                    "label": "郵件"
                }, {
                    "key": "addressCity",
                    "label": "城市"
                }, {
                    "key": "addressArea",
                    "label": "區"
                }, {
                    "key": "addressStreet",
                    "label": "街道"
                }],
            }
        },
        async created() {
            try {
                await this.fetchOrderData();
                await this.fetchMatchedMaster();
            } catch (e) {
                console.log(e)
            } finally {
                this.isLoading = false;
            }
        },
        methods: {
            onNavClick(name) {
                this.currentTab = name;
                this.currentComponent = this.tabComponentMap[name];
            },
            async fetchOrderData() {
                const database = tigermaster.database;
                const query = database.query("generic_order");
                query.where(`generic_order.id`, 'LIKE', `${this.$route.query.orderId}`);
                try {
                    const response = await query.get();
                    this.order = response.data[0];
                } catch (e) {
                    console.log(e)
                }
            },
            async fetchMatchedMaster() {
                const database = tigermaster.database;
                const query = database
                    .query("order_master_mapping")
                    .where("order_master_mapping.order_id", "LIKE", `${this.order.id}`);
                try {
                    const res = await query.get();
                    this.matchedMasters = res.data.map(e => e.masterUserId);
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>
    #OrderDetail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #OrderDetail .OrderDetail-Area .OrderDetail-Header {
        margin: 25px 0px;
        padding: 0px 25px;
        text-align: left;
        color: #000;
    }

    #OrderDetail .OrderDetail-Area .nav-tabs {
        border-bottom: 2px solid #c3cfdd;
    }

    #OrderDetail .OrderDetail-Area .nav-link {
        color: #476282;
    }

    #OrderDetail .OrderDetail-Area .nav-link.disabled {
        color: #c3cfdd;
    }

    #OrderDetail .OrderDetail-Area .nav-link.active {
        background-color: transparent;
        border-color: transparent;
        border-bottom: solid 3px #457CD6;
        color: #457CD6;
    }

    #OrderDetail .OrderDetail-Area ul.nav {
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #OrderDetail .OrderDetail-Area ul.nav li {
        display: inline-block;
        float: none;
    }

    @media (max-width: 576px) {
        .container-fluid {
            padding: 0px;
        }
    }
</style>