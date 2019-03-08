import axios from 'axios'

export const AUTH_LOGOUT = 'AUTH_LOGOUT'

const state = {
  status: '',
  token: localStorage.getItem('access_token')
}

const mutations = {
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

const actions = {
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

export default {
  state,
  actions,
  mutations
}
