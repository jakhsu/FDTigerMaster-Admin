<template>
    <div id="img-area">
        <scale-loader v-if="isFetching" />
        <div v-else>
            <img class="m-2" v-for="(img,index) in url" :key="index" :src="img" alt="" width="200px">
        </div>
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ImgFetch',
        props: {
            user: Object,
            fetchURL: Array
        },
        data() {
            return {
                token: String,
                url: [],
                response: Object,
                isFetching: true
            }
        },
        async created() {
            const user = tigermaster.auth.currentUser;
            this.token = user.token;
            try {
                await this.fetchUserPicture();
            } catch (e) {
                console.log(e)
            } finally {
                this.isFetching = false
            }
        },
        methods: {
            async fetchUserPicture() {
                for (let i = 0; i < this.fetchURL.length; i++) {
                    let response = await fetch(this.fetchURL[i], {
                        method: 'GET',
                        headers: {
                            "Authorization": this.token
                        }
                    });
                    await response.blob().then(imgBlob => {
                        this.url.push(URL.createObjectURL(imgBlob))
                    });
                }
            }
        }
    }
</script>