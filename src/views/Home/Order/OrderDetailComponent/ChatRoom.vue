<template>
    <div>
        <SimpleModal id="chatRoom-detail" title="聊天室內容">
            <template #modal-body>
                <CustomTable :datas="data">
                </CustomTable>
                <b-form>
                    <b-form-input></b-form-input>
                    <b-button class="mt-2" variant="success">發送對話</b-button>
                </b-form>
            </template>
        </SimpleModal>
        <SimpleCard>
            <CustomTable :datas="chatRooms">
                <template #cell(id)="chatRooms">
                    <b-button @click="shadowQueryChats(chatRooms.value)">取得聊天內容</b-button>
                </template>
            </CustomTable>
        </SimpleCard>
    </div>
</template>

// orderData.client2Master
<script>
    // import {
    //     format
    // } from 'date-fns'
    import tigermaster from 'fdtigermaster-admin-sdk'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import SimpleCard from '@/components/Card/SimpleCard.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    export default {
        components: {
            CustomTable,
            SimpleCard,
            SimpleModal
        },
        name: "ChatRoom",
        props: {
            order: {
                type: Object
            }
        },
        data() {
            return {
                orderData: this.order._data,
                chatRooms: [],
                chatRoomDetail: {},
                data: [{
                    text: "hi",
                    imagePath: "some path",
                    createdDate: "some time",
                    readed: "yes",
                    varient: "yes",
                    createdBy: "someone"
                }, {
                    text: "hi",
                    imagePath: "some path",
                    createdDate: "some time",
                    readed: "yes",
                    varient: "yes",
                    createdBy: "someone"
                }, {
                    text: "hi",
                    imagePath: "some path",
                    createdDate: "some time",
                    readed: "yes",
                    varient: "yes",
                    createdBy: "someone"
                }, {
                    text: "hi",
                    imagePath: "some path",
                    createdDate: "some time",
                    readed: "yes",
                    varient: "yes",
                    createdBy: "someone"
                }, {
                    text: "hi",
                    imagePath: "some path",
                    createdDate: "some time",
                    readed: "yes",
                    varient: "yes",
                    createdBy: "someone"
                }, {
                    text: "hi",
                    imagePath: "some path",
                    createdDate: "some time",
                    readed: "yes",
                    varient: "yes",
                    createdBy: "someone"
                }, {
                    text: "hi",
                    imagePath: "some path",
                    createdDate: "some time",
                    readed: "yes",
                    varient: "yes",
                    createdBy: "someone"
                }]
            }
        },
        created() {
            this.extractChatRooms();
        },
        methods: {
            async createChatRoom() {
                await tigermaster.chatroom.created({
                    userIds: this.chatRoomUsers
                })
            },
            extractChatRooms() {
                const chatRooms = [];
                chatRooms.push(this.orderData["client2Master"])
                chatRooms.push(this.orderData["client2Admin"])
                chatRooms.push(this.orderData["master2Admin"])
                const filtered = chatRooms.filter(e =>
                    e !== undefined
                )
                const parsed = filtered.map(e => JSON.parse(e))
                this.chatRooms = parsed
            },
            async shadowQueryChats(roomId) {
                console.log(roomId)
                const chatroom = await tigermaster.chatroom.get(roomId)
                console.log(chatroom)
                // const result = await chatroom.shadowQuery(format(Date.now(), 'yyyy-MM-dd HH:mm:ss'))
                // this.chatRoomDetail = result
                this.$bvModal.show("chatRoom-detail")
            },
            sendText() {}
        }

    }
</script>

<style scoped>

</style>