import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { Promised } from 'vue-promised'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.component('Promised', Promised)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
