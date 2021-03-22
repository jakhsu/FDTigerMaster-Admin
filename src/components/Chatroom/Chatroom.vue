<template>
    <div class="chatroom">
        <b-card>
            <template #header>
                <div class="d-flex">
                    {{id}}
                    <font-awesome-icon class="ml-auto chatroom-button" icon="phone" @click="onCallClick" />
                    <font-awesome-icon class="ml-3 chatroom-button" icon="times" @click="onCloseClick" />
                </div>
            </template>
            <div class="chatroom-body m-2">
                {{chatroomContent}}
            </div>
            <div class="chatroom-input p-2 d-flex">
                <div>
                    <b-form-textarea no-resize />
                </div>
                <div class="m-auto">
                    <b-button variant="info">上傳</b-button>
                    <b-button variant="success" class="ml-2">送出</b-button>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "Chatroom",
        props: {
            id: String
        },
        methods: {
            onCloseClick() {
                this.$store.dispatch('closeChatroom')
            },
            onCallClick() {}
        },
        computed: {
            chatroomContent() {
                const content = this.$store.state.chatroom.adminRoomContent.filter(e => e.roomId === this.id)
                return content
            }
        }
    }
</script>

<style scoped>
    .chatroom-button {
        font-size: 25px;
        cursor: pointer;
    }

    .chatroom-body {
        max-height: 300px;
        overflow: scroll;
    }

    .chatroom .card-body {
        padding: 0;
    }

    .chatroom {
        width: 370px;
        position: fixed;
        right: 5px;
        bottom: 0px;
        z-index: 1000;
    }

    .chatroom .card-header {
        /* background-color: seagreen; */
    }
</style>