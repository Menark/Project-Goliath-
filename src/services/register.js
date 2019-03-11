import { HTTP } from '../utils/api'
// import {AUTH_SUCCESS, AUTH_ERROR} from '../services/login'
// import {AUTH_ERROR} from '../services/login'

export const AUTH_REGISTER = 'AUTH_REGISTER'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
const jwt = require('jsonwebtoken')

const state = {
  status: '',
  token: localStorage.getItem('access_token')
}

const mutations = {
  [AUTH_REGISTER]: (state) => {
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
  [AUTH_REGISTER]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REGISTER)
      console.log(user)
      HTTP.post('/users', {
        'email': user.email,
        'password': user.password
      })
        .then(response => {})
      HTTP({url: '/users', data: user, method: 'GET'})
        .then((response) => {
          const array = response.data
          const found = array.some(el => el.email === user.email && el.password === user.password)
          if (found) {
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
          localStorage.removeItem('access_token')
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
