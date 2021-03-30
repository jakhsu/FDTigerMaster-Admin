<template>
    <div>
        <SimpleModal id="quote-fee-modal" title="報價單細項">
            <template #modal-body>
                <b-card v-for="(fee, index) in parsedFee" :key="index">
                    <template #header>
                        {{fee.group}}
                    </template>
                    <b-form-group>
                        <b-input-group class="m-2" inline v-for="(entry, index) in fee.detail" :key="index">
                            <b-input-group-prepend>
                                <b-input-group-text class="fee-description">
                                    <font-awesome-icon icon="hammer" />
                                    <strong>
                                        {{entry.description}}
                                    </strong>
                                </b-input-group-text>
                                <b-input-group-text>
                                    單價:
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input class="fee-number" :value="entry.unit" disabled />
                            <b-input-group-prepend>
                                <strong>
                                    <b-input-group-text class="fee-description">
                                        <strong>
                                            數量
                                        </strong>
                                    </b-input-group-text>
                                </strong>
                            </b-input-group-prepend>
                            <b-form-input :value="entry.quantity"></b-form-input>
                            <b-input-group-prepend>
                                <strong>
                                    <b-input-group-text class="fee-description">
                                        <strong>
                                            總價
                                        </strong>
                                    </b-input-group-text>
                                </strong>
                            </b-input-group-prepend>
                            <b-form-input :value="entry.total"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-card>
            </template>
        </SimpleModal>
        <TitledCard title="報價單紀錄">
            <CustomTable :datas="data" :fields="field">
                <template #cell(fee)=data>
                    <b-button variant="outline-success" @click="showFeeModal(data.value)">查看細項</b-button>
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
    import SimpleModal from '@/components/Modal/Util/SimpleModal.vue';
    export default {
        name: 'OrderQuotes',
        components: {
            TitledCard,
            CustomTable,
            SimpleModal
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
                queryRows: 0,
                parsedFee: {}
            }
        },
        async created() {
            await this.fetchPaymentHistory();
        },
        methods: {
            showFeeModal(fee) {
                const parsed = JSON.parse(fee)
                this.parsedFee = parsed;
                this.$bvModal.show('quote-fee-modal')
            },
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

<style scoped>
    .fee-number {
        background-color: white;
    }
</style>