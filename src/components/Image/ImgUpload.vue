<template>
    <div>
        <TitledCard title="上傳圖片">
            <div>
                <b-col v-if="showsPreview" class="preview-area mb-2">
                    <div class="preview">
                        <img height="200" v-if="imagePath" :src="imagePath" alt="">
                    </div>
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
        </TitledCard>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue';
    export default {
        components: {
            TitledCard
        },
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
    .preview {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='4' stroke-dasharray='2%2c 8' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
        height: 210px;
    }
</style>