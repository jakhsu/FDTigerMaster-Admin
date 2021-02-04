<template>
    <Loading v-if="isLoading" />
    <div v-else id="Client">
        <UserCreateModal :defaultRole="1" />
        <SimpleModal id="Search-Fail-Modal" title="抱歉，找不到用戶" @onSaveClick="closeFailModal">
            <template #modal-body>
                <p>
                    找不到對應的客戶，請檢查輸入的條件
                </p>
            </template>
        </SimpleModal>
        <b-container fluid>
            <div class="Client-Area">
                <b-row>
                    <b-col>
                        <TitledCard title="客戶清單">
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
                            <div class="Client-Table">
                                <CustomTable ref="customTable" :queryRows="queryRows" :totalRows="totalCount"
                                    :fields="UserTableModel" :datas="data" :isBusy="tableBusy"
                                    @dataRequire="onDataRequire">
                                    <template #top-row="data">
                                        <b-td v-for="(field, index) in data.fields" :key="index"
                                            style="overflow:visible">
                                            <b-form-select v-if="field.key == 'status'" v-model="search['status']"
                                                v-b-tooltip.hover :title="activeMap[search['status']]">
                                                <option value="0">停用</option>
                                                <option value="1">啟用</option>
                                            </b-form-select>
                                            <b-form-select v-else-if="field.key == 'roleId'"
                                                v-model.number="search['roleId']">
                                                <option value="1">一般客戶</option>
                                                <option value="2">企業用戶</option>
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
                                        <router-link :to="`/home/user_detail?userId=${data.item.id}`">
                                            {{ data.value }}
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
    import Loading from '@/components/Loading.vue'
    import UserTableModel from '@/config/UserTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import RoleIdMap from '@/model/Mapping/RoleIdMap.js'
    import ActiveStatusMapping from '@/model/Mapping/ActiveStatusMap.js'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import UserCreateModal from '@/components/User/UserCreateModal.vue'
    import Badge from '@/components/Badge/Badge.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: "Client",
        components: {
            Badge,
            Loading,
            TitledCard,
            SimpleModal,
            CustomTable,
            UserCreateModal
        },
        data() {
            return {
                UserTableModel,
                data: [],
                roleIdMap: RoleIdMap(),
                activeMap: ActiveStatusMapping(),
                search: {
                    roleId: 1
                },
                queryRows: 0,
                totalCount: 0,
                inactiveCount: 0,
                tableBusy: false,
                isLoading: true
            }
        },
        async created() {
            await this.fetchClient()
            this.countInactive()
            this.isLoading = false
        },
        methods: {
            async fetchClient() {
                try {
                    this.tableBusy = true;
                    const res = await tigermaster.database
                        .query("user")
                        .where("user.role_id", "IN", [1, 2])
                        .limit(0, 100)
                        .get()
                    this.data = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log("Failed to fetch client data");
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
                    query.where(`user.${ele[0]}`, ele[2], ele[1])
                });
                const roleId = this.search.roleId || [1, 2];
                try {
                    const res = await query
                        .where('user.role_id', 'IN', roleId)
                        .limit(0, 100)
                        .get();
                    this.data = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCosunt = res.totalCount;
                } catch {
                    this.$bvModal.show("Search-Fail-Modal");
                } finally {
                    this.tableBusy = false;
                    this.$refs.customTable.toFirstPage();
                }
            },
            async onSearchClearClick() {
                await this.fetchClient();
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
    #Client {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Client .Client-Area {
        padding: 0px 50px;
    }

    #Client .Client-Area .Client-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Client .Client-Area {
            padding: 0px;
        }
    }
</style>