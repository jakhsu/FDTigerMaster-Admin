<template>
    <div>
        <TitledCard :title="title">
            <scale-loader v-if="isLoading" />
            <div v-else>
                <img :src="URL" alt="">
            </div>
        </TitledCard>
    </div>
</template>

<script>
    import TitledCard from '../Card/TitledCard.vue'
    export default {
        name: 'ImgFetch',
        props: {
            title: {
                type: String,
                default: '目前的照片'
            },
            imgURL: {
                type: String
            }
        },
        components: {
            TitledCard
        },
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
                    await fetch(this.imgURL)
                        .then(res => {
                            console.log(res)
                        })
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

</style>