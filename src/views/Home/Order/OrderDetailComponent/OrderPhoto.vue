<template>
    <div>
        <SimpleModal :isLoading="isLoading" id="upload-modal" title="上傳施工照" @onSaveClick="uploadImg">
            <template #modal-body>
                <ImgUpload @FileUpload="handleUpload" />
                <b-form-group label="照片描述">
                    <b-form-input v-model="imageDescrption">
                    </b-form-input>
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
                        <ImgFetch :fetchURL="fetchURL" v-if="fetchURL.length > 0" />
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="施工中照片">
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="完工照片">
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import ImgUpload from '@/components/Image/ImgUpload.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import ImgFetch from '@/components/Image/ImgFetch.vue'
    export default {
        components: {
            TitledCard,
            SimpleModal,
            ImgUpload,
            ImgFetch
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
                isLoading: false,
                pictures: []
            }
        },
        async created() {
            let query = tigermaster.database.query("order_picture");
            query.where("order_picture.order_id", "=", this.order.id);
            try {
                const res = await query.get();
                this.pictures = res.data;
            } catch (e) {
                console.log(e)
            }
        },
        methods: {
            async uploadImg() {
                if (this.imageFile.name) {
                    this.isLoading = true;
                    const orderImg = tigermaster.image.OrderImage;
                    try {
                        await orderImg.upload(this.order.id, this.imageFile, this.imageDescrption)
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
            }
        },
        computed: {
            fetchURL() {
                return this.pictures.map(e => e.path);
            }
        }
    }
</script>