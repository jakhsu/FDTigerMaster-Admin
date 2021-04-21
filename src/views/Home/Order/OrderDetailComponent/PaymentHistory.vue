<template>
    <div>
        <TitledCard title="付款紀錄">
            <CustomTable :datas="data" :fields="field">
                <template #cell(payFor)=data>
                    {{paymentTypeMap[data.value]}}
                </template>
                <template #cell(paymentStatus)=data>
                    {{paymentStatusMap[data.value]}}
                </template>
            </CustomTable>
        </TitledCard>
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'
    import TitledCard from '@/components/Card/TitledCard.vue';
    import CustomTable from '@/components/Table/CustomTable.vue';
    import PaymentTypeMap from '@/model/Mapping/PaymentTypeMap.js';
    import PaymentStatusMap from '@/model/Mapping/PaymentStatusMap.js'

    export default {
        name: 'PaymentHistory',
        components: {
            TitledCard,
            CustomTable
        },
        props: {
            order: {}
        },
        data() {
            return {
                data: [],
                paymentTypeMap: PaymentTypeMap(),
                paymentStatusMap: PaymentStatusMap(),
                field: [{
                        "key": "payFor",
                        "label": "付款類型"
                    },
                    {
                        "key": "amount",
                        "label": "金額"
                    },
                    {
                        "key": "payBy",
                        "label": "付款方式"
                    },
                    {
                        "key": "paymentStatus",
                        "label": "付款狀態"
                    }
                ],
                queryRows: 0
            }
        },
        created() {
            this.fetchPaymentHistory();
        },
        methods: {
            async fetchPaymentHistory() {
                const res = await tigermaster.database.query("payment_history")
                    .where("payment_history.order_id", "=", this.order.id)
                    .get();
                this.data = res.data;
                this.queryRows = res.queryRows;
            }
        }
    }
</script>