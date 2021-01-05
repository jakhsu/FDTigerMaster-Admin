<template>
    <Loading v-if="isLoading" />
    <div v-else id="UserModify">
        <b-container fluid>
            <div class="UserModify-Area">
                <b-row class="mt-3" align-h="end">
                    <b-col>
                        <div class="UserModify-Header">
                            <h2>使用者編輯</h2>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="d-flex">
                            <b-button class="ml-auto" variant="primary" @click="onFinishEdit">
                                <font-awesome-icon icon="edit" />
                                完成
                            </b-button>
                            <b-button class="ml-2" variant="outline-danger" @click="onCancelEdit">
                                取消
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col xl="6" lg="12" md="12">
                        <TitledCard title="基本">
                            <b-card class="m-2" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="基本資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="id: ">
                                        <b-form-input v-model="userData.id" disabled />
                                    </b-form-group>
                                    <b-form-group label-for="phone" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="電話: ">
                                        <b-form-input id="phone" v-model="userData.phone" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="密碼: ">
                                        <b-form-input v-model="userData.pass" />
                                    </b-form-group>
                                    <b-form-group label-for="name" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="姓名: ">
                                        <b-form-input id="name" v-model="userData.name" />
                                    </b-form-group>
                                    <b-form-group label-for="roleId" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="角色: ">
                                        <b-form-input :value="roleIdMap[userData.roleId]" disabled />
                                    </b-form-group>
                                    <b-form-group label-for="email" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="Email: ">
                                        <b-form-input id="email" v-model="userData.email" />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="性別: ">
                                        <b-form-select v-model="userData.sex">
                                            <option value="M">男性</option>
                                            <option value="F">女性</option>
                                        </b-form-select>
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="身分證號: ">
                                        <b-form-input v-model="userData.idCardNo" />
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="出生年: ">
                                        <b-form-input v-model="userData.birthYear" />
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="出生月: ">
                                        <b-form-input v-model="userData.birthMon" />
                                    </b-form-group>
                                    <b-form-group label-for="" label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="出生日: ">
                                        <b-form-input v-model="userData.birthDate" />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </TitledCard>
                        <TitledCard title="其他">
                            <b-card class="m-2" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="其他資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="創建日期: ">
                                        <b-form-input v-model="userData.createDate" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="創建者: ">
                                        <b-form-input v-model="userData.createBy" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="更新日期: ">
                                        <b-form-input v-model="userData.updateDate" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="更新者: ">
                                        <b-form-input v-model="userData.updateBy" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="狀態: ">
                                        <b-form-input :value="userData.status == 1 ? '啟用中' : '停用'" disabled />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </TitledCard>
                    </b-col>
                    <b-col xl="6" lg="12" md="12">
                        <TitledCard title="地址">
                            <b-card class="m-2" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="地址資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                                        <b-form-select id="city" v-model="userData.addressCity">
                                            <option v-for="(list, index) in cityList" :key="index" :value="list">
                                                {{list}}
                                            </option>
                                        </b-form-select>
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區域: ">
                                        <b-form-select id="area" v-model="userData.addressArea"
                                            @change="fetchRoadName()">
                                            <option v-for="(list, index) in areaList" :key="index" :value="list">
                                                {{list}}
                                            </option>
                                        </b-form-select>
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                                        <scale-loader v-if="isAddressLoading">
                                        </scale-loader>
                                        <b-form-input v-b-tooltip.v-danger="streetErrorMessage"
                                            v-model="userData.addressStreet" @input="change" list="suggestion">
                                        </b-form-input>
                                        <datalist id="suggestion">
                                            <option @click="suggestionClick(index)"
                                                v-for="(suggestion, index) in matches" :key="index">
                                                {{ suggestion }}
                                            </option>
                                        </datalist>
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="門牌樓層: ">
                                        <b-form-input v-model="userData.addressDetail" />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="緯度: ">
                                        <b-form-input v-model="userData.addressLong" disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="經度: ">
                                        <b-form-input v-model="userData.addressLat" disabled />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </TitledCard>
                        <TitledCard title="用戶照片">
                            <base64Img @FileUpload="onFileUpload" />
                            <b-card class="mt-2" title="用戶大頭照">
                                <b-card-body>
                                    <img :src="userData.headShotPath" height="200" alt="">
                                </b-card-body>
                            </b-card>
                        </TitledCard>
                        <TitledCard v-if="userData.roleId == 0" title="專用資料:">
                            <b-form>
                                <b-card class="m-2" bg-variant="light">
                                    <b-form-group label-class="font-weight-bold pt-0" label="銀行資料">
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="銀行帳號: ">
                                            <b-form-input v-model="userData.master.accountNo" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="銀行名稱: ">
                                            <b-form-input v-model="userData.master.bankName" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="銀行代號: ">
                                            <b-form-input v-model="userData.master.bankCode" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="分行代號: ">
                                            <b-form-input v-model="userData.master.branchCode" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="分行名稱: ">
                                            <b-form-input v-model="userData.master.branchName" />
                                        </b-form-group>
                                    </b-form-group>
                                    <b-form-group label-class="font-weight-bold pt-0" label="工項技能(測試用，未來會移除)">
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="技能: ">
                                            <b-form-input v-model="userData.master.skillItems" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="忽略工項: ">
                                            <b-form-input v-model="userData.master.ignoreWorkingCategories" />
                                        </b-form-group>
                                    </b-form-group>
                                    <b-form-group label-class="font-weight-bold pt-0" label="用戶評分(測試用，未來會移除)">
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="平均分數: ">
                                            <b-form-input v-model="userData.avgScore" />
                                        </b-form-group>
                                    </b-form-group>
                                </b-card>
                            </b-form>
                        </TitledCard>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import AreaData from '@/config/AreaData.json'
    import UserRole from '@/config/UserRole.json'
    import Loading from '@/components/Loading.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'
    import Base64Img from '@/components/Upload/base64Img.vue'

    import * as xmljs from 'xml-js'
    import * as iconv from 'iconv-lite'
    import tigermaster from 'fdtigermaster-sdk'
    import RoleIdMapping from '@/model/Mapping/RoleIdMapping.js'

    export default {
        name: 'UserModify',
        components: {
            Loading,
            TitledCard,
            Base64Img,
        },
        data() {
            return {
                UserRole,
                isLoading: false,
                isAddressLoading: false,
                userData: {},
                streetNames: [],
                areadata: AreaData,
                open: true,
                streetErrorMessage: '',
                currentUser: Object,
                roleIdMap: RoleIdMapping()
            };
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
            },
        },
        async created() {
            this.isLoading = true
            const user = await tigermaster.auth.getUserById(this.$route.query.userId);
            this.currentUser = user;
            this.userData = user.data;
            this.isLoading = false;
        },
        methods: {
            async fetchRoadName() {
                this.isAddressLoading = true;
                const result = await fetch(
                    `https://cors-anywhere.herokuapp.com/https://www.post.gov.tw/post/streetNameData?city=${this.userData.addressCity}&cityarea=${this.userData.addressArea}`, {
                        method: "POST"
                    });
                const buffer = await result.arrayBuffer();
                const text = iconv.decode(new Buffer(buffer), 'Big5');
                const converted = await xmljs.xml2js(text, {
                    compact: true,
                    spaces: 4
                });
                const streets = Object.values(converted.street.road_name).map(
                    item => item["_text"]
                );
                this.streetNames = streets.filter(item => item != null)
                this.isAddressLoading = false;
            },
            onNavClick(name) {
                this.currentTab = name;
                this.currentComponent = this.tabComponentMap[name];
            },
            async onFinishEdit() {
                if (this.streetErrorMessage === '') {
                    this.isLoading = true;
                    if (!this.userData.avgScore) {
                        this.userData.avgScore = 0;
                    }
                    delete this.userData["pass"];
                    await this.currentUser.update(this.userData);
                    this.$router.push({
                        path: '/home/user_detail',
                        query: {
                            userId: this.userData.id
                        }
                    });
                    this.isLoading = false;
                }
            },
            onCancelEdit() {
                this.$router.push({
                    path: '/home/user_detail',
                    query: {
                        userId: this.userData.id
                    }
                });
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
            suggestionClick(index) {
                this.userData.addressStreet = this.matches[index];
                this.open = false;
            },
            onFileUpload(img) {
                console.log(img);
            }
        }
    }
</script>

<style scoped>
    #UserModify {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #UserModify .UserModify-Area .UserModify-Header {
        margin: 25px 0px;
        padding: 0px 25px;
        text-align: left;
        color: #000;
    }

    #UserModify .UserModify-Area .nav-tabs {
        border-bottom: 2px solid #c3cfdd;
    }

    #UserModify .UserModify-Area .nav-link {
        color: #476282;
    }

    #UserModify .UserModify-Area .nav-link {
        color: #c3cfdd;
    }

    #UserModify .UserModify-Area .nav-link.active {
        background-color: transparent;
        border-color: transparent;
        border-bottom: solid 3px #457CD6;
        color: #457CD6;
    }

    #UserModify .UserModify-Area ul.nav {
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #UserModify .UserModify-Area ul.nav li {
        display: inline-block;
        float: none;
    }

    @media (max-width: 576px) {
        .container-fluid {
            padding: 0px;
        }
    }
</style>