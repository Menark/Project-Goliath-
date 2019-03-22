import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../services/auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth
  }
})
