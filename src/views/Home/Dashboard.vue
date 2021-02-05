<template>
    <div id="Dashboard">
        <Loading v-if="isLoading" />
        <b-container v-else fluid>
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
                        <DataCard color="#4e73df" title="會員數" :data="clientNum" :trend="46" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="師傅數" :data="masterNum" :trend="-2" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="媒合數" :data="totalOrders" :trend="1" />
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import DataCard from '@/components/Card/DataCard.vue'
    import Loading from '@/components/Loading.vue';

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'Dashboard',
        components: {
            DataCard,
            Loading
        },
        data() {
            return {
                response: {},
                isLoading: true,
                totalUsers: 0,
                totalOrders: 0,
                masterNum: 0,
                clientNum: 0,
                user: []

            }
        },
        async created() {
            await this.fetchUserData();
            await this.fetchOrderData();
            this.isLoading = false;

        },
        methods: {
            async fetchUserData() {
                const masterCount = await tigermaster.database
                    .rawQuery("SELECT count(*) count FROM user WHERE user.role_id=0")
                    .get()
                const clientCount = await tigermaster.database
                    .rawQuery("SELECT count(*) count FROM user WHERE user.role_id=1 OR user.role_id=2")
                    .get()
                this.masterNum = masterCount.data[0].count;
                this.clientNum = clientCount.data[0].count;
            },
            async fetchOrderData() {
                const orderCount = await tigermaster.database
                    .rawQuery("SELECT count(*) count FROM generic_order WHERE generic_order.status>10")
                    .get();
                this.totalOrders = orderCount.data[0].count;
            }
        }
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