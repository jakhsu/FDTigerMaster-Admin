<template>
    <div>
        <SimpleModal id="Search-Fail-Modal" title="抱歉，找不到訂單" @onSaveClick="closeFailModal">
            <template #modal-body>
                <p>
                    找不到訂單，請檢查輸入的條件
                </p>
            </template>
        </SimpleModal>
        <TitledCard title="訂單搜索">
            <b-container fluid>
                <b-input-group class="mb-2" v-for="(item, index) in conditions" :key="index" inline>
                    <b-form-select required v-model="item.field" :options="options">
                    </b-form-select>
                    <b-form-select required v-model="item.operator">
                        <option value="=">等於</option>
                        <option value="!=">不等於</option>
                        <option value=">">大於</option>
                        <option value="<">小於</option>
                        <option value="LIKE">包含</option>
                    </b-form-select>
                    <b-form-select v-if="item.field === 'status'" v-model="item.condition" :options="OrderStatus" />
                    <b-form-input v-else required v-model="item.condition" maxlength="20">
                    </b-form-input>
                    <b-input-group-append>
                        <b-button @click="deleteCondition(index)" variant="danger">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-input-group class="mb-3" inline>
                    <b-form-select required v-model="pendingCondiction.field" :options="options">
                    </b-form-select>
                    <b-form-select v-if="pendingCondiction.field === 'working_category'" required
                        v-model="pendingCondiction.operator">
                        <option value="LIKE">包含</option>
                    </b-form-select>
                    <b-form-select v-else required v-model="pendingCondiction.operator">
                        <option value="=">等於</option>
                        <option value="!=">不等於</option>
                        <option value=">">大於</option>
                        <option value="<">小於</option>
                        <option value="LIKE">包含</option>
                    </b-form-select>
                    <b-form-select v-if="pendingCondiction.field === 'status'" v-model="pendingCondiction.condition"
                        :options="OrderStatus" />
                    <b-form-input v-else required v-model="pendingCondiction.condition" maxlength="20">
                    </b-form-input>
                    <b-input-group-append>
                        <b-button type="submit" variant="success" @click="addConditions">
                            <font-awesome-icon icon="plus-square" />
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
                <div class="d-flex mt-2">
                    <b-button variant="primary" @click="onSearchClick">
                        開始搜尋
                    </b-button>
                    <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                        清空搜尋列
                    </b-button>
                    <b-button class="ml-2" variant="success" @click="onCreateOrder">新增訂單
                    </b-button>
                </div>
            </b-container>
        </TitledCard>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import OrderStatus from '@/config/OrderStatus.json'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        components: {
            TitledCard,
            SimpleModal
        },
        name: 'OngoingOrderSearch',
        data() {
            return {
                OrderStatus,
                options: [{
                        "value": 'id',
                        "text": "訂單編號"
                    }, {
                        "value": 'status',
                        "text": "訂單狀態"
                    }, {
                        "value": 'working_category',
                        "text": "訂單工項"
                    }, {
                        "value": 'address_city',
                        "text": "城市"
                    }, {
                        "value": 'address_area',
                        "text": "區"
                    }, {
                        "value": 'address_street',
                        "text": "街道"
                    },
                    {
                        "value": 'client_user_name',
                        "text": "客戶姓名"
                    },
                    {
                        "value": 'master_user_name',
                        "text": "師傅姓名"
                    }
                ],
                search: {},
                tableBusy: false,
                pendingCondiction: {
                    field: 'status',
                    operator: '=',
                    condition: ""
                },

                conditions: []
            }
        },
        methods: {
            deleteCondition(index) {
                this.conditions.splice(index, 1);
            },
            isValidForm(form) {
                return form.field != '' && form.operator != '' && form.condition != '';
            },
            addConditions() {
                if (this.isValidForm(this.pendingCondiction)) {
                    this.conditions.push(this.pendingCondiction);
                    this.pendingCondiction = {
                        field: 'name'
                    }
                }
            },
            async onSearchClick() {
                this.$emit("startSearch")
                let query = tigermaster.database.query("generic_order");
                let searchArray = (this.conditions);
                searchArray.forEach(element => {
                    if (element.field === 'client_user_name') {
                        query.with("user")
                        query.link("generic_order.client_user_id", "user.id")
                        query.where("user.name", "=", element.condition)
                    } else if (element.field === 'master_user_name') {
                        query.with("user")
                        query.link("generic_order.master_user_id", "user.id")
                        query.where("user.name", "=", element.condition)
                    } else if (element.field === 'working_category') {
                        query.with("working_category")
                        query.link("generic_order.working_category_id", "working_category.id")
                        query.where("working_category.description", "LIKE", `%${element.condition}%`)
                    } else {
                        query.where(`generic_order.${element.field}`, element.operator, element.condition)
                    }
                })
                try {
                    const res = await query.get();
                    this.$emit("SuccessfulSearch", res)
                } catch (e) {
                    this.$bvModal.show("Search-Fail-Modal");
                } finally {
                    this.$emit("FailedSearch")
                }
            },
            onSearchClearClick() {
                this.conditions = [];
                this.pendingCondiction = {
                    field: 'status',
                    operator: '=',
                    condition: ""
                };
            },
            closeFailModal() {
                this.$bvModal.hide("Search-Fail-Modal");
            },
            onCreateOrder() {
                this.$emit("createOrder")
            }
        }
    }
</script>

<style scoped>
    .form-control-inline {
        min-width: 0;
        width: auto;
        display: inline;
    }
</style>