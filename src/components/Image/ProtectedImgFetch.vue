<template>
    <div>
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ProtectedImgFetch',
        methods: {

        },
        props: {
            user: Object
        },
        data() {
            return {
                authToken: String,
                url: String,
                response: Object
            }
        },
        async created() {
            const user = tigermaster.auth.currentUser;
            this.authToken = user.token;
            const res = await tigermaster.database
                .query("user_picture")
                .get();
            this.url = res.data[0].path
            await fetch(this.url, {
                method: 'GET',
                headers: {
                    "Authorization": this.authToken
                }
            }).then(res => {
                console.log("response of fetch using the image path from DB with token is: ", res)
                res.blob();
            }).then(blob => {
                this.response = blob;
            })
            console.log(this.response)
        }
    }
</script>