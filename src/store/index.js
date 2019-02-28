import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
const jwt = require('jsonwebtoken')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('access_token') || ''
  },
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
      state.token = ''
    }
  },
  actions: {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST)
        axios({url: 'http://localhost:3000/login', data: user, method: 'POST'})
          .then((response) => {
            const token = response.data.token
            localStorage.setItem('access_token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit(AUTH_SUCCESS, response)
            console.log(token)
            resolve(response)
          }).catch((err) => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('user-token')
            reject(err)
          })
      })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('access_token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
})
