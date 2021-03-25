<template>
    <div>
        <div class="content">
            <div v-for="(room, index) in chatrooms" :key="index">
                <div class="roomBrief m-2" @click="onRoomClick(room.id)">
                    {{room.targetUserName}}
                    <b-badge variant="warning">
                        {{room.unreadCount}}
                    </b-badge>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '@/store'

    export default {
        name: "ChatroomList",
        components: {},
        props: {
            maxRooms: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                loading: false,
                currentUserId: store.state.user.id,
                currentUserRole: store.state.user.roleId,
            };
        },
        created() {
            this.fetchadminRooms()
            this.fetchUnreadCount()
        },
        methods: {
            fetchadminRooms() {
                store.dispatch('fetchAdminChatrooms');
            },
            fetchUnreadCount() {
                store.dispatch('fetchUnreadCount');
            },
            async onRoomClick(roomId) {
                await store.dispatch('shadowQueryRoom', roomId)
                await store.dispatch('toggleChatroom', true)
            }
        },
        computed: {
            chatrooms() {
                const rooms = store.state.chatroom.chatRooms
                return rooms
            }
        }
    }
</script>

<style scoped>
    .content {
        max-height: 200px;
        width: 200px;
        overflow: scroll;
    }

    .roomBrief {
        cursor: pointer;
    }

    .roomBrief:hover {
        background: rgb(180, 180, 180);
    }
</style>