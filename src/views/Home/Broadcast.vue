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
                        <SimpleCard>
                            <div class="Broadcast-Body">
                                <b-button id="NotifyToggle"
                                    class="Broadcast-Collapse-Toggle p-0 text-decoration-none d-flex align-items-center"
                                    variant="link" :class="display[0] ? null : 'collapsed'"
                                    :aria-expanded="display[0] ? 'true' : 'false'" @click="collapseToggle(0)">
                                    <div class="Collapse-Index d-flex justify-content-center align-items-center"
                                        :class="step > 1 ? 'finished' : null">1</div>
                                    <div>通知</div>
                                </b-button>
                                <div class="Broadcast-Collapse left-border py-3">
                                    <b-collapse v-model="display[0]" id="NotifyCollapse" class="my-2 pl-3">
                                        <BroadcastContent @next="contentReady" />
                                    </b-collapse>
                                </div>
                                <b-button id="SearchToggle"
                                    class="Broadcast-Collapse-Toggle p-0 text-decoration-none d-flex align-items-center"
                                    variant="link" :class="display[1] ? null : 'collapsed'"
                                    :aria-expanded="display[1] ? 'true' : 'false'" @click="collapseToggle(1)"
                                    :disabled="step < 1">
                                    <div class="Collapse-Index d-flex align-items-center justify-content-center"
                                        :class="step > 1 ? 'finished' : null">2</div>
                                    <div>發送條件</div>
                                </b-button>
                                <div class="Broadcast-Collapse left-border py-3">
                                    <b-collapse v-model="display[1]" id="SearchCollapse" class="py-3 pl-3">
                                        <BroadcastSearch @search="searchReady" />
                                    </b-collapse>
                                </div>
                                <b-button id="UsersToggle"
                                    class="Broadcast-Collapse-Toggle p-0 text-decoration-none d-flex align-items-center"
                                    variant="link" :class="display[2] ? null : 'collapsed'"
                                    :aria-expanded="display[2] ? 'true' : 'false'" @click="collapseToggle(2)"
                                    :disabled="step < 2">
                                    <div class="Collapse-Index d-flex align-items-center justify-content-center"
                                        :class="step > 2 ? 'finished' : null">3</div>
                                    <div>目標使用者</div>
                                </b-button>
                                <div class="Broadcast-Collapse left-border py-3">
                                    <b-collapse v-model="display[2]" id="UsersToggle" class="py-3 pl-3">
                                        <div class="d-flex mb-3">
                                            <b-button variant="primary">
                                                已選擇數量: <b-badge variant="light">{{numOfSelected}}</b-badge>
                                            </b-button>
                                            <b-button class="ml-2" variant="warning"
                                                @click="isSelectAll = !isSelectAll">全選 / 取消全選</b-button>
                                        </div>
                                        <CustomTable @rowSelected="updateSelected" :isSelectAll="isSelectAll"
                                            :queryRows="totalCount" :totalRows="totalCount" :isSelectable="true"
                                            :fields="fields" :datas="data" :isBusy="tableBusy">
                                            <template #cell(status)="data">
                                                {{ data.value == "1" ? "啟用" : "凍結" }}
                                            </template>
                                            <template #cell(roleId)="data">
                                                {{ data.value == "1" ? "師傅" : data.value == 0 ? "客戶" : data.value == 70 ? "行銷" : data.value == 80 ? "財務" : data.value == 90 ? "客服" : data.value == 999 ? "超級使用者" : data.value}}
                                            </template>
                                        </CustomTable>
                                        <b-button variant="primary" @click="tableReady">下一步</b-button>
                                    </b-collapse>
                                </div>
                                <b-button id="VerifyToggle"
                                    class="Broadcast-Collapse-Toggle p-0 text-decoration-none d-flex align-items-center"
                                    variant="link" :class="display[3] ? null : 'collapsed'"
                                    :aria-expanded="display[3] ? 'true' : 'false'" @click="collapseToggle(3)"
                                    :disabled="step < 3">
                                    <div class="Collapse-Index d-flex align-items-center justify-content-center"
                                        :class="step > 3 ? 'finished' : null">4</div>
                                    <div>確認</div>
                                </b-button>
                                <div class="Broadcast-Collapse left-border">
                                    <b-collapse v-model="display[3]" id="VerifyCollapse" class="py-3 pl-3">
                                    </b-collapse>
                                </div>
                            </div>
                        </SimpleCard>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import SimpleCard from '@/components/Card/SimpleCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import BroadcastTableModel from '@/config/BroadcastTable.json'
    import BroadcastSearch from '@/components/Broadcast/BroadcastSearch.vue'
    import BroadcastContent from '@/components/Broadcast/BroadcastContent.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: "Broadcast",
        components: {
            SimpleCard,
            CustomTable,
            BroadcastSearch,
            BroadcastContent
        },
        data() {
            return {
                fields: BroadcastTableModel,
                step: 0,
                display: [true, false, false, false],
                content: {},
                condition: {},
                isSelectAll: false,
                tableBusy: true,
                numOfSelected: 0,
                selected: {},
                data: [],
                totalCount: 0
            }
        },
        methods: {
            contentReady(content) {
                this.content = content;
                this.step = 1;
                this.collapseToggle(1);
            },
            searchReady(condition) {
                this.condition = JSON.parse(JSON.stringify(condition));
                this.step = 2;
                this.collapseToggle(2);
                this.tableBusy = true;
                let query = tigermaster.database
                    .query("user")
                this.condition.forEach((element) => {
                    if (element.operator == 'LIKE') {
                        element.condition = '%' + element.condition + '%';
                    }
                    query.where(`user.${element.field}`, `${element.operator}`, `${element.condition}`);
                });
                query.limit(0, 100);
                query.get().then(this.tableDataReady);
            },
            tableDataReady(result) {
                this.totalCount = result.totalCount;
                this.data = result.data;
                this.tableBusy = false;
            },
            tableReady() {
                this.step = 3;
                this.collapseToggle(3);
            },
            collapseToggle(index) {
                this.display = [false, false, false, false];
                this.display[index] = true;
            },
            updateSelected(obj) {
                this.selected = obj;
                this.numOfSelected = obj.length;
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

    #Broadcast .Broadcast-Area .Broadcast-Body {
        margin: 25px 0px;
        padding: 0px 20px;
    }

    #Broadcast .Broadcast-Collapse-Toggle {
        color: #000000;
        font-size: 20px;
    }

    #Broadcast .Broadcast-Collapse-Toggle .Collapse-Index {
        color: #ffffff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 5px;
        font-size: 12px;
        background-color: #757575;
    }

    #Broadcast .Broadcast-Collapse-Toggle .Collapse-Index.finished {
        background-color: #007bff;
    }

    #Broadcast .Broadcast-Collapse {
        margin-left: 12px;
    }

    .left-border {
        border-left: 2px solid #e2e2e2;
    }

    @media (max-width: 768px) {
        #Broadcast .Broadcast-Area {
            padding: 0px;
        }
    }
</style>