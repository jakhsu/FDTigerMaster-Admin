<template>
    <div id="Working-Pairing">
        <b-container fluid>
            <div class="PairingArea">
                <b-row>
                    <b-col>
                        <div class="Pairing-Header">
                            <h2>工項技能配對</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="6" md="12">
                        <TitledCard title="技能">
                            <div class="PairingTable">
                                <b-form-select v-model="selected" :fields="fields" :options="options">
                                </b-form-select>
                                <b-table class="skilltable" sticky-header :items="pairs">
                                </b-table>
                                <b-input-group>
                                </b-input-group>
                            </div>
                            <div class="DownloadArea">
                                <b-button variant="success" class="mr-1">下載</b-button>
                                <b-button variant="primary" class="mr-1">上傳</b-button>
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col lg="6" md="12">
                        <TitledCard title="單筆輸入">
                            <b-form>
                                <label class="mt-2" for="inputId">工項編號</label>
                                <b-form-input required id="inputId" v-model="input.id"></b-form-input>
                                <label class="mt-2" for="inputDetail">工項描述</label>
                                <b-form-input required id="inputDetail" v-model="input.detail"></b-form-input>
                                <b-button type="submit" variant="primary" class="ml-1 mt-2">送出
                                </b-button>
                            </b-form>
                        </TitledCard>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    export default {
        name: 'WorkingPairing',
        components: {
            TitledCard
        },
        data() {
            return {
                fields: [{
                    key: "技能編號",
                    sortable: true
                }, {
                    key: "技能描述",
                    sortable: false
                }, {
                    key: "對應",
                    sortable: false
                }, ],
                pairs: [{
                    技能編號: "TM-W03010",
                    技能描述: "水管安裝維修",
                    對應工項: [{
                        工項編號: "TM-X03011",
                        工項敘述: "排水溝清理"
                    }]
                }],
                items: [{
                        工項編號: "TM-X03011",
                        工項敘述: "排水溝清理"
                    },
                    {
                        工項編號: "TM-W01012",
                        工項敘述: "清洗水泥水塔"
                    },
                    {
                        工項編號: "TM-M01012",
                        工項敘述: "熱水器故障"
                    },
                    {
                        工項編號: "TM-W02011",
                        工項敘述: "水龍頭漏水"
                    },
                ],
                options: [{
                        value: null,
                        text: "選擇技能..."
                    },
                    {
                        value: "TM-X03011",
                        text: "排水溝清理"
                    },
                    {
                        value: "TM-W03010",
                        text: "水管安裝維修"
                    },
                    {
                        value: "TM-W03010",
                        text: "水管安裝維修"
                    },
                    {
                        value: "TM-W03010",
                        text: "水管安裝維修"
                    },
                    {
                        value: "TM-W03010",
                        text: "水管安裝維修"
                    },
                    {
                        value: "TM-W03010",
                        text: "水管安裝維修"
                    },
                ],
                input: {},
                selected: null,
            }
        },
        methods: {}
    }
</script>

<style scoped>
    #Working-Pairing {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Working-Pairing .PairingArea {
        padding: 0px 50px;
    }

    #Working-Pairing .PairingArea .Pairing-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Working-Pairing .PairingArea {
            padding: 0px;
        }
    }
</style>