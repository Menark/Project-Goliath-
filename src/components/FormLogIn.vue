<template>
  <div>
    <form @submit.prevent="login" class="form">
      <button class="labelSignIn">Sign in</button>
      <button class="labelSignUp">Sign up</button>
      <div class="inputEmail" >
        <input class="inputBoth" required v-model="email" type="email" placeholder="Email Address" /><br>
      </div>
      <div class="inputPassword">
        <input class="inputBoth" required v-model="password" type='password' placeholder="Password"/><br>
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
      password: ''
    }
  },
  methods: {
    logIn: function () {
      if (this.email && this.password) {
        const { email, password } = this
        this.$store.dispatch(AUTH_REQUEST, { email, password })
          .then(() => {
            if (AUTH_SUCCESS) this.$router.push('/choose')
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style>
  body {
    background-color: white
  }

  .form {
    position: relative;
    border: 1px solid black;
    width: 350px;
    height: 300px;
    margin: 60px auto;
    padding: 10px;
    background-color: rgb(0,0,63);
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
    background-color: inherit;
    box-sizing: border-box;
    color: white;
  }

  ::placeholder {
    color: white;
  }

  .vspishka {
    position: absolute;
    top: 70%;
    left: 10%;
    width: 80%;
    padding: 20px;
    background-color: #4CAF50;
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
    background-color: #4CAF50;
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
    background-color: #4CAF50;
    border: none;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .labelSignIn:hover, .labelSignUp:hover {
  }
</style>
