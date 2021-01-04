<template>
    <div id="Admin">
        <UserCreateModal :defaultRole="70" />
        <b-container fluid>
            <div class="Admin-Area">
                <b-row>
                    <b-col>
                        <div class="Admin-Header">
                            <h2>管理員</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="管理員數" :data="25" :trend="4" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="被停權數" :data="0" :trend="0" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <TitledCard title="管理員列表">
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
                            <div class="Admin-Table">
                                <CustomTable ref="customTable" :queryRows="queryRows" :totalRows="totalCount"
                                    :fields="UserTableModel" :datas="data" :isBusy="tableBusy"
                                    @dataRequire="onDataRequire">
                                    <template #top-row="data">
                                        <b-td v-for="(field, index) in data.fields" :key="index">
                                            <b-form-select v-if="field.key == 'status'" v-model="search['status']">
                                                <option value="0">停用</option>
                                                <option value="1">啟用</option>
                                            </b-form-select>
                                            <b-form-select v-if="field.key == 'roleId'" v-model="search[field.key]">
                                                <option value="70">行銷</option>
                                                <option value="80">財務</option>
                                                <option value="90">客服</option>
                                                <option value="999">超級使用者</option>
                                            </b-form-select>
                                            <b-form-input v-if="field.key !== 'status' && field.key !== 'roleId'"
                                                v-model="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" />
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
    import UserRole from '@/config/UserRole.json'
    import UserTableModel from '@/config/UserTable.json'
    import DataCard from '@/components/Card/DataCard.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import UserCreateModal from '@/components/Modal/UserCreateModal.vue'

    import tigermaster from 'fdtigermaster-sdk'
    import RoleIdMapping from '@/model/Mapping/RoleIdMapping.js'

    export default {
        name: "Admin",
        components: {
            DataCard,
            TitledCard,
            CustomTable,
            UserCreateModal
        },
        data() {
            return {
                UserRole,
                UserTableModel,
                data: [],
                roleIdMap: RoleIdMapping(),
                search: {
                    roleId: 70
                },
                queryRows: 0,
                totalCount: 0,
                tableBusy: false
            }
        },
        async created() {
            await this.fetchAdmin();
        },
        methods: {
            async fetchAdmin() {
                try {
                    this.tableBusy = true;
                    const res = await tigermaster.database
                        .query("user")
                        .where("user.role_id", ">", 2)
                        .limit(0, 100)
                        .get();
                    this.data = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log("Failed to fetch admin data");
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
                searchArray = searchArray.filter(e => e[0] !== 'roleId')
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
                    query.where(`user.${ele[0]}`, ele[2], ele[1]);
                });
                try {
                    const res = await query
                        .where('user.role_id', '>', 1)
                        .limit(0, 100)
                        .get();
                    this.data = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log("Search failed, please check your search inputs")
                } finally {
                    this.tableBusy = false;
                    this.$refs.customTable.toFirstPage();
                }
            },
            async onSearchClearClick() {
                await this.fetchAdmin();
                this.$refs.customTable.toFirstPage();
                this.search = {};
            }
        }
    }
</script>

<style scoped>
    #Admin {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Admin .Admin-Area {
        padding: 0px 50px;
    }

    #Admin .Admin-Area .Admin-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Admin .Admin-Area {
            padding: 0px;
        }
    }
</style>