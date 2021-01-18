<template>
    <div>
        <b-container fluid>
            <!-- <div class="d-flex mt-3">
                <b-button class="ml-auto" variant="primary">
                    <font-awesome-icon icon="edit" fixed-width />
                    編輯
                </b-button>
            </div> -->
            <b-row>
                <b-col>
                    <TitledCard title="基本">
                        <div class="m-2">
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶姓名: ">
                                <b-form-input v-model="order.clientUserName" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶ID: ">
                                <b-form-input v-model="order.clientUserId" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶電話: ">
                                <b-form-input v-model="order.clientUserPhone" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="訂單編號: ">
                                <b-form-input v-model="order.id" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅姓名: ">
                                <b-form-input v-model="order.masterUserName" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅ID: ">
                                <b-form-input v-model="order.masterUserId" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅電話: ">
                                <b-form-input v-model="order.masterUserPhone" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="訂單狀態: ">
                                <b-form-select :options="OrderStatus" v-model="order.status" disabled></b-form-select>
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項編號: ">
                                <b-form-input v-model="order.workingCategoryId" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項描述: ">
                                <b-form-input v-model="order.workingCategoryDescription" disabled />
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard title="地址">
                        <div class="m-2">
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                                <b-form-input v-model="order.addressCity" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區: ">
                                <b-form-input v-model="order.addressArea" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                                <b-form-input v-model="order.addressStreet" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="門牌樓層: ">
                                <b-form-input v-model="order.addressDetail" disabled />
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard title="客戶專用">
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="統編: ">
                            <b-form-input disabled />
                        </b-form-group>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="抬頭: ">
                            <b-form-input disabled />
                        </b-form-group>
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="費用">
                        <div class="m-2">
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅報價: ">
                                <b-form-input disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="距離加成: ">
                                <b-form-input v-model="order.distanceBonus" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅星等: ">
                                <b-form-input v-model="order.masterScoreBonus" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="時間加成: ">
                                <b-form-input v-model="order.timeBonus" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="平台服務費: ">
                                <b-form-input v-model="order.platformServicePrice" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="優惠卷折扣: ">
                                <b-form-input disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="派遣費折讓: ">
                                <b-form-input disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="訂單總金額: ">
                                <b-form-input v-model="order.orderTotalPrice" disabled />
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard title="其他">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="預期開工日: ">
                                    <b-form-input disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="保固完結日: ">
                                    <b-form-input disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="建立日期: ">
                                    <b-form-input v-model="order.createDate" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="被誰建立: ">
                                    <b-form-input v-model="order.createBy" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="緯度: ">
                                    <b-form-input v-model="order.addressLat" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="經度: ">
                                    <b-form-input v-model="order.addressLong" disabled />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import OrderStatusMap from '@/model/Mapping/OrderStatusMap.js'
    import OrderStatus from '@/config/OrderStatus.json'

    export default {
        name: 'BasicDetail',
        props: {
            order: {}
        },
        components: {
            TitledCard
        },
        data() {
            return {
                statusMap: OrderStatusMap(),
                OrderStatus
            }
        }
    }
</script>