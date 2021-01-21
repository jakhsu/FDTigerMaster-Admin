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
                    <CustomTable :isBusy="matchedTableBusy" ref="customTable" :queryRows="totalCount"
                        :totalRows="totalCount" :fields="fields" :datas="matchedMasters">
                        <template #cell(phone)="matchedMasters">
                            <router-link :to="`/home/user_detail?userId=${matchedMasters.item.id}`">
                                {{ matchedMasters.value }}
                            </router-link>
                        </template>
                        <template #cell(action)="matchedMasters">
                            <b-button v-if="order._data.masterUserId" size="sm"
                                @click="switchOrder(matchedMasters.item.masterUserId)">轉單</b-button>
                            <b-button v-else class="ml-2" size="sm"
                                @click="assignOrder(matchedMasters.item.masterUserId)">指定</b-button>
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
                    </div>
                    <CustomTable ref="customTable" :isSelectable="true" :queryRows="totalCount" :totalRows="totalCount"
                        :fields="fields" :datas="searchedMasters" :isBusy="searchedTableBusy"
                        @dataRequire="onDataRequire">
                        <template #top-row="searchedMasters">
                            <b-td v-for="(field, index) in searchedMasters.fields" :key="index">
                                <b-form-input v-if="field.key !== 'action' " v-model="search[field.key]"
                                    :name="field.key" :placeholder="field.label" />
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
                        <template #cell(action)="searchedMasters">
                            <b-button v-if="order._data.masterUserId" size="sm"
                                @click="switchOrder(searchedMasters.item.id)">
                                轉單</b-button>
                            <b-button v-else class="ml-2" size="sm" @click="assignOrder(searchedMasters.item.id)">指定
                            </b-button>
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
            },
            order: {
                type: Object
            }
        },
        data() {
            return {
                totalCount: 0,
                queryRows: 0,
                searchedTableBusy: false,
                matchedTableBusy: false,
                fields: [{
                        "key": "action",
                        "label": "操作"
                    },
                    {
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
                    }
                ],
                searchedMasters: [],
                search: {},
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
                this.searchedTableBusy = true;
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
                } catch (e) {
                    this.$bvModal.show("Search-Fail-Modal");
                } finally {
                    this.searchedTableBusy = false;
                    this.$refs.customTable.toFirstPage();
                }
            },
            async assignOrder(masterId) {
                this.matchedTableBusy = true;
                this.searchedTableBusy = true;

                await this.order.assignMaster(masterId);

                this.matchedTableBusy = false;
                this.searchedTableBusy = false;
            },
            async switchOrder(masterId) {
                this.matchedTableBusy = true;
                this.searchedTableBusy = true;

                await this.order.switchMaster(masterId);

                this.matchedTableBusy = false;
                this.searchedTableBusy = false;
            }
        }
    }
</script>