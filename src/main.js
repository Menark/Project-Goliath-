// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

export const HTTP = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer (token)'
  }
})

const token = localStorage.getItem('access_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

//* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)}).$mount('#app')
