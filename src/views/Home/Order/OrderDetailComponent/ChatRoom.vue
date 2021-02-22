<template>
    <div>
        <b-row>
            <b-col>
                <TitledCard titleBackgroundColor="#2B364B" title="客戶對師父">
                    <scale-loader v-if="isLoadingC2M" />
                    <div @scroll="scroll" v-else class="msg-area container">
                        <div v-for="(item, index) in C2MChats" :key="index" class="msg-content m-2">
                            <div class="msg-body" v-if="item.varient == 0">
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            內容: {{item.text}}
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
                                        <div class="msg-creator">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            內容: {{item.imagePath}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="msg-content-self">
                            <div class="msg-body">
                                <div class="msg-creator">
                                    自己
                                </div>
                                <div class="msg-text">
                                    hello, this is from myself
                                </div>
                                <div class="msg-status">
                                    today
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="msg-push mt-2">
                        <b-form-group label="輸入訊息">
                            <b-form-textarea></b-form-textarea>
                            <b-button variant="success" class="mt-2">送出</b-button>
                        </b-form-group>
                    </div>
                </TitledCard>
            </b-col>
            <b-col>
                <TitledCard titleBackgroundColor="#2B364B" title="客戶對客服">
                    <scale-loader v-if="isLoadingC2A" />
                    <div v-else class="msg-area container">
                        <div v-for="(item, index) in C2MChats" :key="index" class="msg-content m-2">
                            <div class="msg-body" v-if="item.varient == 0">
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            內容: {{item.text}}
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
                                        <div class="msg-creator">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            內容: {{item.imagePath}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="msg-content-self">
                            <div class="msg-body">
                                <div class="msg-creator">
                                    自己
                                </div>
                                <div class="msg-text">
                                    hello, this is from myself
                                </div>
                                <div class="msg-status">
                                    today
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="msg-push mt-2">
                        <b-form-group label="輸入訊息">
                            <b-form-textarea></b-form-textarea>
                            <b-button variant="success" class="mt-2">送出</b-button>
                        </b-form-group>
                    </div>
                </TitledCard>
            </b-col>
            <b-col>
                <TitledCard titleBackgroundColor="#2B364B" title="師傅對客服">
                    <scale-loader v-if="isLoadingM2A" />
                    <div v-else class="msg-area container">
                        <div v-for="(item, index) in C2MChats" :key="index" class="msg-content m-2">
                            <div class="msg-body" v-if="item.varient == 0">
                                <b-row>
                                    <b-col>
                                        <div class="msg-creator">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            內容: {{item.text}}
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
                                        <div class="msg-creator">
                                            {{item.createBy == clientId ? '客戶' : item.createBy == masterId ? '師傅': `用戶${item.createBy}`}}
                                        </div>
                                        <div class="msg-text">
                                            內容: {{item.imagePath}}
                                        </div>
                                        <div class="msg-status">
                                            {{item.createDate}} {{item.readed == 1 ? '已讀' : '未讀'}}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="msg-content-self">
                            <div class="msg-body">
                                <div class="msg-creator">
                                    自己
                                </div>
                                <div class="msg-text">
                                    hello, this is from myself
                                </div>
                                <div class="msg-status">
                                    today
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="msg-push mt-2">
                        <b-form-group label="輸入訊息">
                            <b-form-textarea></b-form-textarea>
                            <b-button variant="success" class="mt-2">送出</b-button>
                        </b-form-group>
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
                chatRooms: [{
                    id: '0123456789abcdef'
                }],
                C2MChats: Array,
                C2AChats: Array,
                M2AChats: Array,
                data: []
            }
        },
        created() {
            this.fetchC2M();
        },
        methods: {
            // TODO: this is currently unused
            async createChatRoom() {
                await tigermaster.chatroom.created({
                    userIds: this.chatRoomUsers
                })
            },
            // TODO: this is currently unused
            extractChatRooms() {
                const chatRooms = [];
                chatRooms.push(this.orderData["client2Master"])
                chatRooms.push(this.orderData["client2Admin"])
                chatRooms.push(this.orderData["master2Admin"])
                const filtered = chatRooms.filter(e =>
                    e !== undefined
                )
                const parsed = filtered.map(e => JSON.parse(e))
                this.chatRooms = parsed
            },
            async shadowQueryLatestChats(roomId) {
                const chatroom = await tigermaster.chatroom.get(roomId)
                const result = await chatroom.shadowQuery(format(Date.now(), 'yyyy-MM-dd HH:mm:ss'))
                return result.messages;
            },
            async fetchC2M() {
                this.isLoadingC2M = true;
                // this.C2MChats = await this.shadowQueryLatestChats("0123456789abcdef")
                this.C2MChats = [{
                        text: 'hello',
                        readed: 0,
                        createBy: this.clientId,
                        createDate: 'today',
                        varient: 0
                    },
                    {
                        text: 'hello',
                        readed: 0,
                        createBy: this.clientId,
                        createDate: 'today',
                        varient: 0
                    }, {
                        text: 'hello',
                        readed: 0,
                        createBy: this.masterId,
                        createDate: 'today',
                        varient: 0
                    }, {
                        text: 'hello',
                        readed: 0,
                        createBy: this.masterId,
                        createDate: 'today',
                        varient: 0
                    }, {
                        text: 'hello',
                        readed: 0,
                        createBy: this.clientId,
                        createDate: 'today',
                        varient: 0
                    },
                    {
                        text: 'hello, this is fake data',
                        readed: 0,
                        createBy: this.clientId,
                        createDate: 'today',
                        varient: 0
                    }, {
                        text: 'hello, this is fake data',
                        readed: 0,
                        createBy: this.masterId,
                        createDate: 'today',
                        varient: 0
                    }, {
                        text: 'hello, this is fake data',
                        readed: 0,
                        createBy: this.masterId,
                        createDate: 'today',
                        varient: 0
                    }
                ]
                this.isLoadingC2M = false
            },
            fetchC2A() {
                this.isLoadingC2A = true;
                this.C2AChats = this.C2MChats;
                this.isLoadingC2A = false
            },
            fetchM2A() {
                this.isLoadingM2A = true;
                this.M2AChats = this.C2MChats;
                this.isLoadingM2A = false
            },
            sendText() {},
            scroll({
                target: {
                    scrollTop,
                    clientHeight,
                    scrollHeight
                }
            }) {
                if (scrollTop + clientHeight >= scrollHeight) {
                    console.log("reached botton!!!")
                }
            }
        },
        computed: {
            clientId() {
                return this.orderData.clientUserId
            },
            masterId() {
                return this.orderData.masterUserId
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
</style>