<template>
    <Loading v-if="isLoading" />
    <div v-else id="Order">
        <b-container fluid>
            <div class="Order-Area">
                <b-row>
                    <b-col>
                        <div class="Order-Header">
                            <h2>已完成訂單</h2>
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
                    <b-col>
                        <TitledCard title="訂單">
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
                            <div class="Order-Table">
                                <CustomTable :queryRows="queryRows" :totalRows="totalCount" :fields="fields"
                                    :datas="orders" :isBusy="tableBusy" @dataRequire="onDataRequire">
                                    <template #top-row="data">
                                        <b-td v-for="(field, index) in data.fields" :key="index">
                                            <b-form-input v-model="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" v-b-popover.hover="searchTips(field)" />
                                        </b-td>
                                    </template>
                                    <template #cell(phone)="data">
                                        <router-link :to="`/home/user_detail?userId=${data.item.id}`">
                                            {{ data.value }}
                                        </router-link>
                                    </template>
                                    <template #cell(roleId)="data">
                                        {{ data.value == "1" ? "師傅" : data.value == 0 ? "客戶" : data.value == 70 ? "行銷" : data.value == 80 ? "財務" : data.value == 90 ? "客服" : data.value == 999 ? "超級使用者" : data.value}}
                                    </template>
                                </CustomTable>
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
    import CustomTable from '@/components/Table/CustomTable.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: "ClosedOrder",
        components: {
            Loading,
            DataCard,
            TitledCard,
            CustomTable,
        },
        async created() {
            this.isLoading = true;
            this.isLoading = false;
        },
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
                isLoading: true,
            }
        },
        methods: {
            test() {},
            searchTips(field) {
                return {
                    variant: 'info',
                    html: true,
                    title: () => {
                        if (field.key == 'roleId') {
                            return '說明: '
                        }
                        return
                    },
                    content: () => {
                        if (field.key == 'roleId') {
                            return `客人: 0 師傅: 1 <br> 行銷: 70  財務: 80 <br> 客服: 90 超級使用者: 999 `
                        }
                        return
                    }
                }
            },
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