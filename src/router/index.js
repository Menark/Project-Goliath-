import Vue from 'vue'
import Router from 'vue-router'
import LolOfLol from '@/components/LolOfLol'
import FormlogIn from '@/components/FormlogIn'
import Register from '@/components/Register'
import ChooseWisely from '@/components/ChooseWisely'
import store from '../store'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/choose',
      name: 'ChooseWisely',
      component: ChooseWisely
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log('Token is out')
    next('/login')
  } else {
    next()
  }
})

export default router
