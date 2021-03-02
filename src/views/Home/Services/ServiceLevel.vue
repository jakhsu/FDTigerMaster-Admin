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
                        <CustomTable :datas="L3Items" :fields="fields">
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
    import example from './serviceLevelExample.json'
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
                currentL1: {},
                currentL2: {},
                isEditL1: false,
                isEditL2: false,
                example,
                L1Items: [],
                L2Items: [],
                L3Items: []
            }
        },
        created() {
            this.parseAllClassItems();
        },
        methods: {
            onRowClick(row, type) {
                if (type == 'L1') {
                    this.currentL1 = row
                } else if (type == 'L2') {
                    this.currentL2 = row
                }
            },
            parseL1Items(json) {
                const data = []
                for (let key in json) {
                    const {
                        name: name,
                        desc: desc,
                        imagePath: imagePath
                    } = json[key]
                    data.push({
                        name,
                        desc,
                        imagePath
                    })
                }
                return data
            },
            parseL2Items(json) {
                const data = []
                for (let key in json) {
                    const {
                        L2: L2
                    } = json[key]
                    for (let key in L2) {
                        const {
                            name: name,
                            desc: desc,
                            imagePath: imagePath
                        } = L2[key]
                        data.push({
                            name,
                            desc,
                            imagePath
                        })
                    }
                }
                return data
            },
            parseL3Items(json) {
                const data = []
                for (let key in json) {
                    const {
                        L2: L2
                    } = json[key]
                    for (let key in L2) {
                        const {
                            L3: L3
                        } = L2[key]
                        for (let key in L3) {
                            data.push({
                                name: L3[key]
                            })
                        }
                    }
                }
                return data
            },
            parseAllClassItems() {
                this.L1Items = this.parseL1Items(this.example)
                this.L2Items = this.parseL2Items(this.example)
                this.L3Items = this.parseL3Items(this.example)
            }
        },
        // computed: {
        //     L1Items: function () {
        //         const example = this.example;
        //         const data = []
        //         for (let key in example) {
        //             const {
        //                 name: name,
        //                 desc: desc,
        //                 imagePath: imagePath
        //             } = example[key]
        //             data.push({
        //                 name,
        //                 desc,
        //                 imagePath
        //             })
        //         }
        //         return data
        //     },
        //     L2Items: function () {
        //         const example = this.example;
        //         const data = []
        //         for (let key in example) {
        //             const {
        //                 L2: L2
        //             } = example[key]
        //             for (let key in L2) {
        //                 const {
        //                     name: name,
        //                     desc: desc,
        //                     imagePath: imagePath
        //                 } = L2[key]
        //                 data.push({
        //                     name,
        //                     desc,
        //                     imagePath
        //                 })
        //             }
        //         }
        //         return data
        //     },
        //     L3Items: function () {
        //         const example = this.example;
        //         const data = []
        //         for (let key in example) {
        //             const {
        //                 L2: L2
        //             } = example[key]
        //             for (let key in L2) {
        //                 const {
        //                     L3: L3
        //                 } = L2[key]
        //                 for (let key in L3) {
        //                     data.push(L3[key])
        //                 }
        //             }
        //         }
        //         return data
        //     },
        // }
    }
</script>

<style scoped>
    td {
        vertical-align: middle;
    }
</style>