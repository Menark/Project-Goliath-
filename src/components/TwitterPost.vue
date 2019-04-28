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
        <img src="../images/МербиусСРамкой.jpg" alt="Выбери свою таблетку!" class="icon">
      </aside>
      <footer>
        <button
          class="buttonLikes">
          <icon-base
            class="logoContainer"
            viewBox="0 0 511.626 511.627"
            icon-name="speech">
            <icon-speech class="logoSpeech" />
          </icon-base>
          <p>{{ counterSpeech }}</p>
        </button>
        <button
          class="buttonLikes">
          <icon-base
            class="logoContainer"
            viewBox="0 0 64 64"
            icon-name="write">
            <icon-retweet class="logoRetweet" />
          </icon-base>
          <p>{{ counterRetweet }}</p>
        </button>
        <button
          @click="increaseLikes(post.id)"
          class="buttonLikes">
          <icon-base
            class="logoContainer"
            viewBox="0 0 512 512"
            icon-name="speech">
            <icon-like class="logoLike" />
          </icon-base>
          <p>{{ post.likes }}</p>
        </button>
      </footer>
      <div v-if="show" >
        <comments
          v-for="(comment,i) in commentsFilter(com, post.id)"
          :comment="comment"
          :key="i"
          >  {{ comment }}
        </comments>
      </div>
  </div>
</template>

<script>
import IconBase from './IconBase'
import IconRetweet from './icons/IconRetweet'
import IconSpeech from './icons/IconSpeech'
import IconLike from './icons/IconLike'
import { HTTP } from '../utils/api'
import Comments from './Comments'

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
      com: '',
      show: false
    }
  },
  components: {
    IconBase,
    IconRetweet,
    IconSpeech,
    IconLike,
    Comments
  },
  mounted () {
    HTTP.get('/comments')
      .then((response) => {
        this.com = response.data
      })
  },
  methods: {
    deleteTheVeryPost: function (id) {
      HTTP.delete('/posts/' + id)
        .then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('re-new')
    },
    increaseLikes: function (id) {
      let lk = this.post.likes++
      HTTP.post('/posts/' + id, {
        'likes': lk
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('re-new')
    },
    commentsFilter: function (com, numb) {
      return com.filter(function (el) {
        return el.postId === numb
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/twitterpost"
</style>
