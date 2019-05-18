<template>
  <div class="tweet">
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
          @click="debouncedSave()"
          class="buttonLikes">
          <icon-base
            class="logoContainer"
            viewBox="0 0 512 512"
            icon-name="speech">
            <icon-like class="logoLike" />
          </icon-base>
          <p class="heart">{{ post.likes }}</p>
        </button>
        <button id="show-modal" @click="showModal = true">{{ $t('showModel') }}</button>
      </footer>
      <modal
        v-bind:id="post.id"
        v-bind:body="post.body"
        v-if="showModal"
        @close="showModal = false">
        <div class="tweet" slot="header">
          <header>
            {{ post.id }}
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
              @click="debouncedSave()"
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
        </div>
      </modal>
  </div>
</template>

<script>
import IconBase from './IconBase'
import IconRetweet from './icons/IconRetweet'
import IconSpeech from './icons/IconSpeech'
import IconLike from './icons/IconLike'
import { HTTP } from '../utils/api'
import Modal from './Modal'
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
      showModal: false
    }
  },
  components: {
    IconBase,
    IconRetweet,
    IconSpeech,
    IconLike,
    Modal
  },
  computed: {
    debouncedSave: function () {
      let DELAY = 1500
      return debounce(this.increaseLikes, DELAY)
    }
  },
  methods: {
    deleteTheVeryPost: function () {
      HTTP.delete('/posts/' + this.post.id)
        .then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('re-new')
    },
    increaseLikes: function () {
      // console.log('FUCJKHJFDKHGFHDG')
      let lk = this.post.likes + 1
      HTTP.patch(('/posts/' + this.post.id), {
        'likes': lk
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('re-new')
    }
    // debouncedSave: function (id) {
    //   let DELAY = 1000
    //   return debounce(this.increaseLikes(id), DELAY)
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/twitterpost"
</style>
