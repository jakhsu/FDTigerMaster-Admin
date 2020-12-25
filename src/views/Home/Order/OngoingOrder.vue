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
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="總訂單數" :data="25419" :trend="460" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="進行中" :data="25" :trend="-3" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="已完成" :data="24419" :trend="200" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col xl="6" sm="12">
                        <TitledCard title="媒合中訂單">
                            <div class="SearchBar d-flex mb-3">
                                <b-button class="ml-2" variant="primary" @click="onSearchClick">
                                    開始搜尋
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                                    清空搜尋列
                                </b-button>
                                <b-button class="ml-auto" variant="success" v-b-modal="'User-Create-Modal'">新增訂單
                                </b-button>
                            </div>
                            <div class="Order-Table" v-for="(order, index) in orders" :key="index">
                                <b-card class="m-3">
                                    編號:{{order.id}}
                                    位置:{{order.addressCity}} {{order.addressArea}}
                                    <template #footer>
                                        <div class="d-flex">
                                            <b-button variant="primary">
                                                狀態: <b-badge variant="light">{{order.status}}</b-badge>
                                            </b-button>
                                            <b-button variant="primary" class="ml-2">
                                                工種: <b-badge variant="light">{{order.workingCategoryId}}</b-badge>
                                            </b-button>
                                        </div>
                                    </template>
                                </b-card>
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col xl="6" sm="12">
                        <TitledCard title="施工中訂單">
                            <div class="SearchBar d-flex mb-3">
                                <b-button class="ml-2" variant="primary" @click="onSearchClick">
                                    開始搜尋
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                                    清空搜尋列
                                </b-button>
                                <b-button class="ml-auto" variant="success" v-b-modal="'User-Create-Modal'">新增訂單
                                </b-button>
                            </div>
                            <div class="Order-Table" v-for="(order, index) in orders" :key="index">
                                <b-card class="m-3">
                                    編號:{{order.id}}
                                    位置:{{order.addressCity}} {{order.addressArea}}
                                    <template #footer>
                                        <div class="d-flex">
                                            <b-button variant="primary">
                                                狀態: <b-badge variant="light">{{order.status}}</b-badge>
                                            </b-button>
                                            <b-button variant="primary" class="ml-2">
                                                工種: <b-badge variant="light">{{order.workingCategoryId}}</b-badge>
                                            </b-button>
                                        </div>
                                    </template>
                                </b-card>
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
    import OrderTable from '@/config/OrderTable.json'
    import DataCard from '@/components/Card/DataCard.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: "OngoingOrder",
        components: {
            Loading,
            DataCard,
            TitledCard,
        },
        async created() {},
        data() {
            return {
                fields: OrderTable,
                orders: [{
                    "id": "RO1213",
                    "clientUserId": "benny139",
                    "addressCity": "台北市",
                    "addressArea": "中正區",
                    "addressStreet": "八德路１段",
                    "addressDetail": "1号",
                    "workingCategoryId": "TM-K010101",
                    "status": 5,
                    "expectWorkingDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }, {
                    "id": "RO1213",
                    "clientUserId": "jack123",
                    "addressCity": "新北市",
                    "addressArea": "三重區",
                    "addressStreet": "三重路１段",
                    "addressDetail": "5號",
                    "workingCategoryId": "TM-X010101",
                    "status": 15,
                    "expectWorkingDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }, {
                    "id": "RO1213",
                    "clientUserId": "rui123",
                    "addressCity": "台中市",
                    "addressArea": "中山區",
                    "addressStreet": "八德路１段",
                    "addressDetail": "2號",
                    "workingCategoryId": "TM-Q010101",
                    "status": 35,
                    "expectWorkingDate": "2020-12-24 08:06:12",
                    "additionalDistancePrice": 0,
                    "createBy": "Call-center"
                }, ],
                search: {
                    roleId: "0"
                },
                queryRows: 0,
                totalCount: 0,
                tableBusy: false,
                isLoading: false,
            }
        },
        methods: {
            test() {},
            onDataRequire() {
                this.tableBusy = true;
            },
            async onSearchClick() {
                this.tableBusy = true;
                let query = tigermaster.database.query("user");
                let searchArray = Object.entries(this.search);
                searchArray = searchArray.filter(ele => ele[0] !== 'roleId')
                searchArray.forEach(element => {
                    element[2] = 'LIKE'
                    element[1] = '%' + element[1] + '%'
                    query.where(`user.${element[0]}`, `${element[2]}`, `${element[1]}`)
                });
                query.where('user.role_id', '=', `${this.search.roleId}`).limit(0, 100);
                await query.get();
                const res = await query.get();
                this.data = res.data;
                this.queryRows = res.queryRows;
                this.totalCount = res.totalCount;
                this.tableBusy = false;
                this.search = {}
            },
            async onNewUserSaveClick(obj) {
                this.isLoading = true;
                let newUser = obj;
                const id = await tigermaster.auth.createUserWithPhoneAndPassword(newUser.phone, "1234567890",
                    newUser);
                this.isLoading = false;
                this.$router.push({
                    path: '/home/user_detail',
                    query: {
                        userId: id
                    }
                });
            },
            onSearchClearClick() {
                this.search = {};
            },
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
        padding: 0px 50px;
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
</style>