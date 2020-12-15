<template>
    <Loading v-if="isLoading" />
    <div v-else id="SkillAndCategory">
        <SimpleModal id="Skill-Create-Modal" />
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
                                <b-button class="input-file__button ml-auto" @click="selectFile()" variant="primary">上傳
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
                                            <b-form-input v-model="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>

                                    <template #cell(id)="data">
                                        <b-button variant="outline-success" pill v-b-modal="'Skill-Create-Modal'">
                                            {{data.value}}
                                        </b-button>
                                    </template>
                                </CustomTable>
                                <div>
                                    <label for="">對應工項</label>
                                    <b-tags placeholder="" v-model="categories" disabled tag-pills
                                        tag-variant="success">
                                    </b-tags>
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
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

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
                skillsSearch: {},
                skillsField: SkillsTable,
                skills: {},
                categoriesTableBusy: false,
                selectedCategory: '',
                categoriesField: CategoriesTable,
                categoriesSearch: {},
                categories: [],
                search: [],
                result: '',
            };
        },
        async created() {
            this.skills = await tigermaster.database.query("skill_item").limit(0, 100).get();
            this.isLoading = false;
        },
        methods: {
            onSkillsDataRequire() {
                this.skillTableBusy = true;
            },
            onCategoriesDataRequire() {
                this.categoriesTableBusy = true;
            },
            onSearchClearClick() {},
            onSearchClick() {},
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
            selectFile() {
                let fileInputElement = this.$refs.file;
                fileInputElement.click();
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
</style>