<template v-slot="header">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
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

export default {
  name: 'Modal',
  props: {
    id: Number,
    body: String
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
        'likes': 0
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

<style>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.inputComment {
  width: 80%;
  height: 30px;
}
</style>
