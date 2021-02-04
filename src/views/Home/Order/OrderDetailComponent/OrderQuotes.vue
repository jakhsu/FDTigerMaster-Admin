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
        name: 'OrderQuotes',
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
                        "key": "totalFee",
                        "label": "報價單金額"
                    },
                    {
                        "key": "clientComfirm",
                        "label": "客戶同意狀態"
                    },
                    {
                        "key": "visibility",
                        "label": "可視性"
                    },
                    {
                        "key": "fee",
                        "label": "細項"
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
                const res = await tigermaster.database.query("quote_price")
                    .where("quote_price.order_id", "=", this.order.id)
                    .get();
                this.data = res.data;
                this.queryRows = res.queryRows;
            }
        }
    }
</script>