<template>
 <div id='gridContainer'>
    <header>
      <p> Здесь просто пустое поле! </p>
    </header>
    <aside>
      <p> Евгений Сегодня март 2019 </p>
    </aside>
    <article>
      <div id="post">
        <twitter-post
          v-for="(post,i) in info"
          :post="post"
          :key="i"
          > {{ post }} </twitter-post>
      </div>
    </article>
    <aside>
      <div>
        <input type="text" v-model="message">
        <button type="button" @click="sendPost">Post</button>
      </div>
    </aside>
 </div>
</template>

<script>
import { HTTP } from '../utils/api'
import TwitterPost from './TwitterPost'

export default {
  name: 'LolOfLol',
  data () {
    return {
      info: '',
      message: ''
    }
  },
  components: {
    'twitter-post': TwitterPost
  },
  mounted () {
    HTTP.get('/posts')
      .then((response) => {
        this.info = response.data
      })
  },
  methods: {
    sendPost: function () {
      HTTP.post('/posts', {
        'body': this.message
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
