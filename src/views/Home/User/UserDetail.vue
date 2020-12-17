<template>
    <Loading v-if="isLoading" />
    <div v-else id="UserDetail">
        <SimpleModal id="Score-Modal" title="修改平均分數">
            <template #modalBody>
                <b-form-group>
                    <h5 for="scoreChange">新平均分數: <b-badge variant="success">{{scoreModal.scoreInput}}</b-badge>
                    </h5>
                    <b-form-input id="scoreChange" v-model="scoreModal.scoreInput" type="range" min="0" max="5"
                        placeholder="1.0" step="0.5">
                    </b-form-input>
                </b-form-group>
            </template>
        </SimpleModal>
        <SimpleModal @onSaveClick="onDeactivate" id="Deactivate-Modal" title="凍結">
            <template #modal-body>
                <b-form-group label="輸入凍結理由">
                    <b-form-textarea required v-model="deactivateComment"></b-form-textarea>
                </b-form-group>
            </template>
        </SimpleModal>
        <SimpleModal @onSaveClick="onReactivate" id="Reactivate-Modal" title="恢復">
            <template #modal-body>
                <b-form-group label="輸入恢復理由">
                    <b-form-textarea required v-model="reactivateComment"></b-form-textarea>
                </b-form-group>
            </template>
        </SimpleModal>
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
                    <b-nav-item :active="currentTab == 'order'" @click="onNavClick('order')"
                        :disabled="userData.roleId > 1">
                        訂單
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'userComment'" :disabled="userData.roleId > 1"
                        @click="onNavClick('userComment')">
                        用戶評分與評論
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'userNote'" :disabled="userData.roleId > 1"
                        @click="onNavClick('userNote')">
                        用戶註記
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'certificate'" :disabled="userData.roleId != 1"
                        @click="onNavClick('certificate')">
                        證照
                    </b-nav-item>
                    <b-nav-item :active="currentTab == 'masterSkill'" :disabled="userData.roleId != 1"
                        @click="onNavClick('masterSkill')">
                        技能工項
                    </b-nav-item>
                </b-nav>
            </div>
            <component :is="currentComponent" :user="userData" :currentUser="currentUser"></component>
        </b-container>
    </div>
</template>

<script>
    import Loading from '@/components/Loading.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'
    import UserNote from '@/views/Home/User/UserDetailComponent/UserNote.vue'
    import BasicDetail from '@/views/Home/User/UserDetailComponent/BasicDetail.vue'
    import OrderDetail from '@/views/Home/User/UserDetailComponent/OrderDetail.vue'
    import UserComment from '@/views/Home/User/UserDetailComponent/UserComment.vue'
    import CertificateDetail from '@/views/Home/User/UserDetailComponent/CertificateDetail.vue'
    import MasterSkillDetail from '@/views/Home/User/UserDetailComponent/MasterSkillDetail.vue'

    import tigermaster from 'fdtigermaster-sdk'

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
                scoreModal: {
                    scoreInput: ''
                },
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
                userData: {},
                deactivateComment: '',
                reactivateComment: '',
                currentUser: '',
            };
        },
        async created() {
            const user = await tigermaster.auth.getUserById(this.$route.query.userId);
            this.currentUser = user;
            this.userData = user.data;
            this.isLoading = false;
        },
        methods: {
            onNavClick(name) {
                this.currentTab = name;
                this.currentComponent = this.tabComponentMap[name];
            },
            async onDeactivate() {
                if (this.deactivateComment !== '') {
                    this.userData.active = 0
                    await this.currentUser.update(this.userData);
                }
            },
            async onReactivate() {
                if (this.reactivateComment !== '') {
                    this.userData.active = 1
                    await this.currentUser.update(this.userData);
                }
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