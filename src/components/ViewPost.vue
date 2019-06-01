<template>
  <div class="viewPost"  v-bind:class="classObject">
    <div class="viewPost-tweet">
      <header>
        Ghbdtn {{ post.id }}
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
          <p>{{ counterLikes }}</p>
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
          <p>{{ post.likes }}</p>
        </button>
      </footer>
    </div>
      <div class="add-tweet-button viewPost-modal" @click="shoWModal = true; TRX = true">
        <p>{{ $t('addTweetButton') }}</p>
      </div>
      <file-preview
        v-if="shoWModal"
        :TRX="TRX"
        @close="shoWModal = false"
        v-on:add-new="renewComment"
        >
      </file-preview>
    <div class="viewPost-comments">
      <div v-if="show">
        <comments
          v-on:re-like-comment="reLikeComment"
          v-on:delete-comment="deleteComment"
          v-for="(comment,i) in commentsFilter(com, post.id)"
          :comment="comment"
          :key="i"
          >  {{ comment }}
        </comments>
        <infinite-loading
          @infinite="infiniteHandler"
          spinner="bubbles">
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../utils/api'
import Comments from './Comments'
import IconBase from './IconBase'
import IconRetweet from './icons/IconRetweet'
import IconSpeech from './icons/IconSpeech'
import IconLike from './icons/IconLike'
import InfiniteLoading from 'vue-infinite-loading'
import FilePreview from './FilePreview'

export default {
  name: 'ViewPost',
  props: {
    TRX: {
      type: Boolean,
      default: true
    }
  },
  components: {
    IconBase,
    IconRetweet,
    IconSpeech,
    IconLike,
    Comments,
    InfiniteLoading,
    FilePreview
  },
  data () {
    return {
      post: [],
      com: [],
      comNew: [],
      counterLikes: 0,
      counterRetweet: 0,
      show: true,
      commentMessage: '',
      shoWModal: false
    }
  },
  mounted () {
    HTTP.get('/posts/' + this.$route.params.id)
      .then((response) => {
        this.post = response.data
      })
  },
  computed: {
    classObject: function () {
      return this.$store.getters.isDarkModed ? 'dark' : 'light'
    }
  },
  methods: {
    renewComment: function () {
      HTTP.get('/comments')
        .then((response) => {
          this.com.unshift(response.data[response.data.length - 1])
          console.log(response.data[response.data.length - 1])
        })
    },
    commentsFilter: function (com, numb) {
      return com.filter(function (el) {
        return el.postId === numb
      })
    },
    deleteComment: function (id) {
      for (var i = 0; i < this.com.length; i++) {
        if (this.com[i].id === id) {
          this.com.splice(i, 1)
        }
      }
    },
    reLikeComment: function (id) {
      HTTP.get('/comments/' + id)
        .then((response) => {
          for (var i = 0; i < this.com.length; i++) {
            if (this.com[i].id === id) {
              this.com[i].likes = response.data.likes
            }
          }
        })
    },
    sendComment: function () {
      HTTP.post('/comments', {
        'body': this.commentMessage,
        'postId': this.post.id,
        'likes': 0,
        'date': this.currentD
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.commentMessage = ''
    },
    infiniteHandler: function ($state) {
      HTTP.get('/comments'
      ).then(response => {
        for (var i = (response.data.length - this.com.length - 1); i > (response.data.length - 7 - this.com.length); i--) {
          let y = response.data[i]
          if (y) {
            this.comNew.push(y)
          }
        }
        if (this.comNew.length > 0) {
          this.com = this.com.concat(this.comNew)
          this.comNew = []
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/viewpost"
</style>
