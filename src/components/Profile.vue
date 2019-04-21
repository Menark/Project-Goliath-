<template>
  <div class="profile">
    <div id='gridContainer'>
      <header class="top">
        <div> Здесь просто пустое поле! </div>
      </header>
      <aside>
        <p> Евгений Сегодня март 2019 </p>
      </aside>
      <article>
        <div>
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
        Hello!
      </aside>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../utils/api'
import TwitterPost from './TwitterPost'
import FilePreview from './FilePreview'

export default {
  name: 'Profile',
  data () {
    return {
      info: ''
    }
  },
  components: {
    'twitter-post': TwitterPost,
    'file-preview': FilePreview
  },
  mounted () {
    HTTP.get('/posts')
      .then((response) => {
        this.info = response.data
        this.info.reverse()
      })
  },
  methods: {
    renewPosts: function () {
      HTTP.get('/posts')
        .then((response) => {
          this.info = response.data
          this.info.reverse()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/profile"
</style>
