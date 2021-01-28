<template>
    <div>
        <img :class="imgClass" :src="img" :alt="alt" height="200">
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
                this.img = (URL.createObjectURL(imgBlob));
                this.$emit("imageSuccess", this.img);
            } catch (e) {
                this.img = '';
            }
        }
    }
</script>

<style scoped>
    #image-card {
        display: flex;
        flex-direction: column;
        margin: 10px 0px;
        color: #172b4d;
        background-color: rgb(255, 255, 255);
        text-align: left;
        border-radius: 5px;

    }

    #image-card:hover {
        background-color: #f0f0f0;
    }
</style>