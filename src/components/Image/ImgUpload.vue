<template>
    <div id="base64img">
        <b-card no-body>
            <b-row no-gutters>
                <b-col class="preview-area ">
                    <img height="200" width="200" v-if="imageFile" :src="imagePath" alt="">
                </b-col>
                <b-col>
                    <input ref="file" type="file" @change="handleImage" class="custom-input" accept="image/*"
                        style="display:none">
                    <b-button class="ml-2" @click="$refs.file.click()" variant="primary">
                        選擇檔案
                    </b-button>
                    <b-button @click="onFileUpload" variant="warning" class="ml-2">確定上傳</b-button>
                </b-col>
            </b-row>
        </b-card>
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
    .preview-area {
        width: 200px;
        height: 200px;
        background-color: rgb(199, 199, 199);
    }
</style>