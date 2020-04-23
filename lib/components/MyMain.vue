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
  margin 1rem auto
  .main
    padding 1.5rem
    border-radius 5px
    background-color #fff
    width 60%
  .aside
    width 20%
    padding 1.5rem
    margin-left 16px
    border-radius 5px
    background-color #fff
</style>