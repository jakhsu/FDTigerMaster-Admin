<template>
    <div id="OrderDetail">
        <b-container fluid>
            <b-row>
                <b-col sm="6" md="4" lg="3">
                    <DataCard color="#4e73df" title="本日收入" :data="3000" :trend="-100" />
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
                        <div class="Client-Search d-flex mb-3">
                            <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                            <b-button class="ml-2" variant="danger" @click="onSearchClearClick">清除搜尋</b-button>
                        </div>
                        <div class="Client-Table">
                            <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="orders"
                                :isBusy="tableBusy" @dataRequire="onDataRequire">
                                <template #top-row="orders">
                                    <b-td v-for="(field, index) in orders.fields" :key="index">
                                        <b-form-input v-model="search[field.key]" :name="field.key"
                                            :placeholder="`${field.label}`" />
                                    </b-td>
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

    export default {
        name: "OrderDetail",
        components: {
            TitledCard,
            CustomTable,
            DataCard,
        },
        data() {
            return {
                orders: [{
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, {
                    orderId: "TH-TH001",
                    orderAmount: "2,500 NT",
                    orderStatus: "已完成",
                    orderCreatedTime: "2020/05/23 14:53",
                    orderClosedTime: "2020/06/23 8:24"
                }, ],
                tableBusy: false,
                fields: [{
                        "key": "orderId",
                        "label": "訂單編號"
                    },
                    {
                        "key": "orderAmount",
                        "label": "訂單金額"
                    },
                    {
                        "key": "orderStatus",
                        "label": "訂單狀態"
                    },
                    {
                        "key": "orderCreatedTime",
                        "label": "下單時間"
                    },
                    {
                        "key": "orderClosedTime",
                        "label": "完成時間"
                    }
                ],
                search: {},
            }
        },
        methods: {
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {},
        }
    }
</script>