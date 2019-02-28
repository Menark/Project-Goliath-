<template>
 <div id='turn'>
   <p> {{ info }} </p><br>
   <hr>
   <button type="button" v-on:click="getPosts">Posts!!!</button>
   <button v-on:click="getPublicComments">Comments!!!</button>
   <button v-on:click="getPrivateProfile">Profile!!!</button>
   <button v-on:click="logOut">LOG OUT</button>
   <button v-on:click="getUsers">WE need More USERS!!</button>
 </div>
</template>

<script>
import { getPublicComments, getPrivateProfile } from '../utils/api'
import { HTTP } from '../main'
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
      .catch(function (error) {
        console.log(error)
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
      HTTP.get('/login')
        .then((response) => {
          this.info = response.data.username
        })
        .catch(function (error) {
          console.log(error)
        })
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
