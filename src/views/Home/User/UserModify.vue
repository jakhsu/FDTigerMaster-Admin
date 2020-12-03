<template>
    <Loading v-if="isLoading" />
    <div v-else id="UserModify">
        <!-- <b-toast variant="success" id="successEdit" title="恭喜">
            您已經完成修改
        </b-toast> -->
        <SimpleModal id="Simple-Modal" />
        <b-container fluid>
            <b-row class="mt-3" align-h="end">
                <b-col>
                    <div class="UserModify-Header">
                        <h2>使用者編輯</h2>
                    </div>
                </b-col>
                <b-col>
                    <div class="d-flex">
                        <b-button class="ml-auto" variant="success" @click="onFinishEdit">
                            <font-awesome-icon icon="edit" />
                            完成
                        </b-button>
                        <b-button class="ml-2" variant="danger" @click="onCancelEdit">
                            取消
                        </b-button>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="6" md="12">
                    <TitledCard title="用戶共通:">
                        <b-form>
                            <b-card class="m-4" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="基本資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="id: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-for="phone" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="電話: ">
                                        <b-form-input id="phone" value="0900123456">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="密碼: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-for="name" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="姓名: ">
                                        <b-form-input id="name" value="徐子鈞">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-for="roleId" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="角色: ">
                                        <b-form-input id="roleId" value="師傅">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-for="email" label-align-sm="right" label-cols="3"
                                        label-cols-xl="2" label="Email: ">
                                        <b-form-input id="email" value="fdtaigermaster@email.com.tw">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="性別: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="身分證號: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="出生日期: ">
                                        <b-form-input />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                            <b-card class="m-4" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="地址資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="城市: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="區域: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="街道: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="門牌樓層: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="緯度: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="經度: ">
                                        <b-form-input />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                            <b-card class="m-4" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="其他資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="創建日期: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="創建者: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="更新日期: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="更新者: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="Active: ">
                                        <b-form-input disabled />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-form>
                    </TitledCard>
                </b-col>
                <b-col lg="6" md="12">
                    <TitledCard title="師傅專用:">
                        <b-form>
                            <b-card class="m-4" bg-variant="light">
                                <b-form-group label-class="font-weight-bold pt-0" label="銀行資料">
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="銀行帳號: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="銀行名稱: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="銀行代號: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="分行代號: ">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                        label="分行名稱: ">
                                        <b-form-input />
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-form>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Loading from '@/components/Loading.vue'
    import TitledCard from '@/components/Card/TitledCard.vue'

    export default {
        name: 'UserModify',
        components: {
            Loading,
            TitledCard,
        },
        data() {
            return {
                isLoading: true,
                userData: {}
            };
        },
        created() {
            this.userData = {
                id: "202011240001",
                phone: "0975555319",
                name: "陳柏瑞",
                email: "rui.chen@fdtigermaster.com",
                addressCity: "新北市",
                addressArea: "永和區",
                addressStreet: "文化路67巷3弄",
                addressModify: "10號",
                active: "1",
                roleId: "1",
                createDate: "2020/11/24 09:57"
            }
            this.isLoading = false;
        },
        methods: {
            onNavClick(name) {
                this.currentTab = name;
                this.currentComponent = this.tabComponentMap[name];
            },
            onFinishEdit() {
                // this.$bvToast.show('successEdit')
                this.$router.push({
                    path: '/home/user_detail',
                    query: {
                        userId: "202011240001"
                    }
                });
            },
            onCancelEdit() {
                this.$router.push({
                    path: '/home/user_detail',
                    query: {
                        userId: "202011240001"
                    }
                });
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

    #UserModify .UserModify-Area .nav-link. {
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