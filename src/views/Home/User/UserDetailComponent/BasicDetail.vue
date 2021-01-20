<template>
    <div id="BasicDetail">
        <ActivateModal :currentUser="currentUser" @finish="onStatusChangeFinish" />
        <DeactivateModal :currentUser="currentUser" @finish="onStatusChangeFinish" />
        <b-container fluid>
            <div class="d-flex mt-3">
                <b-button class="ml-auto" variant="primary" @click="onModifyClick" :disabled="user.status === 0">
                    <font-awesome-icon icon="edit" fixed-width />
                    編輯
                </b-button>
            </div>
            <b-row>
                <b-col xl="6" lg="12">
                    <TitledCard title="基本">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="id: ">
                                    <b-form-input :value="user.id" disabled />
                                </b-form-group>
                                <b-form-group label-for="phone" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="電話: ">
                                    <b-form-input id="phone" :value="user.phone" disabled>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="密碼: ">
                                    <b-form-input :value="user.pass" disabled />
                                </b-form-group>
                                <b-form-group label-for="name" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="姓名: ">
                                    <b-form-input id="name" :value="user.name" disabled>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-for="roleId" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="角色: ">
                                    <b-form-input :value="roleIdMap[user.roleId]" disabled />
                                </b-form-group>
                                <b-form-group label-for="email" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="Email: ">
                                    <b-form-input id="email" :value="user.email" disabled>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="性別: ">
                                    <b-form-input :value="user.sex == 'M' ? '男性' : '女性'" disabled />
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
                        </div>
                    </TitledCard>
                    <TitledCard title="其他">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="創建日期: ">
                                    <b-form-input :value="user.createDate" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="創建者: ">
                                    <b-form-input :value="user.createBy" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="更新日期: ">
                                    <b-form-input :value="user.updateDate" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="更新者: ">
                                    <b-form-input :value="user.updateBy" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="狀態: ">
                                    <b-form-input :value="user.status == 1 ? '啟用中' : '停用'" disabled />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                </b-col>
                <b-col xl="6" lg="12">
                    <TitledCard title="用戶照片">
                        <img :src="user.headShotPath" />
                    </TitledCard>
                    <TitledCard title="地址">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                                    <b-form-input :value="user.addressCity" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區域: ">
                                    <b-form-input :value="user.addressArea" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                                    <b-form-input :value="user.addressStreet" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="門牌樓層: ">
                                    <b-form-input :value="user.addressDetail" disabled />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard v-if="user.roleId === 1 || user.roleId === 2" title="客戶專用">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="統編: ">
                                    <b-form-input v-model="user.client.businessId" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="收據抬頭: ">
                                    <b-form-input v-model="user.client.invoiceTitle" disabled />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard v-if="user.roleId == 0" title="師傅專用">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行帳號: ">
                                    <b-form-input v-model="user.master.accountNo" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行名稱: ">
                                    <b-form-input v-model="user.master.bankName" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行代號: ">
                                    <b-form-input v-model="user.master.bankCode" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="分行代號: ">
                                    <b-form-input v-model="user.master.branchCode" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="分行名稱: ">
                                    <b-form-input v-model="user.master.branchName" disabled />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard v-if="user.status == 1" title="用戶凍結:" titleBackgroundColor="#dd2a0e">
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
                    <TitledCard v-else-if="user.status == 0" title="用戶解凍:" titleBackgroundColor="#2edd0e">
                        <div class="BasicDetail-Deactivate">
                            <p>將用戶解凍有以下效果:</p>
                            <ul>
                                <li>用戶將會能夠登入</li>
                                <li>仍會有紀錄被凍結的歷史</li>
                            </ul>
                            <b-button variant="outline-success" v-b-modal="'Activate-Modal'">恢復</b-button>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import UserRole from '@/config/UserRole.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import ActivateModal from '@/components/Modal/ActivateModal.vue'
    import DeactivateModal from '@/components/Modal/DeactivateModal.vue'

    import RoleIdMapping from '@/model/Mapping/RoleIdMapping.js'

    export default {
        name: "BasicDetail",
        components: {
            TitledCard,
            ActivateModal,
            DeactivateModal
        },
        props: {
            user: Object,
            currentUser: Object
        },
        data() {
            return {
                UserRole,
                roleIdMap: RoleIdMapping()
            }
        },
        methods: {
            onModifyClick() {
                this.$router.push({
                    path: '/home/user_modify',
                    query: {
                        userId: this.user.id
                    }
                });
            },
            onStatusChangeFinish() {
                this.$emit("refresh");
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