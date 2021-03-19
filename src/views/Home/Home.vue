<template>
    <SiteWrapper>
        <router-view></router-view>
    </SiteWrapper>
</template>

<script>
    import SiteWrapper from '@/components/SiteWrapper.vue'
    import {
        messaging
    } from '@/utility/Firebase'
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'Home',
        components: {
            SiteWrapper
        },
        async created() {
            if (tigermaster.auth.currentUser !== undefined) {
                this.$store.commit('setUser', tigermaster.auth.currentUser.data);
                tigermaster.auth.onUserAuthLost(async () => {
                    this.isLoading = true;
                    this.$store.commit('clearUser');
                    this.$router.push({
                        path: '/'
                    });
                });
            } else {
                this.$store.commit('clearUser');
                this.$router.push({
                    path: '/'
                });
            }
            await this.setupMessageing();
            this.isLoading = false;
        },
        methods: {
            async setupMessageing() {
                await messaging.requestPermission();
                messaging.onMessage((payload) => {
                    const {
                        title,
                        ...options
                    } = payload.notification;
                    console.log(title);
                    console.log(options);
                    navigator.serviceWorker.getRegistrations().then(registration => {
                        registration[0].showNotification(title, options);
                    });
                });
            }
        }
    }
</script>