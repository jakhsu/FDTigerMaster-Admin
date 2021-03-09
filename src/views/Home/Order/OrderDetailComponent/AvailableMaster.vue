<template>
    <div>
        <SimpleModal id="Search-Fail-Modal" title="抱歉，找不到用戶" @onSaveClick="closeFailModal">
            <template #modal-body>
                <p>
                    找不到對應的師傅，請檢查輸入的條件
                </p>
            </template>
        </SimpleModal>
        <SimpleModal id="Assign-Master-Modal" title="把訂單指定給這位師父" @onSaveClick="assignOrder(selectedMaster)">
            <template #modal-body>
                <p>
                    確定要把訂單指定給這位師父嗎?
                </p>
            </template>
        </SimpleModal>
        <SimpleModal id="Switch-Master-Modal" title="把訂單轉給這位師父" @onSaveClick="switchOrder(selectedMaster)">
            <template #modal-body>
                <p>
                    確定要把訂單轉給這位師父嗎?
                </p>
            </template>
        </SimpleModal>
        <b-row>
            <b-col sm="12" xl="6">
                <TitledCard title="符合工項的師傅">
                    <div class="SearchBar d-flex mb-3">
                        <b-button variant="warning" @click="updateMapping" :disabled="this.order._data.masterUserId">
                            <font-awesome-icon icon="hourglass-half" />
                            重新配對
                        </b-button>
                    </div>
                    <CustomTable :isBusy="matchedTableBusy" ref="customTable" :queryRows="totalCount"
                        :totalRows="totalCount" :fields="fields" :datas="matchedMasters">
                        <template #cell(phone)="matchedMasters">
                            <router-link :to="`/home/user_detail?userId=${matchedMasters.item.masterUserId}`">
                                {{ matchedMasters.value }}
                            </router-link>
                        </template>
                        <template #cell(action)="matchedMasters">
                            <b-button v-if="order._data.masterUserId" size="sm"
                                @click="openSwitchModal(matchedMasters.item.masterUserId)">轉單</b-button>
                            <b-button v-else class="ml-2" size="sm"
                                @click="openAssignModal(matchedMasters.item.masterUserId)">指定</b-button>
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
                                @click="openSwitchModal(searchedMasters.item.id)">
                                轉單</b-button>
                            <b-button v-else class="ml-2" size="sm" @click="openAssignModal(searchedMasters.item.id)">指定
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
    import {
        camel2Snake
    } from '@/model/CaseConverter/CaseConverter.js'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'AvailableMaster',
        components: {
            TitledCard,
            CustomTable,
            SimpleModal
        },
        props: {
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
                matchedMasters: [],
                searchedMasters: [],
                search: {},
                selectedMaster: String,
                refreshKey: 0,
            }
        },
        async created() {
            try {
                await this.fetchMatchedMaster();
            } catch (e) {
                console.log(e)
            } finally {
                this.isLoading = false;
            }
        },
        methods: {
            async fetchMatchedMaster() {
                const database = tigermaster.database;
                const query = database
                    .query("order_master_mapping")
                    .where("order_master_mapping.order_id", "=", `${this.order.id}`);
                try {
                    const res = await query.get();
                    this.matchedMasters = res.data;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log(e)
                }
            },
            openAssignModal(master) {
                this.selectedMaster = master;
                this.$bvModal.show("Assign-Master-Modal");
            },
            openSwitchModal(master) {
                this.selectedMaster = master;
                this.$bvModal.show("Switch-Master-Modal");
            },
            async updateMapping() {
                this.matchedTableBusy = true;
                await this.order.manualMapping();
                this.refreshKey++;
                this.matchedTableBusy = false;
            },
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
                    ele[0] = camel2Snake(ele[0])
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
                this.$bvModal.hide("Assign-Master-Modal");
                this.matchedTableBusy = true;
                this.searchedTableBusy = true;
                await this.order.assignMaster(masterId);
                this.matchedTableBusy = false;
                this.searchedTableBusy = false;
            },
            async switchOrder(masterId) {
                this.$bvModal.hide("Switch-Master-Modal");
                this.matchedTableBusy = true;
                this.searchedTableBusy = true;
                await this.order.switchMaster(masterId);
                this.matchedTableBusy = false;
                this.searchedTableBusy = false;
            }
        }
    }
</script>