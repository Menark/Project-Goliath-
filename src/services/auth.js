import { HTTP } from '../utils/api'
import axios from 'axios'

export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_REGISTER = 'AUTH_REGISTER'

const jwt = require('jsonwebtoken')

const state = {
  status: '',
  IsLogined: localStorage.getItem('access_token')
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state) => {
    state.status = 'success'
    state.IsLogined = localStorage.getItem('access_token')
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = ''
    state.IsLogined = localStorage.getItem('access_token')
  },
  [AUTH_REGISTER]: (state) => {
    state.status = 'success'
  }
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      HTTP({url: '/users', data: user, method: 'GET'})
        .then((response) => {
          const arr = response.data
          const found = arr.some(el => el.email === user.email && el.password === user.password)
          if (found === true) {
            const token = jwt.sign({ user }, 'ssfghyjhh', { expiresIn: 60 })
            console.log(token)
            localStorage.setItem('access_token', token)
            commit(AUTH_SUCCESS, response)
            resolve(response)
          } else {
            commit(AUTH_ERROR, response)
            console.log('You are not allowed!')
            reject(response)
          }
        }).catch((err) => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('access_token')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({commit}) => {
    localStorage.removeItem('access_token')
    delete axios.defaults.headers.common['Authorization']
    commit(AUTH_LOGOUT)
    console.log('Removed token succesful bitch')
    console.log(localStorage.getItem('access_token'))
  },
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

const getters = {
  isAuthenticated: state => state.IsLogined,
  authStatus: state => state.status
}

export default {
  state,
  mutations,
  actions,
  getters
}
