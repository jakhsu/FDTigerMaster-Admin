<template>
    <div>
        <TitledCard title="訂單歷史">
            <CustomTable :datas="orderHistory">
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
                orderHistory: Array
            }
        },
        methods: {
            async fetchOrderHistory() {
                const res = await tigermaster.database.query("order_history")
                    .where("order_history.order_id", "=", this.order._orderId).get()
                this.orderHistory = res.data
            }
        },
        created() {
            this.fetchOrderHistory();
        }
    }
</script>