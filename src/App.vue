<template>
  <div id="app">
    <Loading v-if="isLoading" />
    <router-view v-else />
    <Chatroom v-if="$store.state.chatroom.isShow" />

  </div>
</template>

<script>
  import Loading from '@/components/Loading'
  import tigermaster from 'fdtigermaster-admin-sdk'
  import Chatroom from '@/components/Chatroom/Chatroom.vue'


  export default {
    name: "App",
    components: {
      Loading,
      Chatroom

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
      this.isLoading = false;
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
    position: relative;
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