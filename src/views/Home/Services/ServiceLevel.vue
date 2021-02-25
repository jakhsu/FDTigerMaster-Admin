<template>
    <div>
        <b-container fluid>
            <TitledCard title="L1~L3">
                <b-row>
                    <b-col sm=6 lg="4">
                        <b-button block>
                            <font-awesome-icon icon="edit" />新增
                        </b-button>
                        <CustomTable @rowClick="onRowClick($event, 'L1')" :datas="L1Items" :fields="fields">
                            <template #footer v-if="this.currentL1.name">
                                <b-card class="mb-2">
                                    <div class="d-flex">
                                        <b-button variant="outline-primary" class="ml-auto" v-if="!isEditL1">
                                            <font-awesome-icon icon="edit" />修改</b-button>
                                        <b-button variant="outline-danger" class="ml-2" v-if="!isEditL1">
                                            <font-awesome-icon icon="trash-alt" />刪除</b-button>
                                        <b-button variant="success" class="ml-auto" v-if="isEditL1">完成</b-button>
                                    </div>
                                    <div class="mt-2">
                                        <b-form-group>
                                            <b-form-input :disabled="!isEditL1" v-model="currentL1.name" />
                                            <b-form-input :disabled="!isEditL1" class="mt-2" v-model="currentL1.desc" />
                                            <b-form-input :disabled="!isEditL1" class="mt-2"
                                                v-model="currentL1.imagePath" />
                                        </b-form-group>
                                    </div>
                                </b-card>
                            </template>
                        </CustomTable>
                    </b-col>
                    <b-col sm=6 lg="4">
                        <b-button block>
                            <font-awesome-icon icon="edit" />新增
                        </b-button>
                        <CustomTable @rowClick="onRowClick($event, 'L2')" :datas="L2Items" :fields="fields">
                            <template #footer v-if="this.currentL2.name">
                                <b-card class="mb-2">
                                    <div class="d-flex">
                                        <b-button variant="outline-primary" class="ml-auto" v-if="!isEditL2">
                                            <font-awesome-icon icon="edit" />修改</b-button>
                                        <b-button variant="outline-danger" class="ml-2" v-if="!isEditL2">
                                            <font-awesome-icon icon="trash-alt" />刪除</b-button>
                                        <b-button variant="success" class="ml-auto" v-if="isEditL2">完成</b-button>
                                    </div>
                                    <div class="mt-2">
                                        <b-form-group>
                                            <b-form-input :disabled="!isEditL2" v-model="currentL2.name" />
                                            <b-form-input :disabled="!isEditL2" class="mt-2" v-model="currentL2.desc" />
                                            <b-form-input :disabled="!isEditL2" class="mt-2"
                                                v-model="currentL2.imagePath" />
                                        </b-form-group>
                                    </div>
                                </b-card>
                            </template>
                        </CustomTable>
                    </b-col>
                    <b-col sm=6 lg="4">
                        <b-button block>
                            <font-awesome-icon icon="edit" />新增
                        </b-button>
                        <CustomTable :datas="L3Items">
                        </CustomTable>
                    </b-col>
                </b-row>
            </TitledCard>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    export default {
        name: 'ServiceLevel',
        components: {
            TitledCard,
            CustomTable
        },
        data() {
            return {
                fields: [
                    "name"
                ],
                L1Items: [{
                    "name": "水電服務",
                    "desc": "這是水電服務包括...",
                    "imagePath": "https://..."
                }],
                L2Items: [{
                    "name": "通水管馬桶",
                    "desc": "這是通水管馬桶包括...",
                    "imagePath": "https://..."
                }],
                L3Items: [{
                    "name": "TM-P010101"
                }, {
                    "name": "TM-P010201"
                }, {
                    "name": "TM-P010301"
                }],
                currentL1: {},
                currentL2: {},
                isEditL1: false,
                isEditL2: false
            }
        },
        methods: {
            onRowClick(row, type) {
                if (type == 'L1') {
                    this.currentL1 = row
                } else if (type == 'L2') {
                    this.currentL2 = row
                }
            }
        }
    }
</script>

<style scoped>
    td {
        vertical-align: middle;
    }
</style>