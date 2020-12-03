<template>
    <Loading v-if="isLoading" />
    <div v-else id="UserDetail">
        <SimpleModal id="Simple-Modal" />
        <b-container fluid>
            <div class="UserDetail-Area">
                <b-row>
                    <b-col>
                        <div class="UserDetail-Header">
                            <h2>使用者詳情</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-nav tabs>
                    <b-nav-item :active="currentTab == 'basic'" @click="onNavClick('basic')">
                        基本資料
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'order'" @click="onNavClick('order')">
                        訂單
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'userComment'" @click="onNavClick('userComment')">
                        用戶評分與評論
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'userNote'" @click="onNavClick('userNote')">
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
    import UserComment from '@/views/Home/User/UserDetailComponent/UserComment.vue'
    import UserNote from '@/views/Home/User/UserDetailComponent/UserNote.vue'
    import CertificateDetail from '@/views/Home/User/UserDetailComponent/CertificateDetail.vue'
    import MasterSkillDetail from '@/views/Home/User/UserDetailComponent/MasterSkillDetail.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    export default {
        name: 'UserDetail',
        components: {
            Loading,
            BasicDetail,
            UserComment,
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
                    userComment: UserComment,
                    userNote: UserNote,
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
    #UserDetail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #UserDetail .UserDetail-Area .UserDetail-Header {
        margin: 25px 0px;
        padding: 0px 25px;
        text-align: left;
        color: #000;
    }

    #UserDetail .UserDetail-Area .nav-tabs {
        border-bottom: 2px solid #c3cfdd;
    }

    #UserDetail .UserDetail-Area .nav-link {
        color: #476282;
    }

    #UserDetail .UserDetail-Area .nav-link.disabled {
        color: #c3cfdd;
    }

    #UserDetail .UserDetail-Area .nav-link.active {
        background-color: transparent;
        border-color: transparent;
        border-bottom: solid 3px #457CD6;
        color: #457CD6;
    }

    #UserDetail .UserDetail-Area ul.nav {
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #UserDetail .UserDetail-Area ul.nav li {
        display: inline-block;
        float: none;
    }

    @media (max-width: 576px) {
        .container-fluid {
            padding: 0px;
        }
    }
</style>