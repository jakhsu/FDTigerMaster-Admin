<template>
    <div>
        <b-modal :id="id" :size="size">
            <template #modal-header>
                建立一張訂單
            </template>
            <b-form id="order-form">
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶ID: ">
                    <b-form-input :state="inputState[0]" @update="notEmptyValidate(order.clientUserId, 0)"
                        v-model="order.clientUserId" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項編號: ">
                    <scale-loader v-if="isLoading" />
                    <b-form-input list="workingCategoryList" :state="inputState[1]"
                        @update="workingCategoryValidate(order.workingCategoryId, 1)"
                        v-model="order.workingCategoryId" />
                    <b-form-datalist id="workingCategoryList" :options="workingCategories" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                    <b-form-input :state="inputState[2]" @update="notEmptyValidate(order.addressCity, 2)"
                        v-model="order.addressCity" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區: ">
                    <b-form-input :state="inputState[3]" @update="notEmptyValidate(order.addressArea, 3)"
                        v-model="order.addressArea" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                    <b-form-input :state="inputState[4]" @update="notEmptyValidate(order.addressStreet, 4)"
                        v-model="order.addressStreet" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="門牌樓層: ">
                    <b-form-input :state="inputState[5]" @update="notEmptyValidate(order.addressDetail, 5)"
                        v-model="order.addressDetail" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="預期開工日: ">
                    <b-form-input :state="inputState[6]" @update="notEmptyValidate(order.expectWorkingData, 6)"
                        v-model="order.expectWorkingData" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="距離加成: ">
                    <b-form-input :state="inputState[7]" @update="notEmptyValidate(order.distanceBonus, 7)"
                        v-model="order.distanceBonus" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅星等加成: ">
                    <b-form-input :state="inputState[8]" @update="notEmptyValidate(order.masterScoreBonus, 8)"
                        v-model="order.masterScoreBonus" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="收據抬頭: ">
                    <b-form-input :state="inputState[9]" @update="notEmptyValidate(order.invoiceTitle, 9)"
                        v-model="order.invoiceTitle" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶統編: ">
                    <b-form-input :state="inputState[10]" @update="notEmptyValidate(order.businessId, 10)"
                        v-model="order.businessId" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="是否為代叫訂單: ">
                    <b-select v-model="order.isProxy">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </b-select>
                </b-form-group>
            </b-form>
            <template #modal-footer>
                <b-button variant="success" @click="onCreateClick()">
                    建立訂單
                </b-button>
                <b-button variant="outline-secondary" @click="onCancelModal()">
                    取消
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import OrderStatus from '@/config/OrderStatus.json'
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'OrderCreateModal',
        props: {
            id: {
                type: String,
                default: 'Order-Create-Modal'
            },
            size: {
                type: String,
                default: 'lg'
            }
        },
        components: {},
        data() {
            return {
                isLoading: false,
                order: {},
                OrderStatus,
                orderId: '',
                workingCategories: [],
                inputState: [null, null, null, null, null, null, null, null, null, null, null]
            }
        },
        created() {
            this.fetchAllCategories();
        },
        methods: {
            async fetchAllCategories() {
                this.isLoading = true;
                const database = tigermaster.database;
                let query = database.query("working_category");
                try {
                    const res = await query.get();
                    this.workingCategories = res.data.map(e => {
                        return {
                            "value": e.id,
                            "text": e.description
                        };
                    })
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isLoading = false;
                }
            },
            async onCreateClick() {
                if (this.inputState.every(e => e === true)) {
                    try {
                        this.orderId = await tigermaster.order.create(this.order);
                        this.onCancelModal();
                        this.$emit("successfulCreate")
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    console.log("some input is invalid")
                }
            },
            onCancelModal() {
                this.$bvModal.hide(this.id)
                this.order = {};
                this.inputState = [null, null, null, null, null, null];
            },
            notEmptyValidate(input, index) {
                this.inputState[index] = (input !== '')
            },
            numberValidate(input, index) {
                this.inputState[index] = (!isNaN(input) && !input == '')
            },
            workingCategoryValidate(input, index) {
                const workingCategories = this.workingCategories.map(e => e.value);
                this.inputState[index] = (workingCategories.indexOf(input) !== -1)
            }
        },
        computed: {

        }
    }
</script>