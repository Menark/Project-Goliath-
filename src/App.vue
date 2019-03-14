<template>
  <div id="app">
    <router-view/>
    <button @click="toTheLoginForm" class="btnSignIn">LOGIN</button>
    <router-link to="/register" class="btnSignUp">REGISTER</router-link>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    toTheLoginForm: function () {
      this.$router.push('/login')
    },
    toTheRegisterForm: function () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-image: url(../Мербиус.jpg);
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 40%;
}

.btnSignIn {
    text-decoration: none;
    color: white;
    font-size: 20px;
    position: absolute;
    top: 52%;
    right: 55%;
    width: 10%;
    padding: 10px;
    background-color: rgb(160, 39, 39);
    border: none;
    border-radius: 30px;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
    transition: transform 1s;
}

.btnSignUp {
    text-decoration: none;
    color: white;
    font-size: 20px;
    position: absolute;
    top: 52%;
    right: 35%;
    width: 10%;
    padding: 10px;
    background-color: rgb(11, 10, 104);
    border: none;
    border-radius: 30px;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
    transition: transform 2s;
}

.btnSignIn:hover, .btnSignUp:hover {
  transform: scale(1.5);
}
</style>
