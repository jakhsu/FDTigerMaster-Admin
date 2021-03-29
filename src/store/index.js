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
            msg: {},
            isShow: false,
            selected: ""
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        clearUser(state) {
            state.user = {};
        },
        setChatroomMsg(state, data) {
            state.chatroom.msg = data
        },
        toggleChatroom(state, boolean) {
            state.chatroom.isShow = boolean
        },
        setSelectedChatroom(state, roomId) {
            state.chatroom.selected = roomId
        }
    },
    actions: {
        async shadowQueryRoom({
            commit
        }, roomId) {
            const chatroom = await tigermaster.chatroom.get(roomId)
            const timestamp = format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
            let messages = (await chatroom.shadowQuery(timestamp)).messages
            commit('setChatroomMsg', messages)
        },
        toggleChatroom({
            commit
        }, boolean) {
            commit('toggleChatroom', boolean)
        }
    },
    modules: {}
})