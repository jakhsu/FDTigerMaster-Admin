<template>
    <div id="CertificateDetail">
        <b-container fluid>
            <SimpleModal :isLoading="isLoading" id="Certificate-Detail-Modal" title="證照細節" @onSaveClick="onModalSave">
                <template #modal-body>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="證照敘述">
                        <b-input v-model="detailedCert.pictureDesc" disabled />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="上傳時間">
                        <b-input v-model="detailedCert.createDate" disabled />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="上傳者">
                        <b-input v-model="detailedCert.createBy" disabled />
                    </b-form-group>
                </template>
                <template #modal-button>
                    <b-button variant="outline-danger" @click="onCertificateDelete">刪除</b-button>
                </template>
            </SimpleModal>
            <b-row>
                <b-col lg='6' md='12'>
                    <TitledCard title="證照列表:">
                        <div class="row justify-content-center">
                            <div v-if="fetchURL.length > 0">
                                <ProtectedImage v-for="(img, index) in fetchURL" :key="index" :src="img"
                                    @imgClicked="openImgModal" />
                            </div>
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
    import ProtectedImage from '@/components/Image/ProtectedImage.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: "CertificateDetail",
        components: {
            ImgUpload,
            TitledCard,
            SimpleModal,
            ProtectedImage
        },
        props: {
            user: Object
        },
        data() {
            return {
                currentUser: Object,
                isLoading: false,
                isUpload: false,
                userData: {},
                toBeUploaded: {
                    id: this.user.id,
                    imageFile: {},
                    description: ''
                },
                fetchURL: [],
                certificates: [],
                detailedCert: {},
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
                const userImage = tigermaster.image.UserImage;
                try {
                    await userImage.upload(
                        this.toBeUploaded.id,
                        this.toBeUploaded.imageFile,
                        this.toBeUploaded.description
                    );
                    this.toBeUploaded.description = "";
                    await this.fetchCertificateURLs();
                    this.imgUploadKey++;
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isUpload = false;
                }
            },
            openImgModal(url) {
                this.detailedCert = this.certificates.find(e => e.path === url)
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