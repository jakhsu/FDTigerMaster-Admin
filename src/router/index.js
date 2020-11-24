import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Auth/Login.vue'

import Home from '@/views/Home/Home.vue'
import HomeDashboard from '@/views/Home/Dashboard.vue'
import HomeClient from '@/views/Home/Client.vue'
import HomeClientDetail from '@/views/Home/ClientDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
        { 
            path: '',
            component: HomeDashboard
        },
        {
            path: 'client',
            component: HomeClient
        },
        {
            path: 'client_detail',
            component: HomeClientDetail
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
