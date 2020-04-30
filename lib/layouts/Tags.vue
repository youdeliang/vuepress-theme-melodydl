<template>
  <div>
    <div class="tags main-div">
      <div 
        class="tag main-tag"
        v-for="tag in tagList"
        :key="tag"
        @click="selectPost"
      >
        {{tag}}
      </div>
    </div>
    <TransitionSlide>
      <PostList :posts="posts" :key="$page.path"/>
    </TransitionSlide>
  </div>
</template>

<script>
import PostList from '@theme/components/PostList.vue'
import TransitionSlide from '@theme/components/TransitionSlide.vue'
export default {
  name: 'Tags',
  computed: {
    tagList() {
      return Object.keys(this.$tags.map)
    },
    tagMap() {
      return this.$tags.map
    }
  },
  components: {
    PostList,
    TransitionSlide
  },
  methods: {
    selectPost(e) {
      const tagName = e.target.innerText
      console.log(tagName)
      this.posts = this.tagMap[tagName].posts
    }
  },

  data () {
    return {
      posts: null,
    }
  },

  created () {
    this.posts = this.$posts
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