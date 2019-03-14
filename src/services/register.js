import { HTTP } from '../utils/api'
// import {AUTH_SUCCESS, AUTH_ERROR} from '../services/login'
// import {AUTH_ERROR} from '../services/login'

export const AUTH_REGISTER = 'AUTH_REGISTER'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
// const jwt = require('jsonwebtoken')

const state = {
  status: '',
  token: localStorage.getItem('access_token')
}

const mutations = {
  [AUTH_REGISTER]: (state) => {
    state.status = 'loading'
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  }
}

const actions = {
  [AUTH_REGISTER]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      console.log(user)
      HTTP.post('/users', {
        'email': user.email,
        'password': user.password
      }).then(response => {})
        .catch((err) => {
          commit(AUTH_ERROR, err)
          // localStorage.removeItem('access_token')
          reject(err)
        })
    })
  }
}

// const getters = {
//   isAuthenticated: state => state.token === '',
//   authStatus: state => state.status
// }

export default {
  state,
  // getters,
  actions,
  mutations
}
