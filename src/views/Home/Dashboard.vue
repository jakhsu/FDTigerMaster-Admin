<template>
    <div id="Dashboard">
        <b-container fluid>
            <div class="Dashboard-Area">
                <b-row>
                    <b-col>
                        <div class="Dashboard-Header">
                            <h2>資訊面板</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="Dashboard-Overview">
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="會員數" :data="25419" :trend="46" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="師傅數" :data="330" :trend="-2" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="媒合數" :data="136" :trend="1" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="會員數" :data="25419" :trend="46" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="col-4">
                        <PieChart />
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import DataCard from '@/components/Card/DataCard.vue'
    import PieChart from '@/components/Chart/SimplePie.vue'

    export default {
        name: 'Dashboard',
        components: {
            DataCard,
            PieChart,
        },
        data() {
            return {
                users: {},
                isLoading: false,
            }
        },
        methods: {},
    }
</script>

<style scoped>
    #Dashboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Dashboard .Dashboard-Area {
        padding: 0px 50px;
    }

    #Dashboard .Dashboard-Area .Dashboard-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Dashboard .Dashboard-Area {
            padding: 0px;
        }
    }
</style>