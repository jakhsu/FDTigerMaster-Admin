<template>
    <div>
        <scale-loader v-if="isFetching" />
        <b-card v-else id="image-card">
            <div>
                <img @click="onImgClicked" :class="imgClass" :src="img" :alt="alt" height="200">
            </div>
            <div>
                <span>
                    <font-awesome-icon icon="user" fixed-width />
                    {{imageDetails.createBy}}
                </span>
            </div>
            <div>
                <span>
                    <font-awesome-icon icon="info-circle" fixed-width />
                    {{imageDetails.pictureDesc}}
                </span>
            </div>
            <div>
                <span>
                    <font-awesome-icon icon="calendar-alt" fixed-width />
                    {{imageDetails.createDate}}
                </span>
            </div>
        </b-card>
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
            },
            imageDetails: {
                type: Object
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
                this.$emit("imgClicked", this.src, this.img);
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