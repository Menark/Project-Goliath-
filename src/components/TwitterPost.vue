<template>
  <div class="tweet">
      <header>
        {{ post.id }}
        <img src="../images/remove.svg" class="close" @click="deleteTheVeryPost(post.id)"/>
      </header>
      <main class="main">
        <div class="postPhotoAndVideo">
          <div class="postPhotoAndVideo_Image"
            v-for="(photo, y) in post.photos"
            :key="y+'photo'">
            <img v-if="post.photos" class="postPhoto" :src="photo"/>
          </div>
          <div  class="postPhotoAndVideo_Video"
            v-for="(video, i) in post.videos"
            :key="i+'video'">
            <video v-if="post.videos" class="postPhoto" :src="video" controls></video>
          </div>
        </div>
        <div class="postMessage">
          {{ post.body }}
        </div>
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
      </footer>
  </div>
</template>

<script>
import IconBase from './IconBase'
import IconRetweet from './icons/IconRetweet'
import IconSpeech from './icons/IconSpeech'
import IconLike from './icons/IconLike'
import { HTTP } from '../utils/api'

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
  },
  methods: {
    deleteTheVeryPost: function (id) {
      HTTP.delete('/posts/' + id)
        .then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('re-new')
      // HTTP.get('/posts')
      //   .then((response) => {
      //     this.post = response.data
      //   })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/twitterpost"
</style>
