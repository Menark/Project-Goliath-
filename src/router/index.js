import Vue from 'vue'
import Router from 'vue-router'
import LolOfLol from '@/components/LolOfLol'
import FormlogIn from '@/components/FormlogIn'
import Register from '@/components/Register'
// import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'FormlogIn'
      }
    },
    {
      path: '/lol',
      name: 'LolOfLol',
      component: LolOfLol
    },
    {
      path: '/login',
      name: 'FormlogIn',
      component: FormlogIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
