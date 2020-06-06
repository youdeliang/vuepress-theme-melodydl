<template>
  <div class="post-list">
    <TransitionSlide>
      <div
        v-if="total === 0"
        key="no-posts"
        class="no-posts main-div"
      >
        no posts
      </div>
      <div
        v-else
        :key="currentPage"
        class="posts-items"
      >
        <TransitionSlide group>
          <PostsListItem
            v-for="post in pagePosts"
            :key="post.path"
            :post="post"
          />
        </TransitionSlide>
      </div>
    </TransitionSlide>
    <div
      v-if="total > 1"
      class="post-paginator"
    >
      <Pagination
        v-model="currentPage"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@theme/components/Pagination.vue'
import PostsListItem from '@theme/components/PostsListItem.vue'
import TransitionSlide from '@theme/components/TransitionSlide.vue'
export default {
  name: 'PostList',

  components: {
    PostsListItem,
    TransitionSlide,
    Pagination,
  },
  props: {
    posts: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      currentPage: 1,
    }
  },
  computed: {
    listPosts () {
      return this.posts || this.$posts || []
    },

    perPage () {
      return this.$themeConfig.pagination.perPage || 5
    },

    total () {
      return Math.ceil(this.listPosts.length / this.perPage)
    },

    pagePosts () {
      const begin = (this.currentPage - 1) * this.perPage
      const end = begin + this.perPage
      return this.listPosts.slice(begin, end)
    },

    key () {
      return this.posts ? this.total : null
    },
  },
  watch: {
    listPosts () {
      this.currentPage = 1
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.no-posts
  color $grayTextColor
.post-paginator
  padding-top 10px
  margin 1rem 0
  text-align center
</style>
