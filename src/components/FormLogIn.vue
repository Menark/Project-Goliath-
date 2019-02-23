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
      if (this.username === this.$parent.username && this.password === this.$parent.password) {
        this.$router.push('/lol')
      } else {
        console.log('The username and / or password is incorrect')
      }
    }
  }
}
</script>

<style>

</style>
