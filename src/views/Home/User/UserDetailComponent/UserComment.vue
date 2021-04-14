<template>
    <div id="UserComment">
        <ScoreModal :user="user" :userData="userData" @refresh="refresh" />
        <b-container fluid>
            <TitledCard title="評分和評論歷史">
                <template #title-card-header>
                    <Badge>
                        <template #prepend>
                            用戶平均分數
                        </template>
                        <template #number>
                            {{user.avgScore}}
                        </template>
                    </Badge>
                </template>
                <div class="Tool-bar d-flex mb-3">
                    <b-button class="ml-auto" size="md" variant="outline-danger" v-b-modal="'Score-Modal'">修改平均分數
                    </b-button>
                </div>
                <ErrorCard v-if="fetchError" :errorMsg="'抱歉，可能有錯誤發生。'" :hasRetry="true" @retry="fetchOrderComment" />
                <CustomTable v-else :queryRows="1" :totalRows="3" :fields="fields" :datas="comments" :isBusy="tableBusy"
                    @dataRequire="onDataRequire">
                    <template #top-row="comments">
                        <b-td v-for="(field, index) in comments.fields" :key="index">
                            <b-form-input v-model.trim="search[field.key]" :name="field.key"
                                :placeholder="`${field.label}`" />
                        </b-td>
                    </template>
                </CustomTable>
            </TitledCard>
        </b-container>
    </div>
</template>
<script>
    import Badge from '@/components/Badge/Badge.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import ScoreModal from '@/components/Modal/User/ScoreModal.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import ErrorCard from '../../../../components/Card/ErrorCard.vue'

    export default {
        name: "UserComment",
        components: {
            Badge,
            TitledCard,
            ScoreModal,
            CustomTable,
            ErrorCard
        },
        props: {
            user: {}
        },
        data() {
            return {
                tableBusy: false,
                search: {},
                fields: [{
                        "key": "content",
                        "label": "訂單評論"
                    },
                    {
                        "key": "orderId",
                        "label": "訂單編號"
                    },
                    {
                        "key": "score",
                        "label": "得到分數"
                    },
                    {
                        "key": "fromUserId",
                        "label": "打分數的用戶"
                    },
                    {
                        "key": "updateDate",
                        "label": "評論日期"
                    }
                ],
                comments: [],
                queryRows: 0,
                fetchError: false,
                userData: this.user.data
            }
        },
        created() {
            if (!this.user.avgScore) {
                this.user.avgScore = 0;
            }
            this.fetchOrderComment();
        },
        methods: {
            onSearchClick() {},
            onSearchClearClick() {
                this.search = {}
            },
            onDataRequire() {},
            refresh() {
                this.$emit("refresh");
            },
            async fetchOrderComment() {
                this.isTableBusy = true;
                const database = tigermaster.database;
                const res = database.query("order_comment")
                    .where("order_comment.to_user_id", "=", this.user.id)
                    .orderBy("order_comment.create_date", "DESC")
                try {
                    this.fetchError = false
                    await res.get()
                    this.comments = res.data;
                    this.queryRows = res.queryRows;
                } catch (e) {
                    this.fetchError = true
                } finally {
                    this.isTableBusy = false;
                }
            }
        }
    }
</script>

<style scoped>
</style>