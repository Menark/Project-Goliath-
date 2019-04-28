<template>
  <div class="tweet1">
      <header>
        {{ comment.id }}
        <!--<img src="../images/remove.svg" class="close" @click="deleteTheVeryPost(comment.id)"/>-->
      </header>
      <main class="main1">
        <div class="postPhotoAndVideo1">
          <div class="postPhotoAndVideo_Image1"
            v-for="(photo, y) in comment.photos"
            :key="y+'photo'">
            <img v-if="comment.photos" class="postPhoto1" :src="photo"/>
          </div>
        </div>
        <div class="postMessage1">
          {{ comment.body }}
        </div>
      </main>
      <aside>
      </aside>
      <footer>
        <button
          class="buttonLikes1">
          <icon-base
            class="logoContainer1"
            viewBox="0 0 64 64"
            icon-name="write">
            <icon-retweet class="logoRetweet1" />
          </icon-base>
          <p>{{ counterRetweet }}</p>
        </button>
        <button
          @click="increaseLikes(comment.id)"
          class="buttonLikes1">
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
// import { HTTP } from '../utils/api'

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
  methods: {
    // deleteTheVeryPost: function (id) {
    //   HTTP.delete('/posts/' + id)
    //     .then(response => {})
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    //   this.$emit('re-new')
    // },
    // increaseLikes: function (id) {
    //   let lk = this.post.likes++
    //   HTTP.post('/posts/' + id, {
    //     'likes': lk
    //   }).then(response => {})
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    //   this.$emit('re-new')
    // },
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/comments"
</style>
