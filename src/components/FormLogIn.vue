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
import { HTTP } from '../main'

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
      HTTP.get('/login')
        .then((response) => {
          if (this.username === response.data.username && this.password === response.data.password) {
            this.$router.push('/lol')
          } else if (this.username === response.data.username && this.password !== response.data.password) {
            alert('Dear boy, did you forgot your password? So go and fucking recall it!')
          } else {
            alert('The username and / or password is incorrect')
          }
        })
    }
  }
}
</script>

<style>

</style>
