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

<style scoped>
  #gridContainer {
    background-color: #e6ecf0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 7fr;
    box-sizing: border-box;
  }

  header, aside, article {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    border: 1px solid black;
  }

  article, header {
    background-color: rgb(255, 255, 255);
  }

  article > div {
    width: 100%;
  }

  aside, article {
    align-items: start;
    margin-top: 5px;
    box-sizing: border-box;
  }

  header {
    grid-column: 1/4;
  }
</style>
