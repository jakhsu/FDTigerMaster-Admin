<template>
    <Loading v-if="isLoading" />
    <div v-else id="SkillAndCategory">
        <SkillModifyModal title="修改技能" id="Skill-Modify-Modal" :skillToBeEdited="skillToBeEdited"
            @isModifySuccess="fetchSkillData">
        </SkillModifyModal>
        <SkillCreateModal title="新增技能" id="Skill-Create-Modal" @isCreateSuccess="fetchSkillData">
        </SkillCreateModal>
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
                                <b-button size="sm" class="ml-2" variant="primary" @click="onSearchClick">搜尋
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                                    清空搜尋列
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="success" v-b-modal="'Skill-Create-Modal'">新增技能
                                </b-button>
                                <input name="skillUpload" type="file" ref="file" @change="handleFileUpload"
                                    style="display:none">
                                <b-button class="input-button ml-auto" @click="uploadFile()" variant="primary">上傳
                                </b-button>
                                <b-button @click="skillsDownload" variant="success" class="ml-2">下載</b-button>
                            </div>
                            <div>
                                <CustomTable :queryRows="totalCount" :totalRows="totalCount" :datas="skills"
                                    :isBusy="tableBusy" @dataRequire="onSkillsDataRequire" :isSelectable="true"
                                    @rowClick="updateSelectedSkill" selectMode='single' :fields="SkillsTable">
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
                                            @click="startEditSkill(data)">
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
                                        <b-tags size="lg" placeholder="" v-model="categories" disabled tag-pills
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
    import Loading from '@/components/Loading.vue'
    import SkillsTable from '@/config/SkillsTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SkillCreateModal from '@/components/Modal/SkillCreateModal.vue'
    import SkillModifyModal from '@/components/Modal/SkillModifyModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'Skill',
        components: {
            Loading,
            TitledCard,
            CustomTable,
            SkillCreateModal,
            SkillModifyModal
        },
        data() {
            return {
                SkillsTable,
                isLoading: false,
                tableBusy: false,
                totalCount: 0,
                skills: [],
                categories: [],
                search: {},
                skillToBeEdited: {},
                selectedSkill: ''
            };
        },
        async created() {
            this.fetchSkillData();
        },
        methods: {
            async fetchSkillData() {
                try {
                    this.tableBusy = true;
                    const skills = await tigermaster.database
                        .query("skill_item")
                        .limit(0, 100)
                        .get();
                    this.skills = skills.data;
                    this.totalCount = skills.totalCount;
                } catch (e) {
                    console.log(e);
                } finally {
                    this.tableBusy = false;
                }
            },
            onSkillsDataRequire() {
                this.skillTableBusy = true;
            },
            onCategoriesDataRequire() {
                this.categoriesTableBusy = true;
            },
            onSearchClearClick() {
                this.skills = {};
                this.search = {};
            },
            async onSearchClick() {
                this.tableBusy = true;
                let query = tigermaster.database.query("skill_item");
                let searchArray = Object.entries(this.search);
                searchArray.forEach(element => {
                    element[2] = 'LIKE';
                    element[1] = '%' + element[1] + '%';
                    query.where(`skill_item.${element[0]}`, element[2], element[1]);
                })
                query.limit(0, 100);
                this.skills = await query.get();
                this.search = {};
                this.tableBusy = false;
            },
            updateSelectedSkill(selectedSkill) {
                this.categoriesTableBusy = true;
                this.categories = [];
                try {
                    let skillId = selectedSkill.id;
                    let skillIndex = this.skills.data.findIndex((element) => element.id === skillId);
                    let respectiveCategories = this.skills.data[skillIndex].workingCategories;
                    respectiveCategories.forEach((element) => {
                        this.categories.push(element.id + " | " + element.description)
                    });
                } catch (error) {
                    console.log(error);
                }
                this.categoriesTableBusy = false;
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
                const fileInput = this.$refs.file;
                this.isLoading = true;
                const skillsFile = tigermaster.storage.Skills;
                await skillsFile.upload(fileInput.files[0]);
                this.skills = await tigermaster.database.query("skill_item").limit(0, 100).get();
                this.isLoading = false;
            },
            uploadFile() {
                let fileInput = this.$refs.file;
                fileInput.click();
            },
            async startEditSkill(data) {
                this.isLoadingModal = true;
                this.skillToBeEdited = data;
                this.isLoadingModal = false;
            },
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