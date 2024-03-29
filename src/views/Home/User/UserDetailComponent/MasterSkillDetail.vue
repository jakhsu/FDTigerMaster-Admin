<template>
    <div id="MasterSkillDetail">
        <MasterSkillCreateModal :existSkill="masterSkills" :user="user" @finish="onRefresh" />
        <b-container fluid>
            <b-row>
                <b-col lg='6' md='12'>
                    <TitledCard title="技能">
                        <div class="Toolbar d-flex mb-3">
                            <b-button class="ml-auto" variant="primary" v-b-modal="'Master-Skill-Create-Modal'">
                                新增/移除技能
                            </b-button>
                        </div>
                        <CustomTable :fields="skillsField" :datas="skillItems" :totalRows="totalCount"
                            :isBusy="tableBusy" :isSelectable="true" @rowClick="onSkillClick" selectMode='single'>
                        </CustomTable>
                        <div>
                            <label>對應工項</label>
                            <div>
                                <b-tags size="lg" v-model="matchedWorkingCategory" placeholder="" disabled tag-pills
                                    tag-variant="success">
                                </b-tags>
                            </div>
                        </div>
                    </TitledCard>
                </b-col>
                <b-col lg="6" md="12">
                    <TitledCard title="不會的工項">
                        <b-tags style="text-align:left" size="lg" v-model="ignoredWorkingCategories"
                            @input="updateIgnoredCategories" tag-variant="danger" :tag-validator="tagValidator"
                            @tag-state="onTagState">
                            <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                                <b-input-group class="mb-2" label="可停用工項">
                                    <b-form-input v-bind="inputAttrs" v-on="inputHandlers" placeholder="輸入不會的工項編號"
                                        class="form-control" list="Ignore-Skills"></b-form-input>
                                    <datalist id="Ignore-Skills">
                                        <option v-for="(option, index) in ignoreOptions" :key="index" :value="option">
                                            {{ ignoreOptionTexts[index] }}
                                        </option>
                                    </datalist>
                                    <b-input-group-append>
                                        <b-button @click="addTag()" variant="primary"
                                            :disabled="invalidInput !== undefined">Add</b-button>
                                    </b-input-group-append>
                                    <b-form-invalid-feedback :state="invalidInput === undefined">
                                        {{ `錯誤或重複的工項編號: ${invalidInput}` }}
                                    </b-form-invalid-feedback>
                                </b-input-group>
                                <scale-loader color="#dc3545" v-if="isIgnoreLoading" />
                                <div v-else style="font-size: 1.5rem;">
                                    <b-form-tag v-for="tag in tags" @remove="removeTag(tag)" :key="tag" :title="tag"
                                        :variant="tagVariant" class="mr-1">{{ tag }}</b-form-tag>
                                </div>
                            </template>
                        </b-tags>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import SkillsTable from '@/config/SkillsTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import MasterSkillCreateModal from '@/components/Modal/Service/MasterSkillCreateModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: "MasterSkillDetail",
        components: {
            TitledCard,
            CustomTable,
            MasterSkillCreateModal
        },
        props: {
            user: Object,
        },
        data() {
            return {
                userData: this.user.data,
                tableBusy: true,
                isIgnoreLoading: true,
                masterSkills: [],
                skillItems: [],
                totalCount: 0,
                matchedWorkingCategory: [],
                skillsField: SkillsTable,
                ignoredWorkingCategories: [],
                ignoreOptions: [],
                ignoreOptionTexts: [],
                invalidInput: undefined
            }
        },
        async created() {
            await Promise.all([this.fetchMasterSkillsData(), this.fetchMasterIgnoreCategoryData(), this
                .generateIgnoreOptions()
            ]);
            this.tableBusy = false;
            this.isIgnoreLoading = false;
        },
        methods: {
            async fetchMasterSkillsData() {
                try {
                    this.skillItems = [];
                    this.masterSkills = [];
                    if (this.userData.master.skillItems !== undefined && this.userData.master.skillItems !== "") {
                        this.masterSkills = this.userData.master.skillItems;
                        const response = await tigermaster.database
                            .query("skill_item")
                            .where("skill_item.id", "IN", this.masterSkills)
                            .get();
                        this.skillItems = response.data;
                        this.totalCount = response.totalCount;
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            async fetchMasterIgnoreCategoryData() {
                try {
                    this.ignoredWorkingCategories = [];
                    if (this.userData.master.ignoreWorkingCategories !== undefined && this.userData.master
                        .ignoreWorkingCategories !== "") {
                        const queryArray = this.userData.master.ignoreWorkingCategories;
                        const response = await tigermaster.database
                            .query("working_category")
                            .where("working_category.id", "IN", queryArray)
                            .get();
                        response.data.forEach((ele) => {
                            this.ignoredWorkingCategories.push(`${ele.id} | ${ele.description}`)
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            async generateIgnoreOptions() {
                try {
                    if (this.userData.master.skillItems !== undefined && this.userData.master.skillItems !== "") {
                        this.ignoreOptions = [];
                        const response = await tigermaster.database
                            .query("working_category")
                            .where("working_category.skill_item_id", "IN", this.masterSkills)
                            .get();
                        response.data.forEach((ele) => {
                            this.ignoreOptions.push(`${ele.id} | ${ele.description}`);
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            async onRefresh() {
                this.tableBusy = true;
                this.isIgnoreLoading = true;
                this.matchedWorkingCategory = [];
                this.userData = this.user.data;
                await Promise.all([this.fetchMasterSkillsData(), this.fetchMasterIgnoreCategoryData(), this
                    .generateIgnoreOptions()
                ]);
                this.isIgnoreLoading = false;
                this.tableBusy = false;
            },
            onSkillClick(obj) {
                console.log(obj)
                this.matchedWorkingCategory = [];
                obj.workingCategories.forEach((ele) => {
                    this.matchedWorkingCategory.push(`${ele.id} | ${ele.name}`)
                });
                this.matchedWorkingCategory = this.matchedWorkingCategory.filter(item => !this.ignoredWorkingCategories
                    .includes(item));
            },
            tagValidator(tag) {
                return this.ignoreOptions.includes(tag);
            },
            onTagState(valid, invalid, duplicate) {
                this.invalidInput = invalid[0] || duplicate[0];
            },
            async updateIgnoredCategories(obj) {
                this.isIgnoreLoading = true;
                const updateIgnore = [];
                obj.forEach((ele) => {
                    updateIgnore.push(ele.split(' | ')[0]);
                });
                await this.user.update({
                    master: {
                        id: this.user.data.master.id,
                        ignoreWorkingCategories: updateIgnore
                    }
                });
                this.onRefresh();
            }
        }
    }
</script>