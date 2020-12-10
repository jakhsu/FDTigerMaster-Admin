<template>
    <Loading v-if="isLoading"/>
    <div v-else id="SkillAndCategory">
        <b-container fluid>
            <div class="SkillAndCategory-Area">
                <b-row>
                    <b-col>
                        <div class="SkillAndCategory-Header">
                            <h2>工項技能配對</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12" xl="6">
                        <TitledCard title="技能:">
                            <div class="Toolbar d-flex mb-3">
                                <b-form-file accept=".csv"></b-form-file>
                            </div>
                            <div class="Toolbar d-flex mb-3">
                                <b-button size="sm" class="ml-2" variant="primary" @click="onSearchClick">搜尋
                                </b-button>
                                <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清除搜尋
                                </b-button>
                                <b-button variant="success" class="ml-auto">下載</b-button>
                                <b-button variant="primary" class="ml-2">上傳</b-button>
                            </div>
                            <div>
                                <CustomTable :queryRows="skills.queryRows" :totalRows="skills.totalCount" :datas="skills.data" :isBusy="tableBusy"
                                    @dataRequire="onSkillsDataRequire" :isSelectable="true"
                                    @row-selected="updateSelectedSkill" selectMode='single' :fields="skillsField">
                                    <template #top-row>
                                        <b-td v-for="(field, index) in fields" :key="index">
                                            <b-form-input v-model="skillSearch[fields.key]" :name="field.key"
                                                :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>
                                </CustomTable>
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col lg="12" xl="6">
                        <TitledCard title="工項:">
                            <div class="Toolbar d-flex mb-3">
                                <b-form-file accept=".csv"></b-form-file>
                            </div>
                            <div class="Toolbar d-flex mb-3">
                                <b-button size="sm" class="ml-2" variant="primary" @click="onSearchClick">搜尋
                                </b-button>
                                <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清除搜尋
                                </b-button>
                                <b-button variant="success" class="ml-auto">下載</b-button>
                                <b-button variant="primary" class="ml-2">上傳</b-button>
                            </div>
                            <div>
                                <CustomTable :queryRows="categories.queryRows" :totalRows="categories.totalCount" :datas="categories.data" :isBusy="tableBusy"
                                    @dataRequire="onCategoriesDataRequire" :isSelectable="true"
                                    @row-selected="updateSelectedCategory" selectMode='single' :fields="categoriesField">
                                    <template #top-row>
                                        <b-td v-for="(field, index) in fields" :key="index">
                                            <b-form-input v-model="search[fields.key]" :name="field.key"
                                                :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>
                                </CustomTable>
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

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'SkillAndCategory',
        components: {
            Loading,
            TitledCard,
            CustomTable
        },
        data() {
            return {
                isLoading: false,
                skillsTableBusy: false,
                selectedSkill: '',
                skillsSearch: {},
                skillsField: SkillsTable,
                skills: {},
                categoriesTableBusy: false,
                selectedCategory: '',
                categoriesField: CategoriesTable,
                categoriesSearch: {},
                categories: {},
            };
        },
        async created(){
            this.skills = await tigermaster.database.query("skill_item").limit(0, 100).get();
            this.categories = await tigermaster.database.query("working_category").limit(0, 100).get();
            this.isLoading = false;
        },
        methods: {
            onSkillsDataRequire() {
                this.skillTableBusy = true;
            },
            onCategoriesDataRequire() {
                this.categoriesTableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {},
            async updateSelectedSkill(obj) {
                this.categoriesTableBusy = true;
                if (obj.length > 0) {
                    this.selectedSkill = obj[0].id;
                    this.categories = await tigermaster.database
                                            .query("working_category")
                                            .where("working_category.skill_item_id", "=", this.selectedSkill)
                                            .limit(0, 100)
                                            .get();
                }
                this.categoriesTableBusy = false;
            },
            updateSelectedCategory(obj) {
                if (obj.length > 0) {
                    this.selectedCategory = obj[0].id;
                }
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
</style>