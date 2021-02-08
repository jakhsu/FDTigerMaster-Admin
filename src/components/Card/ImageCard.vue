<template>
    <b-card id="image-card" @click="onCardClicked">
        <b-skeleton-img v-if="isLoading"></b-skeleton-img>
        <div v-show="!isLoading">
            <ProtectedImage :src="src" :alt="alt" imgClass="imgClass" @imageSuccess="handleImgSuccess" />
            <span v-if="imageDetails.createBy">
                <font-awesome-icon icon="user" fixed-width />
                {{imageDetails.createBy}}
            </span>
            <div>
                <span v-if="imageDetails.pictureDesc">
                    <font-awesome-icon icon="info-circle" fixed-width />
                    {{imageDetails.pictureDesc}}
                </span>
            </div>
            <div>
                <span v-if="imageDetails.createDate">
                    <font-awesome-icon icon="calendar-alt" fixed-width />
                    {{imageDetails.createDate}}
                </span>
            </div>
        </div>
    </b-card>
</template>

<script>
    import ProtectedImage from '@/components/Image/ProtectedImage.vue';
    export default {
        name: "ImageCard",
        components: {
            ProtectedImage
        },
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
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data() {
            return {
                img: '',
                isLoading: true
            }
        },
        methods: {
            handleImgSuccess(img) {
                this.img = img;
                this.isLoading = false;
            },
            onCardClicked() {
                this.$emit("imgCardClicked", this.src, this.img);
            }
        }
    }
</script>

<style>
    #image-card {
        width: 200px;
    }

    .imgClass {
        width: 100%;
        height: auto;
    }
</style>