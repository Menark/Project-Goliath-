<template>
  <div>
    <div>
      <img src="../images/Мербиус.png" alt="Выбери свою таблетку!" class="immageMerbius">
    </div>
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
  body {
    background-color: rgb(215, 224, 233);
  }

  .immageMerbius {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
  }
</style>
