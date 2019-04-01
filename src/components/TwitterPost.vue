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
        <img class="svg" src="../images/heart.svg"  alt="Выбери свою таблетку!">
        <img class="svg" src="../images/speech.svg"  alt="Выбери свою таблетку!">
        <re-tweet class="logo" />
        <p>
          <!-- вы можете передать меньшую `width` и `height` во входные данные -->
          <icon-base
            class="logo1"
            width="20"
            height="20"
            icon-name="write"
          ><icon-write class="logo" /></icon-base>
        </p>
      </footer>
  </div>
</template>

<script>
import ReTweet from '../images/like.svg'
import IconBase from './IconBase'
import IconWrite from './IconWrite'

export default {
  name: 'TwitterPost',
  props: {
    post: Object
  },
  components: {
    ReTweet,
    IconBase,
    IconWrite
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/twitterpost"
</style>
