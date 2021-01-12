<template>
    <div>
        <SimpleModal id="Search-Fail-Modal" title="抱歉，找不到用戶" @onSaveClick="closeFailModal">
            <template #modal-body>
                <p>
                    找不到對應的師傅，請檢查輸入的條件
                </p>
            </template>
        </SimpleModal>
        <b-row>
            <b-col sm="12" xl="6">
                <TitledCard title="符合工項的師傅">
                    <CustomTable ref="customTable" :queryRows="totalCount" :totalRows="totalCount" :fields="fields"
                        :datas="matchedMasters">
                        <template #cell(phone)="matchedMasters">
                            <router-link :to="`/home/user_detail?userId=${matchedMasters.item.id}`">
                                {{ matchedMasters.value }}
                            </router-link>
                        </template>
                    </CustomTable>
                </TitledCard>
            </b-col>
            <b-col sm="12" xl="6">
                <TitledCard title="其他師傅">
                    <div class="SearchBar d-flex mb-3">
                        <b-button class="ml-2" variant="primary" @click="onSearchClick">
                            開始搜尋
                        </b-button>
                        <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                            清空搜尋列
                        </b-button>
                        <b-button class="ml-auto" variant="success">轉單/指定 這位師傅
                        </b-button>
                    </div>
                    <CustomTable ref="customTable" :isSelectable="true" :queryRows="totalCount" :totalRows="totalCount"
                        :fields="fields" :datas="searchedMasters" :isBusy="tableBusy" @dataRequire="onDataRequire">
                        <template b-toaster-top-full #top-row="searchedMasters">
                            <b-td v-for="(field, index) in searchedMasters.fields" :key="index">
                                <b-form-select v-if="field.key == 'status'" v-model="search['status']">
                                    <option value="0">停用</option>
                                    <option value="1">啟用</option>
                                </b-form-select>
                                <b-form-input v-if="field.key == 'roleId'" :name="field.key" :value="'師傅'" disabled />
                                <b-form-input v-if="field.key !== 'status' && field.key !== 'roleId'"
                                    v-model="search[field.key]" :name="field.key" :placeholder="field.label" />
                            </b-td>
                        </template>
                        <template #cell(phone)="searchedMasters">
                            <router-link :to="`/home/user_detail?userId=${searchedMasters.item.id}`">
                                {{ searchedMasters.value }}
                            </router-link>
                        </template>
                        <template #cell(status)="searchedMasters">
                            {{ searchedMasters.value == "1" ? "啟用" : "凍結" }}
                        </template>
                        <template #cell(roleId)="searchedMasters">
                            {{ roleIdMap[searchedMasters.value] }}
                        </template>
                    </CustomTable>
                </TitledCard>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'AvailableMaster',
        components: {
            TitledCard,
            CustomTable,
            SimpleModal
        },
        props: {
            matchedMasters: {
                type: Array
            }
        },
        data() {
            return {
                totalCount: 0,
                queryRows: 0,
                tableBusy: false,
                fields: [{
                    "key": "phone",
                    "label": "師傅電話"
                }, {
                    "key": "name",
                    "label": "姓名"
                }, {
                    "key": "distance",
                    "label": "師傅距離"
                }, {
                    "key": "addressCity",
                    "label": "城市"
                }, {
                    "key": "addressArea",
                    "label": "區"
                }, {
                    "key": "addressStreet",
                    "label": "街道"
                }],
                searchedMasters: [],
                search: {}
            }
        },
        methods: {
            onDataRequire() {},
            closeFailModal() {
                this.$bvModal.hide("Search-Fail-Modal");
            },
            async onSearchClearClick() {
                this.$refs.customTable.toFirstPage();
                this.search = {};
            },
            async onSearchClick() {
                this.tableBusy = true;
                let query = tigermaster.database.query("user");
                let searchArray = Object.entries(this.search);
                searchArray = searchArray.filter(ele => ele[0] !== 'roleId')
                searchArray.forEach(ele => {
                    ele[2] = 'LIKE'
                    ele[1] = '%' + ele[1] + '%'
                    if (ele[0] === 'addressCity' || ele[0] === 'addressArea' || ele[0] ===
                        'addressDetail' || ele[0] === 'addressStreet') {
                        let prefix = ele[0].slice(0, 7);
                        let suffix = ele[0].slice(7, ele[0].length);
                        ele[0] = prefix + '_' + suffix;
                    } else if (ele[0] === 'createDate') {
                        ele[0] = 'create_date';
                    }
                    query.where(`user.${ele[0]}`, ele[2], ele[1])
                });
                const roleId = this.search.roleId || 0;
                try {
                    const res = await query
                        .where('user.role_id', '=', roleId)
                        .limit(0, 100)
                        .get();
                    this.searchedMasters = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                    this.search = {};
                } catch (e) {
                    this.$bvModal.show("Search-Fail-Modal");
                } finally {
                    this.tableBusy = false;
                    this.$refs.customTable.toFirstPage();
                }
            }
        }
    }
</script>