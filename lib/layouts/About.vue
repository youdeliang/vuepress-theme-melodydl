<template>
  <div class="main-div">
    <Content class="post-content content" />
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style lang="stylus" scoped>
.main-div
  line-height 1.7rem
  & >>> .content
    line-height 3 !important
    blockquote
      margin 20px 0
    a
      color $accentColor
    ul
      margin-top 10px
</style>
