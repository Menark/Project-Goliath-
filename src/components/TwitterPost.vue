<template>
  <div class="tweet" v-bind:class="classObject">
    <header>
      {{ post.id }} -- {{ post.date }}
      <img src="../images/remove.svg" class="close" @click="deleteTheVeryPost(post.id)"/>
    </header>
    <main class="main">
      <div class="postPhotoAndVideo">
        <div class="postPhotoAndVideo_Image"
          v-for="(photo, y) in post.photos"
          :key="y+'photo'">
          <img v-if="post.photos" class="postPhoto" :src="photo"/>
        </div>
        <div class="postPhotoAndVideo_Video"
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
      <img src="../images/Мербиус.png" alt="Выбери свою таблетку!" class="icon">
    </aside>
    <footer>
      <button
        class="buttonLikes light-blue">
        <icon-base
          class="logoContainer"
          viewBox="0 0 511.626 511.627"
          icon-name="speech">
          <icon-speech class="logoSpeech" />
        </icon-base>
        <p>{{ counterSpeech }}</p>
      </button>
      <button
        class="buttonLikes light-green">
        <icon-base
          class="logoContainer"
          viewBox="0 0 64 64"
          icon-name="write">
          <icon-retweet class="logoRetweet" />
        </icon-base>
        <p>{{ counterRetweet }}</p>
      </button>
      <button
        @click="debouncedSave()"
        class="buttonLikes light-red">
        <icon-base
          class="logoContainer"
          viewBox="0 0 512 512"
          icon-name="speech">
          <icon-like class="logoLike" />
        </icon-base>
        <p class="heart">{{ post.likes }}</p>
      </button>
      <router-link :to="'/profile/post' + post.id">Hello</router-link>
    </footer>
  </div>
</template>

<script>
import IconBase from './IconBase'
import IconRetweet from './icons/IconRetweet'
import IconSpeech from './icons/IconSpeech'
import IconLike from './icons/IconLike'
import { HTTP } from '../utils/api'
import debounce from '../debounce.js'

export default {
  name: 'TwitterPost',
  props: {
    post: Object
  },
  data () {
    return {
      counterLikes: 0,
      counterSpeech: 0,
      counterRetweet: 0,
      showModal: false,
      numberCommentsOfPost: []
    }
  },
  components: {
    IconBase,
    IconRetweet,
    IconSpeech,
    IconLike
  },
  mounted () {
    HTTP.get('/comments')
      .then((response) => {
        let commNumb = this.post.id
        this.counterSpeech = response.data.filter(function (el) {
          return el.postId === commNumb
        }).length
      })
  },
  computed: {
    debouncedSave: function () {
      let DELAY = 1000
      return debounce(this.increaseLikesPost, DELAY)
    },
    classObject: function () {
      return this.$store.getters.isDarkModed ? 'dark' : 'light'
    }
  },
  methods: {
    deleteTheVeryPost: function () {
      HTTP.delete('/posts/' + this.post.id)
        .then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('delete-post', this.post.id)
    },
    increaseLikesPost: function () {
      let lk = this.post.likes + 1
      HTTP.patch(('/posts/' + this.post.id), {
        'likes': lk
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('re-like-post', this.post.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/twitterpost"
</style>
