<template>
    <div>
        <b-container fluid>
            <TitledCard title="匯款資訊">
                <CustomTable :datas="example" :fields="fields">
                    <template #cell(action)>
                        <b-button variant="outline-success">繳費</b-button>
                    </template>
                </CustomTable>
            </TitledCard>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import example from "./finance_example.json"
    export default {
        components: {
            TitledCard,
            CustomTable
        },
        name: 'Finance',
        data() {
            return {
                example,
                fields: [{
                        label: "id",
                        key: "id"

                    },
                    {
                        label: "付款狀態",
                        key: "payment_status"

                    }, {
                        label: "金額",
                        key: "amount"

                    }, {
                        label: "期限",
                        key: "deadline"

                    }, {
                        label: "動作",
                        key: "action"
                    }
                ]
            }
        }
    }
</script>