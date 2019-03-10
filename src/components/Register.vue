<template>
  <div>
    <form @submit.prevent="register" class="form" novalidate="true">
      <button class="labelSignIn">Sign in</button>
      <button class="labelSignUp">Sign up</button>
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
      <button class="reset" type="button" @click="resetInputs">RESET</button>
      <button class="vspishka" type="submit" @click="register">REGISTER</button>
    </form>
    <button @click="goToLol">GET IT!!!</button>
  </div>
</template>

<script>
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
    goToLol: function () {
      this.$router.push('/lol')
    },
    register: function () {
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
      const { email, password } = this
      this.$store.dispatch('register', { email, password })
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err))
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
    height: 400px;
    margin: 60px auto;
    padding: 10px;
    background-color: rgb(0, 0, 63);
    opacity: 1;
  }

  .inputEmail {
    position: absolute;
    top: 18%;
    left: 10%;
    width: 80%;
  }

  .inputPassword {
    position: absolute;
    top: 36%;
    left: 10%;
    width: 80%;
  }

  .inputConfirmPassword {
    position: absolute;
    top: 54%;
    left: 10%;
    width: 80%;
  }

  .inputTreesome {
    padding-left: 10px;
    font-size: 15px;
    height: 45px;
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
    top: 33%;
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
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    visibility: hidden;
    width: 70%;
  }

  .tooltipConfirmPassword {
    position: absolute;
    top: 69%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    visibility: hidden;
    width: 70%;
  }

   .tooltipEmail, .tooltipPassword, .tooltipConfirmPassword {
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

  .tooltipConfirmPassword::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%; /* At the top of the tooltip */
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .inputTreesome:focus {
    background-color: white;
    color: black;
  }

  ::placeholder {
    color: rgb(255, 255, 255);
  }

  .vspishka {
    position: absolute;
    top: 85%;
    left: 10%;
    width: 80%;
    padding: 15px;
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

  .vspishka:hover {
    background-color: rgb(18, 75, 20);
  }

  .reset {
    position: absolute;
    top: 73%;
    left: 20%;
    width: 60%;
    padding: 10px;
    background-color: rgb(110, 30, 30);
    border: none;
    font-size: 15px;
    color: #FFFFFF;
    text-align: center;
    transition-duration: 0.4s;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .reset:hover {
    left: 10%;
    width: 80%;
  }

  .labelSignIn {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 5%;
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
    top: 5%;
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
