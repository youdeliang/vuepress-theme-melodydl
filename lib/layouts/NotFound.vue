<template>
  <div class="main-div not-found">
    <MyHeader />
    <MyFooter />
  </div>
</template>

<script>
import MyHeader from '@theme/components/MyHeader.vue'
import MyFooter from '@theme/components/MyFooter.vue'
export default {
  name: 'NotFound',
  components: {
    MyHeader,
    MyFooter,
  },
}
</script>

<style lang="stylus" scoped>
.not-found
  text-align center
</style>
