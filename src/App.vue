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

<style lang="scss">
  @import "./scss/app"
</style>
