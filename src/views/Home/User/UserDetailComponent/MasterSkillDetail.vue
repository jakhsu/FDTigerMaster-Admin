<template>
    <Loading v-if="isLoading" />
    <div v-else id="MasterSkillDetail">
        <SimpleModal @onSaveClick="createSkill" title="新增技能" @modalHidden="clearModalData"
            id="Master-Skill-Create-Modal">
            <template #modal-body>
                <b-form>
                    <b-card>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能編號: ">
                            <b-form-input list="Available-Skills" v-model="skillToBeAdded" autocomplete="off">
                            </b-form-input>
                            <datalist id="Available-Skills">
                                <option v-for="(option, index) in skillOptions" :key="index" :value="option">
                                    {{ skillOptionTexts[index] }}
                                </option>
                            </datalist>
                        </b-form-group>
                    </b-card>
                </b-form>
            </template>
        </SimpleModal>
        <b-container fluid>
            <b-row>
                <b-col lg='6' md='12'>
                    <TitledCard title="師傅技能">
                        <div class="Toolbar d-flex mb-3">
                            <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                            <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清除搜尋</b-button>
                            <b-button class="ml-auto" variant="warning" v-b-modal="'Master-Skill-Create-Modal'">新增技能
                            </b-button>
                        </div>
                        <CustomTable :fields="skillsField" :datas="skills" :isBusy="skillsTableBusy"
                            @dataRequire="onSkillsDataRequire" :isSelectable="true" @rowSelected="updateSelectedSkill"
                            selectMode='single'>
                            <template #top-row>
                                <b-td v-for="(field, index) in skillsField" :key="index">
                                    <b-form-input v-model="search[field.key]" :name="field.key"
                                        :placeholder="`${field.label}`" />
                                </b-td>
                            </template>
                        </CustomTable>
                        <div>
                            <label for="">對應工項</label>
                            <scale-loader v-if="categoriesTableBusy" />
                            <div v-else>
                                <b-tags size="lg" v-model="categories" placeholder="" disabled tag-pills
                                    tag-variant="success">
                                </b-tags>
                            </div>
                        </div>
                    </TitledCard>
                </b-col>
                <b-col lg="6" md="12">
                    <TitledCard title="師傅工項">
                        <b-card>
                            <b-form-group label="可用工項選項">
                                <b-form-input v-model="categoryToBeIgnored" list="Available-Ignore-Options"
                                    autocomplete="off">
                                </b-form-input>
                                <datalist id="Available-Ignore-Options">
                                    <option v-for="(option, index) in ignoreOptions" :key="index" :value="option">
                                        {{ignoreOptionTexts[index]}}
                                    </option>
                                </datalist>
                            </b-form-group>
                            <b-button variant="success" @click="onIgnoreCategory">確定送出</b-button>
                            <div class="mt-2">
                                <label for="">不會的工項</label>
                                <scale-loader v-if="isLoadingIgnored" />
                                <div v-else>
                                    <b-tags size="lg" @input="updateIgnoredCategories" v-model="ignoredCategories"
                                        placeholder="" tag-pills tag-variant="danger">
                                    </b-tags>
                                </div>
                            </div>
                        </b-card>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SkillsTable from '@/config/SkillsTable.json'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import tigermaster from 'fdtigermaster-sdk'
    import Loading from '@/components/Loading.vue'
    import * as sdkQuery from '@/model/sdkRepackage/query.js'
    import * as parse from '@/model/Parsers/parsers.js'
    // import regex from '@/model/InputValidators/regex.js'

    export default {
        name: "MasterSkillDetail",
        components: {
            TitledCard,
            CustomTable,
            SimpleModal,
            Loading,
        },
        props: {
            user: Object,
            currentUser: Object,
        },
        data() {
            return {
                search: {},
                skillsTableBusy: false,
                skills: [],
                skillsField: SkillsTable,
                isLoadingModal: false,
                skillToBeEdited: '',
                skillToBeAdded: '',
                categories: [],
                skillOptions: [],
                categoryToBeIgnored: '',
                ignoredCategories: [],
                ignoreOptions: [],
                isLoading: false,
                categoriesTableBusy: false,
                selectedSkill: '',
                isLoadingIgnored: false,
                ignoreOptionTexts: [],
                skillOptionTexts: [],
            }
        },
        async created() {
            this.skillsTableBusy = true;
            this.isLoadingIgnored = true
            await this.fetchMasterSkillsData();
            await this.fetchSkillOptions();
            await this.generateIgnoreOptions();
            await this.fetchMasterIgnoreCategoryData();
            this.isLoadingIgnored = false;
            this.skillsTableBusy = false;
        },
        methods: {
            async fetchMasterSkillsData() {
                if (this.user.master.skillItems === '') {
                    return
                }
                try {
                    this.skillsTableBusy = true
                    const queryArray = parse.stringToArray(this.user.master.skillItems);
                    let response = await sdkQuery.querySomeSkills(queryArray);
                    this.skills = response.data.filter((element) =>
                        element.active != 0
                    );
                } catch (error) {
                    console.log(error)
                } finally {
                    this.skillsTableBusy = false;
                }
            },
            async fetchSkillOptions() {
                try {
                    let response = await sdkQuery.queryAllSkills();
                    let allSkillItems = response.data.filter((ele) => ele.active != 0);
                    let existingSkills = this.skills.map(e => e.id);
                    allSkillItems.forEach((ele) => {
                        if (!existingSkills.includes(ele.id)) {
                            this.skillOptions.push(ele.id)
                            this.skillOptionTexts.push(ele.description)
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            },
            async fetchMasterIgnoreCategoryData() {
                if (this.user.master.ignoredWorkingCategories == '') {
                    return
                }
                try {
                    let queryArray = parse.stringToArray(this.currentUser.data.master.ignoreWorkingCategories, ",");
                    let response = await sdkQuery.querySomeCategories(queryArray);
                    let ignoredCategories = response.data;
                    ignoredCategories.forEach((ele) => {
                        this.ignoredCategories.push(ele.id + " | " + ele.description)
                    })
                } catch (error) {
                    console.log(error)
                    this.ignoredCategories = [];
                }
            },
            async generateIgnoreOptions() {
                let queryArray = [];
                let response;
                this.skills.forEach((ele) => {
                    queryArray.push(ele.id)
                });
                if (queryArray == []) {
                    return;
                }
                try {
                    response = await sdkQuery.querySomeCategoriesBySkillId(queryArray);
                    let possibleIgnoreOptions = response.data;
                    possibleIgnoreOptions.forEach((ele) => {
                        if (this.ignoredCategories.findIndex(element => element.id === ele.id) == -1) {
                            this.ignoreOptions.push(ele.id)
                            this.ignoreOptionTexts.push(ele.description)
                        }
                    })
                } catch (error) {
                    console.log(error)
                    this.ignoreOptions = []
                }
            },
            async onIgnoreCategory() {
                this.isLoadingIgnored = true;
                this.categoriesTableBusy = true;
                let store = this.selectedSkill;
                this.user.master.ignoreWorkingCategories = this.user.master.ignoreWorkingCategories + ',' + this
                    .categoryToBeIgnored;
                delete this.user.pass
                await this.currentUser.update(this.user)
                this.categoryToBeIgnored = '';
                let categoryArray = parse.stringToArray(this.currentUser.data.master.ignoreWorkingCategories, ",");
                let res = await tigermaster.database.query("working_category").limit(0, 100)
                    .where("working_category.id", "IN", categoryArray)
                    .get();
                res.data.forEach((ele) => {
                    this.ignoredCategories.push(ele.id + " | " + ele.description)
                });
                this.updateSelectedSkill(store);
                this.categoriesTableBusy = false
                this.isLoadingIgnored = false;
            },
            onSkillsDataRequire() {},
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {
                let resultArray = [];
                this.skills.forEach((ele) => {
                    if (ele.id.indexOf(this.search.id) > -1) {
                        resultArray.push(ele)
                    } else if (ele.description.indexOf(this.search.description) > -1) {
                        resultArray.push(ele)
                    }
                })
                this.skills = resultArray;
                this.search = {};
            },
            onSearchClearClick() {
                this.search = {}
            },
            async createSkill() {
                this.skillsTableBusy = true;
                this.isLoadingModal = true;
                let userData = this.user;
                let skills = userData.master.skillItems;
                if (skills === '') {
                    skills = this.skillToBeAdded;
                } else {
                    skills = skills + ',' + this.skillToBeAdded;
                }
                delete userData.pass;
                userData.master.skillItems = skills;
                await this.currentUser.update(userData);
                await this.fetchMasterSkillsData();
                await this.fetchSkillOptions();
                await this.generateIgnoreOptions();
                this.$bvModal.hide('Master-Skill-Create-Modal');
                this.isLoadingModal = false;
                this.skillsTableBusy = false;
            },
            async updateSelectedSkill(obj) {
                this.categoriesTableBusy = true;
                this.categories = [];
                if (typeof (obj) == "string") {
                    this.selectedSkill = obj
                } else {
                    this.selectedSkill = obj[0].id
                }
                let skillIndex = this.skills.findIndex((element) => element.id == this.selectedSkill)
                let respectiveCategories = this.skills[skillIndex].workingCategories;
                respectiveCategories.forEach((ele) => {
                    this.categories.push(ele.id + " | " + ele.description)
                })
                this.categories = this.categories.filter(item => !this.ignoredCategories.includes(item));
                this.categoriesTableBusy = false;
            },
            async updateIgnoredCategories(obj) {
                this.isLoadingIgnored = true;
                this.categoriesTableBusy = true;
                let store = this.selectedSkill;
                let userData = this.user;
                let splited = obj.map((ele) => {
                    return ele.split(" ")
                })
                let array = splited.flat();
                let categoryRegex = /^TM-[A-Z]{1}[0-9]{4}.+(?<!00)$/
                let result = array.filter((ele) => {
                    return categoryRegex.test(ele)
                })
                if (result.length === 0) {
                    userData.master.ignoreWorkingCategories = '';
                } else {
                    result = result.reduce((a, b) => {
                        return a + "," + b
                    });
                    userData.master.ignoreWorkingCategories = result;
                }
                delete userData.pass;
                await this.currentUser.update(userData)
                this.updateSelectedSkill(store)
                this.categoriesTableBusy = false;
                this.isLoadingIgnored = false;
            },
            clearModalData() {},
        },
    }
</script>