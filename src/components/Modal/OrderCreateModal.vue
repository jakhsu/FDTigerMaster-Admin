<template>
    <div>
        <b-modal :id="id" :size="size">
            <template #modal-header>
                建立一張訂單
            </template>
            <b-form id="order-form">
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶ID: ">
                    <b-form-input :state="inputState[0]" @update="notEmptyValidate(clientUserId, 0)"
                        v-model="clientUserId" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項編號: ">
                    <scale-loader v-if="isLoading" />
                    <b-form-input list="workingCategoryList" :state="inputState[1]"
                        @update="workingCategoryValidate(workingCategoryId, 1)" v-model="workingCategoryId" />
                    <b-form-datalist id="workingCategoryList" :options="workingCategories" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                    <b-form-input list="cityList" :state="inputState[2]" @update="notEmptyValidate(addressCity, 2)"
                        v-model="addressCity" />
                    <b-form-datalist id="cityList" :options="cityList" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區: ">
                    <b-form-input list="areaList" :state="inputState[3]" @update="notEmptyValidate(addressArea, 3)"
                        v-model="addressArea" />
                    <b-form-datalist id="areaList" :options="areaList" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                    <b-form-input :state="inputState[4]" @update="notEmptyValidate(addressStreet, 4)"
                        v-model="addressStreet" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="門牌樓層: ">
                    <b-form-input :state="inputState[5]" @update="notEmptyValidate(addressDetail, 5)"
                        v-model="addressDetail" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="預期開工日: ">
                    <div class="d-flex">
                        <b-form-datepicker @input="notEmptyValidate(picker.date, 6)" :state="inputState[6]" :min="today"
                            placeholder="選擇日期" v-model="picker.date" />
                        <b-form-timepicker @input="notEmptyValidate(picker.time, 7)" :state="inputState[7]"
                            placeholder="選擇時間" v-model="picker.time"></b-form-timepicker>
                    </div>
                    <b-form-input v-model="expectWorkingDate" disabled />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="距離加成: ">
                    <b-form-input :state="inputState[8]" @update="notEmptyValidate(distanceBonus, 8)"
                        v-model.number="distanceBonus" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="師傅星等加成: ">
                    <b-form-input :state="inputState[9]" @update="notEmptyValidate(masterScoreBonus, 9)"
                        v-model.number="masterScoreBonus" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="收據抬頭: ">
                    <b-form-input :state="inputState[10]" @update="notEmptyValidate(invoiceTitle, 10)"
                        v-model="invoiceTitle" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="客戶統編: ">
                    <b-form-input :state="inputState[11]" @update="notEmptyValidate(businessId, 11)"
                        v-model="businessId" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="是否為代叫訂單: ">
                    <b-select v-model="isProxy" :state="true">
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
    import CityAreaData from '@/config/AreaData.json'

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
                CityAreaData,
                isLoading: false,
                clientUserId: "",
                workingCategoryId: "",
                addressCity: "",
                addressArea: "",
                addressStreet: "",
                addressDetail: "",
                distanceBonus: 0,
                masterScoreBonus: 0,
                invoiceTitle: "",
                businessId: "",
                isProxy: 0,
                OrderStatus,
                picker: {
                    date: "",
                    time: ""
                },
                orderId: '',
                workingCategories: [],
                inputState: [null, null, null, null, null, null, null, null, null, null, null, null]
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
                const order = {
                    "clientUserId": this.clientUserId,
                    "workingCategoryId": this.workingCategoryId,
                    "addressCity": this.addressCity,
                    "addressArea": this.addressArea,
                    "addressStreet": this.addressStreet,
                    "addressDetail": this.addressDetail,
                    "distanceBonus": this.distanceBonus,
                    "masterScoreBonus": this.masterScoreBonus,
                    "invoiceTitle": this.invoiceTitle,
                    "businessId": this.businessId,
                    "expectWorkingDate": this.expectWorkingDate,
                    "isProxy": this.isProxy
                }
                if (this.inputState.every(e => e === true)) {
                    try {
                        this.orderId = await tigermaster.order.create(order);
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
                this.inputState = [null, null, null, null, null, null, null, null, null, null, null];
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
            expectWorkingDate() {
                return this.picker.date + " " + this.picker.time
            },
            cityList() {
                return Object.keys(this.CityAreaData);
            },
            areaList() {
                return this.CityAreaData[this.addressCity];
            },
            today() {
                const now = new Date();
                const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
                return today;
            }
        }
    }
</script>