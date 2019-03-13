import axios from 'axios'
// const jwt = require('jsonwebtoken')

export const HTTP = axios.create({
  baseURL: 'http://localhost:3004'
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

// // This is a protected route
// axios.get('/lol', checkToken, (req, res) => {
//   // verify the JWT token generated for the user
//   jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
//     if (err) {
//     // If error send Forbidden (403)
//       console.log('ERROR: Could not connect to the protected route')
//       res.sendStatus(403)
//     } else {
//     // If token is successfully verified, we can send the autorized data
//       res.json({
//         message: 'Successful log in',
//         authorizedData
//       })
//       console.log('SUCCESS: Connected to protected route')
//     }
//   })
// })
