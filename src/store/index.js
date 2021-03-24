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
            adminRooms: [],
            adminRoomContent: {},
            isShow: false,
            currentId: ""
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        clearUser(state) {
            state.user = {};
        },
        setadminRooms(state, data) {
            state.chatroom.adminRooms = data
        },
        setAdminRoom(state, data) {
            state.chatroom.adminRoomContent = data
        },
        toggleChatroom(state, boolean) {
            state.chatroom.isShow = boolean
        },
        setCurrentChatroom(state, data) {
            state.chatroom.currentId = data
        }
    },
    actions: {
        async shadowQueryAdminRoom({
            commit
        }, roomId) {
            const chatroom = await tigermaster.chatroom.get(roomId)
            const timestamp = format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
            const res = await chatroom.shadowQuery(timestamp)
            commit('setAdminRoom', {
                res,
                roomId
            })
        },
        showChatroom({
            commit
        }) {
            commit('toggleChatroom', true)
        },
        closeChatroom({
            commit
        }) {
            commit('toggleChatroom', false)
        }
    },
    modules: {}
})