import { HTTP } from '../utils/api'
// import { AUTH_LOGOUT } from './logout'

export {getPosts, getPublicComments, getPrivateProfile, getUsers}

function getPosts () {
  return HTTP.get('/posts')
    .then(response => response.data)
    .catch(function (error) {
      console.log(error)
    })
}

function getPublicComments () {
  return HTTP.get('/comments')
    .then(response => response.data.some(el => el.id === 4 && el.body === 'У vtyz получилось!!!'))
    .catch(function (error) {
      console.log(error)
    })
}

function getPrivateProfile () {
  return HTTP.get('/profile')
    .then(response => response.data)
    .catch(function (error) {
      console.log(error)
    })
}

function getUsers () {
  return HTTP.get('/login')
    .then(response => response.data)
    .catch(function (error) {
      console.log(error)
    })
}

// function logOut () {
//   this.$store.dispatch(AUTH_LOGOUT)
//     .then(() => {
//       this.$router.push('/login')
//     })
// }
