export const DARK_MODE = 'DARK_MODE'
export const LIGHT_MODE = 'LIGHT_MODE'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

const state = {
  status: '',
  isDark: localStorage.getItem('dark'),
  isLight: localStorage.getItem('light')
}

const mutations = {
  [DARK_MODE]: (state) => {
    state.isDark = localStorage.getItem('dark')
  },
  [LIGHT_MODE]: (state) => {
    state.isLight = localStorage.getItem('light')
  },
  [AUTH_SUCCESS]: (state) => {
    state.isDark = localStorage.getItem('dark')
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  }
}

const actions = {
  [DARK_MODE]: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(DARK_MODE)
      localStorage.removeItem('light')
      const darkmode = '123'
      localStorage.setItem('dark', darkmode)
      commit(AUTH_SUCCESS)
      console.log('dark:' + localStorage.getItem('dark'))
    }).catch((err) => {
      commit(AUTH_ERROR, err)
      localStorage.removeItem('dark')
    })
  },
  [LIGHT_MODE]: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(LIGHT_MODE)
      localStorage.removeItem('dark')
      const lightmode = '321'
      localStorage.setItem('light', lightmode)
      commit(AUTH_SUCCESS)
      console.log('light:' + localStorage.getItem('light'))
    }).catch((err) => {
      commit(AUTH_ERROR, err)
      localStorage.removeItem('light')
    })
  }
}

const getters = {
  isDarkModed: state => state.isDark,
  isLightModed: state => state.isLight
}

export default {
  state,
  mutations,
  actions,
  getters
}
