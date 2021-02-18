<template>
    <Loading v-if="isLoading" />
    <div v-else id="Admin">
        <UserCreateModal :defaultRole="70" />
        <SimpleModal id="Search-Fail-Modal" title="抱歉，找不到用戶" @onSaveClick="closeFailModal">
            <template #modal-body>
                <p>
                    找不到對應的管理員，請檢查輸入的條件
                </p>
            </template>
        </SimpleModal>
        <b-container fluid>
            <div class="Admin-Area">
                <b-row>
                    <b-col>
                        <TitledCard title="管理員列表">
                            <template #title-card-header>
                                <Badge>
                                    <template #prepend>
                                        管理員數
                                    </template>
                                    <template #number>
                                        {{totalCount}}
                                    </template>
                                </Badge>
                                <Badge bgColor="#df4759">
                                    <template #prepend>
                                        停權數
                                    </template>
                                    <template #number>
                                        {{inactiveCount}}
                                    </template>
                                </Badge>
                            </template>
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
                                        <b-td v-for="(field, index) in data.fields" :key="index"
                                            style="overflow:visible">
                                            <b-form-select v-if="field.key == 'status'" v-model="search['status']"
                                                v-b-tooltip.hover :title="activeMap[search['status']]" class="width75">
                                                <option value="0">停用</option>
                                                <option value="1">啟用</option>
                                            </b-form-select>
                                            <b-form-select v-else-if="field.key == 'roleId'" v-model="search[field.key]"
                                                class="width75">
                                                <option value="70">行銷</option>
                                                <option value="80">財務</option>
                                                <option value="90">客服</option>
                                                <option value="999">超級使用者</option>
                                            </b-form-select>
                                            <b-input-group v-else-if="field.key == 'createDate'">
                                                <b-form-input v-model="search['createDate']">
                                                </b-form-input>
                                                <b-input-group-append>
                                                    <b-form-datepicker v-model="search['createDate']" size="sm"
                                                        placeholder="選擇日期" button-only />
                                                </b-input-group-append>
                                            </b-input-group>
                                            <b-form-input v-else v-model="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" v-b-tooltip.hover
                                                :title="field.label" />
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
    import Loading from '@/components/Loading.vue'
    import UserTableModel from '@/config/UserTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import RoleIdMap from '@/model/Mapping/RoleIdMap.js'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import ActiveStatusMapping from '@/model/Mapping/ActiveStatusMap.js'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import {
        camel2Snake
    } from '@/model/CaseConverter/CaseConverter.js'
    import UserCreateModal from '@/components/User/UserCreateModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import Badge from '@/components/Badge/Badge.vue'

    export default {
        name: "Admin",
        components: {
            Loading,
            TitledCard,
            SimpleModal,
            CustomTable,
            UserCreateModal,
            Badge
        },
        data() {
            return {
                UserRole,
                UserTableModel,
                data: [],
                roleIdMap: RoleIdMap(),
                activeMap: ActiveStatusMapping(),
                search: {
                    roleId: 70,
                    status: 1
                },
                queryRows: 0,
                totalCount: 0,
                inactiveCount: 0,
                tableBusy: false,
                isLoading: true
            }
        },
        async created() {
            await this.fetchAdmin();
            this.countInactive();
            this.isLoading = false;
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
                    ele[0] = camel2Snake(ele[0])
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
                    this.$bvModal.show("Search-Fail-Modal");
                } finally {
                    this.tableBusy = false;
                    this.$refs.customTable.toFirstPage();
                }
            },
            async onSearchClearClick() {
                await this.fetchAdmin();
                this.$refs.customTable.toFirstPage();
                this.search = {};
            },
            closeFailModal() {
                this.$bvModal.hide("Search-Fail-Modal");
            },
            countInactive() {
                let inactiveCount = 0;
                this.data.forEach(ele => {
                    if (ele.status === 0) {
                        inactiveCount++;
                    }
                })
                this.inactiveCount = inactiveCount;
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

    .width75 {
        min-width: 75px;
    }
</style>