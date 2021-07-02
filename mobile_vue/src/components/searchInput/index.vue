<template>
  <div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    rules: {
      type: Array,
      default: []
    },
    value: {
      type: String,
      default: null
    },
    inputAlign: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {
      time: null,
      show: false
    }
  },
  methods: {
    updata(val) {
      this.time = this.$time(val).format('YYYY-MM-DD')
      this.$emit('input', this.time)
      this.$emit('confirm', this.time)
      this.show = false
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.time = newVal
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>
