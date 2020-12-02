<template>
    <div id="MasterIncome">
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
                <b-col>
                    <TitledCard title="師傅技能:">
                        <b-table sticky-header :items="incomeData">
                        </b-table>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import DataCard from '@/components/Card/DataCard.vue'

    export default {
        name: "MasterIncome",
        components: {
            TitledCard,
            DataCard,
        },
        data() {
            return {
                incomeData: [{
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, {
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, {
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, {
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, {
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, {
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, {
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, {
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, {
                    訂單編號: "TH-TH03031",
                    訂單金額: "4500",
                    結束日期: "2020/08/05 16:35"
                }, ]
            }
        }
    }
</script>

<style scoped>

</style>