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

export default {
  name: 'LolOfLol',
  data () {
    return {
      info: ''
    }
  },
  mounted () {
    this.axios.get('http://localhost:3000')
      .then((response) => {
        this.info = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    getPosts: function () {
      this.axios.get('http://localhost:3000/posts')
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
      this.axios.get('http://localhost:3000/login')
        .then((response) => {
          this.info = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    logOut: function () {
      this.$store.dispatch('logOut')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style>

</style>
