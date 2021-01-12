<template>
    <div id="CertificateDetail">
        <b-container fluid>
            <b-row>
                <b-col lg='6' md='12'>
                    <TitledCard title="證照列表:">
                        <!-- <ImgFetch :authorization="authToken" imgURL="" /> -->
                        <div class="certtable">
                            <!-- <b-card class="m-2" title="證照1:">
                                <img src="@/assets/idcard.jpg" alt="" width="200" height="200">
                                <b-card-body>
                                    <b-list-group flush>
                                        <b-list-group-item>證照類型: 身分證</b-list-group-item>
                                        <b-list-group-item>正反面: 正面</b-list-group-item>
                                        <b-list-group-item>證照敘述: 無</b-list-group-item>
                                    </b-list-group>
                                </b-card-body>
                                <b-button variant="outline-danger">刪除</b-button>
                            </b-card> -->
                        </div>
                        <ProtectedImgFetch :user="user" />
                    </TitledCard>
                </b-col>
                <b-col>
                    <TitledCard title="上傳區:">
                        <div class="uploadForm">
                            <b-form>
                                <ImgUpload @FileUpload="handleUpload" class="mb-2" />
                                <b-form-group label-cols="3" label-cols-xl="2" label="證照描述: ">
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
    import UserImage from 'fdtigermaster-admin-sdk/lib/src/Image/UserImage'
    import ProtectedImgFetch from '@/components/Image/ProtectedImgFetch.vue'


    export default {
        name: "CertificateDetail",
        components: {
            TitledCard,
            ImgUpload,
            ProtectedImgFetch,
        },
        props: {
            user: Object
        },
        data() {
            return {
                currentUser: Object,
                userData: {},
                items: [{
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                ],
                toBeUploaded: {
                    id: this.user.id,
                    imageFile: {},
                    description: ''
                }
            }
        },
        async created() {},
        methods: {
            handleUpload(file) {
                this.toBeUploaded.imageFile = file;
            },
            async upload() {
                const image = new UserImage;
                try {
                    await image.upload(
                        this.toBeUploaded.id,
                        this.toBeUploaded.imageFile,
                        this.toBeUploaded.description
                    );
                } catch (e) {
                    console.log(e)
                }
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