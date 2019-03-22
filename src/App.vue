<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Butcherman' rel='stylesheet'>
    <header>
      <ul>
        <li id="dropdown">
          MENU
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </li>
      </ul>
      <div>Project &#8810;GOLIATH&#8811;</div>
      <button id="buttLOG" @click="qwertY" v-if="divLogOut">LOG OUT</button>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="gridItem">
        <a href="https://www.codewars.com/users/Menark" target="_blank"><img src="../src/images/CodewarsMark.png" alt="CODEWARS ACCOUNT" class="linkToSocial"></a>
        <p>CodeWars account</p>
      </div>
      <div class="gridItem">
        <a href="https://github.com/Menark" target="_blank"><img src="../src/images/GitHubMark.png" alt="GITHUB ACCOUNT" class="linkToSocial"></a>
        <p>Github account</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from './services/auth.js'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    divLogOut: function () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logOut: function () {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login')
        })
    },
    qwertY: function () {
      console.log(this.$store.getters.isAuthenticated)
      console.log(this.$store)
      console.log(localStorage.getItem('access_token'))
      //  v-if="divLogOut"
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
    margin: 0;
    padding: 0;
  }

  header {
    font-family: 'Butcherman';
    font-size: 30px;
    text-align: center;
    background-color: rgb(231, 114, 114);
    position: absolute;
    top: 0;
    width: 100%;
    height: 8%;
    border-radius: 0;
  }

  header div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #buttLOG {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-50%, -50%);
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  li a:hover, #dropdown:hover {
    background-color: red;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    background-color: #f9f9f9;
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 6px 8px;
    text-decoration: none;
    display: block;
    text-align: center;
  }

  .dropdown-content a:hover {background-color: #357235}

  #dropdown:hover .dropdown-content {
    display: block;
  }

  footer {
    background-color: rgb(90, 167, 170);
    border-radius: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8%;
    box-sizing: border-box;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    grid-gap: 50px;
    justify-content: center;
    align-content: center;
  }

  .linkToSocial {
    width: 40px;
    height: 40px;
  }

  .gridItem {
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    justify-self: center;
    align-self: center;
    transform: scale(0.8);
  }

  .gridItem a, .gridItem p {
    float: left;
    line-height: 50%;
    padding: 5px;
  }
</style>
