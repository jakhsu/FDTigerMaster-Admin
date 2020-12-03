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
                        <TitledCard title="配對查詢表">
                            <div class="Toolbar d-flex mb-3">
                                <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                                <b-button class="ml-2" variant="danger" @click="onSearchClearClick">清除搜尋</b-button>
                                <b-button variant="success" class="ml-auto">下載</b-button>
                                <b-button variant="primary" class="ml-2">上傳</b-button>
                            </div>
                            <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="pairing"
                                :isBusy="tableBusy" @dataRequire="onDataRequire">
                                <template #top-row="pairing">
                                    <b-td v-for="(field, index) in pairing.fields" :key="index">
                                        <b-form-input v-model="search[field.key]" :name="field.key"
                                            :placeholder="`${field.label}`" />
                                    </b-td>
                                </template>
                                <template #cell(taskIds)="data">
                                    <div v-for="(id, index) in data.value" :key="index">
                                        {{id}}
                                    </div>
                                </template>
                            </CustomTable>
                        </TitledCard>
                    </b-col>
                    <b-col lg="6" md="12">
                        <TitledCard title="單筆輸入">
                            <div class="PairingTable mb-3">
                                <b-form enctype="multipart/form-data">
                                    <b-form-input type="text" list="skills" placeholder="師傅專長" v-model="selected" />
                                    <datalist id="skills">
                                        <option value="TM-X03010">排水溝清理</option>
                                        <option value="TM-M01010">熱水器安裝維修</option>
                                    </datalist>
                                    <div class="mt-3 mb-3" v-for="(item, index) in target.taskIds" :key="index">
                                        對應的工項編號: {{ item }}
                                    </div>
                                </b-form>
                            </div>
                            <div>
                                <b-form-textarea v-b-tooltip.hover.left title="請用逗號分隔開不同工項" v-model="textUpload"
                                    @change="parseTxtInput" name="" id="uploadTxt" cols="30" rows="10">
                                </b-form-textarea>
                                <b-button variant="success" class="mt-2" @click="submitInput">確定</b-button>
                            </div>
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
        name: 'WorkingPairing',
        components: {
            TitledCard,
            CustomTable,
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
                pairing: [{
                        skillId: "TM-X03010",
                        detail: "排水溝清理",
                        taskIds: ["TM-X03011", "TM-W01010"],
                    },
                    {
                        skillId: "TM-M01010",
                        detail: "熱水器安裝維修",
                        taskIds: ["TM-W02011", "TM-M01012"],
                    },
                ],
                selected: "",
                target: {},
                input: {
                    skillId: "",
                    msg: "",
                },
                parsed: "",
                textUpload: "",
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
                for (var i = 0; i < this.pairing.length; i++) {
                    if (this.pairing[i].skillId === this.selected) {
                        this.pairing[i].taskIds = this.parsed;
                    }
                }
                this.textUpload = "";
            },
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {},
        },
        watch: {
            "selected": function () {
                for (var i = 0; i < this.pairing.length; i++) {
                    if (this.pairing[i].skillId === this.selected) {
                        this.target = this.pairing[i];
                    }
                }
                return;
            },
        },
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