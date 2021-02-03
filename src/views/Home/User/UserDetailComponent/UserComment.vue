<template>
    <div id="UserComment">
        <ScoreModal :currentUser="currentUser" :user="user" @refresh="refresh" />
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
                    <!-- TODO: figure out whether this section does need search function -->
                    <!-- <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button> -->
                    <!-- <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清除搜尋</b-button> -->
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
    import Badge from '@/components/Badge/Badge.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import ScoreModal from '@/components/Modal/ScoreModal.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: "UserComment",
        components: {
            Badge,
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
                queryRows: 0
            }
        },
        created() {
            if (!this.user.avgScore) {
                this.user.avgScore = 0;
            }
            this.fetchOrderCommnet();
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
            async fetchOrderCommnet() {
                this.isTableBusy = true;
                const database = tigermaster.database;
                const res = await database.query("order_comment")
                    .where("order_comment.to_user_id", "=", this.user.id)
                    .get();
                this.comments = res.data;
                this.queryRows = res.queryRows;
                this.isTableBusy = false;
            }
        }
    }
</script>

<style scoped>
</style>