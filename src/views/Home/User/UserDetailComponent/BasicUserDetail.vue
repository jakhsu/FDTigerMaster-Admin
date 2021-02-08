<template>
    <div id="BasicDetail">
        <ActivateModal :currentUser="user" @finish="onStatusChangeFinish" />
        <DeactivateModal :currentUser="user" @finish="onStatusChangeFinish" />
        <b-container fluid>
            <div class="d-flex mt-3">
                <b-button v-if="!isEdit" class="ml-auto" variant="primary" @click="onModifyClick"
                    :disabled="user.status === 0">
                    <font-awesome-icon icon="edit" fixed-width />
                    編輯
                </b-button>
                <b-button v-if="isEdit" class="ml-auto" variant="primary" @click="onFinishEdit">
                    <font-awesome-icon icon="edit" />
                    完成
                </b-button>
                <b-button v-if="isEdit" class="ml-2" variant="outline-danger" @click="onCancelEdit">
                    取消
                </b-button>
            </div>
            <b-row>
                <b-col xl="6" lg="12">
                    <TitledCard title="基本">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="id: ">
                                    <b-form-input :value="userData.id" disabled />
                                </b-form-group>
                                <b-form-group label-for="phone" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="電話: ">
                                    <b-form-input id="phone" :value="userData.phone" disabled>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="密碼: ">
                                    <b-form-input :value="userData.pass" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-for="name" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="姓名: ">
                                    <b-form-input id="name" :value="userData.name" :disabled="!isEdit">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-for="roleId" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="角色: ">
                                    <b-form-input :value="roleIdMap[userData.roleId]" disabled />
                                </b-form-group>
                                <b-form-group label-for="email" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="Email: ">
                                    <b-form-input id="email" :value="userData.email" :disabled="!isEdit">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="性別: ">
                                    <b-form-input :value="userData.sex == 'M' ? '男性' : '女性'" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="身分證號: ">
                                    <b-form-input :value="userData.idCardNo" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="出生年: ">
                                    <b-form-input :value="userData.birthYear" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="出生月: ">
                                    <b-form-input :value="userData.birthMon" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="出生日: ">
                                    <b-form-input :value="userData.birthDate" :disabled="!isEdit" />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard title="其他">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="創建日期: ">
                                    <b-form-input :value="userData.createDate" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="創建者: ">
                                    <b-form-input :value="userData.createBy" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="更新日期: ">
                                    <b-form-input :value="userData.updateDate" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="更新者: ">
                                    <b-form-input :value="userData.updateBy" disabled />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="狀態: ">
                                    <b-form-input :value="userData.status == 1 ? '啟用中' : '停用'" disabled />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                </b-col>
                <b-col xl="6" lg="12">
                    <TitledCard title="用戶照片">
                        <img :src="userData.headShotPath" />
                    </TitledCard>
                    <TitledCard title="地址">
                        <div class="m-2">
                            <b-form-group>

                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                                    <b-form-input :value="userData.addressCity" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區域: ">
                                    <b-form-input :value="userData.addressArea" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                                    <b-form-input :value="userData.addressStreet" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="門牌樓層: ">
                                    <b-form-input :value="userData.addressDetail" :disabled="!isEdit" />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard v-if="userData.roleId === 1 || userData.roleId === 2" title="客戶專用">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="統編: ">
                                    <b-form-input v-model="userData.client.businessId" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="收據抬頭: ">
                                    <b-form-input v-model="userData.client.invoiceTitle" :disabled="!isEdit" />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard v-if="userData.roleId == 0" title="師傅專用">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行帳號: ">
                                    <b-form-input v-model="userData.master.accountNo" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行名稱: ">
                                    <b-form-input v-model="userData.master.bankName" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行代號: ">
                                    <b-form-input v-model="userData.master.bankCode" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="分行代號: ">
                                    <b-form-input v-model="userData.master.branchCode" :disabled="!isEdit" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="分行名稱: ">
                                    <b-form-input v-model="userData.master.branchName" :disabled="!isEdit" />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard v-if="userData.status == 1" title="用戶凍結:" titleBackgroundColor="#dd2a0e">
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
                    <TitledCard v-else-if="userData.status == 0" title="用戶解凍:" titleBackgroundColor="#2edd0e">
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

    import RoleIdMap from '@/model/Mapping/RoleIdMap.js'

    export default {
        name: "BasicDetail",
        components: {
            TitledCard,
            ActivateModal,
            DeactivateModal
        },
        props: {
            // userData: Object,
            user: Object
        },
        data() {
            return {
                UserRole,
                roleIdMap: RoleIdMap(),
                isEdit: false,
                userData: this.user._data
            }
        },
        methods: {
            onFinishEdit() {
                this.isEdit = false;
            },
            onCancelEdit() {
                this.isEdit = false;
            },
            onModifyClick() {
                this.isEdit = true;
                // this.$router.push({
                //     path: '/home/user_modify',
                //     query: {
                //         userId: this.userData.id
                //     }
                // });
            },
            async updateUser() {
                if (this.streetErrorMessage === '') {
                    const dataToBeUpdated = {
                        phone: this.userData.phone,
                        email: this.userData.email,
                        name: this.userData.name,
                        sex: this.userData.sex,
                        addressCity: this.userData.addressCity,
                        addressArea: this.userData.addressArea,
                        addressStreet: this.userData.addressStreet,
                        addressDetail: this.userData.addressDetail,
                        idCardNo: this.userData.idCardNo,
                        birthYear: this.userData.birthYear,
                        birthMon: this.userData.birthMon,
                        birthDate: this.userData.birthDate,
                        status: this.userData.status
                    }
                    await this.user.update(dataToBeUpdated);
                    this.updateHeadshot();
                    this.$router.push({
                        path: '/home/user_detail',
                        query: {
                            userId: this.userData.id
                        }
                    });
                }
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