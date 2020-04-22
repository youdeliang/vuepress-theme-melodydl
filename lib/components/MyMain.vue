<template>
  <div>
    <component 
      :is="layout"
    ></component>
  </div>
</template>

<script>
export default {
  name: "MyMain",
  computed: {
    layout() {
      const layout = this.$page.frontmatter.layout;
      if (layout && (this.$vuepress.getLayoutAsyncComponent(layout) || this.$vuepress.getVueComponent(layout))) {
        return layout
      }

      if (!this.$page.path) {
        return 'NotFound'
      }
      
      return 'Layout'

    },
  }
}
</script>

<style>

</style>