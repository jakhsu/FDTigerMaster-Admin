<template>
    <div>
        <b-container fluid>
            <TitledCard title="匯款資訊">
                <CustomTable :datas="orders">
                </CustomTable>
            </TitledCard>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    export default {
        components: {
            TitledCard,
            CustomTable
        },
        name: 'Finance.vue',
        data() {
            return {
                orders: [{

                }]
            }
        }
    }
</script>