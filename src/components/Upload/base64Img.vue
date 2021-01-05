<template>
    <div id="base64img">
        <div class="container mt-10">
            <b-card title="圖片預覽">
                <img height="200" :src="image.path" alt="">
            </b-card>
            <input type="file" @change="handleImage" class="custom-input" accept="image/*">
            <b-button @click="onFileUpload" variant="warning">確定上傳</b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Base64Img",
        data() {
            return {
                image: {
                    path: '',
                }
            }
        },
        methods: {
            handleImage(e) {
                const selectedImage = e.target.files[0];
                this.createBase64Image(selectedImage);
            },
            createBase64Image(fileObject) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image.path = e.target.result;
                }
                reader.readAsDataURL(fileObject)
            },
            onFileUpload() {
                this.$emit("FileUpload", this.image)
            }
        }

    }
</script>

<style scoped>

</style>