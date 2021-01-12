<template>
    <div class="card">
        <b-card no-body bg-variant="light">
            <scale-loader v-if="isLoading" />
            <div v-else>
                <img :src="URL" alt="">
            </div>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: 'ImgFetch',
        props: {
            title: {
                type: String,
                default: '目前的照片'
            },
            imgURL: {
                type: String
            },
            authorization: {
                type: String
            }
        },
        components: {},
        data() {
            return {
                URL: '',
                isLoading: null
            }
        },
        created() {
            this.fetchImgFromURL();
        },
        methods: {
            async fetchImgFromURL() {
                this.isLoading = true;
                try {
                    await fetch(this.imgURL, {
                            headers: {
                                'Authorization': this.authorization || ""
                            }
                        })
                        .then(res => {
                            this.URL = res.url
                        });
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isLoading = false;
                }
            }
        }
    }
</script>

<style scoped>
    .card {
        width: 200px;
        height: 200px;
        border-width: 0;
    }
</style>