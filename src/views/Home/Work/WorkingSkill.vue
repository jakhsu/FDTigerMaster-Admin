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
                        <TitledCard title="師傅技能:">
                            <div class="SkillTable">
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
    export default {
        name: 'WorkingSkill',
        components: {
            TitledCard
        },
        data() {
            return {
                items: [{
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                ],
                input: {}
            }
        },
        methods: {}
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