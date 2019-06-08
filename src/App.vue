<template>
  <div id="app" v-bind:class="classObject">
    <header>
      <div class="nameProject">
        {{ $t('project') }}&#8810;{{ $t('goliath') }}&#8811;
      </div>
      <div>
        <transition>
          <img
            v-if="isNight"
            src="../src/images/moonColor.svg"
            class="menu-svg"
            @click="changeModeL">
          <img
            v-else
            src="../src/images/sunnyColor.svg"
            class="menu-svg"
            @click="changeModeD">
        </transition>
      </div>
      <div class="nav">
        <div class="threeButt">
          <div>
            <button @click="changeLocale('ru')">RU</button>
          </div>
          <div>
            <button @click="changeLocale('en')">EN</button>
          </div>
          <div  v-if="divLogOut">
            <button id="buttLOG" class="firstButt" @click="logOut">
              {{ $t('btnLogout') }}
            </button>
          </div>
          <div v-else class="twoButt">
              <div>
                <router-link to="/login" class="firstButt roulink">{{ $t('btnLogin') }}</router-link>
              </div>
              <div>
                <router-link to="/register" class="secondButt roulink">{{ $t('btnRegister') }}</router-link>
              </div>
          </div>
        </div>
        <div class="buttMenu">
          <img src="../src/images/list.svg" class="svg">
          <div class="hideMenu" v-bind:class="classObject">
            <ul>
              <li>
                <router-link to="/choose" class="router">
                <icon-base
                  class="menu-svg"
                  viewBox="0 0 481.763 481.763"
                  icon-name="settings">
                    <icon-settings class="menu-svg_dif"/>
                </icon-base>
                {{ $t('settingsPage') }}
                </router-link>
              </li>
              <li>
                <router-link to="/startpage" class="router">
                  <icon-base
                    class="menu-svg"
                    viewBox="0 0 60 60"
                    icon-name="home">
                      <icon-home class="menu-svg_dif"/>
                  </icon-base>
                {{ $t('startPage') }}
                </router-link>
              </li>
              <li>
                <router-link to="/profile" class="router">
                  <icon-base
                    class="menu-svg"
                    viewBox="0 0 299.997 299.997"
                    icon-name="profile">
                      <icon-profile class="menu-svg_dif"/>
                  </icon-base>
                  {{ $t('profile') }}
                </router-link>
              </li>
              <li>
                <a href="https://www.codewars.com/users/Menark" target="_blank" class="router">
                  <icon-base
                    class="menu-svg"
                    viewBox="0 0 24 24"
                    icon-name="home">
                      <icon-codewars class="menu-svg_dif"/>
                  </icon-base>
                  {{ $t('codeWars') }}
                </a>
              </li>
              <li>
                <a href="https://github.com/Menark" target="_blank" class="router">
                  <icon-base
                    class="menu-svg"
                    viewBox="0 0 438.549 438.549"
                    icon-name="home">
                      <icon-github class="menu-svg_dif"/>
                  </icon-base>
                  {{ $t('gitHub') }}
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
import { DARK_MODE, LIGHT_MODE } from './services/changeMode.js'
import IconBase from './components/IconBase'
import IconHome from './components/icons/IconHome'
import IconProfile from './components/icons/IconProfile'
import IconSettings from './components/icons/IconSettings'
import IconGithub from './components/icons/IconGithub'
import IconCodewars from './components/icons/IconCodewars'

export default {
  name: 'App',
  data () {
    return {
      isNight: this.$store.getters.isDarkModed
    }
  },
  components: {
    IconBase,
    IconHome,
    IconProfile,
    IconSettings,
    IconGithub,
    IconCodewars
  },
  computed: {
    divLogOut: function () {
      return this.$store.getters.isAuthenticated
    },
    classObject: function () {
      return this.$store.getters.isDarkModed ? 'dark' : 'light'
    }
  },
  methods: {
    logOut: function () {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login')
        })
    },
    changeLocale: function (locale) {
      this.$i18n.locale = locale
    },
    changeModeD: function () {
      this.$store.dispatch(DARK_MODE)
      this.isNight = true
    },
    changeModeL: function () {
      this.$store.dispatch(LIGHT_MODE)
      this.isNight = false
    }
  }
}
</script>

<style lang="scss">
  @import "./scss/app"
</style>
