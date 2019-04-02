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
        <icon-base
          class="logo1"
          viewBox="0 0 64 64"
          width="20"
          height="20"
          icon-name="write"
        ><icon-retweet class="logo" /></icon-base>
        <icon-base
          class="logo1"
          viewBox="0 0 33 33"
          width="20"
          height="20"
          icon-name="speech"
        ><icon-speech class="logo" /></icon-base>
        <icon-base
          class="logo1"
          viewBox="0 0 51.997 51.997"
          width="20"
          height="20"
          icon-name="speech"
        ><icon-like class="logo" /></icon-base>
      </footer>
  </div>
</template>

<script>
import IconBase from './IconBase'
import IconRetweet from './icons/IconRetweet'
import IconSpeech from './icons/IconSpeech'
import IconLike from './icons/IconLike'

export default {
  name: 'TwitterPost',
  props: {
    post: Object
  },
  components: {
    IconBase,
    IconRetweet,
    IconSpeech,
    IconLike
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/twitterpost"
</style>
