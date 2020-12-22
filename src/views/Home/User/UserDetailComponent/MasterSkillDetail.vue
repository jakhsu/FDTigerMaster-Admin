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
            let queryArray = this.user.master.skillItems;
            queryArray = queryArray.split(/(,)/);
            queryArray = queryArray.filter((element) => element != ",");

            const response = await tigermaster.database.query("skill_item").limit(0, 100)
                .where("skill_item.id", "IN", queryArray)
                .get();
            this.skills = response.data
            this.skills = this.skills.filter((element) =>
                element.active != 0
            );
            // query and iteratively build select options for skills
            let temp = await tigermaster.database.query("skill_item").limit(0, 100).get();
            temp = temp.data;
            temp = temp.filter((ele) => ele.active != 0);
            temp.forEach((ele) => {
                this.skillOptions.push(ele.id)
                this.skillOptionTexts.push(ele.description)
            })

            let categoryArray = this.currentUser.data.master.ignoreWorkingCategories;
            categoryArray = categoryArray.split(/(,)/);
            categoryArray = categoryArray.filter((element) => element != ",");
            let res = await tigermaster.database.query("working_category").limit(0, 100)
                .where("working_category.id", "IN", categoryArray)
                .get();
            res.data.forEach((ele) => {
                this.ignoredCategories.push(ele.id + " | " + ele.description)
            });

            // query and iteratively build select options for categories
            queryArray = [];
            this.skills.forEach((ele) => {
                queryArray.push(ele.id)
            });
            res = await tigermaster.database.query("working_category").limit(0, 100)
                .where("working_category.skill_item_id", "IN", queryArray)
                .get();
            res.data.forEach((ele) => {
                if (categoryArray.indexOf(ele.id) == -1) {
                    this.ignoreOptions.push(ele.id)
                    this.ignoreOptionTexts.push(ele.description)
                }
            });
            this.isLoadingIgnored = false;
            this.skillsTableBusy = false;
        },
        methods: {
            async onIgnoreCategory() {
                this.isLoadingIgnored = true;
                let selectedSkill = this.selectedSkill;
                console.log(selectedSkill);
                this.user.master.ignoreWorkingCategories = this.user.master.ignoreWorkingCategories + ',' + this
                    .categoryToBeIgnored;
                delete this.user.pass
                await this.currentUser.update(this.user)
                this.categoryToBeIgnored = '';
                let categoryArray = this.currentUser.data.master.ignoreWorkingCategories;
                categoryArray = categoryArray.split(/(,)/);
                categoryArray = categoryArray.filter((element) => element != ",");
                let res = await tigermaster.database.query("working_category").limit(0, 100)
                    .where("working_category.id", "IN", categoryArray)
                    .get();
                res.data.forEach((ele) => {
                    this.ignoredCategories.push(ele.id + " | " + ele.description)
                });
                this.updateSelectedSkill(this.selectedSkill);
                this.isLoadingIgnored = false;
            },
            onSkillsDataRequire() {},
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
            onSearchClick() {
                let resultArray = [];
                this.skills.forEach((ele) => {
                    if (ele.id == this.search.id) {
                        resultArray.push(ele)
                    } else if (ele.description == this.search.description) {
                        resultArray.push(ele)
                    }
                })
                this.skills = resultArray;
                this.search = {};
            },
            onSearchClearClick() {
                this.search = {}
            },
            async startEditSkill() {},
            updateSkill() {},
            clearModalData() {},
            onSaveClick() {},
            async createSkill() {
                this.skillsTableBusy = true;
                this.isLoadingModal = true;
                let userData = this.user;
                let skillsToBeUpdated = userData.master.skillItems;
                skillsToBeUpdated = skillsToBeUpdated + "," + this.skillToBeAdded;
                userData.master.skillItems = userData.master.skillItems + "," + this.skillToBeAdded;
                delete userData.pass;
                await this.currentUser.update(userData, {
                    master: {
                        skillItems: skillsToBeUpdated
                    }
                });
                this.$router.go();
                this.isLoadingModal = false;
                this.skillsTableBusy = false;
            },
            async updateSelectedSkill(obj) {
                this.categoriesTableBusy = true;
                this.categories = [];
                try {
                    if (obj !== String) {
                        this.selectedSkill = obj[0].id;
                    }
                    let skillIndex = this.skills.findIndex((element) => element.id == this.selectedSkill)
                    console.log(skillIndex)
                    let respectiveCategories = this.skills[skillIndex].workingCategories;
                    console.log(respectiveCategories)
                    respectiveCategories.forEach((ele) => {
                        this.categories.push(ele.id + " | " + ele.description)
                    })
                    this.categories = this.categories.filter(item => !this.ignoredCategories.includes(item));
                } catch (e) {
                    console.log(e)
                }
                this.categoriesTableBusy = false;
            },
            async updateIgnoredCategories(obj) {
                this.isLoadingIgnored = true;
                let userData = this.user;
                let splited = obj.map((ele) => {
                    return ele.split(" ")
                })
                let array = splited.flat();
                let categoryRegex = /^TM-[A-Z]{1}[0-9]{4}.+(?<!00)$/
                let result = array.filter((ele) => {
                    return categoryRegex.test(ele)
                })
                result = result.reduce((a, b) => {
                    return a + "," + b;
                })
                userData.master.ignoreWorkingCategories = result;
                delete userData.pass;
                await this.currentUser.update(userData)
                this.updateSelectedSkill(this.selectedSkill);
                this.isLoadingIgnored = false;
            }
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