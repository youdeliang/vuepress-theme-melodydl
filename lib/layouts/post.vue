<template>
  <div class="post">
    <article class="main-div">
      <Content
        class="post-content content"
      />
    </article>

    <div
      v-if="vssue"
      class="main-div vssue"
    >
      <Vssue :title="vssueTitle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  computed: {
    vssue () {
      return this.$themeConfig.comments !== false && this.vssueTitle
    },
    vssueTitle () {
      return this.$page.frontmatter.title || undefined
    },
  },
}
</script>

<style lang="stylus">
.vssue
  margin-top 1rem
</style>
