<template>
  <div id="app">
    <header>
      <div class="nameProject">
        Project &#8810;GOLIATH&#8811;
      </div>
      <div class="nav">
        <div class="threeButt">
          <div  v-if="divLogOut">
            <button id="buttLOG" class="firstButt" @click="logOut">
              Выйти
            </button>
          </div>
          <div v-else class="twoButt">
              <div>
                <router-link to="/login" class="firstButt roulink">LOGIN</router-link>
              </div>
              <div>
                <router-link to="/register" class="secondButt roulink">REGISTER</router-link>
              </div>
          </div>
        </div>
        <div class="buttMenu">
          <!--<button class="thirdButt">
            MENU
          </button>-->
          <img src="../src/images/list.svg" class="svg">
          <div class="hideMenu">
            <!--<div>
              <router-link to="/choose" class="roulink">CHOOSE</router-link>
            </div>
            <div>
              <router-link to="/profile" class="roulink">Профиль</router-link>
            </div>
            <div class="gridItem">
              <a href="https://www.codewars.com/users/Menark" target="_blank">
                <img src="../src/images/CodewarsMark.png" alt="CODEWARS ACCOUNT" class="linkToSocial">
              </a>
              <p>CodeWars account</p>
            </div>
            <div class="gridItem">
              <a href="https://github.com/Menark" target="_blank">
                <img src="../src/images/GitHubMark.png" alt="GITHUB ACCOUNT" class="linkToSocial">
              </a>
              <p>Github account</p>
            </div> -->
            <ul>
              <li>
                <router-link to="/choose">
                <img src="../src/images/settings.svg" class="linkToSocial">
                Future settings page
                </router-link>
              </li>
              <li>
                <router-link to="/startpage">
                <img src="../src/images/startpage.svg" class="linkToSocial">
                Startpage
                </router-link>
              </li>
              <li>
                <router-link to="/profile">
                  <img src="../src/images/userProfile.svg" class="linkToSocial">
                  Профиль
                </router-link>
              </li>
              <li class="gridItem">
                <a href="https://www.codewars.com/users/Menark" target="_blank">
                  <img src="../src/images/CodewarsMark.png" class="linkToSocial">
                  CodeWars account
                </a>
              </li>
              <li class="gridItem">
                <a href="https://github.com/Menark" target="_blank">
                  <img src="../src/images/GitHubMark.png" class="linkToSocial">
                  Github account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
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
    }
  }
}
</script>

<style lang="scss">
  @import "./scss/app"
</style>
