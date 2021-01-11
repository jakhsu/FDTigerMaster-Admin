<template>
    <div id="base64img">
        <b-row>
            <b-col class="col-6">
                <b-card title="圖片預覽">
                    <img height="200" :src="imagePath" alt="">
                </b-card>
            </b-col>
            <b-col class="col-6">
                <input ref="file" type="file" @change="handleImage" class="custom-input" accept="image/*"
                    style="display:none">
                <b-button class="ml-2" @click="$refs.file.click()" variant="primary">
                    上傳
                </b-button>
                <b-button @click="onFileUpload" variant="warning" class="ml-2">確定上傳</b-button>
            </b-col>
        </b-row>
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