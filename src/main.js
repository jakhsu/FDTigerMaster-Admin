import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    BootstrapVue,
    LayoutPlugin
} from 'bootstrap-vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import Fragment from 'vue-fragment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as Sentry from "@sentry/vue"
import {
    Integrations
} from "@sentry/tracing"

if (process.env.VUE_APP_STAGE !== 'local') {
    Sentry.init({
        Vue,
        dsn: "https://499fc93fa90d4968b3848e72b2c0967c@o556732.ingest.sentry.io/5688111",
        Integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0
    })
}

import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {
    faBars,
    faBan,
    faSync,
    faTimes,
    faUser,
    faEdit,
    faLink,
    faClock,
    faCheck,
    faUsers,
    faTools,
    faPhone,
    faSmile,
    faSearch,
    faHammer,
    faUpload,
    faHardHat,
    faArchive,
    faComments,
    faTrashAlt,
    faUserSlash,
    faAngleLeft,
    faEllipsisV,
    faPaperclip,
    faMoneyCheck,
    faUserShield,
    faSignOutAlt,
    faAngleRight,
    faDollarSign,
    faPaperPlane,
    faPlusSquare,
    faInfoCircle,
    faAddressCard,
    faCalendarAlt,
    faMapMarkerAlt,
    faFileContract,
    faTachometerAlt,
    faHourglassHalf
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faBars,
    faBan,
    faSync,
    faTimes,
    faUser,
    faEdit,
    faLink,
    faClock,
    faCheck,
    faUsers,
    faTools,
    faPhone,
    faSmile,
    faSearch,
    faHammer,
    faUpload,
    faHardHat,
    faArchive,
    faComments,
    faTrashAlt,
    faUserSlash,
    faAngleLeft,
    faEllipsisV,
    faPaperclip,
    faMoneyCheck,
    faUserShield,
    faSignOutAlt,
    faAngleRight,
    faDollarSign,
    faPaperPlane,
    faPlusSquare,
    faInfoCircle,
    faAddressCard,
    faCalendarAlt,
    faMapMarkerAlt,
    faFileContract,
    faTachometerAlt,
    faHourglassHalf
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('scale-loader', ScaleLoader)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(Fragment.Plugin)

navigator.serviceWorker.register('firebase-messaging-sw.js', {
    scope: 'firebase-cloud-messaging-push-scope'
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')