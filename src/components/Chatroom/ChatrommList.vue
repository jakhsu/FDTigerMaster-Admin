<template>
    <div>
        <div class="content">
            <div v-for="(room, index) in chatroomList" :key="index">
                <div v-if="isChatroomListReady" class="roomBrief m-2" @click="onRoomClick(room.id)">
                    {{room.targetUserInfo.name}}
                    <b-badge v-if="hasUnread" variant="warning">
                        {{room.unread}}
                        未讀
                    </b-badge>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'
    import store from '@/store'
    import {
        format
    } from 'date-fns'

    export default {
        name: "ChatroomList",
        components: {},
        data() {
            return {
                loading: false,
                currentUserId: store.state.user.id,
                currentUserRole: store.state.user.roleId,
                currentUserName: store.state.user.name,
                targetUserInfo: [],
                chatroomList: [{
                    unread: 0
                }],
                hasUnread: false,
                isChatroomListReady: false
            };
        },
        async created() {
            this.longPoll()
        },
        methods: {
            async longPoll() {
                // poll every minute
                await this.fetchadminRooms()
                await this.fetchUnreadCounts()
                setTimeout(this.longPoll, 60000)
            },
            async fetchadminRooms() {
                const query = tigermaster.database.query("chatroom").where("chatroom.user_ids", "LIKE",
                    `%${this.currentUserId}%`)
                const res = await query.get()
                const rooms = res.data

                const targetUserIds = rooms.map(e => e.userIds.filter(id => id !== this.currentUserId)[0])
                const targetUserNames = rooms.map(e => e.userNames.filter(id => id !== this.currentUserName)[0])
                for (let i = 0; i < targetUserIds.length; i++) {
                    rooms[i]['targetUserInfo'] = {
                        id: targetUserIds[i],
                        name: targetUserNames[i]
                    }
                }
                this.chatroomList = rooms
                this.isChatroomListReady = true
            },
            fetchUnreadCounts() {
                this.hasUnread = false
                this.chatroomList.forEach(async (e) => {
                    let chatroom = await tigermaster.chatroom.get(e.id)
                    let res = await chatroom.shadowQuery(format(Date.now(),
                        'yyyy-MM-dd HH:mm:ss'))
                    const count = res.messages.filter(e => e['readed'] === 0).length
                    Object.assign(e, {
                        unread: count
                    })
                    if (this.chatroomList.every(e => e.unread !== undefined)) {
                        this.hasUnread = true
                    }
                })
            },
            async shadowQueryRoomMsg(roomId) {
                const chatroom = await tigermaster.chatroom.get(roomId)
                store.commit('setSelectedChatroom', roomId)
                const timestamp = format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
                const messages = (await chatroom.shadowQuery(timestamp)).messages
                store.commit('setChatroomMsg', messages)
            },
            async onRoomClick(roomId) {
                await this.shadowQueryRoomMsg(roomId)
                await store.dispatch('selectRoom', roomId)
                store.dispatch('toggleChatroom', true)
            }
        }
    }
</script>

<style scoped>
    .content {
        max-height: 200px;
        width: 200px;
        overflow: scroll;
    }

    .roomBrief {
        cursor: pointer;
    }

    .roomBrief:hover {
        background: rgb(180, 180, 180);
    }
</style>