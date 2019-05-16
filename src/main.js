// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {i18n} from './i18n.js'
import moment from 'moment'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

//* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  moment,
  router,
  store,
  axios,
  render: h => h(App)}).$mount('#app')
