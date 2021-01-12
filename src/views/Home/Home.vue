<template>
    <SiteWrapper>
        <router-view></router-view>
    </SiteWrapper>
</template>

<script>
    import SiteWrapper from '@/components/SiteWrapper.vue'
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'Home',
        components: {
            SiteWrapper
        },
        created() {
            if (tigermaster.auth.currentUser !== undefined) {
                this.$store.commit('setUser', tigermaster.auth.currentUser.data);
                tigermaster.auth.onUserAuthLost(() => {
                    this.$store.commit('setUser', undefined);
                    this.$router.push({
                        path: '/'
                    });
                });
            } else {
                this.$store.commit('setUser', undefined);
                this.$router.push({
                    path: '/'
                });
            }
        }
    }
</script>