<template>
  <div 
    class="container"
    :class="containerClass"
  >

    <main class="main">
      <component 
        :is="layout" 
        :key="$page.path"
      />
    </main>

    <aside class="aside">
      <InfoCard class="main-div" />

      <!-- <PostNavCard
        v-if="$page.type === 'post'"
        class="main-div"
      /> -->
    </aside>
  </div>
</template>

<script>
import InfoCard from '@theme/components/InfoCard.vue'
export default {
  name: 'MyMain',
  components: {
    InfoCard
  },
  computed: {
    layout() {
      const layout = this.$page.frontmatter.layout
      if (
        layout &&
        (this.$vuepress.getLayoutAsyncComponent(layout) ||
          this.$vuepress.getVueComponent(layout))
      ) {
        return layout
      }

      if (!this.$page.path) {
        return 'NotFound'
      }

      return 'Layout'
    },
    containerClass() {
      return {
        'show-aside': true,
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.container
  display inline-flex
  position relative
  width 100%
  justify-content center
  margin 3rem auto
  margin-bottom 1.5rem
  .main
    animation text-show-left 1s
    width 60%
  .aside
    animation text-show-right 1s
    width 20%
    margin-left 1.2rem
</style>