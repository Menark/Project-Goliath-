<template>
  <div class="container">
    <div>
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
        <img class="uploadImage" src="../images/photo.svg"/>
      </label>
        <input
          type="file"
          id="fileses"
          ref="previewFiles"
          accept="image/*, video/*"
          multiple
          v-on:change="handleFileUpload()"/>
      <br>
      <p> Images: {{ this.base64OfImages.length }} </p>
      <p> Videos: {{ this.base64OfVideos.length }} </p>
      <br>
      <button type="button" @click="sendPost">Post</button>
    </div>
    <br>
  </div>
</template>

<script>
import { HTTP } from '../utils/api'

export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      arrayOfFiles: [],
      base64OfImages: [],
      base64OfVideos: [],
      maxImage: 2,
      vision: false
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
        'videos': this.base64OfVideos
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
      this.arrayOfFiles.length = 0
    }
    // compDecomp: function () {
    //   const lzma = require('lzma')
    //   lzma.compress(this.qwerty, 9, function (result) {
    //     console.log('Compressed: ' + result)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/filepreview"
</style>
