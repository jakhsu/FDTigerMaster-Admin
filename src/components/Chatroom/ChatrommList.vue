<template>
    <div>
        <div class="content">
            <div v-for="(room, index) in chatroomList" :key="index">
                <div class="roomBrief m-2" @click="onRoomClick(room.id)">
                    {{room.targetUserName}}
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
                chatroomList: [{
                    unread: 0
                }],
                hasUnread: false
            };
        },
        created() {
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
                // filter the 'userIds' entries to find the user ids that are not the current user id, then we'll
                // get all the ids of target users
                const targetUserIds = rooms.map(room => JSON.parse(room['userIds'])).map(names => names
                    .filter(
                        name =>
                        name !== this.currentUserId)).map(e => e[0])

                let targetUsers = await tigermaster.database.query('user').where('user.id', 'IN',
                        targetUserIds)
                    .get()
                let targetUserInfo = []

                targetUsers.data.forEach(e => {
                    targetUserInfo.push({
                        targetUserName: e.name,
                        targetUserId: e.id
                    })
                })
                // here create new entries in chatroom object, if target user id exists in that particular room
                rooms.forEach(room => {
                    targetUserInfo.forEach(e => {
                        if (JSON.parse(room.userIds).includes(e.targetUserId)) {
                            room['targetUserName'] = e.targetUserName
                        }
                    })
                })
                this.chatroomList = rooms
                return new Promise((resolve) => {
                    if (this.chatroomList.every(e => e.targetUserName !== undefined)) {
                        resolve()
                    }
                })
            },
            fetchUnreadCounts() {
                // shadow query all chatrooms for unread message count
                this.hasUnread = false
                return new Promise((resolve) => {
                    this.chatroomList.forEach(async (e) => {
                        let chatroom = await tigermaster.chatroom.get(e.id)
                        let res = await chatroom.shadowQuery(format(Date.now(),
                            'yyyy-MM-dd HH:mm:ss'))
                        const count = res.messages.filter(e => e['readed'] === 0).length
                        Object.assign(e, {
                            unread: count
                        })
                        if (this.chatroomList.every(e => e.unread !== undefined)) {
                            resolve()
                            this.hasUnread = true
                        }
                    })
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