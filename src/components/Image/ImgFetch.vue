<template>
    <div id="img-area">
        <scale-loader v-if="isFetching" />
        <img @click="onImgClicked(index)" :class="imgClass" v-for="(img,index) in url" :key="index" :src="img" alt=""
            width="200px">
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ImgFetch',
        props: {
            user: Object,
            fetchURL: Array,
            imgClass: {
                type: String,
                default: 'm-2'
            }
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
            const user = tigermaster.auth.currentUser || {};
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
                    if (this.fetchURL[i]) {
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
            },
            onImgClicked(index) {
                this.$emit("imgClicked", this.fetchURL[index])
            }
        }
    }
</script>