<template>
    <SiteWrapper>
        <router-view></router-view>
    </SiteWrapper>
</template>

<script>
import SiteWrapper from '@/components/SiteWrapper.vue'
export default {
  name: 'Home',
  components:{
    SiteWrapper
  }
}
</script>