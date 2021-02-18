<template>
    <div id="CertificateDetail">
        <b-container fluid>
            <SimpleModal :isLoading="isLoading" id="Certificate-Detail-Modal" title="證照原圖" @onSaveClick="onModalSave">
                <template #modal-body>
                    <img :src="originalCert" alt="">
                </template>
                <template #modal-button>
                    <b-button variant="outline-danger" @click="onCertificateDelete">刪除</b-button>
                </template>
            </SimpleModal>
            <b-row>
                <b-col lg='6' md='12'>
                    <TitledCard title="證照列表:">
                        <div v-if="certificates.length > 0" class="row justify-content-center">
                            <ImageCard v-for="(img, index) in certificates" :key="index" :src="img.path"
                                @imgCardClicked="openImgModal" :imageDetails="img" />
                        </div>
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="上傳區:">
                        <scale-loader v-if="isUpload" />
                        <div v-else class="uploadForm">
                            <b-form>
                                <ImgUpload :key="imgUploadKey" v-bind:showsPreview="false" @FileUpload="handleUpload"
                                    class="mb-2" />
                                <b-form-group label="證照描述: ">
                                    <b-form-textarea v-model="toBeUploaded.description"></b-form-textarea>
                                </b-form-group>
                            </b-form>
                        </div>
                        <div class="downloadarea">
                            <b-button variant="success" class="mr-1" @click="upload">上傳</b-button>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import ImgUpload from '@/components/Image/ImgUpload.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import ImageCard from '@/components/Card/ImageCard.vue'

    export default {
        name: "CertificateDetail",
        components: {
            ImgUpload,
            ImageCard,
            TitledCard,
            SimpleModal,
        },
        props: {
            userData: Object,
            user: Object
        },
        data() {
            return {
                isLoading: false,
                isUpload: false,
                toBeUploaded: {
                    id: this.userData.id,
                    imageFile: {},
                    description: ''
                },
                fetchURL: [],
                certificates: [],
                detailedCert: {},
                originalCert: '',
                imgUploadKey: 0
            }
        },
        async created() {
            this.fetchCertificateURLs();
        },
        methods: {
            async fetchCertificateURLs() {
                try {
                    const res = await tigermaster.database
                        .query("user_picture")
                        .where("user_picture.user_id", "=", this.user.id)
                        .get();
                    this.certificates = res.data;
                    this.fetchURL = res.data.map(e =>
                        e.path
                    )
                } catch (e) {
                    console.log(e)
                }
            },
            handleUpload(file) {
                this.toBeUploaded.imageFile = file;
            },
            async upload() {
                this.isUpload = true;
                try {
                    await this.user.licenseUpload(this.toBeUploaded.imageFile, this.toBeUploaded.description)
                    this.toBeUploaded.description = "";
                    await this.fetchCertificateURLs();
                    this.imgUploadKey++;
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isUpload = false;
                }
            },
            openImgModal(url, originalCert) {
                this.detailedCert = this.certificates.find(e => e.path === url)
                this.originalCert = originalCert;
                this.$bvModal.show("Certificate-Detail-Modal")
            },
            onModalSave() {
                this.$bvModal.hide("Certificate-Detail-Modal")
            },
            async onCertificateDelete() {
                this.isLoading = true;
                const image = tigermaster.image;
                await image.UserImage.delete(this.detailedCert.id);
                await this.fetchCertificateURLs();
                this.$bvModal.hide("Certificate-Detail-Modal")
            }
        }
    }
</script>

<style scoped>
    #CertificateDetail {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #CertificateDetail {
        text-align: left;
    }

    #CertificateDetail ul {
        margin-bottom: 2rem;
    }

    .certtable {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .Certificate-Area {
        margin: 10px;
    }
</style>