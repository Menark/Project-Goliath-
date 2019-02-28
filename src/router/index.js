import Vue from 'vue'
import Router from 'vue-router'
import LolOfLol from '@/components/LolOfLol'
import FormlogIn from '@/components/FormlogIn'
import Register from '@/components/Register'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/lol')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

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
      component: LolOfLol,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'FormlogIn',
      component: FormlogIn,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
