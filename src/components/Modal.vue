<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            {{ $t('hello') }}
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/modal"
</style>
