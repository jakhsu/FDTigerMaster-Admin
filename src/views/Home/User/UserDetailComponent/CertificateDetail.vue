<template>
    <div id="CertificateDetail">
        <b-container fluid>
            <b-row>
                <b-col lg='6' md='12'>
                    <TitledCard title="證照列表:">
                        <div class="certtable">
                            <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                            <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                            <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                            <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                            <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                            <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                            <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                            <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                        </div>
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="上傳區:">
                        <div class="uploadForm">
                            <b-form>
                                <b-form-group label-cols="3" label-cols-xl="2" label="上傳照片: ">
                                    <b-form-file></b-form-file>
                                </b-form-group>
                                <b-form-group label-cols="3" label-cols-xl="2" label="證照類型: ">
                                    <b-form-input />
                                </b-form-group>
                                <b-form-group label-cols="3" label-cols-xl="2" label="正反面: ">
                                    <b-form-select v-model="selected" :options="options">
                                    </b-form-select>
                                </b-form-group>
                                <b-form-group label-cols="3" label-cols-xl="2" label="證照號: ">
                                    <b-form-input />
                                </b-form-group>
                            </b-form>
                        </div>
                        <div class="downloadarea">
                            <b-button variant="primary" class="mr-1">確認上傳</b-button>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'

    export default {
        name: "CertificateDetail",
        components: {
            TitledCard,
        },
        props: {
            user: Object
        },
        data() {
            return {
                items: [{
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                ],
                selected: {},
                options: [{
                        value: "front",
                        text: "正面"
                    },
                    {
                        value: "back",
                        text: "反面"
                    },
                ],
                certificates: [{
                    type: '',
                    title: '',
                    content: '',
                }]
            }
        },
    }
</script>

<style scoped>
    #CertificateDetail {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #CertificateDetail {
        text-align: left;
    }

    #CertificateDetail ul {
        margin-bottom: 2rem;
    }

    .certtable {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>