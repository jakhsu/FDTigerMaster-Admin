<template>
  <div id="Page404">
    <b-container class="Page404-Area">
      <img id="404-img" src="@/assets/404.png" style="width: 500px" />
      <h2>唉呀...找不到你要的頁面</h2>
      <h3>請回報給工程師團隊</h3>
      <b-button variant="warning" @click="goBack">回前一頁</b-button>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'Page404',
    methods: {
      goBack() {
        if (window.history.length === 1) {
          this.$router.push("/home")
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style scoped>
  #Page404 {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #34558b;
  }

  #Page404 .Page404-Area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    padding: 40px 55px 45px 55px;
    text-align: center;
  }

  #Page404 .Page404-Area h1 {
    font-size: 72pt;
    color: #fff;
  }

  #Page404 .Page404-Area h2 {
    color: #f1f2f4;
  }

  #Page404 .Page404-Area h3 {
    font-size: 16pt;
    color: #fff;
  }

  #Page404 .Page404-Area button {
    margin: 20px 0px;
    width: 10%;
  }

  @media (max-width: 768px) {
    #Page404 .Page404-Area button {
      width: 30%;
    }
  }
</style>