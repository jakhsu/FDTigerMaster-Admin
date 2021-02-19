<template>
    <div id="Order">
        <SimpleModal id="Search-Fail-Modal" title="抱歉，找不到訂單" @onSaveClick="closeFailModal">
            <template #modal-body>
                <p>
                    找不到訂單，請檢查輸入的條件
                </p>
            </template>
        </SimpleModal>
        <OrderCreateModal @successfulCreate="onSuccess">
        </OrderCreateModal>
        <b-container fluid>
            <div class="Order-Area">
                <b-row>
                    <b-col>
                        <TitledCard title="已完成訂單">
                            <div class="SearchBar d-flex mb-3">
                                <b-button class="ml-2" variant="primary" @click="onSearchClick">
                                    開始搜尋
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                                    清空搜尋列
                                </b-button>
                                <b-button class="ml-auto" variant="success" v-b-modal="'Order-Create-Modal'">新增訂單
                                </b-button>
                            </div>
                            <div class="Order-Table">
                                <CustomTable :queryRows="queryRows" :totalRows="totalCount" :fields="fields"
                                    :datas="orders" :isBusy="tableBusy">
                                    <template #top-row="data">
                                        <b-td v-for="(field, index) in data.fields" :key="index">
                                            <b-select v-if="field.key === 'status'" :options="OrderStatus"
                                                v-model="search[field.key]" />
                                            <b-form-input v-if="field.key !== 'status'" v-model.trim="search[field.key]"
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
            </div>
        </b-container>
    </div>
</template>

<script>
    import OrderTable from '@/config/OrderTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import OrderStatusMap from '@/model/Mapping/OrderStatusMap.js'
    import OrderStatus from '@/config/OrderStatus.json'
    import {
        camel2Snake
    } from '@/model/CaseConverter/CaseConverter.js'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import OrderCreateModal from '@/components/Order/OrderCreateModal.vue'

    export default {
        name: "ClosedOrder",
        components: {
            TitledCard,
            CustomTable,
            SimpleModal,
            OrderCreateModal
        },
        async created() {
            this.fetchClosedOrders();
        },
        data() {
            return {
                fields: OrderTable,
                OrderStatus,
                orders: [],
                search: {},
                queryRows: 0,
                totalCount: 0,
                tableBusy: false,
                isLoading: true,
                statusMap: OrderStatusMap()
            }
        },
        methods: {
            async fetchClosedOrders() {
                this.tableBusy = true;
                try {
                    const database = tigermaster.database;
                    const query = database.query("generic_order")
                        .limit(0, 10)
                        .where("generic_order.status", ">", 55);
                    const result = await query.get();
                    this.orders = result.data;
                    this.queryRows = result.queryRows;
                    this.totalCount = result.totalCount;
                } catch (e) {
                    this.orders = [];
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
                    // TODO: should closed order search function search within all orders? or just the "closed" orders
                    element[0] = camel2Snake(element[0])
                    query.where(`generic_order.${element[0]}`, element[2], element[1])
                });
                query.where("generic_order.status", ">", 55);
                try {
                    const res = await query.get();
                    this.orders = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    this.$bvModal.show("Search-Fail-Modal");
                } finally {
                    this.tableBusy = false;
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
                this.fetchClosedOrders();
            },
            closeFailModal() {
                this.$bvModal.hide("Search-Fail-Modal");
            },
            onSuccess() {
                console.log("successfully created an order :)");
                this.fetchClosedOrders();
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