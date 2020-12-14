<template>
    <Loading v-if="isLoading" />
    <div v-else id="Client">
        <UserCreateModal id="User-Create-Modal" :default-role="0" @onSaveClick="onNewUserSaveClick" />
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
                                <CustomTable :queryRows="queryRows" :totalRows="totalCount" :fields="fields"
                                    :datas="data" :isBusy="tableBusy" @dataRequire="onDataRequire">
                                    <template #top-row="data">
                                        <b-td v-for="(field, index) in data.fields" :key="index">
                                            <b-form-input v-model="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" v-b-popover.hover="searchTips(field)" />
                                        </b-td>
                                    </template>
                                    <template #cell(phone)="data">
                                        <router-link :to="`/home/user_detail?userId=${data.item.id}`">
                                            {{ data.value }}
                                        </router-link>
                                    </template>
                                    <template #cell(active)="data">
                                        {{ data.value == "1" ? "啟用" : "凍結" }}
                                    </template>
                                    <template #cell(roleId)="data">
                                        {{ data.value == "1" ? "師傅" : data.value == 0 ? "客戶" : data.value == 70 ? "行銷" : data.value == 80 ? "財務" : data.value == 90 ? "客服" : data.value == 999 ? "超級使用者" : data.value}}
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
    import Loading from '@/components/Loading'
    import UserTableModel from '@/config/UserTable.json'
    import DataCard from '@/components/Card/DataCard.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import UserCreateModal from '@/components/Modal/UserCreateModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: "Client",
        components: {
            Loading,
            DataCard,
            TitledCard,
            CustomTable,
            UserCreateModal,
        },
        async created() {
            this.isLoading = true;
            const res = await tigermaster.database
                .query("user")
                .where("user.role_id", "=", 0)
                .limit(0, 100)
                .get();
            this.data = res.data;
            this.queryRows = res.queryRows;
            this.totalCount = res.totalCount;
            this.isLoading = false;
        },
        data() {
            return {
                fields: UserTableModel,
                data: [],
                search: {},
                queryRows: 0,
                totalCount: 0,
                tableBusy: false,
                isLoading: true,
            }
        },
        methods: {
            searchTips(field) {
                return {
                    variant: 'info',
                    html: true,
                    title: () => {
                        if (field.key == 'roleId') {
                            return '說明: '
                        }
                        return
                    },
                    content: () => {
                        if (field.key == 'roleId') {
                            return `客人: 0 師傅: 1 <br> 行銷: 70  財務: 80 <br> 客服: 90 超級使用者: 999 `
                        }
                        return
                    }
                }
            },
            onDataRequire() {
                this.tableBusy = true;
            },
            async onSearchClick() {
                this.isLoading = true;
                const res = await tigermaster.database
                    .query("user")
                    .where("user.name", "LIKE", `${'name' in this.search ? '%' + this.search.name + '%' : '%'}`)
                    .where("user.role_id", "=", `${'roleId' in this.search ? this.search.roleId : 0}`)
                    .where("user.email", "LIKE", `${'email' in this.search ? '%' + this.search.email + '%' : '%'}`)
                    .where("user.phone", "LIKE", `${'phone' in this.search ? '%' + this.search.phone + '%' : '%'}`)
                    .limit(0, 100)
                    .get();
                this.data = res.data;
                this.queryRows = res.queryRows;
                this.totalCount = res.totalCount;
                this.isLoading = false;
                this.search = {}
            },
            async onNewUserSaveClick(obj) {
                this.isLoading = true;
                let newUser = obj;
                const id = await tigermaster.auth.createUserWithPhoneAndPassword(newUser.phone, "1234567890",
                    newUser);
                this.isLoading = false;
                this.$router.push({
                    path: '/home/user_detail',
                    query: {
                        userId: id
                    }
                });
            },
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