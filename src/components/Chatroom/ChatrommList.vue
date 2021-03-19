<template>
    <div>
        <div class="content" ref="list">
            <div v-for="(room, index) in chatrooms" :key="index">
                <div class="roomBrief" @click="onRoomBriefClick(room)">
                    {{room}}
                </div>
            </div>
            <scale-loader v-if="loading" />
        </div>
        <mugen-scroll scroll-container="list" :handler="fetchChatrooms" :should-handle="!loading">
        </mugen-scroll>
    </div>
</template>

<script>
    import MugenScroll from 'vue-mugen-scroll'
    export default {
        name: "ChatroomList",
        components: {
            MugenScroll
        },
        props: {},
        data() {
            return {
                loading: false,
                chatrooms: [123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123]
            };
        },
        methods: {
            fetchChatrooms() {
                this.loading = true
                this.chatrooms.push(123)
                this.loading = false
            },
            onRoomBriefClick(id) {
                alert(id)
            }
        },
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