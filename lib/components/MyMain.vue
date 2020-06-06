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
    <TransitionSlide direction="x">
      <aside
        v-show="layout !== 'tags'"
        class="aside"
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
    TransitionSlide,
  },
  computed: {
    layout () {
      const layout = this.$page.frontmatter.layout
      if (layout) {
        return layout
      }

      if (!this.$page.path) {
        return 'NotFound'
      }

      return 'Layout'
    },
    style () {
      return {
        width: this.$page.path !== '/tags/' ? '60%' : '70%',
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.container
  display inline-flex
  position relative
  overflow hidden
  box-sizing border-box
  justify-content center
  margin-top 3rem
  margin-bottom 1.5rem
  .main
    width 62% !important
  .aside
    width 21%
    margin-left 1.5rem
    .aside-toc
      margin-top 1.2rem
  @media (max-width $MQMobile - 1)
    margin 0
    .main
      min-width 100%
    .aside
      display none
</style>
