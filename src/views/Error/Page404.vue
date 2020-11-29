<template>
    <div id="Page404">
        <b-container class="Page404-Area">
            <h1>404</h1>
            <h2>Oops... You just found an error page...</h2>
            <h3>We are sorry but the page you have requested can not be found...</h3>
            <b-button variant="primary" @click="$router.go(-1)">Go back</b-button>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'Page404'
}
</script>

<style scoped>
#Page404{
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
  #Page404 .Page404-Area button{
    width: 30%;
  }
}
</style>