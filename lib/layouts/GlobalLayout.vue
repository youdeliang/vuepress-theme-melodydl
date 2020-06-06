<template>
  <div id="global-layout">
    <MyHeader />

    <MyMain />

    <MyFooter />
  </div>
</template>

<script>
import MyHeader from '@theme/components/MyHeader.vue'
import MyFooter from '@theme/components/MyFooter.vue'
import MyMain from '@theme/components/MyMain.vue'
export default {
  components: {
    MyHeader,
    MyFooter,
    MyMain,
  },
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

#global-layout
  display grid
  grid-template-rows 40vh 1fr auto
  min-height 100vh
</style>
