// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faEdit, faTrash, faPlus, faMinus, faCalendar, faEraser, faArrowDown, faArrowLeft, faArrowRight, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VModal from 'vue-js-modal'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

library.add(faCoffee, faEdit, faTrash, faPlus, faMinus, faCalendar, faEraser, faArrowDown, faArrowLeft, faArrowRight, faDownload)

Vue.use(VModal)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
