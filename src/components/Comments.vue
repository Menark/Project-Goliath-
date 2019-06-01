<template>
  <div class="tweet1" v-bind:class="classObject">
      <header>
        {{ comment.id }} -- {{ comment.date }}
        <img
          src="../images/remove.svg"
          class="close1"
          @click="deleteTheVeryComment(comment.id)"
        />
      </header>
      <main class="main1">
        <div class="postPhotoAndVideo1">
          <div class="postPhotoAndVideo_Image1"
            v-for="(photo, y) in comment.photos"
            :key="y+'photo'">
            <img v-if="comment.photos" class="postPhoto1" :src="photo"/>
          </div>
          <div class="postPhotoAndVideo_Video1"
            v-for="(video, i) in comment.videos"
            :key="i+'video'">
            <video v-if="comment.videos" class="postPhoto1" :src="video" controls></video>
          </div>
        </div>
        <div v-if="comment.body"  class="postMessage1">
          {{ comment.body }}
        </div>
      </main>
      <aside>
        <img src="../images/student.svg" alt="Выбери свою таблетку!" class="icon1">
      </aside>
      <footer>
        <button
          class="buttonLikes1 light-green">
          <icon-base
            class="logoContainer1"
            viewBox="0 0 64 64"
            icon-name="write">
            <icon-retweet class="logoRetweet1" />
          </icon-base>
          <p>{{ counterRetweet }}</p>
        </button>
        <button
          @click="debounceComment()"
          class="buttonLikes1 light-red">
          <icon-base
            class="logoContainer1"
            viewBox="0 0 512 512"
            icon-name="speech">
            <icon-like class="logoLike1" />
          </icon-base>
          <p>{{ comment.likes }}</p>
        </button>
      </footer>
  </div>
</template>

<script>
import IconBase from './IconBase'
import IconRetweet from './icons/IconRetweet'
import IconLike from './icons/IconLike'
import { HTTP } from '../utils/api'
import debounce from '../debounce.js'

export default {
  name: 'Comments',
  props: {
    comment: Object
  },
  data () {
    return {
      counterLikes: 0,
      counterRetweet: 0
    }
  },
  components: {
    IconBase,
    IconRetweet,
    IconLike
  },
  computed: {
    debounceComment: function () {
      let DELAY = 1000
      return debounce(this.increaseLikesComment, DELAY)
    },
    classObject: function () {
      return this.$store.getters.isDarkModed ? 'dark' : 'light'
    }
  },
  methods: {
    deleteTheVeryComment: function () {
      HTTP.delete('/comments/' + this.comment.id)
        .then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('delete-comment', this.comment.id)
    },
    increaseLikesComment: function () {
      let lk = this.comment.likes + 1
      HTTP.patch(('/comments/' + this.comment.id), {
        'likes': lk
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('re-like-comment', this.comment.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/comments"
</style>
