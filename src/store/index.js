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
        // global chatroom information
        chatroom: {
            msg: {},
            isShow: false,
            selected: {}
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
            // need to add five seconds ( arbitrary time ) to the timestamp when querying messages
            // because it takes some time ( < 1 sec ) for the backend system to add
            // new messages. If not, query might not return latest messages even if they do exist 
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
    }
})