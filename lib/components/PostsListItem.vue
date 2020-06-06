<template>
  <div class="post-list-item main-div">
    <RouterLink
      :to="post.path"
      class="post-link"
    >
      <div class="post-content">
        <h3 class="post-title">
          <span class="post-time">
            <span>{{ post.createdAt | formatterDay }}</span>
            <span>{{ post.createdAt | formatterYear }}</span>
          </span>
          <span>{{ post.title }}</span>
        </h3>
        <!-- eslint-disable vue/no-v-html -->
        <p
          class="post-excerpt"
          v-html="post.excerpt"
        />
        <p
          v-for="tag of tags"
          :key="tag"
          class="tag post-category"
        >
          {{ tag }}
        </p>
        <div class="post-button">
          阅读全文
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  filters: {
    formatterDay (date) {
      return date.split('-').join('.').slice(5)
    },
    formatterYear (date) {
      return date.split('-').join('').slice(0, 4)
    },
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    listPosts () {
      return this.posts || this.$posts
    },
    tags () {
      return this.post.tags || []
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.post-list-item
  &:hover
    box-shadow: 0 0 15px 1px #B5B5B5;
    transform: translateY(-3px);
  &:not(:first-child)
    border-top 1px solid $borderColor
    margin-top 1.4rem
    @media (max-width $MQMobile - 1)
      margin 0
  .post-link
    .post-content
      position relative
      color $lightTextColor
      .post-title
        color $textColor
        display flex
        align-items flex-end
        transition all 0.2s
        .post-time
          color #fff
          text-align center
          font-size 0.75rem
          padding 3px
          margin-right 10px
          display inline-flex
          flex-direction column
          background-color $accentColor
          border-radius 4px
          :first-child
            font-size 14px
      .post-excerpt
        margin 1.4rem 0
        color $grayTextColor
        text-align justify
        padding 0
      .post-category
        border-radius 4px
        font-size 12px
    &:hover
      text-decoration none
      .post-title
        color $accentColor
    .post-button
      position absolute
      bottom 0px
      color #ffffff
      right 0px
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1.5;
      border-radius: 3px;
      background-color $accentColor
      &:hover
        background-color lighten($accentColor, 10%)
</style>
