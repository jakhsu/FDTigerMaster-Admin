<template>
    <div id="UserRemarkDetail">
        <b-container fluid>
            <b-row>
                <b-col lg='6' md='12'>
                    <TitledCard title="用戶註記:">
                        <div class="RemarkTable">
                            <b-table class="OrderTable" sticky-header :items="items">
                            </b-table>
                        </div>
                    </TitledCard>
                </b-col>
                <b-col lg='6' md='12'>
                    <TitledCard title="添加註記">
                        <b-form>
                            <b-form-group label="選擇訂單">
                                <b-form-select :options="orders"></b-form-select>
                            </b-form-group>
                            <b-form-group label="註記內容">
                                <b-form-textarea id="textarea" placeholder="輸入內文..." rows="5" max-rows="20">
                                </b-form-textarea>
                            </b-form-group>
                            <b-button variant="success" type=submit>送出</b-button>
                        </b-form>
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
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }, {
                    訂單編號: "TH-TH001",
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }, {
                    訂單編號: "TH-TH001",
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }, {
                    訂單編號: "TH-TH001",
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }, {
                    訂單編號: "TH-TH001",
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }, {
                    訂單編號: "TH-TH001",
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }, {
                    訂單編號: "TH-TH001",
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }, {
                    訂單編號: "TH-TH001",
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }, {
                    訂單編號: "TH-TH001",
                    註記: "此為客服人員寫的註記",
                    註記時間: "2020/11/03 14:53"
                }],
                orders: [{
                        value: null,
                        text: "選擇訂單"
                    },
                    {
                        value: 'TH-TH001',
                        text: "TH-TH001"
                    }
                ]
            }
        }
    }
</script>