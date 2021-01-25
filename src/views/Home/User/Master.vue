<template>
    <div id="Master">
        <UserCreateModal :defaultRole="0" />
        <SimpleModal id="Search-Fail-Modal" title="抱歉，找不到用戶" @onSaveClick="closeFailModal">
            <template #modal-body>
                <p>
                    找不到對應的師傅，請檢查輸入的條件
                </p>
            </template>
        </SimpleModal>
        <b-container fluid>
            <div class="Master-Area">
                <b-row>
                    <b-col>
                        <div class="Master-Header">
                            <h2>師傅</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="師傅數" :data="totalCount" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="被停權數" :data="inactiveCount" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <TitledCard title="師傅列表">
                            <div class="SearchBar d-flex mb-3">
                                <b-button class="ml-2" variant="primary" @click="onSearchClick">
                                    開始搜尋
                                </b-button>
                                <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                                    清空搜尋列
                                </b-button>
                                <b-button class="ml-auto" variant="success" v-b-modal="'User-Create-Modal'">新增用戶
                                </b-button>
                            </div>
                            <div class="Master-Table">
                                <CustomTable ref="customTable" :queryRows="queryRows" :totalRows="totalCount"
                                    :fields="fields" :datas="data" :isBusy="tableBusy" @dataRequire="onDataRequire">
                                    <template b-toaster-top-full #top-row="data">
                                        <b-td v-for="(field, index) in data.fields" :key="index"
                                            style="overflow:visible">
                                            <b-form-select v-if="field.key == 'status'" v-model="search['status']">
                                                <option value="0">停用</option>
                                                <option value="1">啟用</option>
                                            </b-form-select>
                                            <b-form-input v-else-if="field.key == 'roleId'" :name="field.key"
                                                :value="'師傅'" disabled />
                                            <b-input-group v-else-if="field.key == 'createDate'">
                                                <b-form-input v-model="search['createDate']">
                                                </b-form-input>
                                                <b-input-group-append>
                                                    <b-form-datepicker dropup class="datepicker"
                                                        v-model="search['createDate']" size="sm" placeholder="選擇日期"
                                                        button-only offset="10px" />
                                                </b-input-group-append>
                                            </b-input-group>
                                            <b-form-input v-else v-model="search[field.key]" :name="field.key"
                                                :placeholder="field.label" />
                                        </b-td>
                                    </template>
                                    <template #cell(phone)="data">
                                        <router-link :to="`/home/user_detail?userId=${data.item.id}`">{{ data.value }}
                                        </router-link>
                                    </template>
                                    <template #cell(status)="data">
                                        {{ data.value == "1" ? "啟用" : "凍結" }}
                                    </template>
                                    <template #cell(roleId)="data">
                                        {{ roleIdMap[data.value] }}
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
    import DataCard from '@/components/Card/DataCard.vue'
    import UserTableModel from '@/config/UserTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import UserCreateModal from '@/components/Modal/UserCreateModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import RoleIdMapping from '@/model/Mapping/RoleIdMapping.js'

    export default {
        name: "Master",
        components: {
            DataCard,
            TitledCard,
            SimpleModal,
            CustomTable,
            UserCreateModal
        },
        data() {
            return {
                fields: UserTableModel,
                data: [],
                roleIdMap: RoleIdMapping(),
                search: {
                    roleId: 0
                },
                queryRows: 0,
                totalCount: 0,
                tableBusy: false,
            }
        },
        async created() {
            this.fetchMasters();
        },
        methods: {
            async fetchMasters() {
                try {
                    this.tableBusy = true;
                    const res = await tigermaster.database
                        .query("user")
                        .where("user.role_id", "=", 0)
                        .limit(0, 100)
                        .get();
                    this.data = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log("Failed to fetch master data");
                } finally {
                    this.tableBusy = false;
                }
            },
            onDataRequire() {
                this.tableBusy = true;
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
                    this.data = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    this.$bvModal.show("Search-Fail-Modal");
                } finally {
                    this.tableBusy = false;
                    this.$refs.customTable.toFirstPage();
                }
            },
            async onSearchClearClick() {
                await this.fetchMasters();
                this.$refs.customTable.toFirstPage();
                this.search = {};
            },
            closeFailModal() {
                this.$bvModal.hide("Search-Fail-Modal");
            }
        },
        computed: {
            inactiveCount() {
                let inactiveCount = 0;
                this.data.forEach(ele => {
                    if (ele.status === 0) {
                        inactiveCount++;
                    }
                })
                return inactiveCount;
            }
        }
    }
</script>

<style scoped>
    #Master {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Master .Master-Area {
        padding: 0px 50px;
    }

    #Master .Master-Area .Master-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Master .Master-Area {
            padding: 0px;
        }
    }

    .datepicker {
        color: red;
    }
</style>