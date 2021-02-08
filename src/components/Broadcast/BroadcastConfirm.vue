<template>
    <div>
        <TitledCard title="已選取的用戶">
            <CustomTable :datas="selectedUser" :fields="field">
            </CustomTable>
        </TitledCard>
        <TitledCard title="預覽">
            <PhonePreview class="m-2">
                <template #content>
                    <ul>
                        <li>
                            內容: {{msgContent.content}}
                        </li>
                        <li>
                            上傳圖檔: {{msgContent.imgPath}}
                        </li>
                    </ul>
                </template>
            </PhonePreview>
            <b-button variant="success" @click="submitBroadcast">確認送出</b-button>
        </TitledCard>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import PushMessage from 'fdtigermaster-admin-sdk/lib/src/PushMessage/PushMessage'
    import PhonePreview from '@/components/Preview/PhonePreview.vue'

    export default {
        name: 'BroadcastConfirm',
        components: {
            TitledCard,
            CustomTable,
            PhonePreview
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
            async submitBroadcast() {
                // TODO: finish this once SDK is ready
                console.log('this function will submit broadcast')
                console.log(PushMessage)
                await PushMessage.send()
                // await PushMessage.send({
                //     userId: this.selectedUser.id,
                //     title: this.msgContent.title,
                //     content: this.msgContent.content
                // })
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
    }
</style>