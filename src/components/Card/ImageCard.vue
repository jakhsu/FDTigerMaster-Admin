<template>
    <b-card id="image-card" @click="onCardClicked">
        <ProtectedImage :src="src" :alt="alt" imgClass="imgClass" @imageSuccess="handleImgSuccess" />
        <span>
            <font-awesome-icon icon="user" fixed-width />
            {{imageDetails.createBy}}
        </span>
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
                type: Object
            }
        },
        data() {
            return {
                img: ''
            }
        },
        methods: {
            handleImgSuccess(img) {
                this.img = img;
            },
            onCardClicked() {
                this.$emit("imgCardClicked", this.src, this.img);
            }
        }
    }
</script>