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
                    <b-col class="col-12">
                        <TitledCard title="工項技能配對">
                            <b-form inline @submit.prevent>
                                <b-form-select required v-model="selected.skillId">
                                    <option value="">技能</option>
                                    <option value="TM-X03010">排水溝清理</option>
                                    <option value="TM-M01010">熱水器安裝維修</option>
                                </b-form-select>
                                <b-form-select required v-model="selected.taskId" class="ml-2">
                                    <option value="">工項</option>
                                    <option value="TM-W0001111">TM-W0001111</option>
                                    <option value="TM-W999999">TM-W999999</option>
                                </b-form-select>
                                <b-button type="submit" class="ml-2" variant="warning" @click="addToPair">加入
                                </b-button>
                                <b-button class="ml-auto" variant="primary">上傳</b-button>
                                <b-button class="ml-2" variant="success">下載</b-button>
                            </b-form>
                            <b-card class="mt-2" title="對應工項">
                                <b-card-body>
                                    <div class="d-flex" v-for="(item, key, index) in target.taskIds" :key="index">
                                        <b-form-checkbox v-model="target.taskIds[key]" />
                                        {{ key }}
                                    </div>
                                </b-card-body>
                                <b-card-footer>
                                    <b-button variant="success">修改完成</b-button>
                                </b-card-footer>
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
                            'TM-W01010': true,
                            'TM-W01012': true,
                            'TM-W01444': true,
                            'TM-W01522': true,
                            'TM-W01123': true,
                        }
                    },
                    {
                        skillId: "TM-M01010",
                        detail: "熱水器安裝維修",
                        taskIds: {
                            'TM-W02011': true,
                            'TM-M01012': true,
                            'TM-W01015': true,
                            'TM-W01444': true,
                            'TM-W01522': true,
                            'TM-W01123': true,
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
                parsed: "",
                textUpload: "",
                final: "",
            };
        },
        methods: {
            parseTxtInput() {
                let str = document.getElementById("uploadTxt").value;
                let parsed = str.split(/(,)/);
                parsed = parsed.filter((ele) => ele != ",");
                this.parsed = parsed;
            },
            submitInput() {
                for (var i = 0; i < this.pairs.length; i++) {
                    if (this.pairs[i].skillId === this.selected) {
                        this.pairs[i].taskIds = this.parsed;
                    }
                }
                this.textUpload = "";
            },
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {},
            addToPair() {
                if (Object.keys(this.target).length === 0) {
                    return
                }
                this.$set(this.target.taskIds,
                    this.selected.taskId, true
                )
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