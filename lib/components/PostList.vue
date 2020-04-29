<template>
   <div class="post-list">
    <div
      v-if="total === 0"
      key="no-posts"
      class="no-posts main-div"
    >
      no posts
    </div>
    <div
      v-else
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
    <div 
      v-if="total > 1"
      class="post-paginator">
      <el-pagination
        background
        :key="total"
        :page-size="perPage"
        :pager-count="5"
        @current-change="changePage"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import PostsListItem from '@theme/components/PostsListItem.vue'
import TransitionSlide from '@theme/components/TransitionSlide.vue'
export default {
  name: 'PostList',
  data() {
    return {
      currentPage: 1,
    }
  },
  
  components: {
    PostsListItem,
    TransitionSlide
  },
  props: {
    posts: {
      type: Array,
      required: false,
      default: null
    }
  },
  watch: {
    listPosts() {
      this.currentPage = 1
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
      return this.listPosts.length
    },

    pagePosts () {
      const begin = (this.currentPage - 1) * this.perPage
      const end = begin + this.perPage
      return this.listPosts.slice(begin, end)
    },

    key() {
      return this.posts ? this.total : null
    }
  },
  mounted() {
    console.log(this.$page)
  },
  methods: {
    changePage(index) {
      this.currentPage = index
      window.scroll({top: 0 })
    }
  }
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
  .el-pagination >>> .el-pager li
    background-color #fff
</style>
