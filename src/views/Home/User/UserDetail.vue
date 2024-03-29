<template>
  <Loading v-if="isLoading" />
  <div v-else id="UserDetail">
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
          <b-nav-item :active="currentTab == 'order'" :disabled="userData.roleId > 2" @click="onNavClick('order')">
            訂單
          </b-nav-item>
          <b-nav-item :active="currentTab == 'userComment'" :disabled="userData.roleId > 2"
            @click="onNavClick('userComment')">
            用戶評分與評論
          </b-nav-item>
          <b-nav-item :active="currentTab == 'userNote'" :disabled="userData.roleId > 2"
            @click="onNavClick('userNote')">
            用戶註記
          </b-nav-item>
          <b-nav-item :active="currentTab == 'certificate'" :disabled="userData.roleId != 0"
            @click="onNavClick('certificate')">
            證照
          </b-nav-item>
          <b-nav-item :active="currentTab == 'masterSkill'" :disabled="userData.roleId != 0"
            @click="onNavClick('masterSkill')">
            技能工項
          </b-nav-item>
        </b-nav>
      </div>
      <component :is="currentComponent" :userData="userData" :user="user" :userId="user._id" @refresh="onRefresh" />
    </b-container>
  </div>
</template>

<script>
  import Loading from '@/components/Loading.vue'
  import SimpleModal from '@/components/Modal/Util/SimpleModal.vue'
  import UserNote from '@/views/Home/User/UserDetailComponent/UserNote.vue'
  import BasicUserDetail from '@/views/Home/User/UserDetailComponent/BasicUserDetail.vue'
  import OrderDetail from '@/views/Home/User/UserDetailComponent/OrderDetail.vue'
  import UserComment from '@/views/Home/User/UserDetailComponent/UserComment.vue'
  import CertificateDetail from '@/views/Home/User/UserDetailComponent/CertificateDetail.vue'
  import MasterSkillDetail from '@/views/Home/User/UserDetailComponent/MasterSkillDetail.vue'

  import tigermaster from 'fdtigermaster-admin-sdk'

  export default {
    name: 'UserDetail',
    components: {
      Loading,
      BasicUserDetail,
      UserComment,
      SimpleModal,
    },
    data() {
      return {
        scoreModal: {
          scoreInput: ''
        },
        isLoading: true,
        currentComponent: BasicUserDetail,
        currentTab: "basic",
        tabComponentMap: {
          basic: BasicUserDetail,
          order: OrderDetail,
          userComment: UserComment,
          userNote: UserNote,
          certificate: CertificateDetail,
          masterSkill: MasterSkillDetail,
        },
        userData: {},
        user: undefined
      };
    },
    created() {
      this.setUserFromRouteParam(this.$route.query.userId)
    },
    methods: {
      async setUserFromRouteParam(id) {
        const user = await tigermaster.auth.getUserById(id);
        this.user = user;
        this.userData = user.data;
        this.isLoading = false;
      },
      onNavClick(name) {
        this.currentTab = name;
        this.currentComponent = this.tabComponentMap[name];
      },
      async onRefresh() {
        this.isLoading = true;
        const user = await tigermaster.auth.getUserById(this.$route.query.userId);
        this.user = user;
        this.userData = user.data;
        this.isLoading = false;
      }
    },
    beforeRouteUpdate(to) {
      this.setUserFromRouteParam(to.query.userId)
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