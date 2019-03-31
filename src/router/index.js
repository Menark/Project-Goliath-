import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // component: () => import('../App')
      redirect: '/startpage'
    },
    {
      path: '/login',
      component: () => import('@/components/FormLogIn')
    },
    {
      path: '/register',
      component: () => import('@/components/Register')
    },
    {
      path: '/choose',
      component: () => import('@/components/ChooseWisely'),
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/startpage',
      component: () => import('@/components/StartPage')
    },
    {
      path: '/profile',
      component: () => import('@/components/Profile'),
      meta: {
        requiredAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (store.getters.isAuthenticated) {
      next()
    } else {
      console.log('Вы не авторизованы!')
      next('/startpage')
    }
  } else {
    next()
  }
})

export default router
