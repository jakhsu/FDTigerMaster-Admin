<template>
    <div>
        <img v-if="isImgReady" width="200" height="200" :src="url" alt="">
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ProtectedImgFetch',
        props: {
            user: Object
        },
        data() {
            return {
                authToken: String,
                url: String,
                response: Object,
                isImgReady: false
            }
        },
        async created() {
            const user = tigermaster.auth.currentUser;
            this.authToken = user.token;

            const res = await tigermaster.database
                .query("user_picture")
                .get();
            this.url = res.data[0].path
            console.log("the url i'm requesting for image: ", this.url)
            let response = await fetch(this.url, {
                method: 'GET',
                headers: {
                    "Authorization": this.authToken
                }
            });
            console.log(response)
            response.blob().then(myBlob => {
                console.log(myBlob)
                this.url = URL.createObjectURL(myBlob)
            });
            this.isImgReady = true;
        },
        methods: {}
    }
</script>