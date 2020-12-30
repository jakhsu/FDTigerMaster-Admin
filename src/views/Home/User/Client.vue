<template>
    <div id="Client">
        <UserCreateModal :defaultRole="1" />
        <b-container fluid>
            <div class="Client-Area">
                <b-row>
                    <b-col>
                        <div class="Client-Header">
                            <h2>客戶</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="客戶數" :data="25419" :trend="460" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="被停權數" :data="25" :trend="-3" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <TitledCard title="客戶清單">
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
                                <CustomTable ref="customTable" :queryRows="queryRows" :totalRows="totalCount" :fields="fields"
                                    :datas="data" :isBusy="tableBusy" @dataRequire="onDataRequire">
                                    <template #top-row="data">
                                        <b-td v-for="(field, index) in data.fields" :key="index">
                                            <b-form-select v-if="field.key == 'status'" v-model="search['status']">
                                                <option value="0">停用</option>
                                                <option value="1">啟用</option>
                                            </b-form-select>
                                            <b-form-select v-if="field.key == 'roleId'" v-model="search['roleId']">
                                                <option value="1">一般客戶</option>
                                                <option value="2">企業用戶</option>
                                            </b-form-select>
                                            <b-form-input v-if="field.key !== 'status' && field.key !== 'roleId'"
                                                v-model="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" />
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
    import UserTableModel from '@/config/UserTable.json'
    import DataCard from '@/components/Card/DataCard.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import UserCreateModal from '@/components/Modal/UserCreateModal.vue'

    import tigermaster from 'fdtigermaster-sdk'
    import RoleIdMapping from '@/model/Mapping/RoleIdMapping.js' 

    export default {
        name: "Client",
        components: {
            DataCard,
            TitledCard,
            CustomTable,
            UserCreateModal,
        },
        data() {
            return {
                fields: UserTableModel,
                data: [],
                roleIdMap: RoleIdMapping(),
                search: {
                    roleId: 1
                },
                queryRows: 0,
                totalCount: 0,
                tableBusy: false
            }
        },
        async created() {
            await this.fetchClient();
        },
        methods: {
            async fetchClient(){
                try {
                    this.tableBusy = true;
                    const res = await tigermaster.database
                        .query("user")
                        .where("user.role_id", "IN", [1, 2])
                        .limit(0, 100)
                        .get();
                    this.data = res.data;
                    this.queryRows = res.queryRows;
                    this.totalCount = res.totalCount;
                } catch (e) {
                    console.log(e);
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
                searchArray.forEach(element => {
                    element[2] = 'LIKE'
                    element[1] = '%' + element[1] + '%'
                    query.where(`user.${element[0]}`, `${element[2]}`, `${element[1]}`)
                });
                query.where('user.role_id', '=', `${this.search.roleId}`).limit(0, 100);
                await query.get();
                const res = await query.get();
                this.data = res.data;
                this.queryRows = res.queryRows;
                this.totalCount = res.totalCount;
                this.tableBusy = false;
            },
            async onSearchClearClick() {
                await this.fetchClient();
                this.$refs.customTable.toFirstPage();
                this.search = {};
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