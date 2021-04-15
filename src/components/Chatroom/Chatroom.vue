<template>
    <div class="chatroom">
        <VueDragResize :sticks="['tl']" :isDraggable="true" :w="370" :minw="300" :z="1000"
            @clicked="handleClick($event)">
            <b-card>
                <template #header>
                    <div class="d-flex">
                        <b-dropdown size="sm" no-caret variant="success">
                            <template #button-content>
                                <scale-loader v-if="isFetchingTarget" />
                                <div v-else>
                                    <img class="targetUser-headshot" :src="targetUser.headShotPath" alt="">
                                    <span>
                                        {{targetUser.name}}
                                    </span>
                                </div>
                            </template>
                            <div class="m-2">
                                <router-link :to="`/home/user_detail?userId=${targetUser.id}`">{{targetUser.email}}
                                </router-link>
                                {{targetUser.phone}}
                            </div>
                        </b-dropdown>
                        <b-button variant="primary" class="ml-auto" @click="onCallClick">
                            <font-awesome-icon class="chatroom-button" icon="phone" />
                        </b-button>
                        <b-button variant="danger" class="ml-2" @click="onCloseClick">
                            <font-awesome-icon class=" chatroom-button" icon="times" />
                        </b-button>
                    </div>
                </template>
                <div class="chatroom-body m-2">
                    <div v-for="(msg, index) in msgs" :key="index">
                        <div :class="msg.createBy === $store.state.user.id ? 'self' : 'other'">
                            <div v-if="msg.createBy === $store.state.user.id" class="self-msg">
                                <div class="msg-sender m-2">
                                    {{selfName}}
                                </div>
                                <div v-if="msg.variant === 0" class="msg-content m-2">
                                    {{msg.text}}
                                </div>
                                <div v-if="msg.variant === 1" class="msg-content m-2">
                                    <ProtectedImage :src="msg.srcPath" />
                                </div>
                                <div v-if="msg.variant === 2" class="msg-content m-2">
                                    <a :href="msg.srcPath" download>{{msg.text}}</a>
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
                                    {{targetUser.name}}
                                </div>
                                <div v-if="msg.variant === 0" class="msg-content m-2">
                                    {{msg.text}}
                                </div>
                                <div v-if="msg.variant === 1" class="msg-content m-2">
                                    <ProtectedImage :src="msg.srcPath" />
                                </div>
                                <div v-if="msg.variant === 2" class="msg-content m-2">
                                    <a :href="msg.srcPath" download>{{msg.text}}</a>
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
                            <input ref="file" type="file" @change="handleUpload($event)" class="custom-input"
                                style="display:none">
                            <b-button variant="info" @click="$refs.file.click()">
                                <font-awesome-icon icon="paperclip" />
                            </b-button>
                            <b-dropdown dropright variant="warning" text="罐頭訊息" class="ml-2">
                                <b-dropdown-item @click="useChatTemplate(template.content)"
                                    v-for="(template, index) in dialogueTemplate" :key="index">
                                    <div class="chatroom-input-template-item">
                                        {{template.content}}
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                            <b-button :disabled="isInputEmpty" variant="success" class="ml-auto" @click="submit">
                                送出
                            </b-button>
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
    import ProtectedImage from '../Image/ProtectedImage.vue'
    import {
        validateFileIsImage
    } from '@/model/Validator/Validator.js'

    export default {
        name: "Chatroom",
        components: {
            VueDragResize,
            ProtectedImage
        },
        data() {
            return {
                text: "",
                isSendingText: false,
                isFetchingTarget: false,
                chatroom: store.state.chatroom.selected,
                id: store.state.chatroom.selected._chatroomId,
                selfName: store.state.user.name,
                dialogueTemplate,
                targetUser: Object
            }
        },
        async created() {
            this.fetchTargetUser()
        },
        methods: {
            async fetchTargetUser() {
                this.isFetchingTarget = true
                const res = await tigermaster.database.query("user").where("user.id", "=", this.targetUserId).get()
                this.targetUser = res.data[0]
                this.isFetchingTarget = false
            },
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
                const isImage = validateFileIsImage(file)
                try {
                    if (isImage) {
                        await this.chatroom.sendImage(file)
                    } else {
                        await this.chatroom.sendFile(file)
                    }
                    await store.dispatch('shadowQueryRoom', this.id)
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isSendingText = false
                }
            }
        },
        computed: {
            msgs() {
                return this.$store.state.chatroom.msg
            },
            targetUserId() {
                return this.chatroom._data.userIds.filter(e => e !== this.$store.state.user.id)[0]
            },
            isInputEmpty() {
                return this.text.length === 0
            }
        }
    }
</script>

<style scoped>
    .vdr.active:before {
        outline: none;
    }

    .chatroom-button {
        font-size: 25px;
        cursor: pointer;
    }

    .chatroom-body {
        max-height: 300px;
        overflow-y: scroll;
        max-width: 100%;
        overflow-x: hidden;
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
        max-width: 15rem;
        overflow: hidden;
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

    .targetUser-headshot {
        width: 30px;
        background-color: transparent;
        border-radius: 50%;
    }
</style>