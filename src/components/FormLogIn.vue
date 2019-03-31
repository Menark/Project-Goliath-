<template>
  <div class="formlogin">
    <form @submit.prevent="login" class="form1" novalidate="true">
      <router-link to="/register" class="labelSignUp1">Регистрация</router-link>
      <div class="inputEmail1">
        <input class="inputBoth1" required v-model="email" type="email" placeholder="Email Address"/><br>
      </div>
      <div class="tooltipEmail1">
          {{ misEmail }}
      </div>
      <div class="inputPassword1">
        <input class="inputBoth1" required v-model="password" type='password' placeholder="Password"/><br>
      </div>
      <div class="tooltipPassword1">
        {{ misPassword }}
      </div>
      <button class="vspishka1" type="submit" @click="logIn">LOGIN</button>
    </form>
  </div>
</template>

<script>
import { AUTH_REQUEST, AUTH_SUCCESS } from '../services/auth.js'

export default {
  name: 'FormLogIn',
  data () {
    return {
      email: '',
      password: '',
      misEmail: '',
      misPassword: '',
      error: false
    }
  },
  methods: {
    logIn: function () {
      this.misPassword = ''
      this.misEmail = ''
      if (!this.email) {
        this.misEmail = 'Укажите электронную почту'
        this.showEmail()
      } else if (!this.validEmail(this.email)) {
        this.misEmail = 'Укажите корректный адрес электронной почты'
        this.showEmail()
      }
      if (!this.password) {
        this.misPassword = 'Укажите пароль'
        this.showPassword()
      } else if (!this.validPassword(this.password)) {
        this.misPassword = 'Укажите корректный пароль'
        this.showPassword()
      }
      if (!this.misEmail.length && !this.misPassword.length) {
        const { email, password } = this
        this.$store.dispatch(AUTH_REQUEST, { email, password })
          .then(() => {
            if (AUTH_SUCCESS) this.$router.push('/profile')
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    validEmail: function (email) {
      var maile = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      return maile.test(email)
    },
    validPassword: function (password) {
      var wordpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      return wordpass.test(password)
    },
    showEmail: function () {
      document.getElementsByClassName('tooltipEmail1')[0].style.visibility = 'visible'
      setTimeout(function () {
        document.getElementsByClassName('tooltipEmail1')[0].style.visibility = 'hidden'
      }, 1500)
    },
    showPassword: function () {
      document.getElementsByClassName('tooltipPassword1')[0].style.visibility = 'visible'
      setTimeout(function () {
        document.getElementsByClassName('tooltipPassword1')[0].style.visibility = 'hidden'
      }, 1500)
    }
    // showDiv () {
    //   document.getElementsByClassName('hidd')[0].style.display = 'block'
    //   setTimeout(function () {
    //     document.getElementsByClassName('hidd')[0].style.opacity = 1
    //   }, 1)
    // }
    // resetDiv() {
    //   document.getElementsByClassName("hidd")[0].style.opacity = 0;
    //   setTimeout(function() {
    //     document.getElementsByClassName("hidd")[0].style.display = "none";
    //   }, 1000)
    // }
  }
}
</script>

<style lang="scss">
  @import "../scss/login"
</style>
