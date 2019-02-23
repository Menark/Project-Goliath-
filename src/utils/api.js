import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export {getPublicComments, getPrivateProfile}

function getPublicComments () {
  const url = `${BASE_URL}/comments`
  return axios.get(url).then(response => response.data)
}

function getPrivateProfile () {
  const url = `${BASE_URL}/profile`
  return axios.get(url).then(response => response.data)
}

// const jwt = require('jsonwebtoken')
// const user = require('../../user.js')
// 13
// // Check to make sure header is not undefined, if so, return Forbidden (403)
// const checkToken = (req, res, next) => {
//   const header = req.headers['authorization']
//   if (typeof header !== 'undefined') {
//     const bearer = header.split(' ')
//     const token = bearer[1]
//     req.token = token
//     next()
//   } else {
//     // If header is undefined return Forbidden (403)
//     res.sendStatus(403)
//   }
// }
// 123
// axios.post('/login', (req, res, next) => {
//   const { body } = req
//   const { username } = body
//   const { password } = body
// 13
//   // checking to make sure the user entered the correct username/password combo
//   if (username === user.username && password === user.password) {
//     // if user log in success, generate a JWT token for the user with a secret key
//     jwt.sign({user}, 'privatekey', { expiresIn: '1h' }, (err, token) => {
//       if (err) { console.log(err) }
//       res.send(token)
//     })
//   } else {
//     console.log('ERROR: Could not log in')
//   }
// })
// 123
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
