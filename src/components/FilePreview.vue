<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-bind:class="classObject">
          <div class="container">
            <div>
              <div>
                <textarea
                  class="newTweet"
                  v-model="message"
                  placeholder="Write your fabulous tweet!"
                  maxlength="140">
                </textarea>
              </div>
              <br>
              <div v-if="vision">
                <div class="imagePreview">
                  <div
                    v-for="(file, key) in arrayOfFiles"
                    :key="key">
                    <img v-if="file.type.startsWith('image')" class="previewImages" :ref="'image'+parseInt( key )"/>
                    <video v-else class="previewVideos" :ref="'video'+parseInt( key )" controls></video>
                    <img src="../images/remove.svg" class="close" @click="removeImage(key)"/>
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
              <br>
              <p> {{ $t('images') }}: {{ this.base64OfImages.length }} </p>
              <p> {{ $t('video') }}: {{ this.base64OfVideos.length }} </p>
              <br>
              <div class="modal-buttons">
                <button class="modal-default-button" type="button" @click="sendPost">{{ $t('sendPost') }}</button>
                <button class="modal-default-button" @click="$emit('close')">OK</button>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { HTTP } from '../utils/api'
import moment from 'moment'

export default {
  name: 'FilePreview',
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
  computed: {
    currentD: function () {
      return moment().format('LLL')
    },
    classObject: function () {
      return this.$store.getters.isDarkModed ? 'dark' : 'light'
    }
  },
  methods: {
    handleFileUpload: function () {
      let uploadedFiles = this.$refs.previewFiles.files
      for (var i = 0; i < uploadedFiles.length; i++) {
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
        'date': this.currentD
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
