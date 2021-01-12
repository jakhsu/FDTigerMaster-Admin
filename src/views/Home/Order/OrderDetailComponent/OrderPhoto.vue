<template>
    <div>
        <TitledCard title="施工照片">
            <SimpleModal id="upload-modal" title="上傳施工照">
                <template #modal-body>
                    <b-row>
                        <b-col>
                            <img height="200" width="200" v-if="imageFile" :src="imagePath" alt="">
                        </b-col>
                        <b-col>
                            <input ref="file" type="file" @change="handleImage" class="custom-input" accept="image/*"
                                style="display:none">
                            <b-button class="ml-2" @click="$refs.file.click()" variant="primary">
                                選擇檔案
                            </b-button>
                        </b-col>
                    </b-row>
                </template>
            </SimpleModal>
            <div>
                <b-button v-b-modal="'upload-modal'" variant="success">上傳施工照片</b-button>
            </div>
            <div>

            </div>
        </TitledCard>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import OrderImage from 'fdtigermaster-admin-sdk/lib/src/Image/OrderImage'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    export default {
        components: {
            TitledCard,
            SimpleModal
        },
        name: 'OrderPhoto',
        props: {

        },
        data() {
            return {
                photo: Object,
                imageFile: {},
                imagePath: ''
            }
        },
        created() {
            console.log(this.photo instanceof OrderImage)
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
        }
    }
</script>