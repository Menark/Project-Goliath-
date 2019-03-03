<template>
 <div id='turn'>
    <p> {{ info }} </p><br>
    <hr>
    <button type="button" v-on:click="getPosts">Posts!!!</button>
    <button v-on:click="getPublicComments">Comments!!!</button>
    <button v-on:click="getPrivateProfile">Profile!!!</button>
    <button v-on:click="logOut">LOG OUT</button>
    <button v-on:click="getUsers">WE need More USERS!!</button>
    <button v-on:click="goToChooseWisely">tokennnn</button>
 </div>
</template>

<script>
import { HTTP } from '../utils/api'
import {AUTH_LOGOUT} from '../store/index'

export default {
  name: 'LolOfLol',
  data () {
    return {
      info: ''
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
      HTTP.get('/posts')
        .then((response) => {
          this.info = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getPublicComments: function () {
      HTTP.get('/comments')
        .then((response) => {
          this.info = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getPrivateProfile: function () {
      HTTP.get('/profile')
        .then((response) => {
          this.info = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getUsers: function () {
      HTTP.get('/login')
        .then((response) => {
          this.info = response.data.username
        })
        .catch(function (error) {
          console.log(error)
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
