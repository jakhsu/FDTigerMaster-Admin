<template>
    <div id="Working-Category">
        <b-container fluid>
            <div class="CategoryArea">
                <b-row>
                    <b-col>
                        <div class="Category-Header">
                            <h2>客戶工項總表</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="6" md="12">
                        <TitledCard title="工項:">
                            <div class="CategoryTable">
                                <b-table class="skilltable" sticky-header :items="items">
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
                                <label for="inputId">工項編號</label>
                                <b-form-input required id="inputId" v-model="input.id"></b-form-input>
                                <label for="inputDetail">工項描述</label>
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
        name: 'WorkingCategory',
        components: {
            TitledCard
        },
        data() {
            return {
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
                input: {}
            }
        },
        methods: {}
    }
</script>

<style scoped>
    #Working-Category {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Working-Category .CategoryArea {
        padding: 0px 50px;
    }

    #Working-Category .CategoryArea .Category-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Working-Category .CategoryArea {
            padding: 0px;
        }
    }
</style>