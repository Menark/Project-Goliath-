<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Butcherman' rel='stylesheet'>
    <header>
      <div class="underHeader">
        <div id="name">
          Project &#8810;GOLIATH&#8811;
        </div>
        <div style="width: 40%">
        </div>
        <div id="threeButt" style="display: inline-flex">
          <div>
            <router-link to="/login" class="firstButt roulink">LOGIN</router-link>
          </div>
          <div>
            <router-link to="/register" class="secondButt roulink">REGISTER</router-link>
          </div>
          <div>
            <button class="thirdButt roulink"  @click="toggle=!toggle" >
              MENU
            </button>
          </div>
          <div id="hideMenu" v-show='toggle'>
            <div>
              <router-link to="/lol" class="roulink">Lol</router-link>
            </div>
            <div>
              <router-link to="/choose" class="roulink">CHOOSE</router-link>
            </div>
          </div>
        </div>
        <div>
          <button id="buttLOG" v-if="divLogOut">
            LOG OUT
          </button>
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
  }

  header {
    font-family: 'Butcherman';
    font-size: 30px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 0;
    width: 100%;
    border-radius: 0;
    border-bottom: 1px solid rgb(107, 126, 126);
  }

  .underHeader {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    height: 60px;
    margin: 0 16px;;
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
    right: 0px;
    width: 150px;
    background-color: azure;
    border: 1px solid rgb(32, 29, 29);
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .18);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    font-size: 20px;
  }

  #hideMenu div {
    margin-left: 10px;
    padding: 0;
    border: 1px solid rgb(32, 29, 29);
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
