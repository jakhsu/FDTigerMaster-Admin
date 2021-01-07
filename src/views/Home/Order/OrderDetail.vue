<template>
    <div id="OrderDetail">
        <b-container>
            <b-tabs>
                <b-tab title="訂單詳情" active>
                    <b-card border-variant="info" class="Detail-Area">
                        <b-row class="mt-3" align-h="end">
                            <b-col>
                                <div class="d-flex">
                                    <b-button class="ml-auto" variant="success">
                                        <font-awesome-icon icon="edit" />
                                        開始修改
                                    </b-button>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <TitledCard title="基本">
                                    <div class="m-2">
                                        <b-form-group label-align-sm="right" label-cols="4" label="訂單編號: ">
                                            <b-form-input v-model="order.id" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="客戶ID: ">
                                            <b-form-input v-model="order.clientUserId" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="客戶電話: ">
                                            <b-form-input v-model="order.clientUserPhone" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="師傅ID: ">
                                            <b-form-input v-model="order.masterUserId" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="師傅電話: ">
                                            <b-form-input v-model="order.masterUserPhone" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="訂單狀態: ">
                                            <b-form-input v-model="order.status" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="工項編號: ">
                                            <b-form-input v-model="order.workingCategoryId" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="工項描述: ">
                                            <b-form-input v-model="order.workingCategoryDescription" disabled />
                                        </b-form-group>
                                    </div>
                                </TitledCard>
                                <TitledCard title="地址">
                                    <div class="m-2">
                                        <b-form-group label-align-sm="right" label-cols="4" label="城市: ">
                                            <b-form-input v-model="order.addressCity" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="區: ">
                                            <b-form-input v-model="order.addressArea" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="街道: ">
                                            <b-form-input v-model="order.addressStreet" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="門牌樓層: ">
                                            <b-form-input v-model="order.addressDetail" disabled />
                                        </b-form-group>
                                    </div>
                                </TitledCard>
                            </b-col>
                            <b-col>
                                <TitledCard title="費用">
                                    <div class="m-2">
                                        <b-form-group label-align-sm="right" label-cols="4" label="師父報價: ">
                                            <b-form-input disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="距離加成: ">
                                            <b-form-input disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="師傅星等: ">
                                            <b-form-input disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="時間加成: ">
                                            <b-form-input disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="平台服務費: ">
                                            <b-form-input v-model="order.platformServicePrice" disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="優惠卷折扣: ">
                                            <b-form-input disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="派遣費折讓: ">
                                            <b-form-input disabled />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="4" label="訂單總金額: ">
                                            <b-form-input v-model="order.orderTotalPrice" disabled />
                                        </b-form-group>
                                    </div>
                                </TitledCard>
                                <TitledCard title="其他">
                                    <div class="m-2">
                                        <b-form-group>
                                            <b-form-group label-align-sm="right" label-cols="4" label="建立日期: ">
                                                <b-form-input v-model="order.createDate" disabled />
                                            </b-form-group>
                                            <b-form-group label-align-sm="right" label-cols="4" label="被誰建立: ">
                                                <b-form-input v-model="order.createBy" disabled />
                                            </b-form-group>
                                        </b-form-group>
                                    </div>
                                </TitledCard>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-tab>
                <b-tab title="符合工項的師傅">
                    <b-card border-variant="info">
                        <CustomTable ref="customTable" :queryRows="totalCount" :totalRows="totalCount" :fields="fields"
                            :datas="matchedMasters" :isBusy="tableBusy">
                            <template #cell(phone)="matchedMasters">
                                <router-link :to="`/home/user_detail?userId=${matchedMasters.item.id}`">
                                    {{ matchedMasters.value }}
                                </router-link>
                            </template>
                        </CustomTable>
                    </b-card>
                </b-tab>
            </b-tabs>

        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue';

    import tigermaster from 'fdtigermaster-sdk'
    import CustomTable from '@/components/Table/CustomTable.vue';

    export default {
        components: {
            TitledCard,
            CustomTable
        },
        name: 'OrderDetail',
        data() {
            return {
                order: {},
                matchedMasters: [],
                totalCount: 0,
                tableBusy: false,
                fields: [{
                    "key": "phone",
                    "label": "師傅電話"
                }, {
                    "key": "name",
                    "label": "姓名"
                }, {
                    "key": "distance",
                    "label": "師傅距離"
                }, {
                    "key": "email",
                    "label": "郵件"
                }, {
                    "key": "addressCity",
                    "label": "城市"
                }, {
                    "key": "addressArea",
                    "label": "區"
                }, {
                    "key": "addressStreet",
                    "label": "街道"
                }]

            }
        },
        async created() {
            await this.fetchOrderData();
            await this.fetchMatchedMaster();
        },
        methods: {
            async fetchOrderData() {
                const database = tigermaster.database;
                const query = database.query("generic_order");
                query.where(`generic_order.id`, 'LIKE', `${this.$route.query.orderId}`);
                try {
                    const response = await query.get();
                    this.order = response.data[0];
                } catch (e) {
                    console.log(e)
                }
            },
            async fetchMatchedMaster() {
                const database = tigermaster.database;
                const query = database
                    .query("user")
                    .where("user.id", "LIKE", `%${this.order.masterUserId}%`);
                try {
                    const res = await query.get();
                    this.matchedMasters = res.data;
                    this.totalCount = res.totalCount;
                    console.log(this.matchedMasters)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>