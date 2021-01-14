<template>
    <div>
        <b-col v-if="showsPreview" class="preview-area mb-2">
            <img height="200" v-if="imagePath" :src="imagePath" alt="">
        </b-col>
        <b-col class="p-0">
            <b-input-group>
                <b-form-input v-model="imageFile.name" disabled></b-form-input>
                <b-input-group-append>
                    <input ref="file" type="file" @change="handleImage" class="custom-input" accept="image/*"
                        style="display:none">
                    <b-button @click="$refs.file.click()" variant="warning">
                        選擇欲上傳圖片
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </b-col>
    </div>
</template>

<script>
    export default {
        name: "ImgUpload",
        props: {
            showsPreview: {
                type: Boolean,
                default: true
            },
            showsUploadPath: {
                type: Boolean,
                default: false,
            }
        },
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
                this.$emit("FileUpload", this.imageFile)
            },
            createBase64Image(fileObject) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePath = e.target.result;
                }
                reader.readAsDataURL(fileObject)
            }
        }

    }
</script>

<style scoped>

</style>