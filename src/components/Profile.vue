<template>
 <div id='gridContainer'>
    <header>
      <p> Здесь просто пустое поле! </p><br>
    </header>
    <aside>
      <p> Евгений Сегодня март 2019 </p><br>
    </aside>
    <article>
      <p> {{ info }} </p><br>
    </article>
    <aside>
      <p> Евгений Сегодня март 2019 </p><br>
    </aside>
 </div>
</template>

<script>
import { HTTP } from '../utils/api'
import {getPosts} from '../services/contentServera'

export default {
  name: 'LolOfLol',
  data () {
    return {
      info: ''
    }
  },
  mounted () {
    HTTP.get('/posts')
      .then((response) => {
        this.info = response.data[0].body
      })
  },
  methods: {
    getPosts: function () {
      getPosts().then((posts) => {
        this.info = posts
      })
    }
  }
}
</script>

<style scoped>
  body {
    background-color: rgb(83, 83, 83);
  }

  #gridContainer {
    background-color: rgb(82, 82, 82);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 7fr;
    box-sizing: border-box;
  }

  #gridContainer > * {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(86, 97, 194);
    text-align: center;
    font-size: 20px;
    border: 1px solid black;
  }

  header {
    grid-column: 1/4;
  }
</style>
