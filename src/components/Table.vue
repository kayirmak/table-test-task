<template>
  <table class="table">

  </table>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App-Table',
  data() {
    return {
      url: 'data'
    }
  },
  methods: {
    ...mapActions([
      'getData'
    ]),

  },
  mounted() {
    this.getData(this.url)
  }
}
</script>

<style scoped>

</style>
