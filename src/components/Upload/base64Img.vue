<template>
    <div id="base64img">
        <div class="container mt-10">
            <b-card>
                <img height="200" :src="image" alt="">
                <input type="file" @change="handleImage" class="custom-input" accept="image/*">
                <b-button @click="onFileUpload" variant="warning">emit給parent</b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "base64Img",
        data() {
            return {
                image: ''
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
                    this.image = e.target.result;
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