<template>
    <div id="MasterSkillDetail">
        <SimpleModal @onSaveClick="createSkill" title="新增技能" @modalHidden="clearModalData"
            id="Master-Skill-Create-Modal">
            <template #modal-body>
                <b-form>
                    <b-card>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能編號: ">
                            <b-select v-model="skillToBeAdded" :options="skillOptions" />
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
                            <!-- <template #cell(id)="data">
                                <b-button variant="outline-success" pill v-b-modal="'Master-Skill-Modify-Modal'"
                                    @click="startEditSkill(data)">
                                    {{data.value}}
                                </b-button>
                            </template> -->
                        </CustomTable>
                        <div>
                            <label for="">對應工項</label>
                            <b-tags v-model="categories" placeholder="" disabled tag-pills tag-variant="success">
                            </b-tags>
                        </div>
                        <!-- <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="pairing" :isBusy="tableBusy"
                            @dataRequire="onDataRequire">
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
                        </CustomTable> -->
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
                ignoredCategories: this.currentUser.data.master.ignoreWorkingCategories,
                ignoreOptions: [],
            }
        },
        async created() {
            this.skillsTableBusy = true;
            let queryArray = this.user.master.skillItems;
            queryArray = queryArray.split(/(,)/);
            queryArray = queryArray.filter((element) => element != ",");
            queryArray.forEach((ele) => {
                return ele = {
                    id: `${ele}`,
                    description: '',
                    active: 1
                }
            })
            const skill = tigermaster.services.Skill;

            for (let i = 0; i < queryArray.length; i++) {
                let skillItem = await skill.get(queryArray[i])
                this.skills.push(skillItem);
            }
            let temp = await tigermaster.database.query("skill_item").limit(0, 100).get();
            temp = temp.data;

            temp.forEach((ele) => {
                this.skillOptions.push(ele.id)
            })

            let categoryArray = this.currentUser.data.master.ignoreWorkingCategories;
            categoryArray = categoryArray.split(/(,)/);
            categoryArray = categoryArray.filter((element) => element != ",");
            this.ignoredCategories = categoryArray;

            let temp1 = await tigermaster.database.query("working_category").limit(0, 100).get();
            temp1 = temp1.data;

            temp1.forEach((ele) => {
                this.ignoreOptions.push(ele.id)
            })

            // const category = tigermaster.services.WorkingCategories;
            // for (let i = 0; i < categoryArray.length; i++) {
            //     let categoryItem = await category.get(categoryArray[i])
            //     this.ignoredCategories.push(categoryItem)
            // }
            // const category = tigermaster.services.WorkingCategories;
            // for (let i = 0; i < queryArray.length; i++) {
            //     let categoryItem = await category.get(queryArray[i])
            //     this.skills.push(skillItem);
            // }
            // let temp1 = await tigermaster.database.query("skill_item").limit(0, 100).get();
            // temp = temp.data;

            // temp.forEach((ele) => {
            //     this.skillOptions.push(ele.id)
            // })



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
                this.user.master.skillItems = this.user.master.skillItems + "," + this.skillToBeAdded;
                console.log(this.user.master.skillItems)
                await this.currentUser.update(this.user)
                this.user = await await tigermaster.auth.getUserById(this.user.id)
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
                            this.categories.push(element.id)
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