<template>
    <div id="Broadcast">
        <b-container fluid>
            <div class="Broadcast-Area">
                <b-row>
                    <b-col>
                        <div class="Broadcast-Header">
                            <h2>推播</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <TitledCard title="推播用戶">
                            <div class="Broadcast-Search d-flex mb-3">
                                <b-button class="ml-2" variant="primary">
                                    已選擇數量: <b-badge variant="light">{{numOfSelected}}</b-badge>
                                </b-button>
                                <b-button class="ml-auto" variant="primary" @click="onSearchClick">搜尋</b-button>
                                <b-button class="ml-2" variant="danger" @click="onSearchClearClick">清除搜尋</b-button>
                                <b-button class="ml-2" variant="warning" @click="onSelectAllClick">全選 / 取消全選</b-button>
                            </div>
                            <div class="Broadcast-Table">
                                <BroadcastTable @row-selected="updateSelected" @selectedNumChange="updateNumOfSelected"
                                    :isSelectAll="isSelectAll" :queryRows="queryRows" :totalRows="totalCount"
                                    :fields="fields" :datas="data" :isBusy="tableBusy" @dataRequire="onDataRequire">
                                    <template #cell(全選)>
                                        <b-form-checkbox v-model="selected" />
                                    </template>
                                    <template #cell(phone)="data">
                                        <router-link :to="`/home/user_detail?userId=${data.item.id}`">
                                            {{ data.value }}
                                        </router-link>
                                    </template>
                                    <template #cell(active)="data">
                                        {{ data.value == "1" ? "啟用" : "凍結" }}
                                    </template>
                                </BroadcastTable>
                            </div>
                        </TitledCard>
                    </b-col>
                    <b-col>
                        <TitledCard title="推播訊息">
                            <div class="Broadcast-Msg">
                                <b-form>
                                    <b-form-input placeholder="標題" />
                                    <b-form-textarea id="textarea" placeholder="輸入內文..." rows="5" max-rows="20">
                                    </b-form-textarea>
                                    <b-button class="mt-2" variant="primary" type="submit">送出</b-button>
                                </b-form>
                            </div>
                        </TitledCard>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import BroadcastTableModel from '@/config/BroadcastTable.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import BroadcastTable from '@/components/Table/BroadcastTable.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: "Broadcast",
        components: {
            TitledCard,
            BroadcastTable,
        },
        data() {
            return {
                fields: BroadcastTableModel,
                data: [],
                search: {},
                queryRows: 0,
                totalCount: 0,
                tableBusy: false,
                isSelectAll: null,
                broadcastMsg: {
                    title: '',
                    msg: '',
                },
                selected: [],
            }
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
        methods: {
            onRowSelected(items) {
                this.selected = items
            },
            onDataRequire() {
                this.tableBusy = true;
            },
            onSelectAllClick() {
                if (this.isSelectAll === null) {
                    this.isSelectAll = true
                } else {
                    this.isSelectAll = !this.isSelectAll;
                }
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
            updateNumOfSelected(obj) {
                this.numOfSelected = obj
            },
            updateSelected(obj) {
                this.selected = obj
            }
        },
        computed: {
            numOfSelected() {
                return this.selected.length;
            }
        }
    }
</script>

<style scoped>
    #Broadcast {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Broadcast .Broadcast-Area {
        padding: 0px 50px;
    }

    #Broadcast .Broadcast-Area .Broadcast-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Broadcast .Broadcast-Area {
            padding: 0px;
        }
    }
</style>