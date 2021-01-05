<template>
    <SimpleModal id="Order-Detail-Modal" title="訂單詳情" @onSaveClick="onSaveClick">
        <template #modal-body>
            <b-tabs pills card fill>
                <b-tab title="基本" active>
                    <b-form-group label-class="font-weight-bold" label-align="center" label="基本">
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>訂單編號</b-input-group-text>
                                </template>
                                <b-input v-model="input"></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>訂單狀態</b-input-group-text>
                                </template>
                                <b-input>已送出報價單</b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>預計施工日期</b-input-group-text>
                                </template>
                                <b-input>2021/3/15</b-input>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                    <b-form-group label-class="font-weight-bold" label-align="center" label="訂單工項">
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>ID</b-input-group-text>
                                </template>
                                <b-input>TM-K010101</b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>簡述</b-input-group-text>
                                </template>
                                <b-input>清水溝</b-input>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                    <b-form-group label-class="font-weight-bold" label-align="center" label="負責師傅">
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>電話</b-input-group-text>
                                </template>
                                <b-input>0900123456</b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>ID</b-input-group-text>
                                </template>
                                <b-input>202012050001</b-input>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                    <b-form-group label-class="font-weight-bold" label-align="center" label="客戶">
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>電話</b-input-group-text>
                                </template>
                                <b-input>0900456789</b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>ID</b-input-group-text>
                                </template>
                                <b-input>202012050002</b-input>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                </b-tab>
                <b-tab title="地址">
                    <b-form-group label-class="font-weight-bold" label-align="center" label="施工地址">
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>城市</b-input-group-text>
                                </template>
                                <b-input>台北市</b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>行政區</b-input-group-text>
                                </template>
                                <b-input>南港區</b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>街道</b-input-group-text>
                                </template>
                                <b-input>園區街</b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>門牌樓層</b-input-group-text>
                                </template>
                                <b-input>20號五樓</b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>經度</b-input-group-text>
                                </template>
                                <b-input></b-input>
                                <template #append>
                                    <b-input-group-text>緯度</b-input-group-text>
                                    <b-input></b-input>
                                </template>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                </b-tab>
                <b-tab title="費用">
                    <b-form-group label-class="font-weight-bold" label-align="center" label="折扣">
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>優惠卷折扣</b-input-group-text>
                                </template>
                                <b-input></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>派遣費折讓</b-input-group-text>
                                </template>
                                <b-input></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-form-group>
                                <b-input-group>
                                    <template #prepend>
                                        <b-input-group-text>師傅報價</b-input-group-text>
                                    </template>
                                    <b-input></b-input>
                                </b-input-group>
                            </b-form-group>
                        </b-form-group>
                    </b-form-group>
                    <b-form-group label-class="font-weight-bold" label-align="center" label="各項加成">
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>師傅星等加成</b-input-group-text>
                                </template>
                                <b-input></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>時間加成</b-input-group-text>
                                </template>
                                <b-input></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>距離加成</b-input-group-text>
                                </template>
                                <b-input></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>平台服務費</b-input-group-text>
                                </template>
                                <b-input></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>稅金</b-input-group-text>
                                </template>
                                <b-input></b-input>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                    <b-form-group>
                        <b-input-group>
                            <template #prepend>
                                <b-input-group-text>總金額</b-input-group-text>
                            </template>
                            <b-input></b-input>
                        </b-input-group>
                    </b-form-group>
                </b-tab>
                <b-tab title="其他細項">
                    <b-form-group label-class="font-weight-bold" label-align="center" label="其他">
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>保固結束日期</b-input-group-text>
                                </template>
                                <b-input disabled></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>誰建立這筆記錄</b-input-group-text>
                                </template>
                                <b-input disabled></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>誰更新這筆記錄</b-input-group-text>
                                </template>
                                <b-input disabled></b-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>更新記錄日期</b-input-group-text>
                                </template>
                                <b-input disabled></b-input>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                </b-tab>
            </b-tabs>
        </template>
    </SimpleModal>
</template>
<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    export default {
        name: 'OrderDetailModal',
        components: {
            SimpleModal
        },
        methods: {
            onSaveClick() {
                this.$emit("onSaveClick")
            }
        },
        data() {
            return {
                input: '',
            }
        }
    }
</script>