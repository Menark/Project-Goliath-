<template>
  <div>
   <form @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type='password' placeholder="Password"/>
     <hr/>
     <button type="button" v-on:click="logIn">Login</button>
   </form>
 </div>
</template>

<script>
import {AUTH_REQUEST, AUTH_SUCCESS} from '../store/index'

export default {
  name: 'FormLogIn',
  data () {
    return {
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

</style>
