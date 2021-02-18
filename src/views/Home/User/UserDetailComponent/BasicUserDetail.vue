<template>
    <div id="BasicDetail">
        <ActivateModal :user="user" @finish="onStatusChangeFinish" />
        <DeactivateModal :user="user" @finish="onStatusChangeFinish" />
        <b-container fluid>
            <div class="d-flex mt-3">
                <b-button v-if="!isModify" class="ml-auto" variant="primary" @click="onModifyClick"
                    :disabled="user.status === 0">
                    <font-awesome-icon icon="edit" fixed-width />
                    編輯
                </b-button>
                <b-button v-if="isModify" class="ml-auto" variant="success" @click="onFinishModify">
                    <font-awesome-icon icon="edit" fixed-width />
                    完成編輯
                </b-button>
                <b-button v-if="isModify" class="ml-2" variant="outline-danger" @click="onCancelModify">
                    <font-awesome-icon icon="edit" fixed-width />
                    取消編輯
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
                                    <b-form-input :value="userData.pass" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-for="name" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="姓名: ">
                                    <b-form-input id="name" :value="userData.name" :disabled="!isModify">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-for="roleId" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="角色: ">
                                    <b-form-input :value="roleIdMap[userData.roleId]" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-for="email" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="Email: ">
                                    <b-form-input id="email" :value="userData.email" :disabled="!isModify">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="性別: ">
                                    <b-form-input :value="userData.sex == 'M' ? '男性' : '女性'" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="身分證號: ">
                                    <b-form-input :value="userData.idCardNo" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="出生年: ">
                                    <b-form-input :value="userData.birthYear" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="出生月: ">
                                    <b-form-input :value="userData.birthMon" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                    label="出生日: ">
                                    <b-form-input :value="userData.birthDate" :disabled="!isModify" />
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
                        <SimpleImage :src="headShotPath" v-if="isHeadShotReady" />
                        <ImgUpload v-if="isModify" @FileUpload="onFileUpload" />
                    </TitledCard>
                    <TitledCard title="地址">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                                    <b-form-select id="city" v-model="userData.addressCity" :disabled="!isModify">
                                        <option v-for="(list, index) in cityList" :key="index" :value="list">
                                            {{list}}
                                        </option>
                                    </b-form-select>
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區域: ">
                                    <b-form-select id="area" v-model="userData.addressArea" @change="fetchRoadName()"
                                        :disabled="!isModify">
                                        <option v-for="(list, index) in areaList" :key="index" :value="list">
                                            {{list}}
                                        </option>
                                    </b-form-select>
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                                    <scale-loader v-if="isAddressLoading">
                                    </scale-loader>
                                    <b-form-input v-b-tooltip.v-danger="streetErrorMessage"
                                        v-model="userData.addressStreet" @input="change" list="suggestion"
                                        :disabled="!isModify">
                                    </b-form-input>
                                    <datalist id="suggestion">
                                        <option @click="suggestionClick(index)" v-for="(suggestion, index) in matches"
                                            :key="index">
                                            {{ suggestion }}
                                        </option>
                                    </datalist>
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="門牌樓層: ">
                                    <b-form-input v-model="userData.addressDetail" :disabled="!isModify" />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard v-if="userData.roleId === 1 || userData.roleId === 2" title="客戶專用">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="統編: ">
                                    <b-form-input v-model="userData.client.businessId" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="收據抬頭: ">
                                    <b-form-input v-model="userData.client.invoiceTitle" :disabled="!isModify" />
                                </b-form-group>
                            </b-form-group>
                        </div>
                    </TitledCard>
                    <TitledCard v-if="userData.roleId == 0" title="師傅專用">
                        <div class="m-2">
                            <b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行帳號: ">
                                    <b-form-input v-model="userData.master.accountNo" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行名稱: ">
                                    <b-form-input v-model="userData.master.bankName" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="銀行代號: ">
                                    <b-form-input v-model="userData.master.bankCode" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="分行代號: ">
                                    <b-form-input v-model="userData.master.branchCode" :disabled="!isModify" />
                                </b-form-group>
                                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="分行名稱: ">
                                    <b-form-input v-model="userData.master.branchName" :disabled="!isModify" />
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
    import ImgUpload from '@/components/Image/ImgUpload.vue'
    import UserRole from '@/config/UserRole.json'
    import CityAreaData from '@/config/CityAreaData.json'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import ActivateModal from '@/components/Modal/ActivateModal.vue'
    import DeactivateModal from '@/components/Modal/DeactivateModal.vue'
    import {
        fetchRoadName
    } from '@/model/FetchAddress/FetchRoadName'
    import RoleIdMap from '@/model/Mapping/RoleIdMap.js'
    import SimpleImage from '@/components/Image/SimpleImage.vue'

    export default {
        name: "BasicDetail",
        components: {
            ImgUpload,
            TitledCard,
            ActivateModal,
            DeactivateModal,
            SimpleImage
        },
        props: {
            userData: Object,
            user: Object
        },
        data() {
            return {
                areadata: CityAreaData,
                isLoading: false,
                isAddressLoading: false,
                streetNames: [],
                isModify: false,
                UserRole,
                toBeUploadedHeadShot: {},
                streetErrorMessage: '',
                roleIdMap: RoleIdMap(),
                headShotPath: this.userData.headShotPath,
                isHeadShotReady: true,
            }
        },
        computed: {
            cityList() {
                return Object.keys(this.areadata);
            },
            areaList() {
                return this.areadata[this.userData.addressCity];
            },
            matches() {
                if (this.userData.addressStreet === '') {
                    return this.streetNames;
                }
                return this.streetNames.filter(item => {
                    return item.indexOf(this.userData.addressStreet) >= 0
                });
            }
        },
        methods: {
            onModifyClick() {
                this.isModify = true;
                this.isHeadShotReady = false;
            },
            onOldWayClick() {
                this.headShotPath = this.userData.headShotPath
                this.headShotUpdateKey++
            },
            onCancelModify() {
                this.isModify = false;
                this.isHeadShotReady = true;
            },
            onStatusChangeFinish() {
                this.$emit("refresh");
            },
            async fetchRoadName() {
                this.isAddressLoading = true;
                this.streetNames = await fetchRoadName(this.userData.addressCity, this.userData.addressArea);
                this.isAddressLoading = false;
            },
            suggestionClick(index) {
                this.userData.addressStreet = this.matches[index];
                this.open = false;
            },
            change() {
                if (this.open == false) {
                    this.open = true;
                }
                if (this.matches.length == 0 && this.userData.addressStreet.length !== 0) {
                    this.streetErrorMessage = "抱歉，找不到輸入的地址";
                } else if (this.matches.length !== 0 && this.userData.addressStreet.length !== 0) {
                    this.streetErrorMessage = "";
                }
            },
            async onFinishModify() {
                this.isLoading = true;
                try {
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
                        await this.updateHeadshot();
                    }
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isHeadShotReady = true;
                    this.isLoading = false;
                    this.isModify = false
                }
            },
            async updateHeadshot() {
                if (this.toBeUploadedHeadShot.name) {
                    try {
                        await this.user.updateHeadshot(this.toBeUploadedHeadShot)
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
            refresh() {
                this.$emit("refresh")
            },
            async onFileUpload(data) {
                this.toBeUploadedHeadShot = data;
            },
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