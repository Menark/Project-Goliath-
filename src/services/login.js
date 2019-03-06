import { HTTP } from '../utils/api'
import axios from 'axios'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
const jwt = require('jsonwebtoken')

const state = {
  status: '',
  token: localStorage.getItem('access_token')
}

const mutations = {
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
}

const actions = {
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
}

const getters = {
  isAuthenticated: state => state.token === '',
  authStatus: state => state.status
}

export default {
  state,
  getters,
  actions,
  mutations
}
