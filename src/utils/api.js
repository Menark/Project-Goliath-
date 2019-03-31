import axios from 'axios'
// const jwt = require('jsonwebtoken')

export const HTTP = axios.create({
  baseURL: 'http://localhost:3000'
})

HTTP.interceptors.request.use(
  (config) => {
    let tokenNew = localStorage.getItem('access_token')
    // const decoded = jwt.verify(tokenNew, 'ssfghyjhh')
    if (tokenNew) {
      config.headers['Authorization'] = `Bearer ${tokenNew}`
    }
    console.log(config.headers.Authorization)
    return config
  },
  (error) => {
    return Promise.reject(error)
  })
