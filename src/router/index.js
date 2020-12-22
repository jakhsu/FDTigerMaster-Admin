import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Auth/Login.vue'

import Home from '@/views/Home/Home.vue'
import HomeDashboard from '@/views/Home/Dashboard.vue'
import HomeClient from '@/views/Home/User/Client.vue'
import HomeMaster from '@/views/Home/User/Master.vue'
import HomeAdmin from '@/views/Home/User/Admin.vue'
import HomeUserDetail from '@/views/Home/User/UserDetail.vue'
import HomeBroadcast from '@/views/Home/Broadcast.vue'
import HomeSkill from '@/views/Home/Services/Skill.vue'
import HomeCategory from '@/views/Home/Services/Category.vue'
import HomeCategoryModify from '@/views/Home/Services/CategoryModify.vue'
import HomeUserModify from '@/views/Home/User/UserModify.vue'
import HomeOrder from '@/views/Home/Order/Order.vue'

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
        name: 'HomeUserDetail',
        component: HomeUserDetail
      },
      {
        path: 'user_modify',
        name: 'HomeUserModify',
        component: HomeUserModify
      },
      {
        path: 'broadcast',
        name: 'HomeBroadcast',
        component: HomeBroadcast
      },
      {
        path: 'skill',
        name: 'HomeSkill',
        component: HomeSkill
      },
      {
        path: 'category',
        name: 'HomeCategory',
        component: HomeCategory
      },
      {
        path: 'category_modify',
        name: 'HomeCategotyModify',
        component: HomeCategoryModify
      },
      {
        path: 'order',
        name: 'HomeOrder',
        component: HomeOrder
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