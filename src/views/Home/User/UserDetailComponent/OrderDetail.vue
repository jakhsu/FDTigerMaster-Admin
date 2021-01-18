<template>
    <div id="OrderDetail">
        <b-container fluid>
            <b-row>
                <b-col sm="6" md="4" lg="3">
                    <DataCard color="#4e73df" title="本日收入" :data="3000" :hasTrend="false" />
                </b-col>
                <b-col sm="6" md="4" lg="3">
                    <DataCard color="#4e73df" title="本月收入" :data="45000" :trend="5000" />
                </b-col>
                <b-col sm="6" md="4" lg="3">
                    <DataCard color="#4e73df" title="平均月收" :data="45000" :trend="2000" />
                </b-col>
                <b-col sm="6" md="4" lg="3">
                    <DataCard color="#4e73df" title="總收入" :data="500000" :trend="10000" />
                </b-col>
            </b-row>
            <b-row>
                <b-col lg='12' md='12'>
                    <TitledCard title="訂單紀錄:">
                        <div class="Order-Search d-flex mb-3">
                            <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                            <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清除搜尋</b-button>
                        </div>
                        <div class="Order-Table">
                            <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="orders"
                                :isBusy="tableBusy" @dataRequire="onDataRequire">
                                <template #top-row="orders">
                                    <b-td v-for="(field, index) in orders.fields" :key="index">
                                        <b-select v-if="field.key === 'status'" :options="OrderStatus"
                                            v-model="search[field.key]" />
                                        <b-form-input v-if="field.key !== 'status'" v-model="search[field.key]"
                                            :name="field.key" :placeholder="`${field.label}`" />
                                    </b-td>
                                </template>
                                <template #cell(id)="data">
                                    <router-link :to="`/home/order_detail?orderId=${data.value}`">
                                        {{ data.value }}
                                    </router-link>
                                </template>
                                <template #cell(masterUserPhone)="data">
                                    <router-link :to="`/home/user_detail?userId=${data.item.masterUserId}`">
                                        {{ data.value }}
                                    </router-link>
                                </template>
                                <template #cell(status)="data">
                                    {{statusMap[data.value]}}
                                </template>
                            </CustomTable>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import DataCard from '@/components/Card/DataCard.vue'
    import OrderTable from '@/config/OrderTable.json'
    import OrderStatus from '@/config/OrderStatus.json'
    import OrderStatusMap from '@/model/Mapping/OrderStatusMap.js'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: "OrderDetail",
        components: {
            TitledCard,
            CustomTable,
            DataCard,
        },
        props: {
            user: {
                type: Object
            }
        },
        data() {
            return {
                fields: OrderTable,
                orders: [],
                OrderStatus,
                tableBusy: false,
                search: {},
                statusMap: OrderStatusMap()
            }
        },
        methods: {
            onDataRequire() {
                this.tableBusy = true;
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
                if (this.user.roleId == 1 || this.user.roleId == 2) {
                    query.where("generic_order.client_user_id", "=", `${this.user.id}`);
                } else if (this.user.roleId === 0) {
                    query.where("generic_order.master_user_id", "=", `${this.user.id}`);
                }
                try {

                    const res = await query.get();
                    this.orders = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log("can't find order")
                } finally {
                    this.tableBusy = false;
                }
            },
            onSearchClearClick() {
                this.search = {}
            },
            async fetchUserOrders(roleId) {
                let query = tigermaster.database.query("generic_order");
                if (roleId == 1 || roleId == 2) {
                    query.where("generic_order.client_user_id", "=", `${this.user.id}`);
                } else if (roleId === 0) {
                    query.where("generic_order.master_user_id", "=", `${this.user.id}`);
                }
                try {
                    this.tableBusy = true;
                    const res = await query.get();
                    this.orders = res.data;
                } catch (e) {
                    console.log("failed to fetch user order")
                } finally {
                    this.tableBusy = false;
                }
            }
        },
        created() {
            this.fetchUserOrders(this.user.roleId);
        }
    }
</script>