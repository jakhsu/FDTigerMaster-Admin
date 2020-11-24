import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, LayoutPlugin } from 'bootstrap-vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import Fragment from 'vue-fragment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faBars,
  faUser,
  faUsers,
  faAngleLeft,
  faEllipsisV,
  faSignOutAlt,
  faAngleRight,
  faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(
  faBars,
  faUser,
  faUsers,
  faAngleLeft,
  faEllipsisV,
  faSignOutAlt,
  faAngleRight,
  faTachometerAlt
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('scale-loader', ScaleLoader)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(Fragment.Plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
