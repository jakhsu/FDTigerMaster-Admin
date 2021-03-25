import Vue from 'vue'
import Vuex from 'vuex'
import tigermaster from 'fdtigermaster-admin-sdk'
import {
    format
} from 'date-fns'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user: {},
        chatroom: {
            chatRooms: [],
            roomContent: {},
            isShow: false,
            selectedRoom: ""
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        clearUser(state) {
            state.user = {};
        },
        setChatRooms(state, data) {
            state.chatroom.chatRooms = data
        },
        setRoomContent(state, data) {
            state.chatroom.roomContent = data
        },
        toggleChatroom(state, boolean) {
            state.chatroom.isShow = boolean
        },
        setCurrentChatroom(state, roomId) {
            state.chatroom.selectedRoom = roomId
        }
    },
    actions: {
        async shadowQueryRoom({
            commit,
            dispatch
        }, roomId) {
            await dispatch('fetchAdminChatrooms')
            const chatroom = await tigermaster.chatroom.get(roomId)
            commit('setCurrentChatroom', roomId)
            const timestamp = format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
            let messages = (await chatroom.shadowQuery(timestamp)).messages
            commit('setRoomContent', {
                messages
            })
        },
        toggleChatroom({
            commit
        }, boolean) {
            commit('toggleChatroom', boolean)
        },
        async fetchAdminChatrooms({
            commit,
            state
        }) {
            // fetch all chatroom object where its user_ids field contains the current user's id, implying
            // the current user is involved in that room
            let query = tigermaster.database.query("chatroom").where("chatroom.user_ids", "LIKE",
                `%${state.user.id}%`)
            const res = await query.get()
            const rooms = res.data
            // filter the 'userIds' entries to find the user ids that are not the current user id, then we'll
            // get all the ids of target users
            const targetUserIds = rooms.map(room => JSON.parse(room['userIds'])).map(names => names.filter(name =>
                name !== state.user.id)).map(arrayOfOneName => arrayOfOneName[0])

            let targetUsers = await tigermaster.database.query('user').where('user.id', 'IN', targetUserIds).get()
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
            // commit the modified room data
            commit('setChatRooms', rooms)
        },
        async fetchUnreadCount({
            commit,
            state,
            dispatch
        }) {
            await dispatch('fetchAdminChatrooms')
            const rooms = state.chatroom.chatRooms;
            // shadow query all chatrooms for unread message count
            const unreadCounts = []
            rooms.forEach(async (e) => {
                let chatroom = await tigermaster.chatroom.get(e.id)
                let res = await chatroom.shadowQuery(format(Date.now(), 'yyyy-MM-dd HH:mm:ss'))
                const count = res.messages.filter(e => e['readed'] === 0).length
                unreadCounts.push({
                    id: e.id,
                    count: count
                })

                rooms.forEach(room => {
                    unreadCounts.forEach(e => {
                        if (room.id === e.id) {
                            room['unreadCount'] = e.count
                        }
                    })
                })

            })
            commit('setChatRooms', rooms)
        }
    },
    modules: {}
})