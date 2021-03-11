<template>
    <div>
        <b-container fluid>
            <SimpleModal id="restore-modal" title="還原資料">
                <template #modal-body>
                    <scale-loader v-if="isLoadingSavePoints"> </scale-loader>
                    <div v-else>
                        <p>
                            系統在每次update資料後都有留下紀錄可供還原，點擊要還原的時間點即可
                        </p>
                        <b-list-group class="mt-2 save-points-list">
                            <b-list-group-item href="#" v-for="(item, index) in savePoints" :key="index"
                                @click="onSavePointsClick(item)">
                                {{parseUnixTimeString(item)}}
                            </b-list-group-item>
                        </b-list-group>
                        <div>
                            <b-card>
                                選擇要還原的日期: {{parseUnixTimeString(dateToRollBackTo)}}
                            </b-card>
                        </div>
                    </div>
                </template>
                <template #modal-footer>
                    <b-button @click="closeModal">
                        取消
                    </b-button>
                    <b-button v-if="dateToRollBackTo !== ''" variant="success" @click="onRollBack">
                        確認還原
                    </b-button>
                </template>
            </SimpleModal>
            <TitledCard title="L1~L3" :key="refreshKey">
                <Loading v-if="isLoading" />
                <div v-else>
                    <div class="d-flex mb-2">
                        <b-button class="ml-auto" variant="info" @click="openRestoreModal">
                            <font-awesome-icon icon="sync" />
                            資料還原
                        </b-button>
                        <b-button v-if="!hasUnfinishedJob" class="ml-2" variant="success" @click="onFinishModify">
                            完成編輯</b-button>
                    </div>
                    <b-row>
                        <b-col sm=6 lg="4">
                            <b-button block variant="primary" @click="startCreate(1)">
                                <font-awesome-icon icon="edit" />新增
                            </b-button>
                            <b-list-group class="mt-2">
                                <b-list-group-item @click="onListClick($event, item, 1)" v-for="(item, index) in L1Keys"
                                    :key="index">
                                    {{item}}
                                </b-list-group-item>
                            </b-list-group>
                            <b-card class="mb-2" v-if="currentL1.name">
                                <div class="d-flex">
                                    <b-button variant="outline-primary" class="ml-auto" v-if="!isEditL1"
                                        @click="startEdit(1)">
                                        <font-awesome-icon icon="edit" />開始修改</b-button>
                                    <!-- TODO: figure out if delete is appropiate for L1 items, deleting it will affect all children nodes -->
                                    <!-- <b-button variant="outline-danger" class="ml-2" v-if="!isEditL1">
                                        <font-awesome-icon icon="trash-alt" />刪除</b-button> -->
                                    <b-button variant="success" class="ml-auto" v-if="isEditL1" @click="cancelEdit(1)">
                                        完成
                                    </b-button>
                                    <b-button class="ml-2" v-if="isEditL1" @click="cancelEdit(1)">取消</b-button>
                                </div>
                                <div class="mt-2">
                                    <b-form-group label="已選取L1">
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>名稱</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input :disabled="!isEditL1" v-model="currentL1.name" />
                                        </b-input-group>
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>描述</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input :disabled="!isEditL1" v-model="currentL1.desc" />
                                        </b-input-group>
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>圖片路徑</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input :disabled="!isEditL1" v-model="currentL1.imagePath" />
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                            </b-card>
                            <b-card v-if="isCreateL1" class="mb-2">
                                <div class="d-flex">
                                    <b-button variant="success" class="ml-auto" v-if="isCreateL1"
                                        @click="onCreateItem(1)">
                                        完成
                                    </b-button>
                                    <b-button class="ml-2" v-if="isCreateL1" @click="cancelCreate(1)">取消</b-button>
                                </div>
                                <div class="mt-2">
                                    <b-form-group label="欲新增的L1">
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>名稱</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="L1ToBeCreated.name" />
                                        </b-input-group>
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>描述</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="L1ToBeCreated.desc" />
                                        </b-input-group>
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>圖片路徑</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="L1ToBeCreated.imagePath" />
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                            </b-card>
                        </b-col>
                        <b-col sm=6 lg="4">
                            <b-button block variant="primary" @click="startCreate(2)">
                                <font-awesome-icon icon="edit" />新增
                            </b-button>
                            <b-list-group v-if="currentL1.name" class="mt-2">
                                <b-list-group-item @click="onListClick($event, item.name, 2)"
                                    v-for="(item, index) in L2Items" :key="index">
                                    {{item.name}}
                                </b-list-group-item>
                            </b-list-group>
                            <b-card class="mb-2" v-if="currentL2.name">
                                <div class="d-flex">
                                    <b-button variant="outline-primary" class="ml-auto" v-if="!isEditL2"
                                        @click="startEdit(2)">
                                        <font-awesome-icon icon="edit" />開始修改</b-button>
                                    <!-- TODO: figure out if delete is appropiate for L1 items, deleting it will affect all children nodes -->
                                    <!-- <b-button variant="outline-danger" class="ml-2" v-if="!isEditL2">
                                        <font-awesome-icon icon="trash-alt" />刪除</b-button> -->
                                    <b-button variant="success" class="ml-auto" v-if="isEditL2" @click="cancelEdit(2)">
                                        完成
                                    </b-button>
                                    <b-button class="ml-2" v-if="isEditL2" @click="cancelEdit(2)">取消</b-button>
                                </div>
                                <div class="mt-2">
                                    <b-form-group label="已選取L2">
                                        <b-form-input :disabled="!isEditL2" v-model="currentL2.name" />
                                        <b-form-input :disabled="!isEditL2" class="mt-2" v-model="currentL2.desc" />
                                        <b-form-input :disabled="!isEditL2" class="mt-2"
                                            v-model="currentL2.imagePath" />
                                    </b-form-group>
                                </div>
                            </b-card>
                            <b-card v-if="isCreateL2 && currentL1.name" class="mb-2">
                                <div class="d-flex">
                                    <b-button variant="success" class="ml-auto" v-if="isCreateL2"
                                        @click="onCreateItem(2)">
                                        完成
                                    </b-button>
                                    <b-button class="ml-2" v-if="isCreateL2" @click="cancelCreate(2)">取消</b-button>
                                </div>
                                <div class="mt-2">
                                    <b-form-group label="欲新增的L2">
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>名稱</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="L2ToBeCreated.name" />
                                        </b-input-group>
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>描述</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="L2ToBeCreated.desc" />
                                        </b-input-group>
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>圖片路徑</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="L2ToBeCreated.imagePath" />
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                            </b-card>
                        </b-col>
                        <b-col sm=6 lg="4">
                            <b-button block variant="primary" @click="startCreate(3)">
                                <font-awesome-icon icon="edit" />新增
                            </b-button>
                            <b-list-group v-if="currentL2.name" class="mt-2">
                                <b-list-group-item @click="onListClick($event, item, 3)"
                                    v-for="(item, index) in L3Items" :key="index">
                                    {{item}}
                                </b-list-group-item>
                            </b-list-group>
                            <b-card v-if="currentL3" class="mb-2">
                                <div class="d-flex">
                                    <b-button variant="outline-danger" class="ml-2" @click="onDeleteItem(3, currentL3)">
                                        <font-awesome-icon icon="trash-alt" />刪除</b-button>
                                </div>
                                <div class="mt-2">
                                    <b-form-group label="已選取L3">
                                        <b-form-input disabled v-model="currentL3" />
                                    </b-form-group>
                                </div>
                            </b-card>
                            <b-card v-if="isCreateL3 && currentL2.name" class="mb-2">
                                <div class="d-flex">
                                    <b-button variant="success" class="ml-auto" v-if="isCreateL3"
                                        @click="onCreateItem(3)">
                                        完成
                                    </b-button>
                                    <b-button class="ml-2" v-if="isCreateL3" @click="cancelCreate(3)">取消</b-button>
                                </div>
                                <div class="mt-2">
                                    <b-form-group label="欲新增的L3">
                                        <b-input-group>
                                            <template #prepend>
                                                <b-input-group-text>
                                                    <strong>編號</strong>
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="L3ToBeCreated" />
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                            </b-card>
                        </b-col>
                    </b-row>
                </div>
            </TitledCard>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import tigermaster from 'fdtigermaster-admin-sdk'
    import Loading from '@/components/Loading.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    export default {
        name: 'ServiceLevel',
        components: {
            TitledCard,
            Loading,
            SimpleModal
        },
        data() {
            return {
                isLoading: false,
                isLoadingSavePoints: false,
                currentL1: {},
                currentL2: {},
                currentL3: "",
                isEditL1: false,
                isEditL2: false,
                isCreateL1: false,
                isCreateL2: false,
                isCreateL3: false,
                L1ToBeCreated: {},
                L2ToBeCreated: {},
                L3ToBeCreated: "",
                isRollingBack: false,
                serviceLevelData: {},
                savePoints: [],
                L1Keys: [],
                L2Items: [],
                L3Items: [],
                jsonFile: {},
                dateToRollBackTo: "",
                refreshKey: 1
            }
        },
        async created() {
            await this.fetchServiceLevel()
            this.parseAllClassItems()
        },
        methods: {
            startEdit(level) {
                if (this.hasUnfinishedJob) {
                    return
                }
                switch (level) {
                    case 1: {
                        this.isEditL1 = true
                        break
                    }
                    case 2: {
                        this.isEditL2 = true
                        break
                    }
                }
            },
            cancelEdit(level) {
                switch (level) {
                    case 1: {
                        this.isEditL1 = false
                        break
                    }
                    case 2: {
                        this.isEditL2 = false
                        break
                    }
                }
            },
            startCreate(level) {
                if (this.hasUnfinishedJob) {
                    return
                }
                switch (level) {
                    case 1:
                        this.isCreateL1 = true
                        break
                    case 2:
                        this.isCreateL2 = true
                        break
                    case 3:
                        this.isCreateL3 = true
                        break
                }
            },
            cancelCreate(level) {
                switch (level) {
                    case 1:
                        this.isCreateL1 = false
                        break
                    case 2:
                        this.isCreateL2 = false
                        break
                    case 3:
                        this.isCreateL3 = false
                        break
                }
            },
            onCreateItem(level) {
                switch (level) {
                    case 1:
                        this.serviceLevelData[this.L1ToBeCreated.name] = {
                            name: this.L1ToBeCreated.name,
                            desc: this.L1ToBeCreated.desc,
                            imagePath: this.L1ToBeCreated.imagePath,
                            L2: {}
                        }
                        this.parseL1Keys()
                        this.isCreateL1 = false
                        break
                    case 2:
                        this.serviceLevelData[this.currentL1.name].L2[this.L2ToBeCreated.name] = {
                            name: this.L2ToBeCreated.name,
                            desc: this.L2ToBeCreated.desc,
                            imagePath: this.L2ToBeCreated.imagePath,
                            L3: []
                        }
                        this.parseL2Items()
                        this.isCreateL2 = false
                        break
                    case 3:
                        this.serviceLevelData[this.currentL1.name].L2[this.currentL2.name].L3.push(this.L3ToBeCreated)
                        this.parseL3Items()
                        this.isCreateL3 = false
                        break
                }
            },
            onDeleteItem(level, key) {
                if (this.hasUnfinishedJob) {
                    return
                }
                switch (level) {
                    case 3: {
                        let target = this.serviceLevelData[this.currentL1.name].L2[this.currentL2.name].L3
                        target.splice(target.indexOf(key), 1)
                        this.currentL3 = ""
                    }
                }
            },
            onListClick(e, key, level) {
                if (this.hasUnfinishedJob) {
                    return
                }
                if (level === 1 && !this.hasUnfinishedJob) {
                    this.currentL1 = this.serviceLevelData[key]
                    this.parseL2Items()
                } else if (level === 2 && !this.hasUnfinishedJob) {
                    for (let L2Item in this.currentL1.L2) {
                        if (this.currentL1.L2[L2Item].name === key) {
                            this.currentL2 = this.currentL1.L2[L2Item]
                        }
                    }
                    this.parseL3Items()
                } else if (level === 3 && !this.hasUnfinishedJob) {
                    const index = this.currentL2.L3.indexOf(key)
                    this.currentL3 = this.currentL2.L3[index]
                }
            },
            parseL1Keys() {
                this.L1Keys = Object.keys(this.serviceLevelData)
            },
            parseL2Items() {
                const selectedL1 = this.currentL1.name || this.L1Keys[0]
                for (let L1Item in this.serviceLevelData) {
                    if (L1Item === selectedL1) {
                        this.L2Items = this.serviceLevelData[L1Item].L2
                    }
                }
            },
            parseL3Items() {
                const selectedL1 = this.currentL1.name || this.L1Keys[0]
                const selectedL2 = this.currentL2.name || this.L2Items[0]
                for (let L1Item in this.serviceLevelData) {
                    if (this.serviceLevelData[L1Item].name === selectedL1) {
                        for (let L2Item in this.serviceLevelData[L1Item].L2) {
                            if (this.serviceLevelData[L1Item].L2[L2Item].name === selectedL2) {
                                this.L3Items = this.serviceLevelData[L1Item].L2[L2Item].L3
                            }
                        }
                    }
                }
            },
            parseAllClassItems() {
                this.parseL1Keys()
                this.parseL2Items()
                this.parseL3Items()
            },
            async fetchServiceLevel() {
                this.isLoading = true;
                const serviceLevel = tigermaster.services.Level;
                try {
                    this.serviceLevelData = await serviceLevel.get();
                    // TODO: for testing, using example.json as service level data, will need
                    // to fetch from DB later stages
                    // this.serviceLevelData = example
                } catch (e) {
                    this.serviceLevelData = {}
                } finally {
                    this.isLoading = false
                }
            },
            onFinishModify() {
                const serviceLevel = tigermaster.services.Level;
                this.isLoading = true
                try {
                    serviceLevel.update(this.serviceLevelData)
                    this.refreshKey++
                    this.$bvToast.toast("編輯成功", {
                        title: "恭喜",
                        autoHideDelay: 5000,
                        variant: "success"
                    })
                } catch (e) {
                    this.$bvToast.toast(`編輯失敗，錯誤: ${e}`, {
                        title: "oops",
                        autoHideDelay: 5000,
                        variant: "danger"
                    })
                } finally {
                    this.isLoading = false
                }
            },
            async openRestoreModal() {
                this.$bvModal.show('restore-modal')
                const serviceLevel = tigermaster.services.Level;
                const res = await serviceLevel.listHistory()
                this.savePoints = res
            },
            parseUnixTimeString(str) {
                let date = new Date(parseInt(str, 10) * 1000)
                let time = date.toLocaleString()
                return time
            },
            onSavePointsClick(item) {
                this.dateToRollBackTo = item
                this.isRollingBack = true
            },
            async onRollBack() {
                const serviceLevel = tigermaster.services.Level
                await serviceLevel.rollBack(this.dateToRollBackTo);
                this.closeModal()
            },
            closeModal() {
                this.$bvModal.hide('restore-modal')
            }
        },
        computed: {
            hasUnfinishedJob() {
                const switchs = [this.isCreateL1, this.isCreateL2, this.isCreateL3, this.isEditL1, this.isEditL2]
                return switchs.some(e => e === true)
            }
        },
        beforeRouteLeave(to, from, next) {
            const answer = window.confirm("如果未點擊儲存鈕，離開將會遺失未儲存的資料，要離開嗎?")
            if (answer) {
                next()
            } else {
                next(false)
            }
        }
    }
</script>

<style scoped>
    td {
        vertical-align: middle;
    }

    .save-points-list {
        max-height: 400px;
        overflow: scroll;
    }
</style>