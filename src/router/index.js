import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Auth/Login.vue'

import Home from '@/views/Home/Home.vue'
import HomeDashboard from '@/views/Home/Dashboard.vue'
import HomeUser from '@/views/Home/User/User.vue'
import HomeUserDetail from '@/views/Home/User/UserDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
        { 
            path: '',
            name: 'Home',
            component: HomeDashboard
        },
        {
            path: 'user',
            name: 'HomeUser',
            component: HomeUser
        },
        {
            path: 'user_detail',
            component: HomeUserDetail
        }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
