import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user: {},
        chatroom: {
            newMsg: 0,
            ids: Array
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
        }
    },
    actions: {},
    modules: {}
})