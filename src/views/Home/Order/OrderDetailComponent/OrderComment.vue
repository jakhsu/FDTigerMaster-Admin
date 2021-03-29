<template>
    <div>
        <UpdateCommentModal :commentId="selectedCommentId" :initCommentContent="selectedCommentContent"
            @finish="fetchOrderComment" />
        <TitledCard title="訂單評論">
            <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="comments" :isBusy="tableBusy"
                @rowClick="onRowClick">
            </CustomTable>
        </TitledCard>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import UpdateCommentModal from '@/components/Modal/UpdateCommentModal.vue'
    export default {
        name: "OrderComment",
        components: {
            TitledCard,
            CustomTable,
            UpdateCommentModal
        },
        props: {
            order: {}
        },
        data() {
            return {
                tableBusy: false,
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
                        "key": "toUserId",
                        "label": "被打分數的用戶"
                    },
                    {
                        "key": "updateDate",
                        "label": "評論日期"
                    }
                ],
                comments: [],
                queryRows: 0,
                search: {},
                selectedCommentId: 0,
                selectedCommentContent: ""
            }
        },
        created() {
            this.fetchOrderComment();
        },
        methods: {
            onRowClick(item) {
                this.selectedCommentId = item.id;
                this.selectedCommentContent = item.content;
                this.$bvModal.show("Comment-Modify-Modal");
            },
            async fetchOrderComment() {
                this.tableBusy = true;
                try {
                    const res = await tigermaster.database.query("order_comment")
                        .where("order_comment.order_id", "=", this.order._orderId)
                        .get();
                    this.comments = res.data;
                    this.queryRows = res.queryRows;
                } catch (e) {
                    this.comments = [];
                } finally {
                    this.tableBusy = false;
                }
            }
        }
    }
</script>