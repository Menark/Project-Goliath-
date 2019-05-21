<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
          class="modal-container"
          v-bind:class="classObject">
          <div class="modal-header">
            <slot name="header">
            </slot>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="inputComment"
              v-model="commentMessage"/>
            <button type="button" @click="sendComment">{{ $t('sendComment') }}</button>
          </div>
          <div class="modal-body">
            <div v-if="show" >
              <comments
                v-for="(comment,i) in commentsFilter(com, id)"
                :comment="comment"
                :key="i"
                >  {{ comment }}
              </comments>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              {{ id }}
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { HTTP } from '../utils/api'
import Comments from './Comments'
import moment from 'moment'

export default {
  name: 'Modal',
  props: {
    id: Number,
    body: String,
    isNight: Boolean
  },
  data () {
    return {
      com: [],
      show: true,
      commentMessage: ''
    }
  },
  mounted () {
    HTTP.get('/comments')
      .then((response) => {
        this.com = response.data
      })
  },
  computed: {
    currentD: function () {
      return moment().format('LLL')
    },
    classObject: function () {
      return this.$store.getters.isDarkModed ? 'dark' : 'light'
    }
  },
  methods: {
    commentsFilter: function (com, numb) {
      return com.filter(function (el) {
        return el.postId === numb
      })
    },
    sendComment: function () {
      HTTP.post('/comments', {
        'body': this.commentMessage,
        'postId': this.id,
        'likes': 0,
        'date': this.currentD
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.commentMessage = ''
    }
  },
  components: {
    Comments
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/modal"
</style>
