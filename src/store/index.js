import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { HTTP } from '../utils/api'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const CHECK_SUCCESS = 'CHECK_SUCCESS'
const jwt = require('jsonwebtoken')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('access_token')
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
    },
    [CHECK_SUCCESS]: (state, token) => {
      state.status = 'success'
      state.token = token
    }
  },
  actions: {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST)
        HTTP({url: '/login', data: user, method: 'GET'})
          .then((response) => {
            if (response.data.username === user.username && response.data.password === user.password) {
              const token = jwt.sign({ user }, 'ssfghyjhh', { expiresIn: 60 })
              console.log(token)
              localStorage.setItem('access_token', token)
              commit(AUTH_SUCCESS, response)
              resolve(response)
            } else {
              console.log('You are not allowed!')
            }
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
        console.log('Removed token succesful bitch')
        console.log(localStorage.getItem('access_token'))
        resolve()
      })
    }
  },
  getters: {
    isAuthenticated: state => state.token === '',
    authStatus: state => state.status
  }
})
