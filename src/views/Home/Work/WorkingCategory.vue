<template>
    <div id="Working-Category">
        <b-container fluid>
            <div class="CategoryArea">
                <b-row>
                    <b-col>
                        <div class="Category-Header">
                            <h2>工項總表</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="6" md="12">
                        <TitledCard title="工項:">
                            <div class="DownloadArea d-flex  mb-3">
                                <b-button variant="success" class="mr-1">下載</b-button>
                                <b-button variant="primary" class="mr-1">上傳</b-button>
                            </div>
                            <div class="CategoryTable">
                                <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="categories"
                                    :isBusy="tableBusy" @dataRequire="onDataRequire">
                                    <template #top-row="categories">
                                        <b-td v-for="(field, index) in categories.fields" :key="index">
                                            <b-form-input v-model="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>
                                </CustomTable>
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
    import CustomTable from '@/components/Table/CustomTable.vue'

    export default {
        name: 'WorkingCategory',
        components: {
            TitledCard,
            CustomTable,
        },
        data() {
            return {
                tableBusy: false,
                search: {},
                fields: [{
                        "key": "categoryId",
                        "label": "工項編號"
                    },
                    {
                        "key": "categoryDetail",
                        "label": "工項敘述"
                    }
                ],
                categories: [{
                        categoryId: "TM-X03011",
                        categoryDetail: "排水溝清理"
                    },
                    {
                        categoryId: "TM-W01012",
                        categoryDetail: "清洗水泥水塔"
                    },
                    {
                        categoryId: "TM-M01012",
                        categoryDetail: "熱水器故障"
                    },
                    {
                        categoryId: "TM-W02011",
                        categoryDetail: "水龍頭漏水"
                    },
                ],
                input: {}
            }
        },
        methods: {
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {},
        }
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