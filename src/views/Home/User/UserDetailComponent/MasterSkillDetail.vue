<template>
    <div id="MasterSkillDetail">
        <SimpleModal @onSaveClick="createSkill" title="新增技能" @modalHidden="clearModalData"
            id="Master-Skill-Create-Modal">
            <template #modal-body>
                <b-form>
                    <b-card>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能編號: ">
                            <b-form-input list="available skills" v-model="skillToBeAdded" autocomplete="off">
                            </b-form-input>
                            <datalist id="available skills">
                                <option value=""></option>
                                <option v-for="(option, index) in skillOptions" :key="index">{{ option }}</option>
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
                            <b-tags v-model="categories" placeholder="" disabled tag-pills tag-variant="success">
                            </b-tags>
                        </div>
                    </TitledCard>
                </b-col>
                <b-col lg="6" md="12">
                    <TitledCard title="師傅工項">
                        <b-card>
                            <b-form-group label="師傅不會的工項">
                                <b-select v-model="categoryToBeIgnored" :options="ignoreOptions" />
                            </b-form-group>
                            <b-button variant="success" @click="onIgnoreCategory">確定送出</b-button>
                            <div class="mt-2">
                                <label for="">不會的工項</label>
                                <b-tags v-model="ignoredCategories" placeholder="" disabled tag-pills
                                    tag-variant="danger">
                                </b-tags>
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

    export default {
        name: "MasterSkillDetail",
        components: {
            TitledCard,
            CustomTable,
            SimpleModal,
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
            }
        },
        async created() {
            this.skillsTableBusy = true;
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
            // this.ignoredCategories = categoryArray;

            // query and iteratively build select options for categories
            queryArray = [];
            this.skills.forEach((ele) => {
                queryArray.push(ele.id)
            });
            res = await tigermaster.database.query("working_category").limit(0, 100)
                .where("working_category.skill_item_id", "IN", queryArray)
                .get();
            res.data.forEach((ele) => {
                this.ignoreOptions.push(ele.id)
            });
            this.skillsTableBusy = false;
        },
        methods: {
            onIgnoreCategory() {
                this.ignoredCategories.push(this.categoryToBeIgnored);
                this.categoryToBeIgnored = '';
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
            onSearchClick() {},
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
                let skillsToBeUpdated = this.user.master.skillItems;
                skillsToBeUpdated = skillsToBeUpdated + "," + this.skillToBeAdded;
                this.user.master.skillItems = this.user.master.skillItems + "," + this.skillToBeAdded;
                await this.currentUser.update(this.user, {
                    master: {
                        skillItems: skillsToBeUpdated
                    }
                });
                this.user = await await tigermaster.auth.getUserById(this.user.id)
                this.isLoadingModal = false;
                this.skillsTableBusy = false;
            },
            async updateSelectedSkill(obj) {
                this.categoriesTableBusy = true;
                this.categories = [];
                if (obj.length > 0) {
                    this.selectedSkill = obj[0].id;
                    const res = await tigermaster.database
                        .query("working_category")
                        .where("working_category.skill_item_id", "=", this.selectedSkill)
                        .limit(0, 100)
                        .get();
                    res.data.forEach((element) => {
                        if ("id" in element) {
                            this.categories.push(element.id + " | " + element.description)
                        }
                    })
                }
                this.categories = this.categories.filter(item => !this.ignoredCategories.includes(item));
                this.categoriesTableBusy = false;
            },
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