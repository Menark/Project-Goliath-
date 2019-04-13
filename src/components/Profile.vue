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
              <textarea
                class="textareaNewTweet"
                v-model="message"
                placeholder="Write your fabulous tweet!"
                maxlength="140">
              </textarea>
              <file-preview/>
            </div>
            <button type="button" @click="sendPost">Post</button>
          </div>
          <twitter-post
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
  name: 'imageUpload',
  data () {
    return {
      info: '',
      message: '',
      arr: []
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
      })
  },
  methods: {
    sendPost: function (e) {
      HTTP.post('/posts', {
        'body': this.message,
        'photos': e
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/profile"
</style>
