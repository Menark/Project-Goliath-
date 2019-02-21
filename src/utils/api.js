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
