<template>
    <Loading v-if="isLoading" />
    <div v-else id="UserDetail">
        <b-container fluid>
            <div class="UserDetail-Area">
                <b-row>
                    <b-col>
                        <div class="UserDetail-Header">
                            <h2>User Detail</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-nav tabs>
                    <b-nav-item name="basic"
                        :active="currentTab == 'basic'"
                        @click="onNavClick('basic')">
                        基本資料
                    </b-nav-item>
                    <b-nav-item name="clientNote"
                        :active="currentTab == 'clientNote'"
                        :disabled="userData.roleId != 0"
                        @click="onNavClick('clientNote')">
                        客戶評分
                    </b-nav-item>
                    <b-nav-item name="masterNote"
                        :active="currentTab == 'masterNote'"
                        :disabled="userData.roleId != 1"
                        @click="onNavClick('masterNote')">
                        師傅註記
                    </b-nav-item>
                    <b-nav-item name="certificate"
                        :active="currentTab == 'certificate'"
                        :disabled="userData.roleId != 1"
                        @click="onNavClick('certificate')">
                        證照
                    </b-nav-item>
                    <b-nav-item name="masterSkill"
                        :active="currentTab == 'masterSkill'" 
                        :disabled="userData.roleId != 1"
                        @click="onNavClick('masterSkill')">
                        師傅技能
                    </b-nav-item>
                </b-nav>
            </div>
        </b-container>
        <component :is="currentComponent"></component>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import BasicDetail from './UserDetailComponent/BasicDetail';
import ClientNoteDetail from './UserDetailComponent/ClientNoteDetail';
export default {
    name: 'UserDetail',
    components: {
        Loading,
        BasicDetail,
        ClientNoteDetail
    },
    data(){
        return{
            isLoading: true,
            currentComponent: BasicDetail,
            currentTab: "basic",
            tabComponentMap: {
                basic: BasicDetail,
                clientNote: ClientNoteDetail
            },
            userData: {}
        };
    },
    created(){
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
            roleId:"1",
            createDate: "2020/11/24 09:57"
        }
        this.isLoading = false;
    },
    methods:{
        onNavClick(name){
            console.log(name);
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

#UserDetail .UserDetail-Area .UserDetail-Header{
    margin: 25px 0px;
    padding: 0px 25px;
    text-align: left;
    color: #000;
}

#UserDetail .UserDetail-Area .nav-tabs{
    border-bottom: 2px solid #c3cfdd;
}

#UserDetail .UserDetail-Area .nav-link{
    color: #476282;
}

#UserDetail .UserDetail-Area .nav-link.disabled{
    color: #c3cfdd;
}

#UserDetail .UserDetail-Area .nav-link.active{
    background-color: transparent;
    border-color: transparent ;
    border-bottom: solid 3px #457CD6;
    color: #457CD6;
}
</style>