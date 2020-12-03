<template>
    <Loading v-if="isLoading"/>
    <div v-else id="Master">
        <UserCreateModal id="User-Create-Modal" :default-role="1" @onSaveClick="onNewUserSaveClick" />
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
                        <DataCard color="#4e73df" title="師傅數" :data="25419" :trend="460" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="被停權數" :data="25" :trend="-3" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <TitledCard title="師傅列表">
                            <div class="Master-Search d-flex mb-3">
                                <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                                <b-button class="ml-2" variant="danger" @click="onSearchClearClick">清除搜尋</b-button>
                                <b-button class="ml-auto" variant="success" v-b-modal="'User-Create-Modal'">新增客戶
                                </b-button>
                            </div>
                            <div class="Master-Table">
                                <CustomTable :queryRows="queryRows" :totalRows="totalCount" :fields="fields" :datas="data"
                                    :isBusy="tableBusy" @dataRequire="onDataRequire">
                                    <template #top-row="data">
                                        <b-td v-for="(field, index) in data.fields" :key="index">
                                            <b-form-input v-model="search[field.key]" :name="field.key"
                                                :placeholder="`${field.label}`" />
                                        </b-td>
                                    </template>
                                    <template #cell(phone)="data">
                                        <router-link :to="`/home/user_detail?userId=${data.item.id}`">{{ data.value }}
                                        </router-link>
                                    </template>
                                    <template #cell(active)="data">
                                        {{ data.value == "1" ? "啟用" : "凍結" }}
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
    import DataCard from '@/components/Card/DataCard.vue'
    import UserTableModel from '@/config/UserTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import UserCreateModal from '@/components/Modal/UserCreateModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: "Admin",
        components: {
            Loading,
            DataCard,
            TitledCard,
            CustomTable,
            UserCreateModal,
        },
        async created(){
            this.isLoading = true;
            const res = await tigermaster.database
                .query("user")
                .where("user.role_id", "=", 1)
                .limit(0,100)
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
                isLoading: true
            }
        },
        methods: {
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {
                this.search = {};
            },
            onNewUserSaveClick() {
                this.$router.push({
                    path: '/home/user_detail',
                    query: {
                        userId: "202011240001"
                    }
                });
            },
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
</style>