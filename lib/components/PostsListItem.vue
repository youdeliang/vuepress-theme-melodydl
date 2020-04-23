<template>
  <div class="post-list-item">
    <RouterLink 
      :to="post.path" 
      class="post-link"
    > 
      <div class="post-content">
        <h3 class="post-title">{{ post.title }}</h3>
        <div class="post-date">
          <i class="el-icon-date">{{ post.createdAt }}</i>
          <i class="el-icon-folder">{{ post.frontmatter.category }}</i>
          <i class="fa fa-tags" aria-hidden="true"></i>
        </div>
        <p class="post-excerpt" v-html="post.excerpt" />
      </div>
      <div class="post-image" />
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: "PostList",
  computed: {
    listPosts() {
      return this.posts || this.$posts
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.post, "postList")
  }
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.post-list-item 
  padding 0 0.5rem
  &:not(:first-child)
    border-top 1px solid $borderColor
  .post-link
    .post-content
      color $lightTextColor
      .post-title
        color $textColor
        transition all 0.2s
      .post-excerpt
        color $grayTextColor
        text-align justify
        padding 0
    &:hover
      text-decoration none
      .post-title
        color $accentColor
        // background-image: url('https://d1qmdf3vop2l07.cloudfront.net/yellow-sage.cloudvent.net/compressed/_min_/0d604e4a276ef596282a73cd64283ac7.jpg') // d1qmdf3vop2l07.cloudfront.net/yellow-sage.cloudvent.net/compressed/_min_/0d604e4a276ef596282a73cd64283ac7.jpg)
</style>
