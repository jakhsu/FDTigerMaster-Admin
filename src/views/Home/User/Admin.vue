<template>
    <div id="Admin">
        <UserCreateModal id="User-Create-Modal" @onSaveClick="onNewUserSaveClick" />
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
                    <b-col>
                        <TitledCard title="管理員列表">
                            <div class="User-Search d-flex mb-3">
                                <b-button class="ml-2" variant="primary">
                                    總共資料筆數: <b-badge variant="light">{{totalRows}}</b-badge>
                                </b-button>
                                <b-button class="ml-2" variant="danger">
                                    被停權筆數: <b-badge variant="light">{{totalRows}}</b-badge>
                                </b-button>
                                <b-button class="ml-auto" variant="primary" @click="onSearchClick">搜尋</b-button>
                                <b-button class="ml-2" variant="danger" @click="onSearchClearClick">清除搜尋</b-button>
                                <b-button class="ml-2" variant="primary" v-b-modal="'User-Create-Modal'">新增客戶
                                </b-button>
                            </div>
                            <div class="Admin-Table">
                                <CustomTable @totalRowsChange="updateTotalRows" :queryRows="1" :totalRows="1"
                                    :fields="fields" :datas="data" :isBusy="tableBusy" @dataRequire="onDataRequire">
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
    import UserTableModel from '@/config/UserTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import UserCreateModal from '@/components/Modal/UserCreateModal.vue'

    export default {
        name: "Admin",
        components: {
            TitledCard,
            CustomTable,
            UserCreateModal
        },
        data() {
            return {
                fields: UserTableModel,
                data: [{
                    id: "202011240001",
                    phone: "0975555319",
                    name: "陳柏瑞",
                    email: "rui.chen@fdtigermaster.com",
                    addressCity: "新北市",
                    addressArea: "永和區",
                    addressStreet: "文化路67巷3弄",
                    addressDetail: "10號",
                    active: "1",
                    roleId: "客戶",
                    createDate: "2020/11/24 09:57"
                }],
                search: {},
                tableBusy: false,
                totalRows: '',
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
            updateTotalRows(obj) {
                this.totalRows = obj
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