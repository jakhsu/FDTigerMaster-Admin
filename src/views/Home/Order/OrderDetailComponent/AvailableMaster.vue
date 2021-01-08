<template>
    <TitledCard title="符合工項的師傅">
        <CustomTable ref="customTable" :queryRows="totalCount" :totalRows="totalCount" :fields="fields"
            :datas="matchedMasters" :isBusy="tableBusy">
            <template #cell(phone)="matchedMasters">
                <router-link :to="`/home/user_detail?userId=${matchedMasters.item.id}`">
                    {{ matchedMasters.value }}
                </router-link>
            </template>
        </CustomTable>

    </TitledCard>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    export default {
        name: 'AvailableMaster',
        components: {
            TitledCard,
            CustomTable
        },
        props: {
            matchedMasters: {
                type: Array
            }
        },
        data() {
            return {
                totalCount: 0,
                tableBusy: false,
                fields: [{
                    "key": "phone",
                    "label": "師傅電話"
                }, {
                    "key": "name",
                    "label": "姓名"
                }, {
                    "key": "distance",
                    "label": "師傅距離"
                }, {
                    "key": "addressCity",
                    "label": "城市"
                }, {
                    "key": "addressArea",
                    "label": "區"
                }, {
                    "key": "addressStreet",
                    "label": "街道"
                }]

            }
        }
    }
</script>