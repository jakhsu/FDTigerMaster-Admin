<template>
    <div>
        <b-form>

        </b-form>
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'
    export default {
        name: "ChatRoom",
        data() {
            return {
                chatRoomUsers: []
            }
        },
        methods: {
            async createChatRoom() {
                await tigermaster.chatroom.created({
                    userIds: this.chatRoomUsers
                })
            }
        },
    }
</script>

<style scoped>

</style>