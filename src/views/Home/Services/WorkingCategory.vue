<template>
    <div id="WorkingCategory">
        <WorkingCategoryCreateModal @finish="fetchWorkingCategory" />
        <WorkingCategoryUpdateModal @finish="fetchWorkingCategory"
            :initWorkingCategoryContent="selectedWorkingCategory" />
        <ConfirmModal @onConfirm="categoriesDownload" title="工項修改須知">
            <template #modal-body>
                <ul>
                    <li>下載後請不要刪除整列資料</li>
                    <li>如果要停用工項請把該工項的啟用改成<b>N</b></li>
                    <li>反之若是要啟用工項，請改成<b>Y</b></li>
                </ul>
            </template>
        </ConfirmModal>
        <SimpleModal id="Search-Fail-Modal" title="抱歉，找不到工項" @onSaveClick="closeFailModal">
            <template #modal-body>
                <p>
                    找不到對應的工項，請檢查輸入的條件
                </p>
            </template>
        </SimpleModal>
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
                                <b-button v-b-modal="'Confirm-Modal'" variant="success" class="ml-2">
                                    下載
                                </b-button>
                            </div>
                            <div>
                                <CustomTable @dataRequire="onDataRequire" ref="customTable" :queryRows="queryRows"
                                    :totalRows="totalCount" :datas="workingCategories" :isBusy="tableBusy"
                                    :fields="CategoriesTable" :perPage="10">
                                    <template #cell(skillItemId)="data">
                                        {{data.item.skillItemId}}
                                    </template>
                                    <template #top-row>
                                        <b-td v-for="(field, index) in CategoriesTable" :key="index">
                                            <b-form-select v-if="field.key == 'active'" v-model="search['active']"
                                                autofocus class="width75">
                                                <option value="0">停用</option>
                                                <option value="1">啟用</option>
                                            </b-form-select>
                                            <b-form-input v-if="field.key !== 'active'" v-model="search[field.key]"
                                                :name="field.key" :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>
                                    <template #cell(id)="data">
                                        <b-link v-b-modal="'Category-Modify-Modal'"
                                            @click="startEditWorkingCategory(data.item)">
                                            {{ data.value }}
                                        </b-link>
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
    import TitledCard from "@/components/Card/TitledCard.vue"
    import CategoriesTable from "@/config/CategoriesTable.json"
    import CustomTable from "@/components/Table/CustomTable.vue"
    import ConfirmModal from '@/components/Modal/ConfirmModal.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import {
        camel2Snake
    } from '@/model/CaseConverter/CaseConverter.js'
    import WorkingCategoryCreateModal from "@/components/Services/WorkingCategory/WorkingCategoryCreateModal.vue"
    import WorkingCategoryUpdateModal from "@/components/Services/WorkingCategory/WorkingCategoryUpdateModal.vue"

    import tigermaster from "fdtigermaster-admin-sdk";

    export default {
        name: "WorkingCategory",
        components: {
            TitledCard,
            CustomTable,
            SimpleModal,
            ConfirmModal,
            WorkingCategoryCreateModal,
            WorkingCategoryUpdateModal
        },
        data() {
            return {
                CategoriesTable,
                tableBusy: false,
                totalCount: 0,
                queryRows: 0,
                workingCategories: [],
                selectedWorkingCategory: {},
                search: {
                    active: 1
                }
            };
        },
        async created() {
            this.fetchWorkingCategory();
        },
        methods: {
            async onDataRequire(currentRows, perPage) {
                this.tableBusy = true;
                try {
                    const res = await tigermaster.database.query("working_category")
                        .limit(this.queryRows, currentRows + perPage - this.queryRows)
                        .get();
                    this.workingCategories = this.workingCategories.concat(res.data);
                    this.queryRows = this.queryRows + res.queryRows;
                } catch (e) {
                    console.log(e)
                } finally {
                    this.tableBusy = false;
                }
            },
            async fetchWorkingCategory() {
                try {
                    this.tableBusy = true;
                    const res = await tigermaster.database
                        .query("working_category")
                        .limit(0, 10)
                        .get();
                    this.workingCategories = res.data;
                    this.totalCount = res.totalCount;
                    this.queryRows = res.queryRows;
                } catch (e) {
                    this.workingCategories = [];
                } finally {
                    this.tableBusy = false;
                }
            },
            async onSearchClick() {
                this.tableBusy = true
                let query = tigermaster.database.query("working_category")
                let searchArray = Object.entries(this.search)
                searchArray.forEach(ele => {
                    ele[0] = camel2Snake(ele[0])
                    ele[2] = 'LIKE'
                    ele[1] = '%' + ele[1] + '%'
                    query.where(`working_category.${ele[0]}`, ele[2], ele[1])
                })
                try {
                    const workingCategories = await query.get();
                    this.workingCategories = workingCategories.data;
                    this.totalCount = workingCategories.totalCount;
                } catch (e) {
                    this.$bvModal.show("Search-Fail-Modal");
                }
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
                this.$bvModal.hide("Confirm-Modal")
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
            },
            closeFailModal() {
                this.$bvModal.hide("Search-Fail-Modal");
            }
        }
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

    .width75 {
        min-width: 75px;
    }
</style>