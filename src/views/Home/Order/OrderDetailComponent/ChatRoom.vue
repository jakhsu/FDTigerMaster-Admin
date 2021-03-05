<template>
    <div>
        <b-row>
            <b-col>
                <TitledCard titleBackgroundColor="#2B364B" title="客戶對師父">
                    <div @scroll="scroll($event,'C2M')" class="msg-area container">
                        <div v-for="(item, index) in C2MChats" :key="index" class="msg-content m-2">
                            <div class="msg-body" v-if="item.varient == 0">
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator ml-2">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            {{item.text}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="msg-body" v-else>
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator ml-2">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            {{item.imagePath}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <scale-loader v-if="isLoadingC2M" />
                    </div>
                    <div class="msg-push mt-2">
                        <b-form-group label="輸入訊息">
                            <b-form-textarea v-model="msgToC2M"></b-form-textarea>
                        </b-form-group>
                        <div>
                            <input ref="C2MFile" type="file" @change="handleImage($event,'C2M')" class="custom-input"
                                accept="image/*" style="display:none">
                            <b-button @click="$refs.C2MFile.click()" variant="warning" class="ml-auto">
                                上傳圖片
                            </b-button>
                            <b-button variant="success" class="ml-2" @click="submit('C2M')">送出</b-button>
                        </div>
                    </div>
                </TitledCard>
            </b-col>
            <b-col>
                <TitledCard titleBackgroundColor="#2B364B" title="客戶對客服">
                    <div @scroll="scroll($event,'C2A')" class="msg-area container">
                        <div v-for="(item, index) in C2MChats" :key="index" class="msg-content m-2">
                            <div class="msg-body" v-if="item.varient == 0">
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator ml-2">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            {{item.text}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="msg-body" v-else>
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator ml-2">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            {{item.imagePath}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <scale-loader v-if="isLoadingC2A" />
                    </div>
                    <div class="msg-push mt-2">
                        <b-form-group label="輸入訊息">
                            <b-form-textarea v-model="msgToC2A"></b-form-textarea>
                        </b-form-group>
                        <div>
                            <input ref="C2AFile" type="file" @change="handleImage($event,'C2A')" class="custom-input"
                                accept="image/*" style="display:none">
                            <b-button @click="$refs.C2AFile.click()" variant="warning" class="ml-auto">
                                上傳圖片
                            </b-button>
                            <b-button variant="success" class="ml-2" @click="submit('C2A')">送出</b-button>
                        </div>
                    </div>
                </TitledCard>
            </b-col>
            <b-col>
                <TitledCard titleBackgroundColor="#2B364B" title="師傅對客服">
                    <div @scroll="scroll($event,'M2A')" class="msg-area container">
                        <div v-for="(item, index) in C2MChats" :key="index" class="msg-content m-2">
                            <div class="msg-body" v-if="item.varient == 0">
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator ml-2">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            {{item.text}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="msg-body" v-else>
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator ml-2">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            {{item.imagePath}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <scale-loader v-if="isLoadingM2A" />
                    </div>
                    <div class="msg-push mt-2">
                        <b-form-group label="輸入訊息">
                            <b-form-textarea v-model="msgToM2A"></b-form-textarea>
                        </b-form-group>
                        <div>
                            <input ref="M2AFile" type="file" @change="handleImage($event,'M2A')" class="custom-input"
                                accept="image/*" style="display:none">
                            <b-button @click="$refs.M2AFile.click()" variant="warning" class="ml-auto">
                                上傳圖片
                            </b-button>
                            <b-button variant="success" class="ml-2" @click="submit('M2A')">送出</b-button>
                        </div>
                    </div>
                </TitledCard>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {
        format
    } from 'date-fns'
    import tigermaster from 'fdtigermaster-admin-sdk'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import debounce from 'lodash/debounce'

    export default {
        components: {
            TitledCard
        },
        name: "ChatRoom",
        props: {
            order: {
                type: Object
            }
        },
        data() {
            return {
                isLoadingC2M: false,
                isLoadingM2A: false,
                isLoadingC2A: false,
                orderData: this.order._data,
                C2MChats: Array,
                C2AChats: Array,
                M2AChats: Array,
                C2MArea: {
                    'msg-area': true,
                    'isLoading': false,
                    'container': true
                },
                msgToC2M: '',
                msgToC2A: '',
                msgToM2A: '',
                imgFileToC2M: {},
                imgFileToC2A: {},
                imgFileToM2A: {},
                clientId: this.order._data.clientUserId,
                masterId: this.order._data.masterUserId,
                C2MRoomId: "",
                C2ARoomId: "",
                M2ARoomId: ""
            }
        },
        created() {
            this.parseAllroomIds()
            this.fetchC2M()
            this.fetchC2A()
            this.fetchM2A()
        },
        methods: {
            async shadowQueryLatestChats(roomId) {
                try {
                    const chatroom = await tigermaster.chatroom.get(roomId)
                    const result = await chatroom.shadowQuery(format(Date.now(), 'yyyy-MM-dd HH:mm:ss'))
                    return result.messages;
                } catch (e) {
                    return [];
                }
            },
            async fetchC2M() {
                this.isLoadingC2M = true;
                this.C2MChats = await this.shadowQueryLatestChats(this.C2MRoomId)
                this.isLoadingC2M = false
            },
            async fetchC2A() {
                this.isLoadingC2A = true;
                this.C2AChats = await this.shadowQueryLatestChats(this.C2ARoomId)
                this.isLoadingC2A = false
            },
            async fetchM2A() {
                this.isLoadingM2A = true;
                this.M2AChats = await this.shadowQueryLatestChats(this.M2ARoomId)
                this.isLoadingM2A = false
            },
            async sendText(text, chatroomId) {
                if (text == "") {
                    return
                }
                const chatroom = await tigermaster.chatroom.get(chatroomId)
                await chatroom.sendText(text)
            },
            async sendImage(file, chatroomId) {
                if (file == {}) {
                    return
                }
                const chatroom = await tigermaster.chatroom.get(chatroomId)
                await chatroom.sendImage(file)
            },
            submit(chatRoomType) {
                if (chatRoomType == 'C2M') {
                    this.sendText(this.msgToC2M, this.C2MRoomId);
                    this.sendImage(this.imgFileToC2M, this.C2MRoomId)
                } else if (chatRoomType == 'M2A') {
                    this.sendText(this.msgToM2A, this.M2ARoomId);
                    this.sendImage(this.imgFileToC2M, this.M2ARoomId)
                } else if (chatRoomType == 'C2A') {
                    this.sendText(this.msgToC2A, this.C2ARoomId);
                    this.sendImage(this.imgFileToC2M, this.C2ARoomId)
                }
            },
            scroll: debounce(function ({
                target: {
                    scrollTop,
                    clientHeight,
                    scrollHeight
                }
            }, chatRoomType) {
                if (scrollTop + clientHeight >= scrollHeight) {
                    if (chatRoomType == 'C2M') {
                        this.fetchC2M()
                    } else if (chatRoomType == 'C2A') {
                        this.fetchC2A()
                    } else if (chatRoomType == 'M2A') {
                        this.fetchM2A()
                    }
                }
            }, 1000, {
                leading: true
            }),
            handleImage(e, type) {
                const imageFile = e.target.files[0]
                if (type == 'C2M') {
                    this.imgFileToC2M = imageFile
                } else if (type == 'C2A') {
                    this.imgFileToC2A = imageFile
                } else if (type == 'M2A') {
                    this.imgFileToM2A = imageFile
                }
            },
            parseAllroomIds() {
                const C2MidStr = this.orderData.client2Master || '{}';
                const C2AidStr = this.orderData.client2Admin || '{}';
                const M2AidStr = this.orderData.master2Admin || '{}';
                this.C2MRoomId = JSON.parse(C2MidStr).id
                this.C2ARoomId = JSON.parse(C2AidStr).id
                this.M2ARoomId = JSON.parse(M2AidStr).id
            }
        }
    }
</script>

<style scoped>
    .msg-creator {
        align-self: center;
    }

    .msg-text {
        background-color: #AFF47E;
        padding: 8px 10px 9px 11px;
        max-height: 300px;
        overflow: hidden;
    }

    .msg-area {
        max-height: 475px;
        overflow: scroll;
    }

    .msg-status {
        transform: scale(0.7);
        color: #ACB0B8;
        vertical-align: bottom;
        margin: 0px 0px 5px -12px;
        display: inline-block;
    }

    .msg-body {
        margin: 5px 0px 5px 5px;
        font-size: 12px;
        color: #35393D;
        letter-spacing: 0.6px;
        background-color: #E3E8EB;
        border-radius: 10px;
        line-height: 1.5;
        text-align: left;
        word-break: break-all;
        white-space: pre-line;
    }

    .msg-content {
        margin: ;
    }

    ::-webkit-scrollbar {
        width: 9px;
    }

    ::-webkit-scrollbar-thumb {
        background: #1db954;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }

    .isLoading {
        background-color: grey;
    }
</style>