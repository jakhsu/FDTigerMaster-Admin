<template>
    <div id="UserRemarkDetail">
        <b-container fluid>
            <b-row>
                <b-col lg='12' md='12'>
                    <TitledCard title="用戶註記:">
                        <div class="RemarkTable">
                            <b-table class="OrderTable" sticky-header :items="items">
                            </b-table>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    export default {
        name: "UserRemarkDetail",
        components: {
            TitledCard,
        },
        data() {
            return {
                items: [{
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, {
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, {
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, {
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, {
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, {
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, {
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, {
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, {
                    訂單編號: "TH-TH001",
                    被註記用戶: "0900123455",
                    註記: "此為客服人員寫的註記"
                }, ]
            }
        }
    }
</script>