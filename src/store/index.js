import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../services/auth'
import changeMode from '../services/changeMode'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    changeMode
  }
})
