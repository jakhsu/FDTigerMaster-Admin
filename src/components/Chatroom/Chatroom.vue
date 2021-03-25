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
                        <b-button class="ml-auto" @click="onCallClick">
                            <font-awesome-icon class="chatroom-button" icon="phone" />
                        </b-button>
                        <b-button class="ml-2" @click="onCloseClick">
                            <font-awesome-icon class=" chatroom-button" icon="times" />
                        </b-button>
                    </div>
                </template>
                <div class="chatroom-body m-2">
                    <div v-for="(msg, index) in chatroomContent" :key="index">
                        <div :class="msg.createBy === $store.state.user.id ? 'self' : 'other'">
                            <div v-if="msg.createBy === $store.state.user.id" class="self-msg">
                                <div class="msg-sender m-2">
                                    {{msg.createBy}}
                                </div>
                                <div class="msg-content m-2">
                                    {{msg.srcPath}}
                                    {{msg.text}}
                                </div>
                                <div class="msg-status">
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
                                <div class="msg-sender m-2">
                                    {{msg.createBy}}
                                </div>
                                <div class="msg-content m-2">
                                    {{msg.srcPath}}
                                    {{msg.text}}
                                </div>
                                <div class="msg-status">
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
                            <b-textarea id="chatroom-text" v-model="text" v-on:keyup.enter="submit" />
                        </div>
                        <div class="chatroom-input-btns mt-2 d-flex">
                            <div>
                                <input ref="file" type="file" @change="handleUpload($event)" class="custom-input"
                                    style="display:none">
                                <b-button variant="info" @click="$refs.file.click()">
                                    <font-awesome-icon icon="paperclip" />
                                </b-button>
                                <b-dropdown dropright variant="warning" text="範本" class="ml-2">
                                    <b-dropdown-item @click="useChatTemplate(template.content)"
                                        v-for="(template, index) in dialogueTemplate" :key="index">
                                        <div class="chatroom-input-template-item">
                                            {{template.content}}
                                        </div>
                                    </b-dropdown-item>
                                </b-dropdown>
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
    import dialogueTemplate from '@/config/ChatroomTemplates.json'

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
                id: store.state.chatroom.selectedRoom,
                currentUserName: '',
                dialogueTemplate
            }
        },
        async created() {
            this.chatroom = await tigermaster.chatroom.get(this.id);
        },
        methods: {
            useChatTemplate(content) {
                this.text = content
            },
            handleClick(e) {
                let target = e.target
                target.focus()
            },
            onCloseClick() {
                this.$store.dispatch('toggleChatroom', false)
            },
            onCallClick() {},
            async submit() {
                this.isSendingText = true
                try {
                    await this.chatroom.sendText(this.text)
                    await store.dispatch('shadowQueryRoom', this.id)
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
                    await store.dispatch('shadowQueryRoom', this.id)
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isSendingText = false
                }
            }
        },
        computed: {
            chatroomContent() {
                return this.$store.state.chatroom.roomContent.messages
            },
            chatroomDetail() {
                return this.$store.state.chatroom.chatRooms.filter(e => e.id === this.id)[0]
            },
            targetUser() {
                const target = this.chatroomDetail
                return target
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

    .chatroom-input-template-item {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .self {
        text-align: right;
    }

    .other {
        text-align: left;
    }


    .self-msg {
        margin: 5px;
        overflow-wrap: break-word;
        display: inline-block;
        padding: 10px;
        background-color: #86d97b;
        border-radius: 20px;
    }

    .other-msg {
        margin: 5px;
        overflow-wrap: break-word;
        display: inline-block;
        padding: 10px;
        background-color: #5c8ef385;
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