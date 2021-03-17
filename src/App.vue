<template>
  <div id="app">
    <Loading v-if="isLoading" />
    <router-view v-else />
  </div>
</template>

<script>
  import Loading from '@/components/Loading'
  import tigermaster from 'fdtigermaster-admin-sdk'
  import store from './store'

  export default {
    name: "App",
    components: {
      Loading
    },
    data() {
      return {
        isLoading: true
      }
    },
    async created() {
      await tigermaster.initializeApp({
        stage: process.env.VUE_APP_STAGE
      });
      this.fetctAdminChatroomId()
      this.isLoading = false;
    },
    methods: {
      async fetctAdminChatroomId() {
        let query = tigermaster.database.query("chatroom").where("chatroom.user_ids", "LIKE",
          `%${2020123000004}%`)
        try {
          let res = await query.get()
          const ids = res.data.map(e => e.id)
          store.commit('setChatroomIds', ids)
        } catch (e) {
          console.log(e)
        }
      },
      async pollChatroomMsg() {
        // TODO: poll approciate msg using chatroom id, maybe use 'setInterval' to achieve polling?
        const ids = store.state.chatroom.ids;
        console.log(ids)
        let query = tigermaster.database.query("chatroom").where("chatroom.user_ids", "LIKE",
          `%${2020123000004}%`)
        try {
          let res = await query.get()
          console.log(res.data.map(e => e.id))
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: Arial, Microsoft JhengHei, Avenir, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100vh;
    background-color: #ebebeb;
    color: #000;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .no-padding>[class*=col-] {
    padding: 0px;
  }
</style>