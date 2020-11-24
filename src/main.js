import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, LayoutPlugin } from 'bootstrap-vue'
import Fragment from 'vue-fragment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faBars,
  faUser,
  faSignOutAlt,
  faAngleRight,
  faAngleLeft,
  faUsers,
  faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(
  faBars,
  faUser,
  faSignOutAlt,
  faAngleRight,
  faAngleLeft,
  faUsers,
  faTachometerAlt
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(Fragment.Plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
