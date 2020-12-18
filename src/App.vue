<template>
  <div id="app">
    <Loading v-if="isLoading" />
    <router-view v-else />
  </div>
</template>

<script>
  import Loading from '@/components/Loading';
  import tigermaster from 'fdtigermaster-sdk';
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
        stage: "local"
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