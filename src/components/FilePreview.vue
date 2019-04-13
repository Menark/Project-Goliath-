<template>
  <div class="container">
    <div>
      <br>
      <div>
        <div class="imagePreview">
          <div
            v-for="(file, key) in files"
            v-bind:key="key">
            <img class="preview" v-bind:ref="'image'+parseInt( key )"/>
            <img src="../images/remove.svg" class="close" @click="removeImage"/>
          </div>
        </div>
      </div>
      <label for="fileses">
        <img class="uploadImage" src="../images/photo.svg"/>
      </label>
        <input
          type="file"
          id="fileses"
          ref="files"
          accept="image/*"
          multiple
          v-on:change="handleFileUpload()"/>
      <br>
      <p> {{ this.array.length }} </p>
      <br>
      <button v-on:click="submitFiles">Submit</button>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../utils/api'

export default {
  data () {
    return {
      files: [],
      array: [],
      showPreview: false,
      imagePreview: ''
    }
  },
  methods: {
    handleFileUpload: function () {
      let uploadedFiles = this.$refs.files.files
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
      this.getImagePreviews()
    },
    getImagePreviews: function () {
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[9]) {
          document.getElementById('fileses').disabled = true
        }
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['image' + parseInt(i)][0].src = reader.result
            if (!this.array.includes(reader.result)) {
              this.array.push(reader.result)
            }
          }.bind(this), false)
          reader.readAsDataURL(this.files[i])
          this.$emit('send-post', this.array)
        }
      }
    },
    removeImage: function (key) {
      this.files.splice(key, 1)
      this.array.splice(key, 1)
    },
    submitFiles: function () {
      HTTP.post('/posts', {
        'photos': this.array
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
