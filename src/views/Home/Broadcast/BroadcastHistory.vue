<template>
    <div>
        <b-container fluid>
            <TitledCard title="推播歷史">
                <CustomTable :datas="msg" :isBusy="isLoading" :fields="fields">
                </CustomTable>
            </TitledCard>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import tigermaster from 'fdtigermaster-admin-sdk'
    export default {
        components: {
            TitledCard,
            CustomTable
        },
        name: 'BroadcastHistory',
        props: {},
        data() {
            return {
                msg: [],
                queryRows: 0,
                isLoading: false,
                fields: [{
                    "label": "推播標題",
                    "key": "title"
                }, {
                    "label": "推播內容",
                    "key": "content"
                }, {
                    "label": "圖片連結",
                    "key": "picPath"
                }, {
                    "label": "推送者",
                    "key": "createBy"
                }, {
                    "label": "推送目標",
                    "key": "targets"
                }, {
                    "label": "click action",
                    "key": "clickAction"
                }, {
                    "label": "送出日期",
                    "key": "createDate"
                }]
            }
        },
        created() {
            this.fetchBroadcastHistory();
        },
        methods: {
            async fetchBroadcastHistory() {
                this.isLoading = true;
                const database = tigermaster.database;
                const query = database.query("push_notify_history")
                    .orderBy("push_notify_history.create_date", "DESC")
                try {
                    const res = await query.get()
                    this.msg = res.data;
                    this.queryRows = res.queryRows;
                } catch (e) {
                    this.msg = [];
                    this.queryRows = 0;
                } finally {
                    this.isLoading = false;
                }

            }
        }
    }
</script>