<template>
    <Loading v-if="isLoading" />
    <div v-else id="SkillAndCategory">
        <SimpleModal @onSaveClick="updateSkill" :isLoading="isLoadingModal" @modalHidden="clearModalData"
            id="Skill-Modify-Modal" title="單一技能修改">
            <template #modal-body>
                <b-form>
                    <b-card>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能編號: ">
                            <b-input v-model="skillToBeEdited.id" @update="skillIdValidate(skillToBeEdited.id)"
                                :state="skillInputState[0]" maxlength="10" />
                        </b-form-group>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能描述: ">
                            <b-input v-model="skillToBeEdited.description" :state="skillInputState[1]"
                                @update="skillDescriptionValidate(skillToBeEdited.description)" />
                        </b-form-group>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="啟用: ">
                            <b-select v-model="skillToBeEdited.active">
                                <option value="0">停用</option>
                                <option value="1">啟用</option>
                            </b-select>
                        </b-form-group>
                        <span class="Skill-Input-Error" v-if="formError">有些資料不符合規定</span>

                    </b-card>
                </b-form>
            </template>
        </SimpleModal>
        <SimpleModal @onSaveClick="createSkill" :isLoading="isLoadingModal" title="新增技能" @modalHidden="clearModalData"
            id="Skill-Create-Modal">
            <template #modal-body>
                <b-form>
                    <b-card>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能編號: ">
                            <b-input v-model="skillToBeAdded.id" @update="skillIdValidate(skillToBeAdded.id)"
                                :state="skillInputState[0]" maxlength="10" />
                        </b-form-group>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能描述: ">
                            <b-input v-model="skillToBeAdded.description"
                                @update="skillDescriptionValidate(skillToBeAdded.description)"
                                :state="skillInputState[1]" />
                        </b-form-group>
                        <span class="Skill-Input-Error" v-if="formError">有些資料不符合規定</span>
                    </b-card>
                </b-form>
            </template>
        </SimpleModal>
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
                                <CustomTable :queryRows="skills.queryRows" :totalRows="skills.totalCount"
                                    :datas="skills.data" :isBusy="skillsTableBusy" @dataRequire="onSkillsDataRequire"
                                    :isSelectable="true" @rowSelected="updateSelectedSkill" selectMode='single'
                                    :fields="skillsField">
                                    <template #top-row>
                                        <b-td v-for="(field, index) in skillsField" :key="index">
                                            <b-form-select v-if="field.key == 'active'" v-model="search['active']">
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
                                        {{ data.value == "1" ? "啟用" : data.value == 0 ? "停用" : data.value}}
                                    </template>
                                </CustomTable>
                                <div>
                                    <label for="">對應工項</label>
                                    <scale-loader v-if="categoriesTableBusy" />
                                    <div v-else>
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
    import CategoriesTable from '@/config/CategoriesTable.json'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue';

    import tigermaster from 'fdtigermaster-sdk'
    export default {
        name: 'Skill',
        components: {
            Loading,
            TitledCard,
            CustomTable,
            SimpleModal,
        },
        data() {
            return {
                isLoading: false,
                skillsTableBusy: false,
                selectedSkill: '',
                skillsField: SkillsTable,
                skills: {},
                categoriesField: CategoriesTable,
                categories: [],
                search: {},
                upload: {},
                skillToBeEdited: {},
                isLoadingModal: false,
                skillToBeAdded: {},
                categoriesTableBusy: false,
                skillInputState: [null, null],
                formError: false
            };
        },
        async created() {
            this.skillsTableBusy = true;
            try {
                this.fetchSkillData();
            } catch (error) {
                console.log(error)
            }
            this.skillsTableBusy = false;
        },
        methods: {
            async fetchSkillData() {
                this.skills = await tigermaster.database.query("skill_item").limit(0, 100).get();
            },
            skillIdValidate(id) {
                var skillIdRegex = /^TM-[A-Z]{1}[0-9]{4}00$/;
                this.skillInputState[0] = skillIdRegex.test(id);
            },
            skillDescriptionValidate(input) {
                this.skillInputState[1] = input !== '';
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
                this.skillsTableBusy = true;
                let query = tigermaster.database.query("skill_item");
                let searchArray = Object.entries(this.search);
                searchArray.forEach(element => {
                    element[2] = 'LIKE';
                    element[1] = '%' + element[1] + '%';
                    query.where(`skill_item.${element[0]}`, `${element[2]}`, `${element[1]}`);
                })
                query.limit(0, 100);
                this.skills = await query.get()
                this.search = {};
                this.skillsTableBusy = false;
            },
            updateSelectedSkill(obj) {
                this.categoriesTableBusy = true;
                this.categories = [];
                try {
                    let selectedSkillId = obj[0].id;
                    let skillIndex = this.skills.data.findIndex((element) => element.id == selectedSkillId)
                    let respectiveCategories = this.skills.data[skillIndex].workingCategories;
                    respectiveCategories.forEach((element) => {
                        this.categories.push(element.id + " | " + element.description)
                    })
                } catch (exeception) {
                    console.log(exeception)
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
                let fileInput = this.$refs.file;
                this.upload = fileInput.files[0];
                this.isLoading = true;
                const skillsFile = tigermaster.storage.Skills;
                await skillsFile.upload(this.upload);
                this.skills = await tigermaster.database.query("skill_item").limit(0, 100).get();
                this.isLoading = false;
            },
            uploadFile() {
                let fileInput = this.$refs.file;
                fileInput.click();
            },
            async startEditSkill(data) {
                this.isLoadingModal = true;
                this.skills.data.forEach((ele) => {
                    if (ele.id == data.value) {
                        this.skillToBeEdited = ele
                    }
                })
                this.isLoadingModal = false;
            },
            clearModalData(arg) {
                if (arg == true) {
                    this.skillToBeEdited = {};
                    this.skillInputState = [];
                    this.formError = null;
                }
            },
            async updateSkill() {
                if (this.skillInputState[0] && this.skillInputState[1]) {
                    this.isLoadingModal = true
                    this.skillsTableBusy = true;
                    const skill = tigermaster.services.Skill;
                    await skill.update({
                        id: this.skillToBeEdited.id,
                        description: this.skillToBeEdited.description,
                        active: this.skillToBeEdited.active,
                    });
                    this.skills = await tigermaster.database.query("skill_item").limit(0, 100).get();
                    this.$bvModal.hide("Skill-Modify-Modal");
                    this.isLoadingModal = false
                    this.skillsTableBusy = false;
                } else {
                    this.formError = true;
                    this.skillInputState = [];
                }
            },
            async createSkill() {
                if (this.skillInputState[0] && this.skillInputState[1]) {
                    this.isLoadingModal = true
                    this.skillsTableBusy = true;
                    const skill = tigermaster.services.Skill;
                    await skill.create({
                        id: this.skillToBeAdded.id,
                        description: this.skillToBeAdded.description,
                        active: 1,
                    });
                    this.skills = await tigermaster.database.query("skill_item").limit(0, 100).get();
                    this.$bvModal.hide("Skill-Create-Modal");
                    this.isLoadingModal = false
                    this.skillsTableBusy = false;
                } else {
                    this.formError = true;
                    this.skillInputState = [];
                }

            }
        },
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