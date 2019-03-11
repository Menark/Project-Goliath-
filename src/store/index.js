import Vue from 'vue'
import Vuex from 'vuex'
import login from '../services/login'
import logout from '../services/logout'
import register from '../services/register'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    logout,
    register
  }
})
