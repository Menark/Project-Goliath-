import Vue from 'vue'
import Router from 'vue-router'
import LolOfLol from '@/components/LolOfLol'
import FormlogIn from '@/components/FormlogIn'
import Register from '@/components/Register'
import store from '../store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
