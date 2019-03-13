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
    <button @click="goNewData">Push data</button>
    <input required v-model="input1" type='text' placeholder="input1"/><br>
    <input required v-model="input2" type='text' placeholder="input2"/><br>
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
    goNewData: function () {
      HTTP.post('/users', {
        'email': this.input1,
        'password': this.input2
      })
        .then(response => {})
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
