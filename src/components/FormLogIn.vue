<template>
  <div>
    <form @submit.prevent="login">
      <h1>Sign in</h1>
      <!--<label>Name</label>
      <input class="indenT" required v-model="name" type="text" placeholder="Your name"/><br> -->
      <label>User name</label>
      <input class="indenT" required v-model="username" type="text" placeholder="Your login"/><br>
      <label>Password</label>
      <input class="indenT" required v-model="password" type='password' placeholder="Your Password"/><br>
      <hr/>
      <button type="button" @click="logIn">Login</button>
    </form>
  </div>
</template>

<script>
import {AUTH_REQUEST, AUTH_SUCCESS} from '../services/login'

export default {
  name: 'FormLogIn',
  data () {
    return {
      name: '',
      username: '',
      password: ''
    }
  },
  methods: {
    logIn: function () {
      const { username, password } = this
      this.$store.dispatch(AUTH_REQUEST, { username, password })
        .then(() => {
          if (AUTH_SUCCESS) this.$router.push('/choose')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
  .indenT {
    margin: 10px
  }
</style>
