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
                        <DataCard color="#4e73df" title="總訂單數" :data="totalCount" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="進行中" :data="0" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="已完成" :data="0" />
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
                                            <b-form-input v-model.trim="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>
                                    <template #cell(id)="data">
                                        <router-link :to="{name: 'HomeOrderDetail', params: {data}}">
                                            {{ data.value }}
                                        </router-link>
                                    </template>
                                    <template #cell(masterUserId)="data">
                                        <router-link :to="`/home/user_detail?userId=${data.value}`">{{ data.value }}
                                        </router-link>
                                    </template>
                                    <template #cell(masterUserPhone)="data">
                                        <router-link :to="`/home/user_detail?userId=${data.item.masterUserId}`">
                                            {{ data.value }}
                                        </router-link>
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
            this.fetchAllOrders();
            this.isLoading = false;
        },
        data() {
            return {
                fields: OrderTable,
                orders: [],
                search: {},
                queryRows: 0,
                totalCount: 0,
                tableBusy: false,
                isLoading: true,
            }
        },
        methods: {
            onDataRequire() {
                this.tableBusy = true;
            },
            async fetchAllOrders() {
                this.tableBusy = true;
                try {
                    const database = tigermaster.database;
                    const query = database.query("generic_order");
                    const result = await query.get();
                    this.orders = result.data;
                    this.queryRows = result.queryRows;
                    this.totalCount = result.totalCount;
                } catch (e) {
                    console.log(e)
                } finally {
                    this.tableBusy = false;
                }
            },
            async onSearchClick() {
                this.tableBusy = true;
                let query = tigermaster.database.query("generic_order");
                let searchArray = Object.entries(this.search);
                searchArray.forEach(element => {
                    element[2] = 'LIKE'
                    element[1] = '%' + element[1] + '%'
                    if (element[0] === 'workingCategoryDescription') {
                        query.with('working_category');
                        query.link('working_category.id', 'generic_order.working_category_id');
                        query.where('working_category.description', 'LIKE', element[1]);
                    } else if (element[0] === 'masterUserPhone') {
                        query.with('user');
                        query.link('user.id', 'generic_order.master_user_id');
                        query.where('user.phone', 'LIKE', element[1]);
                    } else {
                        if (element[0] === 'masterUserId') {
                            element[0] = 'master_user_id'
                        } else if (element[0] === 'addressCity') {
                            element[0] = 'address_city'
                        } else if (element[0] === 'addressArea') {
                            element[0] = 'address_area'
                        } else if (element[0] === 'addressStreet') {
                            element[0] = 'address_street'
                        }
                        query.where(`generic_order.${element[0]}`, element[2], element[1])
                    }
                });
                try {
                    const res = await query.get();
                    this.orders = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log(e);
                } finally {
                    this.tableBusy = false;
                    this.search = {}
                }
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