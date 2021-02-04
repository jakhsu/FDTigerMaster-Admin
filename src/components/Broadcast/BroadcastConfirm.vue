<template>
    <div>
        <TitledCard title="已選取的用戶">
            <CustomTable :datas="selectedUser" :fields="field">
            </CustomTable>
        </TitledCard>
        <b-card header="推播訊息" :title="msgContent.title">
            <b-card-body>
                <ul>
                    <li>
                        內容: {{msgContent.content}}
                    </li>
                    <li>
                        上傳圖檔: {{msgContent.imgPath}}
                    </li>
                </ul>
            </b-card-body>
            <b-button variant="success" @click="submitBroadcast">確認送出</b-button>
        </b-card>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '../Table/CustomTable.vue'
    export default {
        name: 'BroadcastConfirm',
        components: {
            TitledCard,
            CustomTable

        },
        props: {
            selectedUser: {
                type: Array
            },
            msgContent: {
                type: Object
            }
        },
        data() {
            return {
                field: [{
                        "key": "name",
                        "label": "姓名"
                    },
                    {
                        "key": "email",
                        "label": "郵件"
                    },
                    {
                        "key": "addressCity",
                        "label": "城市"
                    },
                    {
                        "key": "status",
                        "label": "狀態"
                    },
                    {
                        "key": "roleId",
                        "label": "角色"
                    }
                ]
            }
        },
        methods: {
            submitBroadcast() {
                // TODO: finish this once SDK is ready
                console.log('this function will submit broadcast')
            }
        }
    }
</script>