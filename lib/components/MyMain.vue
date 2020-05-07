<template>
  <div 
    class="container"
  >

    <main 
      class="main"
      :style="style"
    >
      <TransitionSlide>
        <component 
          :is="layout" 
          :key="$page.path"
        />
      </TransitionSlide>
    </main>
    <TransitionSlide direction='x' >
    <aside 
      class="aside" 
      v-show="layout !== 'tags'"
    >
      <InfoCard 
        class="main-div"
      />

      <PostToc
        v-if="$page.type === 'post'"
        class="main-div aside-toc"
      />
    </aside>
    </TransitionSlide>
  </div>
</template>

<script>
import TransitionSlide from '@theme/components/TransitionSlide.vue'
import InfoCard from '@theme/components/InfoCard.vue'
import PostToc from '@theme/components/PostToc.vue'
export default {
  name: 'MyMain',
  components: {
    InfoCard,
    PostToc,
    TransitionSlide
  },
  computed: {
    layout() {
      const layout = this.$page.frontmatter.layout
      if (layout) {
        return layout
      }

      if (!this.$page.path) {
        return 'NotFound'
      }

      return 'Layout'
    },
    style() {
      return {
        width: this.$page.path !== '/tags/' ? '60%' : '70%'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.container
  display inline-flex
  position relative
  width 100%
  overflow-y scroll
  overflow-x hidden
  box-sizing border-box
  justify-content center
  margin 3rem auto
  margin-bottom 1.5rem
  .main
    width 60%
  .aside
    width 22%
    margin-left 1.2rem
    .aside-toc
      margin-top 1.2rem
  @media (max-width $MQMobile - 1)
    margin 0
    .main
      min-width 100%
    .aside
      display none
</style>