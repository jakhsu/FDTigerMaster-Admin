import Vue from 'vue'
import Vuex from 'vuex'
import tigermaster from 'fdtigermaster-admin-sdk'
import {
    format,
    add
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
        setToggleChatroom(state, boolean) {
            state.chatroom.isShow = boolean
        },
        setSelectedChatroom(state, data) {
            state.chatroom.selected = data
        }
    },
    actions: {
        async shadowQueryRoom({
            commit
        }, roomId) {
            const chatroom = await tigermaster.chatroom.get(roomId)
            let FiveSecsFromNow = add(Date.now(), {
                seconds: 5
            })
            const timestamp = format(FiveSecsFromNow, 'yyyy-MM-dd HH:mm:ss')
            let messages = (await chatroom.shadowQuery(timestamp)).messages
            commit('setChatroomMsg', messages)
        },
        toggleChatroom({
            commit
        }, boolean) {
            commit('setToggleChatroom', boolean)
        },
        async selectRoom({
            commit
        }, roomId) {
            const chatroom = await tigermaster.chatroom.get(roomId)
            commit("setSelectedChatroom", chatroom)
        }
    },
    modules: {}
})