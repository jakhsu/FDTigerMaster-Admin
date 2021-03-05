<template>
    <div>
        <b-container fluid>
            <TitledCard title="L1~L3">
                <b-row>
                    <b-col sm=6 lg="4">
                        <b-button block>
                            <font-awesome-icon icon="edit" />新增
                        </b-button>
                        <b-list-group class="mt-2">
                            <b-list-group-item @click="onListClick(item, 1)" v-for="(item, index) in L1Items"
                                :key="index">
                                {{item}}
                            </b-list-group-item>
                        </b-list-group>
                        <b-card v-if="currentL1.name" class="mb-2">
                            <div class="d-flex">
                                <b-button variant="outline-primary" class="ml-auto" v-if="!isEditL1"
                                    @click="allowL1Edit">
                                    <font-awesome-icon icon="edit" />修改</b-button>
                                <b-button variant="outline-danger" class="ml-2" v-if="!isEditL1">
                                    <font-awesome-icon icon="trash-alt" />刪除</b-button>
                                <b-button variant="success" class="ml-auto" v-if="isEditL1" @click="finishL1Edit">完成
                                </b-button>
                                <b-button class="ml-2" v-if="isEditL1" @click="cancelL1Edit">取消</b-button>
                            </div>
                            <div class="mt-2">
                                <b-form-group>
                                    <b-form-input :disabled="!isEditL1" v-model="currentL1.name" />
                                    <b-form-input :disabled="!isEditL1" class="mt-2" v-model="currentL1.desc" />
                                    <b-form-input :disabled="!isEditL1" class="mt-2" v-model="currentL1.imagePath" />
                                </b-form-group>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col sm=6 lg="4">
                        <b-button block>
                            <font-awesome-icon icon="edit" />新增
                        </b-button>
                        <b-list-group class="mt-2">
                            <b-list-group-item @click="onListClick(item, 2)" v-for="(item, index) in L2Items"
                                :key="index">
                                {{item}}
                            </b-list-group-item>
                        </b-list-group>
                        <b-card v-if="currentL2.name" class="mb-2">
                            <div class="d-flex">
                                <b-button variant="outline-primary" class="ml-auto" v-if="!isEditL2"
                                    @click="allowL2Edit">
                                    <font-awesome-icon icon="edit" />修改</b-button>
                                <b-button variant="outline-danger" class="ml-2" v-if="!isEditL2">
                                    <font-awesome-icon icon="trash-alt" />刪除</b-button>
                                <b-button variant="success" class="ml-auto" v-if="isEditL2" @click="finishL2Edit">完成
                                </b-button>
                                <b-button class="ml-2" v-if="isEditL2" @click="cancelL2Edit">取消</b-button>
                            </div>
                            <div class="mt-2">
                                <b-form-group>
                                    <b-form-input :disabled="!isEditL2" v-model="currentL2.name" />
                                    <b-form-input :disabled="!isEditL2" class="mt-2" v-model="currentL2.desc" />
                                    <b-form-input :disabled="!isEditL2" class="mt-2" v-model="currentL2.imagePath" />
                                </b-form-group>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col sm=6 lg="4">
                        <b-button block>
                            <font-awesome-icon icon="edit" />新增
                        </b-button>
                        <b-list-group class="mt-2">
                            <b-list-group-item @click="onListClick(item, 3)" v-for="(item, index) in L3Items"
                                :key="index">
                                {{item}}
                            </b-list-group-item>
                        </b-list-group>
                        <b-card v-if="currentL3" class="mb-2">
                            <div class="d-flex">
                                <b-button variant="outline-danger" class="ml-2">
                                    <font-awesome-icon icon="trash-alt" />刪除</b-button>
                            </div>
                            <div class="mt-2">
                                <b-form-group>
                                    <b-form-input disabled v-model="currentL3" />
                                </b-form-group>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </TitledCard>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ServiceLevel',
        components: {
            TitledCard,
        },
        data() {
            return {
                currentL1: {},
                currentL2: {},
                currentL3: "",
                isEditL1: false,
                isEditL2: false,
                serviceLevelData: {},
                L1Items: [],
                L2Items: [],
                L3Items: [],
                jsonFile: {}
            }
        },
        async created() {
            await this.fetchServiceLevel()
            this.parseAllClassItems()
        },
        methods: {
            allowL1Edit() {
                this.isEditL1 = true;
            },
            finishL1Edit() {
                this.isEditL1 = false;
            },
            cancelL1Edit() {
                this.isEditL1 = false;
            },
            allowL2Edit() {
                this.isEditL2 = true;
            },
            finishL2Edit() {
                this.isEditL2 = false;
            },
            cancelL2Edit() {
                this.isEditL2 = false;
            },
            onListClick(item, level) {
                this.parseAllClassItems()
                if (level === 1) {
                    this.currentL1 = this.serviceLevelData[item]
                } else if (level === 2) {
                    this.currentL2 = this.currentL1.L2[item]
                } else if (level === 3) {
                    const index = this.currentL2.L3.indexOf(item)
                    this.currentL3 = this.serviceLevelData[this.currentL1.name]
                        .L2[this.currentL2.name]
                        .L3[index]
                }
            },
            parseAllClassItems() {
                this.L1Items = Object.keys(this.serviceLevelData)
                const selectedL1 = this.currentL1.name || this.L1Items[0]
                this.L2Items = Object.keys(this.serviceLevelData[selectedL1].L2)
                const selecctedL2 = this.currentL2.name || this.L2Items[0]
                this.L3Items = this.serviceLevelData[selectedL1].L2[selecctedL2].L3
            },
            async fetchServiceLevel() {
                const serviceLevel = tigermaster.services.Level;
                this.serviceLevelData = await serviceLevel.get()
            }
        },
    }
</script>

<style scoped>
    td {
        vertical-align: middle;
    }
</style>