<template>
    <div id="Working-Skill">
        <b-container fluid>
            <div class="SkillArea">
                <b-row>
                    <b-col>
                        <div class="Skill-Header">
                            <h2>技能總表</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="6" md="12">
                        <TitledCard title="技能:">
                            <div class="Toolbar d-flex mb-3">
                                <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                                <b-button class="ml-2" variant="danger" @click="onSearchClearClick">清除搜尋</b-button>
                                <b-button variant="success" class="ml-auto">下載</b-button>
                                <b-button variant="primary" class="ml-2">上傳</b-button>
                            </div>
                            <div class="SkillTable">
                                <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="skills"
                                    :isBusy="tableBusy" @dataRequire="onDataRequire">
                                    <template #top-row="skills">
                                        <b-td v-for="(field, index) in skills.fields" :key="index">
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
                                <label class="mt-2" for="inputId">技能編號</label>
                                <b-form-input required id="inputId" v-model="input.id"></b-form-input>
                                <label class="mt-2" for="inputDetail">技能描述</label>
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
        name: 'WorkingSkill',
        components: {
            TitledCard,
            CustomTable
        },
        data() {
            return {
                tableBusy: false,
                search: {},
                fields: [{
                        "key": "skillId",
                        "label": "技能編號"
                    },
                    {
                        "key": "skillDetail",
                        "label": "技能敘述"
                    }
                ],
                skills: [{
                        skillId: "TH-W0101",
                        skillDetail: "排水溝清理"
                    },
                    {
                        skillId: "TH-W0101",
                        skillDetail: "排水溝清理"
                    },
                    {
                        skillId: "TH-W0101",
                        skillDetail: "排水溝清理"
                    },
                    {
                        skillId: "TH-W0101",
                        skillDetail: "排水溝清理"
                    },
                    {
                        skillId: "TH-W0101",
                        skillDetail: "排水溝清理"
                    },
                    {
                        skillId: "TH-W0101",
                        skillDetail: "排水溝清理"
                    },
                    {
                        skillId: "TH-W0101",
                        skillDetail: "排水溝清理"
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
    #Working-Skill {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Working-Skill .SkillArea {
        padding: 0px 50px;
    }

    #Working-Skill .SkillArea .Skill-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Working-Skill .SkillArea {
            padding: 0px;
        }
    }
</style>