<template>
  <div ref="root">
    <b-alert :show="dismissCountDown" dismissible :variant="type" @dismissed="dismissCountDown = 0" ref="alert"
      @dismiss-count-down="countDownChanged">
      <p>{{ message }}</p>
      <b-progress :variant="type" :max="duration" :value="dismissCountDown" height="4px"/>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertBox',
  props: {
    type: String,
    duration: Number,
    message: String,
    dismissCountDown: {
      type: Number,
      default: 0
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.duration;
    },
  }
}
</script>
