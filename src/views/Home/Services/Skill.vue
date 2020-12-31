<template>
    <div id="SkillAndCategory">
        <SkillUpdateModal :initSkillContent="selectedSkill" @finish="fetchSkillData" />
        <SkillCreateModal @finish="fetchSkillData" />
        <b-container fluid>
            <div class="SkillAndCategory-Area">
                <b-row>
                    <b-col>
                        <div class="SkillAndCategory-Header">
                            <h2>技能總表</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="col-12">
                        <TitledCard title="技能:">
                            <div class="Toolbar d-flex mb-3">
                                <input style="display:none" ref="file" type="file">
                                <b-button size="sm" class="ml-2" variant="primary" @click="onSearchClick">
                                    搜尋
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                                    清空搜尋列
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="success" v-b-modal="'Skill-Create-Modal'">
                                    新增技能
                                </b-button>
                                <input name="skillUpload" type="file" ref="file" @change="handleFileUpload"
                                    style="display:none">
                                <b-button class="input-button ml-auto" @click="$refs.file.click()" variant="primary">
                                    上傳
                                </b-button>
                                <b-button @click="skillsDownload" variant="success" class="ml-2">下載</b-button>
                            </div>
                            <div>
                                <CustomTable ref="customTable" :queryRows="totalCount" :totalRows="totalCount"
                                    :datas="skills" :isBusy="tableBusy" :isSelectable="true" @rowClick="onSkillClick"
                                    selectMode='single' :fields="SkillsTable" :perPage="6">
                                    <template #top-row>
                                        <b-td v-for="(field, index) in SkillsTable" :key="index">
                                            <b-form-select v-if="field.key === 'active'" v-model="search['active']">
                                                <option value="0">停用</option>
                                                <option value="1">啟用</option>
                                            </b-form-select>
                                            <b-form-input v-if="field.key !== 'active'" v-model="search[field.key]"
                                                :name="field.key" :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>
                                    <template #cell(id)="data">
                                        <b-button variant="outline-success" pill v-b-modal="'Skill-Modify-Modal'"
                                            @click="startEditSkill(data.item)">
                                            {{data.value}}
                                        </b-button>
                                    </template>
                                    <template #cell(active)="data">
                                        {{ data.value === 1 ? "啟用" : "停用"}}
                                    </template>
                                </CustomTable>
                                <div>
                                    <label for="">對應工項</label>
                                    <div>
                                        <b-tags size="lg" placeholder="" v-model="workingCategories" disabled tag-pills
                                            tag-variant="success">
                                        </b-tags>
                                    </div>
                                </div>
                            </div>
                        </TitledCard>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import SkillsTable from '@/config/SkillsTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SkillCreateModal from '@/components/Modal/SkillCreateModal.vue'
    import SkillUpdateModal from '@/components/Modal/SkillUpdateModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'Skill',
        components: {
            TitledCard,
            CustomTable,
            SkillCreateModal,
            SkillUpdateModal
        },
        data() {
            return {
                SkillsTable,
                tableBusy: false,
                skills: [],
                totalCount: 0,
                workingCategories: [],
                search: {},
                selectedSkill: {}
            };
        },
        async created() {
            this.fetchSkillData();
        },
        methods: {
            async fetchSkillData() {
                try {
                    this.tableBusy = true;
                    const skills = await tigermaster.database.query("skill_item").get();
                    this.skills = skills.data;
                    this.totalCount = skills.totalCount;
                } catch (e) {
                    console.log("Failed to fetch skill data");
                } finally {
                    this.tableBusy = false;
                }
            },
            onSearchClearClick() {
                this.fetchSkillData();
                this.$refs.customTable.toFirstPage();
                this.search = {};
            },
            async onSearchClick() {
                this.tableBusy = true;
                let query = tigermaster.database.query("skill_item");
                const searchArray = Object.entries(this.search);
                searchArray.forEach(ele => {
                    ele[2] = 'LIKE';
                    ele[1] = '%' + ele[1] + '%';
                    query.where(`skill_item.${ele[0]}`, ele[2], ele[1]);
                })
                try {
                    this.skills = await query.get();
                } catch (e) {
                    console.log("Search failed, please check your search inputs")
                } finally {
                    this.tableBusy = false;
                    this.$refs.customTable.toFirstPage();
                }
            },
            onSkillClick(clickedSkill) {
                this.workingCategories = [];
                const workingCategories = clickedSkill.workingCategories;
                workingCategories.forEach((element) => {
                    this.workingCategories.push(element.id + " | " + element.description)
                });
            },
            async skillsDownload() {
                const skillsFile = tigermaster.storage.Skills;
                const file = await skillsFile.download();
                const link = document.createElement('a');
                const url = window.URL.createObjectURL(file);
                link.href = url;
                link.download = "skills.csv";
                link.click();
                window.URL.revokeObjectURL(url);
            },
            async handleFileUpload() {
                this.isLoading = true;
                const upload = this.$refs.file.files[0];
                const skillsFile = tigermaster.storage.Skills;
                await skillsFile.upload(upload);
                this.fetchSkillData();
            },
            async startEditSkill(selectedSkill) {
                this.selectedSkill = selectedSkill;
                this.$bvModal.show("WorkingCategory-Update-Modal");
            }
        }
    }
</script>

<style scoped>
    #SkillAndCategory {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #SkillAndCategory .SkillAndCategory-Area {
        padding: 0px 50px;
    }

    #SkillAndCategory .SkillAndCategory-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #SkillAndCategory .SkillAndCategory-Area {
            padding: 0px;
        }
    }

    .Skill-Input-Error {
        color: #dd2a0e;
        font-size: 10px;
    }
</style>