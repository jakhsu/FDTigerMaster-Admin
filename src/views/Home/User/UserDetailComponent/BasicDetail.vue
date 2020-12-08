<template>
    <div id="BasicDetail">
        <b-container fluid>
            <div class="d-flex mt-3">
                <b-button class="ml-auto" variant="primary" @click="onModifyClick">
                    <font-awesome-icon icon="edit" fixed-width />
                    編輯
                </b-button>
            </div>
            <b-row>
                <b-col xl="6" lg="12" md="12">
                    <TitledCard title="用戶共通:">
                        <b-form>
                            <b-card class="m-4" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="基本資料">
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="id: ">
                                        <b-form-input :value="user.id" disabled />
                                    </b-form-group>
                                    <b-form-group label-for="phone" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="電話: ">
                                        <b-form-input id="phone" :value="user.phone" disabled>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="密碼: ">
                                        <b-form-input :value="user.pass" disabled />
                                    </b-form-group>
                                    <b-form-group label-for="name" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="姓名: ">
                                        <b-form-input id="name" :value="user.name" disabled>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-for="roleId" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="角色: ">
                                        <b-form-input id="roleId" :value="user.roleId" disabled>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-for="email" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="Email: ">
                                        <b-form-input id="email" :value="user.email" disabled>
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="性別: ">
                                        <b-form-input :value="user.sex" disabled />
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="身分證號: ">
                                        <b-form-input :value="user.idCardNo" disabled />
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="出生年: ">
                                        <b-form-input :value="user.birthYear" disabled />
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="出生月: ">
                                        <b-form-input :value="user.birthMon" disabled />
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="出生日: ">
                                        <b-form-input :value="user.birthDate" disabled />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                            <b-card class="m-4" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="地址資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                                        <b-form-input :value="user.addressCity" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區域: ">
                                        <b-form-input :value="user.addressArea" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                                        <b-form-input :value="user.addressStreet" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="門牌樓層: ">
                                        <b-form-input :value="user.addressDetail" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="緯度: ">
                                        <b-form-input :value="user.addressLat" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="經度: ">
                                        <b-form-input :value="user.addressLong" disabled />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                            <b-card class="m-4" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="其他資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="創建日期: ">
                                        <b-form-input :value="user.createDate" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="創建者: ">
                                        <b-form-input :value="user.createBy" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="更新日期: ">
                                        <b-form-input :value="user.updateDate" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="更新者: ">
                                        <b-form-input :value="user.updateBy" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="Active: ">
                                        <b-form-input :value="user.active" disabled />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-form>
                    </TitledCard>
                </b-col>
                <b-col v-if="user.roleId == 1" lg="6" md="12">
                    <TitledCard title="師傅專用:">
                        <b-form>
                            <b-card class="m-4" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="銀行資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="銀行帳號: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="銀行名稱: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="銀行代號: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="分行代號: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="分行名稱: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-form>
                    </TitledCard>
                    <TitledCard v-if="user.active == 1" title="用戶凍結:" titleBackgroundColor="#dd2a0e">
                        <div class="BasicDetail-Deactivate">
                            <p>將用戶停權有以下效果:</p>
                            <ul>
                                <li>用戶將會無法登入</li>
                                <li>用戶資料仍被保留住</li>
                                <li>相關訂單資訊也會被保留著</li>
                            </ul>
                            <b-button variant="outline-danger" v-b-modal="'Deactivate-Modal'">停權</b-button>
                        </div>
                    </TitledCard>
                    <TitledCard v-else-if="user.active == 0" title="用戶解凍:" titleBackgroundColor="#2edd0e">
                        <div class="BasicDetail-Deactivate">
                            <p>將用戶解凍有以下效果:</p>
                            <ul>
                                <li>用戶將會能夠登入</li>
                                <li>仍會有紀錄被凍結的歷史</li>
                            </ul>
                            <b-button variant="outline-success" v-b-modal="'Reactivate-Modal'">恢復</b-button>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'

    export default {
        name: "BasicDetail",
        components: {
            TitledCard,
        },
        props: {
            user: {}
        },
        methods: {
            onModifyClick() {
                this.$router.push({
                    path: '/home/user_modify',
                    query: {
                        userId: this.user.id
                    }
                });
            }
        }
    }
</script>

<style scoped>
    #BasicDetail {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #BasicDetail .BasicDetail-Deactivate {
        text-align: left;
    }

    #BasicDetail .BasicDetail-Deactivate ul {
        margin-bottom: 2rem;
    }
</style>