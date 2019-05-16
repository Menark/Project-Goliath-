import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  'en': {
    welcomM: 'There is nothing but empty space!!!',
    btnLogout: 'Logout',
    btnLogin: 'Login',
    btnRegister: 'Register',
    profile: 'Profile',
    startPage: 'Home',
    codeWars: 'Codewars account',
    gitHub: 'GitHub account',
    settingsPage: 'Settings',
    project: 'Project ',
    goliath: 'GOLIATH',
    showModel: 'Show post',
    sendComment: 'Send commment',
    hello: 'Hello!',
    currentDate: 'Current Time: ',
    sendPost: 'Post',
    images: 'Images',
    video: 'Video',
    linkToProf: 'Link to Profile',
    reset: 'Reset',
    authorization: 'Authorization'
  },
  'ru': {
    welcomM: 'Здесь просто пустое поле!!!',
    btnLogout: 'Выйти',
    btnLogin: 'Войти',
    btnRegister: 'Регистрация',
    profile: 'Профиль',
    startPage: 'Домой',
    codeWars: 'Codewars аккаунт',
    gitHub: 'GitHub аккаунт',
    settingsPage: 'Настройки',
    project: 'Проект ',
    goliath: 'ГОЛИАФ',
    showModel: 'Показать пост',
    sendComment: 'Прокомментировать',
    hello: 'Привет!',
    currentDate: 'Сейчас: ',
    sendPost: 'Отправить',
    images: 'Картинки',
    video: 'Видео',
    linkToProf: 'К Профилю',
    reset: 'Сбросить',
    authorization: 'Авторизация'
  }
}

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})
