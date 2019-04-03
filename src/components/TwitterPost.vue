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
          class="logoContainer"
          viewBox="0 0 511.626 511.627"
          icon-name="speech"
        ><icon-speech class="logoSpeech" /></icon-base>
        <icon-base
          class="logoContainer"
          viewBox="0 0 64 64"
          icon-name="write"
        ><icon-retweet class="logoRetweet" /></icon-base>
        <icon-base
          class="logoContainer"
          viewBox="0 0 512 512"
          icon-name="speech"
        ><icon-like class="logoLike" /></icon-base>
        <icon-base
          class="logoContainer"
          viewBox="-20 -30 640 640"
          icon-name="Stat"
        ><icon-stat class="logoStat" /></icon-base>
      </footer>
  </div>
</template>

<script>
import IconBase from './IconBase'
import IconRetweet from './icons/IconRetweet'
import IconSpeech from './icons/IconSpeech'
import IconLike from './icons/IconLike'
import IconStat from './icons/IconStat'

export default {
  name: 'TwitterPost',
  props: {
    post: Object
  },
  components: {
    IconBase,
    IconRetweet,
    IconSpeech,
    IconLike,
    IconStat
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/twitterpost"
</style>
