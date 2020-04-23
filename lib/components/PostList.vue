<template>
   <div class="post-list">
    <div
      v-if="listPosts.length === 0"
      key="no-posts"
      class="no-posts"
    >
      no posts
    </div>
    <div
      v-else
      class="posts-items"
    >
      <PostsListItem
        v-for="post in pagePosts"
        :key="post.path"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import PostsListItem from '@theme/components/PostsListItem.vue'
export default {
  name: 'PostList',
  data() {
    return {
      page: 1,
    }
  },
  components: {
    PostsListItem
  },
  computed: {
    listPosts () {
      return this.posts || this.$posts
    },

    perPage () {
      return this.$themeConfig.pagination.perPage || 5
    },

    total () {
      return Math.ceil(this.listPosts.length / this.perPage)
    },

    pagePosts () {
      const begin = (this.page - 1) * this.perPage
      const end = begin + this.perPage
      return this.listPosts.slice(begin, end)
    },
  },
  mounted() {
    console.log(this.listPosts, "postList")
  }
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.no-posts
  color $grayTextColor
</style>
