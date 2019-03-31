<template>
  <div class="tweet">
      <header>
        {{ post.id }}
      </header>
      <main>
        {{ post.body }}
      </main>
      <aside>
        <img src="../images/МербиусСРамкой.jpg" alt="Выбери свою таблетку!" class="icon">
      </aside>
      <footer>
        <img class="svg" src="../images/retweet.svg"  alt="Выбери свою таблетку!">
        <img class="svg" src="../images/heart.svg"  alt="Выбери свою таблетку!">
        <img class="svg" src="../images/speech.svg"  alt="Выбери свою таблетку!">
      </footer>
  </div>
</template>

<script>
export default {
  name: 'TwitterPost',
  props: {
    post: Object
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/twitterpost"
</style>
