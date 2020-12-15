<template>
  <Loading v-if="isLoading" />
  <div v-else id="Category">
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
                <b-button class="input-file__button ml-auto" @click="selectFile()" variant="primary">上傳</b-button>
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
  import SkillsTable from "@/config/SkillsTable.json";
  import TitledCard from "@/components/Card/TitledCard.vue";
  import CategoriesTable from "@/config/CategoriesTable.json";
  import CustomTable from "@/components/Table/CustomTable.vue";

  import tigermaster from "fdtigermaster-sdk";

  export default {
    name: "Category",
    components: {
      Loading,
      TitledCard,
      CustomTable,
    },
    data() {
      return {
        isLoading: false,
        skillsTableBusy: false,
        selectedSkill: "",
        skillsSearch: {},
        skillsField: SkillsTable,
        skills: {},
        categoriesTableBusy: false,
        selectedCategory: "",
        categoriesField: CategoriesTable,
        categoriesSearch: {},
        categories: {},
        search: [],
        result: "",
      };
    },
    async created() {
      this.categories = await tigermaster.database
        .query("working_category")
        .limit(0, 100)
        .get();
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
      selectFile() {
        let fileInputElement = this.$refs.file;
        fileInputElement.click();
      },
      onSearchClearClick() {
        this.search = {}
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