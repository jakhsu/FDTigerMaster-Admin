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
        <SimpleModal id="Picture-Detail-Modal" title="施工照資料" @onSaveClick="onModalSave">
            <template #modal-body>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="照片描述">
                    <b-input v-model="detailedPicture.pictureDesc" disabled />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="上傳時間">
                    <b-input v-model="detailedPicture.createDate" disabled />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="上傳者">
                    <b-input v-model="detailedPicture.createBy" disabled />
                </b-form-group>
            </template>
        </SimpleModal>
        <b-container fluid>
            <div class="d-flex mt-3">
                <b-button v-b-modal="'upload-modal'" variant="success">上傳施工照片</b-button>
            </div>
            <b-row>
                <b-col>
                    <TitledCard title="施工前照片">
                        <ProtectedImage v-for="(img, index) in stage1Paths" :src="img" :key="index"
                            @imgClicked="openImgModal" />
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="施工中照片">
                        <ProtectedImage v-for="(img, index) in stage2Paths" :src="img" :key="index"
                            @imgClicked="openImgModal" />
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="完工照片">
                        <ProtectedImage v-for="(img, index) in stage3Paths" :src="img" :key="index"
                            @imgClicked="openImgModal" />
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
    import ProtectedImage from '@/components/Image/ProtectedImage.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        components: {
            ImgUpload,
            TitledCard,
            SimpleModal,
            ProtectedImage
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
            openImgModal(url) {
                this.detailedPicture = this.pictures.find(e => e.path === url)
                this.$bvModal.show("Picture-Detail-Modal")
            },
            onModalSave() {
                this.$bvModal.hide("Picture-Detail-Modal")
            }
        },
        computed: {
            stage1Paths() {
                return this.pictures.filter(e => e.stage === 1).map(e => e.path);
            },
            stage2Paths() {
                return this.pictures.filter(e => e.stage === 2).map(e => e.path);
            },
            stage3Paths() {
                return this.pictures.filter(e => e.stage === 3).map(e => e.path);
            }
        }
    }
</script>