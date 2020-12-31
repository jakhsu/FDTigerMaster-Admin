<template>
    <div id="WorkingCategory">
        <WorkingCategoryCreateModal @finish="fetchWorkingCategory" />
        <WorkingCategoryUpdateModal @finish="fetchWorkingCategory"
            :initWorkingCategoryContent="selectedWorkingCategory" />
        <b-container fluid>
            <div class="WorkingCategory-Area">
                <b-row>
                    <b-col>
                        <div class="WorkingCategory-Header">
                            <h2>工項總表</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="col-12">
                        <TitledCard title="工項:">
                            <div class="Toolbar d-flex mb-3">
                                <input class="d-none" ref="file" type="file">
                                <b-button size="sm" class="ml-2" variant="primary" @click="onSearchClick">
                                    搜尋
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                                    清空搜尋列
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="success"
                                    v-b-modal="'WorkingCategory-Create-Modal'">
                                    新增工項
                                </b-button>
                                <input class="d-none" name="categoryUpload" type="file" ref="file"
                                    @change="handleFileUpload">
                                <b-button class="input-file__button ml-auto" @click="$refs.file.click()"
                                    variant="primary">
                                    上傳
                                </b-button>
                                <b-button @click="categoriesDownload" variant="success" class="ml-2">
                                    下載
                                </b-button>
                            </div>
                            <div>
                                <CustomTable ref="customTable" :queryRows="totalCount" :totalRows="totalCount"
                                    :datas="workingCategories" :isBusy="tableBusy" :fields="CategoriesTable">
                                    <template #cell(skillItemId)="data">
                                        {{data.item.skillItemId}}
                                    </template>
                                    <template #top-row>
                                        <b-td v-for="(field, index) in CategoriesTable" :key="index">
                                            <b-form-select v-if="field.key == 'active'" v-model="search['active']"
                                                autofocus>
                                                <option value="0">停用</option>
                                                <option value="1">啟用</option>
                                            </b-form-select>
                                            <b-form-input v-if="field.key !== 'active'" v-model="search[field.key]"
                                                :name="field.key" :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>
                                    <template #cell(id)="data">
                                        <b-button variant="outline-success" pill v-b-modal="'Category-Modify-Modal'"
                                            @click="startEditWorkingCategory(data.item)">
                                            {{ data.value }}
                                        </b-button>
                                    </template>
                                    <template #cell(active)="data">
                                        {{data.value == 1 ? "啟用" : "停用"}}
                                    </template>
                                    <template #cell(commercialWarrantyDay)="data">
                                        {{data.value += " 日"}}
                                    </template>
                                    <template #cell(consumerWarrantyDay)="data">
                                        {{data.value += " 日"}}
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
    import TitledCard from "@/components/Card/TitledCard.vue";
    import CategoriesTable from "@/config/CategoriesTable.json";
    import CustomTable from "@/components/Table/CustomTable.vue";
    import WorkingCategoryCreateModal from "@/components/Modal/WorkingCategoryCreateModal.vue";
    import WorkingCategoryUpdateModal from "@/components/Modal/WorkingCategoryUpdateModal.vue";

    import tigermaster from "fdtigermaster-sdk";

    export default {
        name: "WorkingCategory",
        components: {
            TitledCard,
            CustomTable,
            WorkingCategoryCreateModal,
            WorkingCategoryUpdateModal
        },
        data() {
            return {
                CategoriesTable,
                tableBusy: false,
                totalCount: 0,
                workingCategories: [],
                selectedWorkingCategory: {},
                search: {}
            };
        },
        async created() {
            this.fetchWorkingCategory();
        },
        methods: {
            async fetchWorkingCategory() {
                try {
                    this.tableBusy = true;
                    const workingCategories = await tigermaster.database
                        .query("working_category")
                        .get();
                    this.workingCategories = workingCategories.data;
                    this.totalCount = workingCategories.totalCount;
                } catch (e) {
                    console.log(e);
                } finally {
                    this.tableBusy = false;
                }
            },
            async onSearchClick() {
                this.tableBusy = true;
                let query = tigermaster.database.query("working_category");
                let searchArray = Object.entries(this.search);
                searchArray.forEach(element => {
                    element[2] = 'LIKE';
                    element[1] = '%' + element[1] + '%';
                    query.where(`working_category.${element[0]}`, element[2], element[1]);
                })
                const workingCategories = await query.get();
                this.workingCategories = workingCategories.data;
                this.totalCount = workingCategories.totalCount;
                this.tableBusy = false;
            },
            async categoriesDownload() {
                const workingCategoriesFile = tigermaster.storage.WorkingCategories;
                const file = await workingCategoriesFile.download();
                const link = document.createElement("a");
                const url = window.URL.createObjectURL(file);
                link.href = url;
                link.download = "workingCategories.csv";
                link.click();
                window.URL.revokeObjectURL(url);
            },
            async handleFileUpload() {
                const fileInput = this.$refs.file;
                this.isLoading = true;
                const workingCategoriesFile = tigermaster.storage.WorkingCategories;
                await workingCategoriesFile.upload(fileInput.files[0]);
                this.fetchWorkingCategory();
            },
            onSearchClearClick() {
                this.fetchWorkingCategory();
                this.$refs.customTable.toFirstPage();
                this.search = {};
            },
            startEditWorkingCategory(selectedCategory) {
                this.selectedWorkingCategory = selectedCategory;
                this.$bvModal.show("WorkingCategory-Update-Modal");
            }
        },
    };
</script>

<style scoped>
    #WorkingCategory {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #WorkingCategory .WorkingCategory-Area {
        padding: 0px 50px;
    }

    #WorkingCategory .WorkingCategory-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #WorkingCategory .WorkingCategory-Area {
            padding: 0px;
        }
    }
</style>