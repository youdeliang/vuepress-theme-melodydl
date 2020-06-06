<template>
  <div>
    <div class="tags main-div">
      <div
        v-for="tag in tagList"
        :key="tag"
        class="tag main-tag"
        @click="selectPost"
      >
        {{ tag }}
      </div>
    </div>
    <TransitionSlide>
      <PostList
        :key="$page.path"
        :posts="posts"
      />
    </TransitionSlide>
  </div>
</template>

<script>
import PostList from '@theme/components/PostList.vue'
import TransitionSlide from '@theme/components/TransitionSlide.vue'
export default {
  name: 'Tags',
  components: {
    PostList,
    TransitionSlide,
  },

  data () {
    return {
      posts: null,
    }
  },
  computed: {
    tagList () {
      return Object.keys(this.$tags.map)
    },
    tagMap () {
      return this.$tags.map
    },
  },

  created () {
    this.posts = this.$posts
  },
  methods: {
    selectPost (e) {
      const tagName = e.target.innerText
      console.log(tagName)
      this.posts = this.tagMap[tagName].posts
    },
  },
}
</script>

<style lang="stylus">
.tags
  margin-bottom 20px
  text-align center
  .main-tag
    height 28px

</style>
