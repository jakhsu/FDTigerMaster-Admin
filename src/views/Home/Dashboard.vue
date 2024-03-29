<template>
    <div id="Dashboard">
        <Loading v-if="isLoading" />
        <b-container v-else fluid>
            <div class="Dashboard-Area">
                <b-row>
                    <b-col>
                        <div class="Dashboard-Header">
                            <h2>資訊面板</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="Dashboard-Overview">
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="會員數" :data="clientNum" dataPath="/home/client"
                            :isLink="true" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="師傅數" :data="masterNum" dataPath="/home/master"
                            :isLink="true" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="進行中訂單" :data="totalOngoingOrders"
                            dataPath="/home/ongoing_order" :isLink="true" />
                    </b-col>
                    <b-col xl="3" sm="6">
                        <DataCard color="#4e73df" title="已完成訂單" :data="totalClosedOrders" dataPath="/home/closed_order"
                            :isLink="true" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-button class="m-2" variant="warning" @click="toggleChatroomUtils">聊天室測試</b-button>
                </b-row>
                <b-row v-if="isTestingChatrooms">
                    <TitledCard class="m-2" title="聊天室測試utility">
                        <scale-loader v-if="isCreatingRoom" />
                        <b-form-group v-else>
                            <b-form-group label="聊天室用戶 id 1">
                                <b-form-input v-model.trim="userId1" />
                            </b-form-group>
                            <b-form-group label="聊天室用戶 id 2">
                                <b-form-input v-model.trim="userId2" />
                            </b-form-group>
                            <b-button variant="success" @click="createChatroom(userId1, userId2)">創建聊天室
                            </b-button>
                        </b-form-group>
                    </TitledCard>
                    <TitledCard class="m-2" title="聊天室訊息測試">
                        <scale-loader v-if="isSendingMsg" />
                        <b-form-group v-else label="訊息內容">
                            請先從右上角開啟一個聊天室，將會對開啟中的聊天室送訊息
                            <b-form-input v-model="msg" />
                            <b-button class="m-2" variant="success" @click="sendMsg">
                                送出
                            </b-button>
                        </b-form-group>
                    </TitledCard>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import DataCard from '@/components/Card/DataCard.vue'
    import Loading from '@/components/Loading.vue';

    import tigermaster from 'fdtigermaster-admin-sdk'
    import TitledCard from '../../components/Card/TitledCard.vue';

    export default {
        name: 'Dashboard',
        components: {
            DataCard,
            Loading,
            TitledCard
        },
        data() {
            return {
                response: {},
                isLoading: true,
                totalUsers: 0,
                totalOngoingOrders: 0,
                totalClosedOrders: 0,
                masterNum: 0,
                clientNum: 0,
                user: [],
                // TODO:: below is for testing chatrooms, remove before production
                userId1: "",
                userId2: "",
                chatroomId: "",
                chatroomData: {},
                msg: '',
                isSendingMsg: false,
                isTestingChatrooms: false,
                isCreatingRoom: false
            }
        },
        async created() {
            await Promise.all([this.fetchUserData(), this.fetchOngoingOrderData(), this.fetchClosedOrderData()]);
            this.isLoading = false;

        },
        methods: {
            async fetchUserData() {
                const masterCountReq = tigermaster.database
                    .rawQuery("SELECT count(*) count FROM user WHERE user.role_id=0")
                    .get();
                const clientCountReq = tigermaster.database
                    .rawQuery("SELECT count(*) count FROM user WHERE user.role_id=1 OR user.role_id=2")
                    .get();
                const [masterCount, clientCount] = await Promise.all([masterCountReq, clientCountReq]);
                this.masterNum = masterCount.data[0].count;
                this.clientNum = clientCount.data[0].count;
            },
            async fetchOngoingOrderData() {
                const orderCount = await tigermaster.database
                    .rawQuery("SELECT count(*) count FROM generic_order WHERE generic_order.status<60")
                    .get();
                this.totalOngoingOrders = orderCount.data[0].count;
            },
            async fetchClosedOrderData() {
                const orderCount = await tigermaster.database
                    .rawQuery("SELECT count(*) count FROM generic_order WHERE generic_order.status>55")
                    .get();
                this.totalClosedOrders = orderCount.data[0].count;
            },
            async createChatroom(id1, id2) {
                this.isCreatingRoom = true
                const userIds = [id1, id2]
                try {
                    await tigermaster.chatroom.created(userIds)
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isCreatingRoom = false
                }
            },
            async queryChatroom(id) {
                try {
                    const res = await tigermaster.chatroom.get(id)
                    this.chatroomData = res
                } catch (e) {
                    console.log(e)
                }
            },
            async sendMsg() {
                this.isSendingMsg = true
                try {
                    const roomId = await this.$store.state.chatroom.currentId;
                    const chatroom = await tigermaster.chatroom.get(roomId);
                    await chatroom.sendText(this.msg);
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isSendingMsg = false
                }
            },
            toggleChatroomUtils() {
                this.isTestingChatrooms = !this.isTestingChatrooms
            }
        }
    }
</script>

<style scoped>
    #Dashboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Dashboard .Dashboard-Area {
        padding: 0px 50px;
    }

    #Dashboard .Dashboard-Area .Dashboard-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    @media (max-width: 768px) {
        #Dashboard .Dashboard-Area {
            padding: 0px;
        }
    }
</style>