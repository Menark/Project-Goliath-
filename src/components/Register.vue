<template>
  <div>
    <form @submit.prevent="register" class="form" novalidate="true">
      <button class="labelSignIn">Sign in</button>
      <button class="labelSignUp">Sign up</button>
      <div class="inputEmail">
        <input class="inputTreesome" type="email" v-model="email" required placeholder="Email Address">
      </div>
      <div class="tooltipEmail">
          {{ misEmail }}
      </div>
      <div class="inputPassword">
        <input class="inputTreesome" type="password" v-model="password" required placeholder="Password">
      </div>
      <div class="tooltipPassword">
        {{ misPassword }}
      </div>
      <div class="inputConfirmPassword">
        <input class="inputTreesome" type="password" v-model="password_confirm" required placeholder="Confirm password">
      </div>
      <div class="tooltipConfirmPassword">
        {{ misPassword }}
      </div>
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
      password_confirm: ''
    }
  },
  methods: {
    goToLol: function () {
      this.$router.push('/lol')
    },
    register: function () {
      const { email, password } = this
      this.$store.dispatch('register', { email, password })
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err))
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
    height: 350px;
    margin: 60px auto;
    padding: 10px;
    background-color: rgb(0, 0, 63);
    opacity: 0.9;
  }

  .inputEmail {
    position: absolute;
    top: 25%;
    left: 10%;
    width: 80%;
  }

  .inputPassword {
    position: absolute;
    top: 40%;
    left: 10%;
    width: 80%;
  }

  .inputConfirmPassword {
    position: absolute;
    top: 55%;
    left: 10%;
    width: 80%;
  }

  .inputTreesome {
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
    top: 36%;
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
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    visibility: hidden;
    width: 70%;
  }

  .tooltipConfirmPassword {
    position: absolute;
    top: 76%;
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
    top: 80%;
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

  .vspishka:hover {
    background-color: rgb(91, 211, 76);
    top: 78%;
    left: 5%;
    width: 90%;
    padding: 25px;
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
