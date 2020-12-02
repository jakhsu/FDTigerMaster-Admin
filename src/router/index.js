import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Auth/Login.vue'

import Home from '@/views/Home/Home.vue'
import HomeDashboard from '@/views/Home/Dashboard.vue'
import HomeClient from '@/views/Home/User/Client.vue'
import HomeMaster from '@/views/Home/User/Master.vue'
import HomeAdmin from '@/views/Home/User/Admin.vue'
import HomeUserDetail from '@/views/Home/User/UserDetail.vue'
import HomeWorkingSkill from '@/views/Home/Work/WorkingSkill.vue'
import HomeWorkingCategory from '@/views/Home/Work/WorkingCategory.vue'
import HomeBroadcast from '@/views/Home/Broadcast.vue'
import HomeWorkingPairing from '@/views/Home/Work/WorkingPairing.vue'

import Page404 from '@/views/Error/Page404.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
        path: '',
        name: 'Home',
        component: HomeDashboard
      },
      {
        path: 'client',
        name: 'HomeClient',
        component: HomeClient
      },
      {
        path: 'master',
        name: 'HomeMaster',
        component: HomeMaster
      },
      {
        path: 'admin',
        name: 'HomeAdmin',
        component: HomeAdmin
      },
      {
        path: 'user_detail',
        component: HomeUserDetail
      },
      {
        path: 'Work/working_skill',
        component: HomeWorkingSkill
      },
      {
        path: 'working_category',
        component: HomeWorkingCategory
      },
      {
        path: 'broadcast',
        component: HomeBroadcast
      },
      {
        path: 'working_pairing',
        component: HomeWorkingPairing
      }
    ]
  },
  {
    path: "*",
    component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;