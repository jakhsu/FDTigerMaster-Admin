<template>
    <div id="Dashboard">
        <Loading/>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
export default {
    name: 'Dashboard',
    components:{
        Loading
    }
}
</script>

<style scoped>
#DashBoard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>