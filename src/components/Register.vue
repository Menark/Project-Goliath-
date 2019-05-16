<template>
  <div class="reg">
    <form @submit.prevent="register" class="form" novalidate="true">
      <router-link to="/login" class="labelSignIn">{{ $t('authorization') }}</router-link>
      <div class="inputEmail">
        <input class="inputTreesome" type="email" v-model="email" required placeholder="Email Address">
      </div>
      <div class="tooltipEmail">
          {{ wrongEmail }}
      </div>
      <div class="inputPassword">
        <input class="inputTreesome" type="password" v-model="password" required placeholder="Password">
      </div>
      <div class="tooltipPassword">
        {{ wrongPassword }}
      </div>
      <div class="inputConfirmPassword">
        <input class="inputTreesome" type="password" v-model="password_confirm" required placeholder="Confirm password">
      </div>
      <div class="tooltipConfirmPassword">
        {{ wrongConfirmPassword }}
      </div>
      <button class="reset" type="button" @click="resetInputs">{{ $t('reset') }}</button>
      <button class="vspishka" type="submit" @click.once="register">{{ $t('btnRegister') }}</button>
    </form>
  </div>
</template>

<script>
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_REGISTER} from '../services/auth.js'

export default {
  data () {
    return {
      email: '',
      password: '',
      password_confirm: '',
      wrongEmail: '',
      wrongPassword: '',
      wrongConfirmPassword: ''
    }
  },
  methods: {
    register: function (e) {
      this.wrongEmail = ''
      this.wrongPassword = ''
      this.wrongConfirmPassword = ''
      if (!this.email) {
        this.wrongEmail = 'Укажите электронную почту'
        this.showEmail()
      } else if (!this.validEmail(this.email)) {
        this.wrongEmail = 'Укажите корректный адрес электронной почты'
        this.showEmail()
      }
      if (!this.password) {
        this.wrongPassword = 'Укажите пароль'
        this.showPassword()
      } else if (!this.validPassword(this.password)) {
        this.wrongPassword = 'Укажите корректный пароль'
        this.showPassword()
      }
      if (this.password_confirm.length && this.password !== this.password_confirm) {
        this.wrongConfirmPassword = 'Пароли не совпадают!'
        this.showConfirmPassword()
      }
      if (!this.wrongEmail.length) { // && !this.wrongPassword.length && !this.wrongConfirmPassword.length
        const { email, password } = this
        this.$store.dispatch(AUTH_REGISTER, { email, password })
        this.$store.dispatch(AUTH_REQUEST, { email, password })
          .then(() => {
            if (AUTH_SUCCESS) this.$router.push('/profile')
          })
          .catch(err => console.log(err))
      }
      e.preventDefault()
    },
    validEmail: function (email) {
      var mail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      return mail.test(email)
    },
    validPassword: function (password) {
      var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      return pass.test(password)
    },
    resetInputs: function () {
      this.email = ''
      this.password = ''
      this.password_confirm = ''
    },
    showEmail: function () {
      document.getElementsByClassName('tooltipEmail')[0].style.visibility = 'visible'
      setTimeout(function () {
        document.getElementsByClassName('tooltipEmail')[0].style.visibility = 'hidden'
      }, 1500)
    },
    showPassword: function () {
      document.getElementsByClassName('tooltipPassword')[0].style.visibility = 'visible'
      setTimeout(function () {
        document.getElementsByClassName('tooltipPassword')[0].style.visibility = 'hidden'
      }, 1500)
    },
    showConfirmPassword: function () {
      document.getElementsByClassName('tooltipConfirmPassword')[0].style.visibility = 'visible'
      setTimeout(function () {
        document.getElementsByClassName('tooltipConfirmPassword')[0].style.visibility = 'hidden'
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
  @import "../scss/register"
</style>
