<template>
    <div id="UserComment">
        <ScoreModal :currentUser="currentUser" :user="user" @refresh="refresh" />
        <b-container fluid>
            <b-row align-h="start">
                <b-col cols="4" align-self="center">
                    <DataCard v-bind:hasTrend="false" color="#4e73df" title="平均分數" :data="user.avgScore" :trend="1" />
                </b-col>
            </b-row>
            <TitledCard title="評分和評論歷史">
                <div class="Tool-bar d-flex mb-3">
                    <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                    <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清除搜尋</b-button>
                    <b-button class="ml-auto" size="md" variant="outline-danger" v-b-modal="'Score-Modal'">修改平均分數
                    </b-button>
                </div>
                <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="comments" :isBusy="tableBusy"
                    @dataRequire="onDataRequire">
                    <template #top-row="comments">
                        <b-td v-for="(field, index) in comments.fields" :key="index">
                            <b-form-input v-model="search[field.key]" :name="field.key"
                                :placeholder="`${field.label}`" />
                        </b-td>
                    </template>
                </CustomTable>
            </TitledCard>
        </b-container>
    </div>
</template>
<script>
    import DataCard from '@/components/Card/DataCard.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import ScoreModal from '@/components/Modal/ScoreModal.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'

    export default {
        name: "UserComment",
        components: {
            DataCard,
            TitledCard,
            ScoreModal,
            CustomTable
        },
        props: {
            user: {},
            currentUser: {}
        },
        data() {
            return {
                tableBusy: false,
                search: {},
                fields: [{
                        "key": "orderId",
                        "label": "訂單編號"
                    },
                    {
                        "key": "score",
                        "label": "評分"
                    },
                    {
                        "key": "remark",
                        "label": "評論"
                    }
                ],
                comments: [{
                        orderId: "TH-T001",
                        score: "4",
                        remark: "這位用戶收到的評論...",
                    },
                    {
                        orderId: "TH-T001",
                        score: "4",
                        remark: "這位用戶收到的評論...",
                    },
                    {
                        orderId: "TH-T001",
                        score: "4",
                        remark: "這位用戶收到的評論...",
                    },
                    {
                        orderId: "TH-T001",
                        score: "4",
                        remark: "這位用戶收到的評論...",
                    },
                ]
            }
        },
        created() {
            if (!this.user.avgScore) {
                this.user.avgScore = 0;
            }
        },
        methods: {
            onSearchClick() {},
            onSearchClearClick() {
                this.search = {}
            },
            onDataRequire() {},
            refresh() {
                this.$emit("refresh");
            }
        }
    }
</script>

<style scoped>
</style>