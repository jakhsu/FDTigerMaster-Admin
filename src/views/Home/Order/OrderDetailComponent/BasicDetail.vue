<template>
    <div>
        <SimpleModal @onSaveClick="terminateOrder" id="close-order-modal" title="關閉此訂單">
            <template #modal-body>
                確定要關閉此訂單嗎?
            </template>
        </SimpleModal>
        <b-container fluid>
            <div v-if="!isEdit" class="d-flex mt-3">
                <b-button variant="warning" @click="calculatePrice">
                    重新計算價錢
                </b-button>
                <b-button @click="startEdit" class="ml-auto" variant="primary">
                    <font-awesome-icon icon="edit" fixed-width />
                    編輯
                </b-button>
                <b-button v-b-modal="'close-order-modal'" class="ml-2" variant="outline-danger">
                    關閉訂單
                </b-button>
            </div>
            <div v-else class="d-flex mt-3">
                <b-button variant="warning" @click="calculatePrice">
                    重新計算價錢
                </b-button>
                <b-button @click="onFinishEdit" class="ml-auto" variant="success">
                    <font-awesome-icon icon="edit" fixed-width />
                    完成編輯
                </b-button>
                <b-button @click="cancelEdit" class="ml-2" variant="outline-secondary">
                    取消編輯
                </b-button>
            </div>
            <b-row>
                <b-col>
                    <TitledCard title="基本">
                        <div class="m-2">
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶姓名: ">
                                <b-form-input v-model="order._data.clientUserName" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶ID: ">
                                <b-form-input v-model="order._data.clientUserId" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶電話: ">
                                <b-form-input v-model="order._data.clientUserPhone" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="訂單編號: ">
                                <b-form-input v-model="order._data.id" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅姓名: ">
                                <b-form-input v-model="order._data.masterUserName" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅ID: ">
                                <b-form-input v-model="order._data.masterUserId" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅電話: ">
                                <b-form-input v-model="order._data.masterUserPhone" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="訂單狀態: ">
                                <b-form-select :options="OrderStatus" v-model="order._data.status" disabled>
                                </b-form-select>
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項編號: ">
                                <b-form-input v-model="order._data.workingCategoryId" disabled />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項描述: ">
                                <b-form-input v-model="order._data.workingCategoryDescription" disabled />
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard title="地址">
                        <div class="m-2">
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                                <b-form-input v-model="order._data.addressCity" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區: ">
                                <b-form-input v-model="order._data.addressArea" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                                <b-form-input v-model="order._data.addressStreet" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="門牌樓層: ">
                                <b-form-input v-model="order._data.addressDetail" :disabled="!isEdit" />
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard title="客戶專用">
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="統編: ">
                            <b-form-input v-model="order._data.businessId" :disabled="!isEdit" />
                        </b-form-group>
                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="抬頭: ">
                            <b-form-input v-model="order._data.invoiceTitle" :disabled="!isEdit" />
                        </b-form-group>
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="費用">
                        <div class="m-2">
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅報價: ">
                                <b-form-input v-model="order._data.masterOfferPrice" disabled />
                            </b-form-group>
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="距離加成: ">
                                    <b-form-input v-model="order._data.distanceBonus" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="距離加成金額: ">
                                    <b-form-input v-model="price.tax" :disabled="!isEdit" />
                                </b-form-group>
                            </b-form-group>

                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="星等加成: ">
                                <b-form-input v-model="order._data.masterScoreBonus" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="時間加成: ">
                                <b-form-input v-model="order._data.timeBonus" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="平台服務費: ">
                                <b-form-input v-model="order._data.platformServicePrice" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="優惠卷折扣: ">
                                <b-form-input v-model="order._data.couponDiscountPrice" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="派遣費折讓: ">
                                <b-form-input v-model="order._data.dispatchDiscountPrice" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="稅金: ">
                                <b-form-input v-model="order._data.tax" :disabled="!isEdit" />
                            </b-form-group>
                            <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="訂單總金額: ">
                                <b-form-input v-model="order._data.totalPay" disabled />
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard title="其他">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="預期開工日: ">
                                    <b-form-input v-model="order._data.expectWorkingDate" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="保固完結日: ">
                                    <b-form-input v-model="order._data.warrantyEndDate" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="建立日期: ">
                                    <b-form-input v-model="order._data.createDate" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="被誰建立: ">
                                    <b-form-input v-model="order._data.createBy" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="緯度: ">
                                    <b-form-input v-model="order._data.addressLat" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="經度: ">
                                    <b-form-input v-model="order._data.addressLong" disabled />
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
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import OrderStatusMap from '@/model/Mapping/OrderStatusMap.js'
    import OrderStatus from '@/config/OrderStatus.json'

    export default {
        name: 'BasicDetail',
        props: {
            order: {}
        },
        components: {
            TitledCard,
            SimpleModal
        },
        data() {
            return {
                statusMap: OrderStatusMap(),
                OrderStatus,
                isEdit: false,
                price: {}
            }
        },
        created() {
            this.calculatePrice();
        },
        methods: {
            cancelEdit() {
                this.isEdit = false;
            },
            startEdit() {
                this.isEdit = !this.isEdit;
            },
            async onFinishEdit() {
                try {
                    await this.order.update({
                        "addressCity": this.order._data.addressCity,
                        "addressArea": this.order._data.addressArea,
                        "addressStreet": this.order._data.addressStreet,
                        "addressDetail": this.order._data.addressDetail,
                        "expectWorkingDate": this.order._data.expectWorkingDate,
                        "warrtyEndDate": this.order._data.warrtyEndDate,
                        "distanceBonus": this.order._data.distanceBonus,
                        "timeBonus": this.order._data.timeBonus,
                        "platformServicePrice": this.order._data.platformServicePrice,
                        "masterScoreBonus": this.order._data.masterScoreBonus,
                        "couponDiscountPrice": this.order._data.couponDiscountPrice,
                        "tax": this.order._data.tax,
                        "dispatchDiscountPrice": this.order._data.dispatchDiscountPrice,
                        "invoiceTitle": this.order._data.invoiceTitle,
                        "businessId": this.order._data.businessId,
                        "property": this.order._data.property
                    });
                    this.$emit("updateOrder")
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isEdit = !this.isEdit;
                }
            },
            async terminateOrder() {
                try {
                    await this.order.cancel();
                } catch (e) {
                    console.log(e)
                }
            },
            async calculatePrice() {
                try {
                    const res = await this.order.paymenyEstimate();
                    this.price = res;
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>