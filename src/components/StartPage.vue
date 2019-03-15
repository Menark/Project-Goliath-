<template>
  <div>
    <router-link to="/login" class="btnSignIn">LOGIN</router-link>
    <router-link to="/register" class="btnSignUp">REGISTER</router-link>
    <img src="../images/Мербиус.jpg" alt="Выбери свою таблетку!" class="immageMerbius">
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
  // methods: {
  //   goToRegisterForm: function () {
  //     this.$router.push('/register')
  //   }
  // }
}
</script>

<style>

  .immageMerbius {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    z-index: -1;
  }

  .btnSignIn, .btnSignUp {
    text-decoration: none;
    color: white;
    font-size: 20px;
    position: absolute;
    top: 60%;
    width: 10%;
    padding: 10px;
    border: none;
    border-radius: 30px;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
    transition: transform 1s;
  }

  .btnSignIn {
    right: 55%;
    background-color: rgb(160, 39, 39);
}

.btnSignUp {
    right: 35%;
    background-color: rgb(11, 10, 104);
}

.btnSignIn:hover, .btnSignUp:hover {
  transform: scale(1.3);
}
</style>
