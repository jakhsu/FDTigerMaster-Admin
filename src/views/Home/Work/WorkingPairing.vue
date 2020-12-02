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
                            <div class="PairingTable">
                                <b-form enctype="multipart/form-data" @submit="addToList">
                                    <b-form-input type="text" list="skills" placeholder="師傅專長"
                                        v-model="selected.skillId" />
                                    <b-form-datalist id="skills">
                                        <option value="TM-X03010">排水溝清理</option>
                                        <option value="TM-M01010">熱水器安裝維修</option>
                                    </b-form-datalist>
                                    <b-table>
                                        <thead>
                                            <b-tr>
                                                <b-th>
                                                    <b-form-input type="checkbox" />
                                                </b-th>
                                                <b-th>專長編號</b-th>
                                                <b-th>敘述</b-th>
                                                <b-th>對應的工項編號</b-th>
                                            </b-tr>
                                        </thead>
                                        <tbody>
                                            <b-tr>
                                                <b-td>
                                                    <b-form-input type="checkbox" />
                                                </b-td>
                                                <b-td>{{ target.skillId }}</b-td>
                                                <b-td>{{ target.detail }}</b-td>
                                                <b-td>
                                                    <div v-for="(item, index) in target.taskIds" :key="index">
                                                        {{ item }}
                                                    </div>
                                                </b-td>
                                            </b-tr>
                                        </tbody>
                                    </b-table>
                                </b-form>
                            </div>
                            <div class="DownloadArea">
                                <b-button variant="success" class="mr-1">下載</b-button>
                                <b-button variant="primary" class="mr-1">上傳</b-button>
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col lg="6" md="12">
                        <TitledCard title="單筆輸入">
                            <label for="textarea">格式:逗號分離項目 --> </label>
                            <b-form-textarea v-model="textUpload" @change="parseTxtInput" name="" id="uploadTxt"
                                cols="30" rows="10"></b-form-textarea>
                            <b-button class="mt-2" @click="submitInput">確定</b-button>
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
                list: [{
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
                selected: {
                    skillId: "",
                },
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
            addToList() {
                this.list;
                this.list.push(this.input);
                this.input = {};
                alert("成功修改!");
            },
            parseTxtInput() {
                let str = document.getElementById("uploadTxt").value;
                let first = str.split(/(,)/);
                first = first.filter((ele) => ele != ",");
                this.parsed = first;
            },
            submitInput() {
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].skillId === this.selected.skillId) {
                        this.list[i].taskIds = this.parsed;
                    }
                }
                this.textUpload = "";
            },
        },
        watch: {
            "selected.skillId": function () {
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].skillId === this.selected.skillId) {
                        this.target = this.list[i];
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