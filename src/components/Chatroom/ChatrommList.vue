<template>
    <div>
        <div class="content">
            <div v-for="(room, index) in $store.state.chatroom.adminRooms" :key="index">
                <div class="roomBrief m-2" @click="onRoomClick(room.id)">
                    {{room.id}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-admin-sdk'
    import store from '@/store'
    // import {
    //     format
    // } from 'date-fns'
    // const sleep = time => new Promise(resolve => setTimeout(resolve, time))
    // const poll = (promiseFn, time) => promiseFn().then(sleep(time).then(() => poll(promiseFn, time)))

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
        },
        methods: {
            async fetchadminRooms() {
                let query = tigermaster.database.query("chatroom").where("chatroom.user_ids", "LIKE",
                    `%${this.currentUserId}%`)
                try {
                    const res = await query.get()
                    const rooms = res.data
                    store.commit('setadminRooms', rooms)
                } catch (e) {
                    console.log(e)
                }
            },
            // async fetchUnread(rooms) {
            //     if (rooms.length === 0) {
            //         return
            //     }
            //     const timestamp = format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
            //     try {
            //         await rooms.forEach(async (e) => {
            //             await e.shadowQuery(timestamp)
            //         });
            //     } catch (e) {
            //         console.log(e)
            //     }
            // },
            // async pollUnreadMsg() {
            //     const rooms = store.state.chatroom.adminRooms;
            //     poll(() => new Promise(() => this.fetchUnread(rooms)), 5000)
            // },
            async onRoomClick(roomId) {
                await store.dispatch('shadowQueryAdminRoom', roomId)
                await store.commit('setCurrentChatroom', roomId)
                await store.dispatch('showChatroom')
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