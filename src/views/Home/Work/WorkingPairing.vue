<template>
    <div id="Working-pairs">
        <b-container fluid>
            <div class="pairsArea">
                <b-row>
                    <b-col>
                        <div class="pairs-Header">
                            <h2>工項技能配對</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12" lg="4" xl="4">
                        <TitledCard title="技能">
                            <b-form inline @submit.prevent>
                                <b-input-group>
                                    <b-form-select v-model="selected.skillId">
                                        <b-form-select-option :value="skill.skillId" v-for="(skill, index) in pairs"
                                            :key="index">
                                            {{ skill.skillId}}
                                            {{ skill.detail }}
                                        </b-form-select-option>
                                    </b-form-select>
                                    <b-form-input class="ml-2" placeholder="技能編號" v-model="skillInput.skillId" />
                                    <b-form-input placeholder="技能描述" v-model="skillInput.detail" />
                                    <template #append>
                                        <b-button variant="warning" @click="addToSkill">加入
                                        </b-button>
                                    </template>
                                </b-input-group>
                            </b-form>
                        </TitledCard>
                    </b-col>
                    <b-col md="12" lg="8" xl="8">
                        <TitledCard title="工項">
                            <b-card class="mt-2" title="對應工項">
                                <b-card-body>
                                    <div class="d-flex" v-for="(item, key, index) in target.taskIds" :key="index">
                                        {{ key }}
                                    </div>
                                </b-card-body>
                            </b-card>
                            <b-card class="mt-2" title="單筆修改">
                                <b-card-body>
                                    <b-form inline @submit.prevent>
                                        <b-input-group>
                                            <b-form-input :value="taskPrefix" disabled />
                                            <b-form-input class="ml-2" type="text" maxlength="1" v-model="taskSuffix">
                                            </b-form-input>
                                            <template #append>
                                                <b-button type="submit" variant="warning" @click="addToTask">加入
                                                </b-button>
                                            </template>
                                        </b-input-group>
                                    </b-form>
                                </b-card-body>
                            </b-card>
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
        name: 'Workingpairs',
        components: {
            TitledCard,
        },
        data() {
            return {
                tableBusy: false,
                search: {},
                fields: [{
                        key: 'skillId',
                        label: '技能編號'
                    },
                    {
                        key: 'detail',
                        label: '技能描述'
                    },
                    {
                        key: 'taskIds',
                        label: '對應工項'
                    }
                ],
                pairs: [{
                        skillId: "TM-X03010",
                        detail: "排水溝清理",
                        taskIds: {
                            'TM-X03011': true,
                            'TM-X03012': true,
                            'TM-X03013': true,
                            'TM-X03014': true,
                            'TM-X03015': true,
                            'TM-X03016': true,
                        }
                    },
                    {
                        skillId: "TM-W01010",
                        detail: "水塔清洗",
                        taskIds: {
                            'TM-W01011': true,
                            'TM-W01012': true,
                            'TM-W01013': true,
                            'TM-W01014': true,
                            'TM-W01015': true,
                            'TM-W01016': true,
                        }
                    },
                ],
                selected: {
                    skillId: '',
                    taskId: [],
                },
                target: {},
                input: {
                    skillId: "",
                    msg: "",
                },
                final: "",
                taskSuffix: '',
                skillInput: {
                    skillId: '',
                    detail: '',
                    taskIds: {}
                },
            };
        },
        methods: {
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {},
            addToTask() {
                if (Object.keys(this.target).length === 0) {
                    return
                }
                this.$set(this.target.taskIds,
                    this.taskInput, true
                )
            },
            addToSkill() {
                this.$set(this.pairs, this.pairs.length, this.skillInput)
            }
        },
        watch: {
            "selected.skillId": function () {
                for (var i = 0; i < this.pairs.length; i++) {
                    if (this.pairs[i].skillId === this.selected.skillId) {
                        this.target = this.pairs[i];
                    }
                }
                return;
            },
        },
        computed: {
            taskPrefix() {
                let end = this.selected.skillId.length;
                return this.selected.skillId.slice(0, end - 1);
            },
            taskInput() {
                return this.taskPrefix + this.taskSuffix;
            }
        }
    }
</script>

<style scoped>
    #Working-pairs {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Working-pairs .pairsArea {
        padding: 0px 50px;
    }

    #Working-pairs .pairsArea .pairs-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Working-pairs .pairsArea {
            padding: 0px;
        }
    }
</style>