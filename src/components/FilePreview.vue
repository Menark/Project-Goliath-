<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-bind:class="classObject">
          <header>
            <div @click="$emit('close')" class="close-div">
              <icon-base
                class="close"
                viewBox="0 0 512 512"
                icon-name="close">
                <icon-close class="close-img"/>
              </icon-base>
            </div>
          </header>
          <div class="container">
            <div>
                <textarea
                  class="newTweet"
                  v-model="message"
                  placeholder="Write your fabulous tweet!"
                  maxlength="140">
                </textarea>
            </div>
            <div v-if="vision">
                <div class="imagePreview">
                  <div
                    v-for="(file, key) in arrayOfFiles"
                    :key="key">
                    <img v-if="file.type.startsWith('image')" class="previewImages" :ref="'image'+parseInt( key )"/>
                    <video v-else class="previewVideos" :ref="'video'+parseInt( key )" controls></video>
                    <img src="../images/remove.svg" class="closeh" @click="removeImage(key)"/>
                  </div>
                </div>
            </div>
            <label for="fileses">
              <img class="uploadImageButton" src="../images/photo.svg"/>
            </label>
              <input
                  type="file"
                  id="fileses"
                  ref="previewFiles"
                  accept="image/*, video/*"
                  multiple
                  v-on:change="handleFileUpload()"/>
            <p> {{ $t('images') }}: {{ this.base64OfImages.length }} </p>
            <p> {{ $t('video') }}: {{ this.base64OfVideos.length }} </p>
          </div>
          <footer>
            <button
              class="modal-default-button"
              @click="choicePostOrCommentMethod"
              :disabled="isDisabledButton">
                {{ $t('sendPost') }}
            </button>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { HTTP } from '../utils/api'
import moment from 'moment'
import IconClose from './icons/IconClose'
import IconBase from './IconBase'

export default {
  name: 'FilePreview',
  props: {
    TRX: {
      type: Boolean
    }
  },
  data () {
    return {
      message: '',
      arrayOfFiles: [],
      base64OfImages: [],
      base64OfVideos: [],
      maxImage: 2,
      vision: false
    }
  },
  components: {
    IconBase,
    IconClose
  },
  computed: {
    currentD: function () {
      return moment().format('LLL')
    },
    classObject: function () {
      return this.$store.getters.isDarkModed ? 'dark' : 'light'
    },
    choicePostOrCommentMethod: function () {
      return this.TRX ? this.sendComment : this.sendPost
    },
    isDisabledButton: function () {
      return this.message.length === 0 && this.arrayOfFiles.length === 0
    }
  },
  methods: {
    handleFileUpload: function () {
      let uploadedFiles = this.$refs.previewFiles.files
      for (let i = 0; i < uploadedFiles.length; i++) {
        if (uploadedFiles[i].size > 1024 * 1024 * 5) {
          console.log('File is too big!')
        } else {
          this.arrayOfFiles.push(uploadedFiles[i])
          this.vision = true
        }
      }
      this.getImagePreviews()
    },
    getImagePreviews: function () {
      for (let i = 0; i < this.arrayOfFiles.length; i++) {
        if (this.arrayOfFiles.length > this.maxImage) {
          this.arrayOfFiles.splice(this.maxImage + 1)
          document.getElementById('fileses').disabled = true
        } else {
          document.getElementById('fileses').disabled = false
        }
        if (this.arrayOfFiles[i].type.startsWith('image')) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['image' + parseInt(i)][0].src = reader.result
            if (!this.base64OfImages.includes(reader.result)) {
              this.base64OfImages.push(reader.result)
              console.log(reader.result)
            }
          }.bind(this), false)
          reader.readAsDataURL(this.arrayOfFiles[i])
        } else {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['video' + parseInt(i)][0].src = reader.result
            if (!this.base64OfVideos.includes(reader.result)) {
              this.base64OfVideos.push(reader.result)
              console.log(reader.result)
            }
          }.bind(this), false)
          reader.readAsDataURL(this.arrayOfFiles[i])
        }
      }
    },
    removeImage: function (key) {
      if (this.arrayOfFiles[key].type.startsWith('image')) {
        this.arrayOfFiles.splice(key, 1)
        this.base64OfImages.splice(key, 1)
        this.getImagePreviews()
      } else {
        this.arrayOfFiles.splice(key, 1)
        this.base64OfVideos.splice(key, 1)
        this.getImagePreviews()
      }
      if (this.arrayOfFiles.length === 0) {
        this.vision = false
      }
    },
    sendPost: function () {
      HTTP.post('/posts', {
        'body': this.message,
        'photos': this.base64OfImages,
        'videos': this.base64OfVideos,
        'likes': 0,
        'date': this.currentD
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('add-new')
      this.$emit('close')
    },
    sendComment: function () {
      HTTP.post('/comments', {
        'body': this.message,
        'photos': this.base64OfImages,
        'videos': this.base64OfVideos,
        'likes': 0,
        'date': this.currentD,
        'postId': +this.$route.params.id
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.$emit('add-new')
      this.$emit('close')
    },
    deleteItemsAll: function () {
      this.arrayOfFiles.splice(0)
      this.base64OfImages.splice(0)
      this.base64OfVideos.splice(0)
      this.messagr = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/filepreview"
</style>
