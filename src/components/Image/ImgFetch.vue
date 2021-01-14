<template>
    <div id="img-area">
        <img :src="this.url" alt="" width="200px">
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'imgFetch',
        props: {
            user: Object,
            fetchURL: String
        },
        data() {
            return {
                token: String,
                url: String,
                response: Object,
            }
        },
        async created() {
            const user = tigermaster.auth.currentUser;
            this.token = user.token;
            // const res = await tigermaster.database
            //     .query("user_picture")
            //     .get();
            // this.url = res.data[0].path
            try {
                let response = await fetch(this.fetchURL, {
                    method: 'GET',
                    headers: {
                        "Authorization": this.token
                    }
                });
                await response.blob().then(imgBlob => {
                    this.url = URL.createObjectURL(imgBlob)
                });
            } catch (e) {
                console.log(e)
            }
        },
        methods: {
            test() {
                console.log("test, fetch url is: ", this.fetchURL)
            }
        }
    }
</script>