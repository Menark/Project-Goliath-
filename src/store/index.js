// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
// er
// const router = Vue.Router
// er
// Vue.use(Vuex)
// er
// export default new Vuex.Store({
//   state: {
//     status: '',
//     token: localStorage.getItem('token') || '',
//     user: {}
//   },
//   mutations: {
//     auth_request (state) {
//       state.status = 'loading'
//     },
//     auth_success (state, token, user) {
//       state.status = 'success'
//       state.token = token
//       state.user = user
//     },
//     auth_error (state) {
//       state.status = 'error'
//     },
//     logout (state) {
//       state.status = ''
//       state.token = ''
//     }
//   },
//   actions: {
//     login (context, creds, redirect) {
//       axios.post('http://localhost:3000/login', creds)
//         .then((response) => {
//           localStorage.setItem('access_token', response.data.access_token)
//           this.user.authenticated = true
//           if (redirect) {
//             router.push(redirect)
//           }
//         }).catch((err) => {
//           context.error = err.response.data
//         })
//     },
//     register ({commit}, user) {
//       return new Promise((resolve, reject) => {
//         commit('auth_request')
//         axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
//           .then(resp => {
//             const token = resp.data.token
//             const user = resp.data.user
//             localStorage.setItem('token', token)
//             axios.defaults.headers.common['Authorization'] = token
//             commit('auth_success', token, user)
//             resolve(resp)
//           })
//           .catch(err => {
//             commit('auth_error', err)
//             localStorage.removeItem('token')
//             reject(err)
//           })
//       })
//     },
//     logout ({commit}) {
//       return new Promise((resolve, reject) => {
//         commit('logout')
//         localStorage.removeItem('token')
//         delete axios.defaults.headers.common['Authorization']
//         resolve()
//       })
//     }
//   },
//   getters: {
//     isLoggedIn: state => !!state.token,
//     authStatus: state => state.status
//   }
// })
