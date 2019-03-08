import { HTTP } from '../utils/api'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
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
  }
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      HTTP({url: '/login', data: user, method: 'GET'})
        .then((response) => {
          const arr = response.data
          const found = arr.some(el => el.email === user.email && el.password === user.password)
          if (found) {
            const token = jwt.sign({ user }, 'ssfghyjhh', { expiresIn: 60 })
            console.log(token)
            localStorage.setItem('access_token', token)
            commit(AUTH_SUCCESS, response)
            resolve(response)
          } else {
            alert('You are not allowed!')
          }
        }).catch((err) => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          reject(err)
        })
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
