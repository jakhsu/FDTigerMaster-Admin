<template>
    <div id="img-area">
        <scale-loader v-if="isFetching" />
        <img @click="onImgClicked" :class="imgClass" :src="img" :alt="alt" height="200">
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ProtectedImage',
        props: {
            src: String,
            alt: {
                type: String,
                default: ''
            },
            imgClass: {
                type: String,
                default: 'm-2'
            }
        },
        data() {
            return {
                isFetching: true,
                img: ''
            }
        },
        async created() {
            const token = tigermaster.auth.currentUser.token;
            try {
                const response = await fetch(this.src, {
                    headers: {
                        "Authorization": token
                    }
                });
                const imgBlob = await response.blob();
                this.img = (URL.createObjectURL(imgBlob))
            } catch (e) {
                console.log(e);
            } finally {
                this.isFetching = false
            }
        },
        methods: {
            onImgClicked() {
                this.$emit("imgClicked", this.src);
            }
        }
    }
</script>