<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="email" >E-Mail Address</label>
      <div>
          <input id="email" type="email" v-model="email" required>
      </div>
      <label for="password">Password</label>
      <div>
          <input id="password" type="password" v-model="password" required>
      </div>
      <label for="password-confirm">Confirm Password</label>
      <div>
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <div>
          <button type="submit" @click="register">Register</button>
      </div>
    </form>
    <button @click="goToLol">GET IT!!!</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    goToLol: function () {
      this.$router.push('/lol')
    },
    register: function () {
      const { email, password } = this
      this.$store.dispatch('register', { email, password })
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
