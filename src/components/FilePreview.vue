<template>
  <div class="container">
    <div>
      <label>File Preview
        <input
          type="file"
          id="files"
          ref="files"
          accept="image/*"
          multiple
          v-on:change="handleFileUpload()"/>
      </label>
      <img v-bind:src="imagePreview" v-show="showPreview"/>
      <div>
        <div>
          <div
            v-for="(file, key) in files"
            v-bind:key="key">
              {{ file.name }}
            <span
            class="remove-file"
            v-on:click="removeImage( key )">
              Remove
            </span>
            <img class="preview" v-bind:ref="'image'+parseInt( key )"/>
          </div>
        </div>
      </div>
      <br>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      files: [],
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
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['image' + parseInt(i)][0].src = reader.result
          }.bind(this), false)
          reader.readAsDataURL(this.files[i])
        }
      }
    },
    removeImage (key) {
      this.files.splice(key, 1)
    }
  }
}
</script>

<style>
  .container img{
    max-width: 200px;
    max-height: 200px;
  }

  .remove-file{
    color: red;
    cursor: pointer;
    float: right;
  }
</style>
