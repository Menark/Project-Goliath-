<template>
  <div id="app">
    <header>
      <div id="name">
        Project &#8810;GOLIATH&#8811;
      </div>
      <div id="threeButt" style="display: inline-flex">
        <div  v-if="divLogOut">
          <button id="buttLOG" class="firstButt" @click="logOut">
            Выйти
          </button>
      </div>
      <div v-else style="display: inline-flex">
          <div>
            <router-link to="/login" class="firstButt roulink">LOGIN</router-link>
          </div>
          <div>
            <router-link to="/register" class="secondButt roulink">REGISTER</router-link>
          </div>
      </div>
        <div>
          <button class="thirdButt roulink"  @click="toggle=!toggle" >
            MENU
          </button>
        </div>
        <div id="hideMenu" v-show="toggle">
          <div>
            <router-link to="/choose" class="roulink">CHOOSE</router-link>
          </div>
          <div>
            <router-link to="/profile" class="roulink">Профиль</router-link>
          </div>
        </div>
      </div>
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
      toggle: false
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
    box-sizing: border-box;
  }

  #app {
    display: grid;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  header {
    background-color: rgb(255, 255, 255);
    height: 10vh;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    box-sizing: border-box;
  }

  main {
    height: 80vh;
    box-sizing: border-box;
    overflow: auto;
  }

  footer {
    background-color: rgb(255, 255, 255);
    align-content: center;
    height: 10vh;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    justify-content: center;
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

  .roulink {
    text-decoration: none;
  }

  .firstButt, .secondButt, .thirdButt {
    border: 0px;
    height: 40px;
    display: inline-block;
    border-radius: 4px;
    padding: 0px;
    font-size: 20px;
    outline: none;
    box-shadow: none;
    cursor: pointer;
    margin-top: 0px;
    vertical-align: middle;
    background-color: rgb(219, 51, 76);
    color: rgb(0, 0, 0);
    line-height: 40px;
    width: 128px;
    margin-right: 8px;
    box-sizing: border-box;
  }

  .firstButt:hover, .secondButt:hover, .thirdButt:hover {
    background-color: rgb(168, 28, 49);
  }

  #hideMenu {
    position: absolute;
    top: 60px;
    margin: 0 24px;
    right: 0px;
    border: 1px solid black;
    min-width: 150px;
    background-color: azure;
    border-radius: 20px 0 50px 25px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .18);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    font-size: 18px;
    z-index: 1;
  }

  #hideMenu div {
    margin-left: 10px;
    padding: 0;
    color: rgb(0, 0, 0);
  }
</style>
