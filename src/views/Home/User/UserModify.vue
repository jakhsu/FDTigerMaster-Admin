<template>
    <Loading v-if="isLoading" />
    <div v-else id="UserModify">
        <SimpleModal id="Simple-Modal" />
        <b-container fluid>
            <div class="UserModify-Area">
                <b-row>
                    <b-col>
                        <div class="UserModify-Header">
                            <h2>使用者修改</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="3" md="4" lg="2">
                        <DataCard color="#4e73df" title="平均分數" :data="4.45" :trend="1" />
                    </b-col>
                    <b-col sm="3" md="4" lg="2">
                        <DataCard color="#4e73df" title="平均月收" :data="45000" :trend="2000" />
                    </b-col>
                </b-row>
                <b-nav tabs>
                    <b-nav-item :active="currentTab == 'basic'" @click="onNavClick('basic')">
                        基本資料
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'order'" @click="onNavClick('order')">
                        訂單
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'userNote'" @click="onNavClick('userNote')">
                        用戶評分與評論
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'userRemark'" @click="onNavClick('userRemark')">
                        用戶註記
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'certificate'" :disabled="userData.roleId != 1"
                        @click="onNavClick('certificate')">
                        證照
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'masterSkill'" :disabled="userData.roleId != 1"
                        @click="onNavClick('masterSkill')">
                        師傅技能
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'masterIncome'" :disabled="userData.roleId != 1"
                        @click="onNavClick('masterIncome')">
                        師傅收入
                    </b-nav-item>
                </b-nav>
            </div>
            <component :is="currentComponent"></component>
        </b-container>
    </div>
</template>

<script>
    import Loading from '@/components/Loading.vue'
    import BasicDetail from '@/views/Home/User/UserDetailComponent/BasicDetail.vue'
    import OrderDetail from '@/views/Home/User/UserDetailComponent/OrderDetail.vue'
    import UserNoteDetail from '@/views/Home/User/UserDetailComponent/UserNoteDetail.vue'
    import UserRemarkDetail from '@/views/Home/User/UserDetailComponent/UserRemarkDetail.vue'
    import CertificateDetail from '@/views/Home/User/UserDetailComponent/CertificateDetail.vue'
    import MasterSkillDetail from '@/views/Home/User/UserDetailComponent/MasterSkillDetail.vue'
    import DataCard from '@/components/Card/DataCard.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    export default {
        name: 'UserModify',
        components: {
            Loading,
            BasicDetail,
            UserNoteDetail,
            DataCard,
            SimpleModal,
        },
        data() {
            return {
                isLoading: true,
                currentComponent: BasicDetail,
                currentTab: "basic",
                tabComponentMap: {
                    basic: BasicDetail,
                    order: OrderDetail,
                    userNote: UserNoteDetail,
                    userRemark: UserRemarkDetail,
                    certificate: CertificateDetail,
                    masterSkill: MasterSkillDetail,
                },
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
                addressDetail: "10號",
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

    #UserModify .UserModify-Area .nav-link.disabled {
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