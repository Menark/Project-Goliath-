<template>
  <div class="profile" id="sc">
    <div id='gridContainer'>
      <header class="top">
        <div> {{ $t('welcomM') }} </div>
      </header>
      <aside>
        <p> {{ $t('currentDate') + this.currentTime }} </p>
      </aside>
      <article>
        <div class="scrolling">
          <div>
            <div>
              <file-preview
                v-on:add-new="renewPosts()"
                >
              </file-preview>
            </div>
          </div>
          <twitter-post
            v-on:re-new="renewPosts()"
            v-for="(post,i) in info"
            :post="post"
            :key="i"
            > {{ post }}
          </twitter-post>
        </div>
      </article>
      <aside>
        {{ $t('hello') }}
      </aside>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../utils/api'
import TwitterPost from './TwitterPost'
import FilePreview from './FilePreview'
import moment from 'moment'

export default {
  name: 'Profile',
  data () {
    return {
      info: [],
      currentTime: null
    }
  },
  components: {
    'twitter-post': TwitterPost,
    'file-preview': FilePreview
  },
  beforeMount () {
    HTTP.get('/posts')
      .then((response) => {
        // for (var i = 0; i < 18; i++) {
        //   this.info.push(response.data[i])
        // }
        this.info = response.data
        this.info.reverse()
        console.log(this.info)
      })
  },
  // mounted () {
  //   window.addEventListener('scroll', this.scroll)
  //   console.log('scrolling Injected')
  // },
  created () {
    this.currentTime = moment().format('LTS')
    setInterval(() => this.updateCurrentTime(), 1 * 1000)
  },
  // watch: {
  //   scrolling: function () {
  //     if (document.getElementById('#sc').onscroll) {
  //       console.log('This is SCROLLLLL')
  //     }
  //   }
  // },
  methods: {
    renewPosts: function () {
      HTTP.get('/posts')
        .then((response) => {
          this.info = response.data
          this.info.reverse()
        })
    },
    // scroll: function () {
    //   HTTP.get('/posts')
    //     .then(response => {
    //       this.info.push(response.data[4])
    //     })
    // },
    updateCurrentTime: function () {
      this.currentTime = moment().format('LTS')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/profile"
</style>
