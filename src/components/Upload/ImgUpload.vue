<template>
    <div id="base64img">
        <div class="container mt-10">
            <b-card title="圖片預覽">
                <img height="200" :src="imagePath" alt="">
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
                imageFile: {},
                imagePath: ''
            }
        },
        methods: {
            handleImage(e) {
                const imageFile = e.target.files[0];
                this.imageFile = imageFile;
                this.createBase64Image(imageFile);
            },
            createBase64Image(fileObject) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePath = e.target.result;
                }
                reader.readAsDataURL(fileObject)
            },
            onFileUpload() {
                this.$emit("FileUpload", this.imageFile)

            }
        }

    }
</script>

<style scoped>

</style>