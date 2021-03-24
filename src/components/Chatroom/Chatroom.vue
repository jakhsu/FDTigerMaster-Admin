<template>
    <div class="chatroom">
        <VueDragResize :sticks="['tl', 'tm']" :isDraggable="true" :w="370" :h="300" :minw="300" :z="1000"
            @clicked="handleClick($event)">
            <b-card>
                <template #header>
                    <div class="d-flex">
                        <b-dropdown variant="success" text="聊天室詳情">
                            <div class="m-2">
                                <div>
                                    {{chatroomDetail.userIds}}
                                </div>
                                <div>
                                    {{chatroomDetail.createDate}}
                                </div>
                            </div>
                        </b-dropdown>
                        <b-button class="ml-auto">
                            <font-awesome-icon class="chatroom-button" icon="phone" @click="onCallClick" />

                        </b-button>
                        <b-button class="ml-2">
                            <font-awesome-icon class=" chatroom-button" icon="times" @click="onCloseClick" />
                        </b-button>
                    </div>
                </template>
                <div class="chatroom-body m-2">
                    <div v-for="(msg, index) in chatroomContent" :key="index">
                        <div :class="msg.createBy === $store.state.user.id ? 'self' : 'other'">
                            <div v-if="msg.createBy === $store.state.user.id" class="self-msg">
                                <div class="msg-content">
                                    {{msg.srcPath}}
                                    {{msg.text}}
                                </div>
                                <div class="msg-status mt-2">
                                    <div>
                                        <font-awesome-icon class="msg-status-readed" icon="check"
                                            v-if="msg.readed === 1" />
                                    </div>
                                    <div class="ml-2">
                                        {{msg.createDate}}
                                    </div>
                                </div>
                            </div>
                            <div v-else class="other-msg">
                                <div class="msg-content">
                                    {{msg.srcPath}}
                                    {{msg.text}}
                                </div>
                                <div class="msg-status mt-2">
                                    <div>
                                        <font-awesome-icon class="msg-status-readed" icon="check"
                                            v-if="msg.readed === 1" />
                                    </div>
                                    <div class="ml-2">
                                        {{msg.createDate}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chatroom-input p-2">
                    <scale-loader v-if="isSendingText" />
                    <div v-else>
                        <div class="chatroom-input-text">
                            <label for="chatroom-text"></label>
                            <b-form-input id="chatroom-text" v-model="text" v-on:keyup.enter="submit" />
                        </div>
                        <div class="chatroom-input-btns mt-2 d-flex">
                            <div>
                                <input ref="file" type="file" @change="handleUpload($event)" class="custom-input"
                                    style="display:none">
                                <b-button variant="info" @click="$refs.file.click()">
                                    <font-awesome-icon icon="paperclip" />
                                </b-button>
                                <b-button variant="warning" class="ml-2">
                                    範本
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </b-card>
        </VueDragResize>
    </div>
</template>

<script>
    import VueDragResize from 'vue-drag-resize'
    import store from '@/store'
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: "Chatroom",
        components: {
            VueDragResize
        },
        data() {
            return {
                text: "",
                isSendingText: false,
                chatroom: Object,
                id: store.state.chatroom.currentId
            }
        },
        async created() {
            this.chatroom = await tigermaster.chatroom.get(this.id);
        },
        methods: {
            handleClick(e) {
                let target = e.target
                target.focus()
            },
            onCloseClick() {
                this.$store.dispatch('closeChatroom')
            },
            onCallClick() {},
            async submit() {
                this.isSendingText = true
                try {
                    await this.chatroom.sendText(this.text)
                    await store.dispatch('shadowQueryAdminRoom', this.id)
                    this.text = ""
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isSendingText = false
                }
            },
            async handleUpload(e) {
                this.isSendingText = true
                const file = e.target.files[0]
                try {
                    await this.chatroom.sendImage(file)
                    await store.dispatch('shadowQueryAdminRoom', this.id)
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isSendingText = false
                }
            }
        },
        computed: {
            chatroomContent() {
                return this.$store.state.chatroom.adminRoomContent.res.messages
            },
            chatroomDetail() {
                return this.$store.state.chatroom.adminRooms.filter(e => e.id === this.id)[0]
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
        position: fixed;
        z-index: 100;
        bottom: 500px;
        right: 400px;
    }

    .chatroom-input-text .form-control {
        z-index: 200;
    }

    .self {
        text-align: right;
    }

    .other {
        text-align: left;
    }


    .self-msg,
    .other-msg {
        margin: 5px;
        overflow-wrap: break-word;
        display: inline-block;
        padding: 10px;
        background-color: #86d97b;
        border-radius: 20px;
    }

    .msg-status {
        font-size: 3px;
        display: inline-flex;
    }

    .chatroom .card-header {
        /* background-color: seagreen; */
    }

    .msg-status-readed {
        font-size: 10px;
    }
</style>