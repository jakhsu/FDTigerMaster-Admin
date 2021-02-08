<template>
    <div>
        <TitledCard title="訂單歷史">
            <CustomTable :datas="orderHistory" :fields="fields" @rowClick="openOrderHistoryModal">
            </CustomTable>
        </TitledCard>
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'
    import TitledCard from '../../../../components/Card/TitledCard.vue'
    import CustomTable from '../../../../components/Table/CustomTable.vue'
    export default {
        components: {
            TitledCard,
            CustomTable
        },
        name: "OrderHistory",
        props: {
            order: Object
        },
        data() {
            return {
                orderHistory: [],
                fields: [{
                        "label": "城市",
                        "key": "addressCity"
                    },
                    {
                        "label": "區",
                        "key": "addressArea"
                    },
                    {
                        "label": "街道",
                        "key": "addressStreet"
                    },
                    {
                        "label": "門牌樓層",
                        "key": "addressDetail"
                    },
                    {
                        "label": "訂單狀態",
                        "key": "status"
                    },
                    {
                        "label": "變更時間",
                        "key": "orderUpdateDate"
                    }
                ]
            }
        },
        methods: {
            async fetchOrderHistory() {
                const res = await tigermaster.database.query("order_history")
                    .where("order_history.order_id", "=", this.order._orderId).get()
                this.orderHistory = res.data
            },
            openOrderHistoryModal(data) {
                console.log(data)
            }
        },
        created() {
            this.fetchOrderHistory();
        }
    }
</script>