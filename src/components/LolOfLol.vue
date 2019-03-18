<template>
 <div id='turn'>
    <p> {{ info }} </p><br>
    <hr>
    <button type="button" @click="getPosts">Posts!!!</button>
    <button @click="getPublicComments">Comments!!!</button>
    <button @click="getPrivateProfile">Profile!!!</button>
    <button @click="logOut">LOG OUT</button>
    <button @click="getUsers">WE need More USERS!!</button>
    <button @click="goToChooseWisely">tokennnn</button>
 </div>
</template>

<script>
import { HTTP } from '../utils/api'
import {getPosts, getPublicComments, getPrivateProfile, getUsers} from '../services/contentServera'
import { AUTH_LOGOUT } from '../services/logout'

export default {
  name: 'LolOfLol',
  data () {
    return {
      info: '',
      input1: '',
      input2: ''
    }
  },
  mounted () {
    HTTP.get()
      .then((response) => {
        this.info = response.data
      })
  },
  methods: {
    getPosts: function () {
      getPosts().then((posts) => {
        this.info = posts
      })
    },
    getPublicComments: function () {
      getPublicComments().then((comments) => {
        this.info = comments
      })
    },
    getPrivateProfile: function () {
      getPrivateProfile().then((profile) => {
        this.info = profile
      })
    },
    getUsers: function () {
      getUsers().then((users) => {
        this.info = users
      })
    },
    goToChooseWisely: function () {
      this.info = localStorage.getItem('access_token')
    },
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

</style>
