<template>
    <div>
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

    export default {
        components: {
            TitledCard,
        },
        name: 'OrderSearch',
        data() {
            return {
                OrderStatus,
                search: {},
                tableBusy: false
            }
        },
        methods: {
            onSearchClick() {},
            onSearchClearClick() {}
        }
    }
</script>

<style scoped>

</style>