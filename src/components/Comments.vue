<template>
  <div>
    {{ comment.body }}
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: {
    comment: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
