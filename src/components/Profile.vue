<template>
  <div class="profile" id="sc">
    <div id='gridContainer'>
      <header class="top">
        <div> {{ $t('welcomM') }} </div>
      </header>
      <aside>
        <p class="sticky-date"> {{ $t('currentDate') + this.currentTime }} </p>
      </aside>
      <article>
        <div class="scrolling">
          <div>
            <div>
              <file-preview
                v-if="showModal"
                @close="showModal = false"
                v-on:add-new="renewPosts"
                >
              </file-preview>
            </div>
          </div>
          <twitter-post
            v-on:re-like-post="reLikePost"
            v-on:delete-post="deletePost"
            v-for="(post,i) in info"
            :post="post"
            :key="i"
            > {{ post }}
          </twitter-post>
        </div>
      </article>
      <aside>
        <div class="add-tweet-button" @click="showModal = true">
          <p>{{ $t('addTweetButton') }}</p>
        </div>
      </aside>
    </div>
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="bubbles">
    </infinite-loading>
  </div>
</template>

<script>
import { HTTP } from '../utils/api'
import TwitterPost from './TwitterPost'
import FilePreview from './FilePreview'
import moment from 'moment'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Profile',
  data () {
    return {
      info: [],
      postsNew: [],
      currentTime: null,
      showModal: false
    }
  },
  components: {
    'twitter-post': TwitterPost,
    'file-preview': FilePreview,
    'infinite-loading': InfiniteLoading
  },
  created () {
    this.currentTime = moment().format('LTS')
    setInterval(() => this.updateCurrentTime(), 1 * 1000)
  },
  methods: {
    renewPosts: function () {
      HTTP.get('/posts')
        .then((response) => {
          this.info.unshift(response.data[response.data.length - 1])
          console.log(response.data[response.data.length - 1])
        })
    },
    deletePost: function (id) {
      for (var i = 0; i < this.info.length; i++) {
        if (this.info[i].id === id) {
          this.info.splice(i, 1)
        }
      }
    },
    reLikePost: function (id) {
      HTTP.get('/posts/' + id)
        .then((response) => {
          for (var i = 0; i < this.info.length; i++) {
            if (this.info[i].id === id) {
              this.info[i].likes = response.data.likes
            }
          }
        })
    },
    updateCurrentTime: function () {
      this.currentTime = moment().format('LTS')
    },
    infiniteHandler: function ($state) {
      HTTP.get('/posts'
      ).then(response => {
        for (var i = (response.data.length - this.info.length - 1); i > (response.data.length - 6 - this.info.length); i--) {
          let y = response.data[i]
          if (y) {
            this.postsNew.push(y)
          }
        }
        if (this.postsNew.length > 0) {
          this.info = this.info.concat(this.postsNew)
          this.postsNew = []
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
  @import "../scss/profile"
</style>
