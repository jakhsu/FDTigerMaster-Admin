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
                <div>
                    <b-form inline>
                        <b-input-group>
                            <template #prepend>
                                <b-input-group-text><strong>編號</strong></b-input-group-text>
                            </template>
                            <b-input v-model="search.id"></b-input>
                        </b-input-group>
                        <b-input-group>
                            <template #prepend>
                                <b-input-group-text><strong>訂單狀態</strong></b-input-group-text>
                            </template>
                            <b-form-select v-model="search.status" :options="OrderStatus">
                            </b-form-select>
                        </b-input-group>
                        <b-input-group>
                            <template #prepend>
                                <b-input-group-text><strong>工項</strong></b-input-group-text>
                            </template>
                            <b-input v-model="search.category"></b-input>
                        </b-input-group>
                    </b-form>
                </div>
                <div class="d-flex mt-2">
                    <b-button class="ml-2" variant="primary" @click="onSearchClick">
                        開始搜尋
                    </b-button>
                    <b-button size="sm" class="ml-2" variant="outline-danger" @click="onSearchClearClick">
                        清空搜尋列
                    </b-button>
                    <b-button class="ml-auto" variant="success">新增訂單
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
                search: {},
                tableBusy: false
            }
        },
        methods: {
            async onSearchClick() {
                let query = tigermaster.database.query("generic_order");
                let searchArray = Object.entries(this.search);
                searchArray.forEach(element => {
                    element[2] = 'LIKE'
                    element[1] = '%' + element[1] + '%'
                    if (element[0] === 'workingCategoryDescription') {
                        query.with('working_category');
                        query.link('working_category.id', 'generic_order.working_category_id');
                        query.where('working_category.description', 'LIKE', element[1]);
                    } else if (element[0] === 'masterUserPhone') {
                        query.with('user');
                        query.link('user.id', 'generic_order.master_user_id');
                        query.where('user.phone', 'LIKE', element[1]);
                    } else {
                        if (element[0] === 'masterUserId') {
                            element[0] = 'master_user_id'
                        } else if (element[0] === 'addressCity') {
                            element[0] = 'address_city'
                        } else if (element[0] === 'addressArea') {
                            element[0] = 'address_area'
                        } else if (element[0] === 'addressStreet') {
                            element[0] = 'address_street'
                        }
                        query.where(`generic_order.${element[0]}`, element[2], element[1])
                    }
                });
                try {
                    const res = await query.get();
                    this.$emit("SuccessfulSearch", res)
                } catch (e) {
                    this.$bvModal.show("Search-Fail-Modal");
                }
            },
            onSearchClearClick() {},
            closeFailModal() {
                this.$bvModal.hide("Search-Fail-Modal");
            }
        }
    }
</script>

<style scoped>

</style>