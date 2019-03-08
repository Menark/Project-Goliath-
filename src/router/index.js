import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/lol',
      component: () => import('@/components/LolOfLol')
    },
    {
      path: '/login',
      component: () => import('@/components/FormlogIn')
    },
    {
      path: '/register',
      component: () => import('@/components/Register')
    },
    {
      path: '/choose',
      component: () => import('@/components/ChooseWisely')
    }
  ]
})
