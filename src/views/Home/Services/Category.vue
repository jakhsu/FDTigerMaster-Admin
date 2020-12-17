<template>
  <Loading v-if="isLoading" />
  <div v-else id="Category">
    <SimpleModal size='lg' @onSaveClick="createCategory" title="新增工項" @modalHidden="clearModalData"
      id="Category-Create-Modal">
      <template #modal-body>
        <b-form>
          <b-card>
            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項編號: ">
              <b-input v-model="categoryToBeAdded.id" />
            </b-form-group>
            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項描述: ">
              <b-input v-model="categoryToBeAdded.description" />
            </b-form-group>
          </b-card>
        </b-form>
      </template>
    </SimpleModal>
    <b-container fluid>
      <div class="Category-Area">
        <b-row>
          <b-col>
            <div class="Category-Header">
              <h2>工項總表</h2>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-12">
            <TitledCard title="工項:">
              <div class="Toolbar d-flex mb-3">
                <input style="display:none" ref="file" type="file">
                <b-button size="sm" class="ml-2" variant="primary" @click="onSearchClick">搜尋
                </b-button>
                <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                  清空搜尋列
                </b-button>
                <b-button size="sm" class="ml-2" variant="success" v-b-modal="'Category-Create-Modal'">新增工項
                </b-button>
                <input name="categoryUpload" type="file" ref="file" @change="handleFileUpload" style="display:none">
                <b-button class="input-file__button ml-auto" @click="uploadFile()" variant="primary">上傳</b-button>
                <b-button @click="categoriesDownload" variant="success" class="ml-2">下載</b-button>
              </div>
              <div>
                <CustomTable :queryRows="categories.queryRows" :totalRows="categories.totalCount"
                  :datas="categories.data" :isBusy="categoriesTableBusy" @dataRequire="onCategoriesDataRequire"
                  :isSelectable="false" @rowSelected="updateSelectedCategory" selectMode="single"
                  :fields="categoriesField">
                  <template #top-row>
                    <b-td v-for="(field, index) in categoriesField" :key="index">
                      <b-form-input v-model="search[field.key]" :name="field.key" :placeholder="`${field.label}`" />
                    </b-td>
                  </template>
                  <template #cell(id)="data">
                    <router-link :to="`/home/category_modify?categoryId=${data.item.id}`">
                      {{ data.value }}
                    </router-link>
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
  import Loading from "@/components/Loading.vue";
  import TitledCard from "@/components/Card/TitledCard.vue";
  import CategoriesTable from "@/config/CategoriesTable.json";
  import CustomTable from "@/components/Table/CustomTable.vue";
  import SimpleModal from "@/components/Modal/SimpleModal.vue";

  import tigermaster from "fdtigermaster-sdk";

  export default {
    name: "Category",
    components: {
      Loading,
      TitledCard,
      CustomTable,
      SimpleModal,
    },
    data() {
      return {
        isLoading: false,
        selectedSkill: "",
        skills: {},
        categoriesTableBusy: false,
        selectedCategory: "",
        categoriesField: CategoriesTable,
        categoriesSearch: {},
        categories: {},
        search: {},
        result: "",
        categoryToBeAdded: {},
      };
    },
    async created() {
      this.categoriesTableBusy = true;
      this.categories = await tigermaster.database
        .query("working_category")
        .limit(0, 100)
        .get();
      this.categoriesTableBusy = false;
    },
    methods: {
      onSkillsDataRequire() {
        this.skillTableBusy = true;
      },
      onCategoriesDataRequire() {
        this.categoriesTableBusy = true;
      },
      async onSearchClick() {
        this.categoriesTableBusy = true;
        let query = tigermaster.database.query("working_category");
        let searchArray = Object.entries(this.search);
        searchArray.forEach(element => {
          element[2] = 'LIKE';
          element[1] = '%' + element[1] + '%';
          query.where(`working_category.${element[0]}`, `${element[2]}`, `${element[1]}`);
        })
        query.limit(0, 100);
        this.categories = await query.get()
        this.search = {};
        this.categoriesTableBusy = false;
      },
      updateSelectedCategory(obj) {
        if (obj.length > 0) {
          this.selectedCategory = obj[0].id;
        }
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
      uploadFile() {
        let fileInput = this.$refs.file;
        fileInput.click();
      },
      async handleFileUpload() {
        let fileInput = this.$refs.file;
        this.upload = fileInput.files[0];
        this.isLoading = true;
        const workingCategoriesFile = tigermaster.storage.WorkingCategories;
        await workingCategoriesFile.upload(this.upload);
        this.categories = await tigermaster.database
          .query("working_category")
          .limit(0, 100)
          .get();
        this.isLoading = false;
      },
      onSearchClearClick() {
        this.categories = {};
        this.search = {};
      },
      clearModalData(arg) {
        if (arg == true) {
          this.categoryToBeEdited = {};
        }
      },
      async createCategory() {
        this.categoriesTableBusy = true;
        const workingCategory = tigermaster.services.WorkingCategory;
        await workingCategory.create({
          id: this.categoryToBeAdded.id,
          description: this.categoryToBeAdded.description,
          commercialWarrantyDay: 0,
          consumerWarrantyDay: 0,
          priceRangeDescription: "",
          warrantyDescription: "",
          maxPrice: 0,
          maxPricePercentage: 0,
          minPrice: 0,
          minPricePercentage: 0,
        });
        this.categories = await tigermaster.database
          .query("working_category")
          .limit(0, 100)
          .get();
        this.$router.push({
          path: "/home/category_modify",
          query: {
            categoryId: this.categoryToBeAdded.id
          }
        });
      }
    },
  };
</script>

<style scoped>
  #Category {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #Category .Category-Area {
    padding: 0px 50px;
  }

  #Category .Category-Header {
    margin: 25px 0px;
    text-align: left;
    color: #000;
  }

  @media (max-width: 768px) {
    #Category .Category-Area {
      padding: 0px;
    }
  }

  .custom-file-input:lang(en)~.custom-file-label::after {
    content: "hello";
  }
</style>