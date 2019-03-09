<template>
  <div>
    <form @submit.prevent="login" class="form" novalidate="true">
      <button class="labelSignIn">Sign in</button>
      <button class="labelSignUp">Sign up</button>
      <div class="inputEmail">
        <input class="inputBoth" required v-model="email" type="email" placeholder="Email Address"/><br>
      </div>
      <div class="tooltipEmail">
          {{ misEmail }}
      </div>
      <div class="inputPassword">
        <input class="inputBoth" required v-model="password" type='password' placeholder="Password"/><br>
      </div>
      <div class="tooltipPassword">
        {{ misPassword }}
      </div>
      <button class="vspishka" type="submit" @click="logIn">LOGIN</button>
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
      misPassword: ''
    }
  },
  methods: {
    logIn: function (e) {
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
    }
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

  .form {
    position: relative;
    border: 1px solid black;
    width: 350px;
    height: 300px;
    margin: 60px auto;
    padding: 10px;
    background-color: rgb(0, 0, 63);
    opacity: 0.9;
  }

  .inputEmail {
    position: absolute;
    top: 30%;
    left: 10%;
    width: 80%;
  }

  .inputPassword {
    position: absolute;
    top: 50%;
    left: 10%;
    width: 80%;
  }

  .inputBoth {
    padding-left: 10px;
    font-size: 15px;
    height: 40px;
    width: 100%;
    outline: none;
    border: 1px solid white;
    background-color: grey;
    box-sizing: border-box;
    color: white;
    opacity: 1;
  }

  .tooltipEmail {
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    visibility: hidden;
    /*opacity: 1;
    transition: opacity 0.5s linear 1s;*/
    width: 70%;
  }

  .tooltipPassword {
    position: absolute;
    top: 66%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    visibility: hidden;
    width: 70%;
  }

   .tooltipEmail, .tooltipPassword {
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

  .tooltipEmail::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%; /* At the top of the tooltip */
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .tooltipPassword::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%; /* At the top of the tooltip */
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .inputBoth:focus {
    background-color: white;
    color: black;
  }

  ::placeholder {
    color: rgb(255, 255, 255);
  }

  .vspishka {
    position: absolute;
    top: 70%;
    left: 10%;
    width: 80%;
    padding: 20px;
    background-color: rgb(30, 110, 32);
    border: none;
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

  .vspishka:after {
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

  .vspishka:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
  }

  .labelSignIn {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 10%;
    left: 10%;
    width: 39%;
    padding: 10px;
    background-color: rgb(30, 110, 32);
    border: none;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .labelSignUp {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 10%;
    right: 10%;
    width: 39%;
    padding: 10px;
    background-color: rgb(30, 110, 32);
    border: none;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .labelSignIn:hover, .labelSignUp:hover {
    border: 1px solid black;
  }
</style>
