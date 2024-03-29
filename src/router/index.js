import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/views/Auth/Login.vue');

const Home = () => import('@/views/Home/Home.vue');
const HomeDashboard = () => import('@/views/Home/Dashboard.vue');
const HomeClient = () => import('@/views/Home/User/Client.vue');
const HomeMaster = () => import('@/views/Home/User/Master.vue');
const HomeAdmin = () => import('@/views/Home/User/Admin.vue');
const HomeUserDetail = () => import('@/views/Home/User/UserDetail.vue');
const HomeBroadcast = () => import('@/views/Home/Broadcast/Broadcast.vue');
const HomeBroadcastHistory = () => import('@/views/Home/Broadcast/BroadcastHistory.vue')
const HomeSkill = () => import('@/views/Home/Services/Skill.vue');
const HomeWorkingCategory = () => import('@/views/Home/Services/WorkingCategory.vue');
const HomeServiceLevel = () => import('@/views/Home/Services/ServiceLevel.vue')
const HomeClosedOrder = () => import('@/views/Home/Order/ClosedOrder.vue');
const HomeOngoingOrder = () => import('@/views/Home/Order/OngoingOrder.vue');
const HomeOrderDetail = () => import('@/views/Home/Order/OrderDetail.vue');
const HomeOrderFinance = () => import('@/views/Home/Order/Finance.vue')

const Page404 = () => import('@/views/Error/Page404.vue');

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home/',
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
        path: 'broadcast',
        name: 'HomeBroadcast',
        component: HomeBroadcast
      },
      {
        path: 'broadcast_history',
        name: 'HomeBroadcastHistory',
        component: HomeBroadcastHistory
      },
      {
        path: 'skill',
        name: 'HomeSkill',
        component: HomeSkill
      },
      {
        path: 'working_category',
        name: 'HomeCategory',
        component: HomeWorkingCategory
      },
      {
        path: 'service_level',
        name: 'HomeServiceLevel',
        component: HomeServiceLevel
      },
      {
        path: 'closed_order',
        name: 'HomeClosedOrder',
        component: HomeClosedOrder
      },
      {
        path: 'ongoing_order',
        name: 'HomeOngoingdOrder',
        component: HomeOngoingOrder
      },
      {
        path: 'order_detail',
        name: 'HomeOrderDetail',
        component: HomeOrderDetail
      },
      {
        path: 'order_finance',
        name: 'HomeOrderFinance',
        component: HomeOrderFinance
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