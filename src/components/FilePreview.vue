<template>
  <div class="container">
    <div>
      <br>
      <div v-if="vision">
        <div class="imagePreview">
          <div
            v-for="(file, key) in imagesArr"
            :key="key">
            <img class="preview" :ref="'image'+parseInt( key )"/>
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
      <p> {{ this.arrayBase64.length }} </p>
      <br>
      <button type="button" @click="sendPost">Post</button>
      <div>
        <p>Taken from wikpedia</p>
        <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
          AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
      </div>
    </div>
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
      imagesArr: [],
      arrayBase64: [],
      maxImage: 2,
      vision: false
    }
  },
  methods: {
    handleFileUpload: function () {
      let uploadedFiles = this.$refs.previewFiles.files
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.imagesArr.push(uploadedFiles[i])
      }
      this.vision = true
      this.getImagePreviews()
    },
    getImagePreviews: function () {
      for (let i = 0; i < this.imagesArr.length; i++) {
        if (this.imagesArr.length > this.maxImage) {
          this.imagesArr.splice(this.maxImage + 1)
          document.getElementById('fileses').disabled = true
        } else {
          document.getElementById('fileses').disabled = false
        }
        if (/\.(jpe?g|png|gif|mp4)$/i.test(this.imagesArr[i].name)) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['image' + parseInt(i)][0].src = reader.result
            if (!this.arrayBase64.includes(reader.result)) {
              this.arrayBase64.push(reader.result)
              console.log(reader.result)
            }
          }.bind(this), false)
          reader.readAsDataURL(this.imagesArr[i])
        }
      }
    },
    removeImage: function (key) {
      this.imagesArr.splice(key, 1)
      this.arrayBase64.splice(key, 1)
      if (this.imagesArr.length === 0) {
        this.vision = false
      }
      this.getImagePreviews()
    },
    sendPost: function () {
      HTTP.post('/posts', {
        'body': this.message,
        'photos': this.arrayBase64
      }).then(response => {})
        .catch(function (error) {
          console.log(error)
        })
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
