<template>
    <SiteWrapper>
        <router-view></router-view>
    </SiteWrapper>
</template>

<script>
    import SiteWrapper from '@/components/SiteWrapper.vue'
    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'Home',
        components:{
            SiteWrapper
        },
        created(){
            this.$store.commit('setUser', tigermaster.auth.currentUser.data);
            tigermaster.auth.onUserAuthLost(()=>{
                this.$store.commit('setUser', undefined);
                this.$router.push({path: '/'});
            });
        }
    }
</script>