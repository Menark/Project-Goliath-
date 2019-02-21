<template>
  <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit" on:click="logIn">Login</button>
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
      const { username, password } = this
      this.$store.dispatch('login', { username, password })
        .then(() => this.$router.push('/lol'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
