<template>
  <div>
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
import {AUTH_REQUEST, AUTH_SUCCESS} from '../services/login'

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
            if (AUTH_SUCCESS) this.$router.push('/choose')
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

<style>
  body {
    background:
      radial-gradient(black 3px, transparent 4px),
      radial-gradient(black 3px, transparent 4px),
      linear-gradient(#fff 4px, transparent 0),
      linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px),
      linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px),
    #fff;
    background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
    background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  }

  .form1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    width: 350px;
    height: 320px;
    padding: 10px;
    background-color: rgb(0, 0, 63);
    border-radius: 10px;
  }

  .inputEmail1 {
    position: absolute;
    top: 27%;
    left: 10%;
    width: 80%;
  }

  .inputPassword1 {
    position: absolute;
    top: 52%;
    left: 10%;
    width: 80%;
  }

  .inputBoth1 {
    padding-left: 10px;
    font-size: 15px;
    height: 45px;
    width: 100%;
    outline: none;
    border: 1px solid white;
    border-radius: 10px;
    background-color: grey;
    box-sizing: border-box;
    color: white;
    opacity: 1;
  }

  .tooltipEmail1 {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    visibility: hidden;
    /*opacity: 1;
    transition: opacity 0.5s linear 1s;*/
    width: 70%;
  }

  .tooltipPassword1 {
    position: absolute;
    top: 67%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    visibility: hidden;
    width: 70%;
  }

   .tooltipEmail1, .tooltipPassword1 {
    background-color: black;
    height: auto;
    color: white;
    text-align: center;
    line-height: 25px;
    border-radius: 6px;
    padding: 5px 10px;
    z-index: 1;
    box-sizing: border-box;
  }

  .tooltipEmail1::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%; /* At the top of the tooltip */
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .tooltipPassword1::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%; /* At the top of the tooltip */
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .inputBoth1:focus {
    background-color: white;
    color: black;
  }

  ::placeholder {
    color: rgb(255, 255, 255);
  }

  .vspishka1 {
    position: absolute;
    top: 79%;
    left: 10%;
    width: 80%;
    padding: 20px;
    background-color: rgb(30, 110, 32);
    border: none;
    border-radius: 10px;
    font-size: 15px;
    color: #FFFFFF;
    text-align: center;
    transition-duration: 0.4s;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
    opacity: 1;
  }

  .vspishka1:after {
    content: "";
    background: #f1f1f1;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s
}

  .vspishka1:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
  }

  .labelSignUp1 {
    text-decoration: none;
    color: white;
    font-size: 20px;
    position: absolute;
    top: 5%;
    right: 10%;
    width: 80%;
    padding: 10px;
    background-color: rgb(160, 39, 39);
    border: none;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .labelSignUp1:hover {
    border: 1px solid black;
  }
</style>
