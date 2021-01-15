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
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="訂單編號: ">
                    <b-form-input :state="inputState[1]" @update="notEmptyValidate(order.id, 1)" v-model="order.id" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅ID: ">
                    <b-form-input :state="inputState[2]" @update="notEmptyValidate(order.masterUserId, 2)"
                        v-model="order.masterUserId" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="訂單狀態: ">
                    <b-select :state="true" :options="OrderStatus" v-model="order.status"></b-select>
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項編號: ">
                    <b-form-input :state="inputState[3]" @update="notEmptyValidate(order.workingCategoryId, 3)"
                        v-model="order.workingCategoryId" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                    <b-form-input :state="inputState[4]" @update="notEmptyValidate(order.addressCity, 4)"
                        v-model="order.addressCity" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區: ">
                    <b-form-input :state="inputState[5]" @update="notEmptyValidate(order.addressArea, 5)"
                        v-model="order.addressArea" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                    <b-form-input :state="inputState[6]" @update="notEmptyValidate(order.addressStreet, 6)"
                        v-model="order.addressStreet" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="門牌樓層: ">
                    <b-form-input :state="inputState[7]" @update="notEmptyValidate(order.addressDetail, 7)"
                        v-model="order.addressDetail" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="屬性: ">
                    <b-select :state="true" v-model="order.property">
                        <option value="0">一般金額</option>
                        <option value="1">大金額</option>
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
                order: {
                    property: 0,
                    status: 5
                },
                OrderStatus,
                inputState: [null, null, null, null, null, null, null, null]
            }
        },
        methods: {
            async onCreateClick() {
                if (this.inputState.every(e => e === true)) {
                    try {
                        await tigermaster.order.create(this.order)
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    console.log("some input is invalid")
                }
            },
            onCancelModal() {
                this.$bvModal.hide(this.id)
            },
            notEmptyValidate(input, index) {
                this.inputState[index] = (input !== '')
            },
            numberValidate(input, index) {
                this.inputState[index] = (!isNaN(input) && !input == '')
            }
        },
        computed: {

        }
    }
</script>