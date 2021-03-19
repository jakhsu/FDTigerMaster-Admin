import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user: {},
        chatroom: {
            newMsg: 0,
            ids: [123, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 456, 789, 789, 456, 789, 456, 789, 789, 456, 789, 456, 789, 789, 456, 789, 456, 789, 789, 456, 789, 456, 789],
            chatrooms: Array,
            isShow: false
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        clearUser(state) {
            state.user = {};
        },
        setChatroomNewMsg(state, data) {
            state.chatroom.newMsg = data
        },
        setChatroomIds(state, data) {
            state.chatroom.ids = data
        },
        openChatroom(state, boolean) {
            state.chatroom.isShow = boolean
        }
    },
    actions: {},
    modules: {}
})