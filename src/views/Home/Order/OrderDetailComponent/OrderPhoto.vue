<template>
    <div>
        <SimpleModal :isLoading="isLoading" id="upload-modal" title="上傳施工照" @onSaveClick="uploadImg">
            <template #modal-body>
                <ImgUpload @FileUpload="handleUpload" />
                <b-form-group label="照片描述">
                    <b-form-textarea v-model="imageDescrption" />
                </b-form-group>
                <b-form-group label="施工進度">
                    <b-select :options="OrderPicStage" v-model="imageStage" />
                </b-form-group>
            </template>
        </SimpleModal>
        <b-container fluid>
            <div class="d-flex mt-3">
                <b-button v-b-modal="'upload-modal'" variant="success">上傳施工照片</b-button>
            </div>
            <b-row>
                <b-col>
                    <TitledCard title="客戶上傳照片">
                        <ImageCard v-for="(img, index) in stage1Pics" :src="img.path" :key="index"
                            @imgCardClicked="openImgModal" :imageDetails="img" />
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="施工前照片">
                        <ImageCard v-for="(img, index) in stage2Pics" :src="img.path" :key="index"
                            @imgCardClicked="openImgModal" :imageDetails="img" />
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="施工後照片">
                        <ImageCard v-for="(img, index) in stage3Pics" :src="img.path" :key="index"
                            @imgCardClicked="openImgModal" :imageDetails="img" />
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import OrderPicStage from '@/config/OrderPicStage.json'
    import ImgUpload from '@/components/Image/ImgUpload.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import ImageCard from '@/components/Card/ImageCard.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        components: {
            ImgUpload,
            ImageCard,
            TitledCard,
            SimpleModal
        },
        name: 'OrderPhoto',
        props: {
            order: {
                type: Object
            }
        },
        data() {
            return {
                photo: Object,
                imageFile: {},
                imageDescrption: '',
                imageStage: Number,
                isLoading: false,
                OrderPicStage,
                detailedPicture: {},
                pictures: [],
                originalPic: ""
            }
        },
        async created() {
            this.fetchOrderPicture();
        },
        methods: {
            async fetchOrderPicture() {
                try {
                    const res = await tigermaster.database
                        .query("order_picture")
                        .where("order_picture.order_id", "=", this.order.id)
                        .get();
                    this.pictures = res.data;
                } catch (e) {
                    console.log(e)
                }
            },
            async uploadImg() {
                if (this.imageFile.name) {
                    this.isLoading = true;
                    const image = tigermaster.image;
                    try {
                        await image.OrderImage.upload(this.order.id, this.imageFile, this.imageStage, this
                            .imageDescrption)
                        this.fetchOrderPicture();
                    } catch (e) {
                        console.log(e)
                    } finally {
                        this.$bvModal.hide('upload-modal');
                        this.isLoading = false;
                    }
                } else {
                    console.log("image file is empty")
                }
            },
            handleUpload(file) {
                this.imageFile = file;
            },
            openImgModal(url, originalPic) {
                this.detailedPicture = this.pictures.find(e => e.path === url)
                this.originalPic = originalPic;
                // this.$bvModal.show("Picture-Detail-Modal")
                window.open(originalPic)
            },
            onModalSave() {
                this.$bvModal.hide("Picture-Detail-Modal")
            }
        },
        computed: {
            stage1Pics() {
                return this.pictures.filter(e => e.stage === 1);
            },
            stage2Pics() {
                return this.pictures.filter(e => e.stage === 2);
            },
            stage3Pics() {
                return this.pictures.filter(e => e.stage === 3);
            }
        }
    }
</script>