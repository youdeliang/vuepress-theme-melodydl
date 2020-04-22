<template>
  <div id="global-layout">
    <MyHeader />
    <component :is="layout" />
    <MyFooter />
  </div>
</template>

<script>
import MyHeader from "@theme/components/MyHeader.vue";
import MyFooter from "@theme/components/MyFooter.vue";
export default {
  components: {
    MyHeader,
    MyFooter,
  },
  computed: {
    layout() {
      const layout = this.$page.frontmatter.layout;
      if (
        layout &&
        (this.$vuepress.getLayoutAsyncComponent(layout) ||
          this.$vuepress.getVueComponent(layout))
      ) {
        return layout;
      }

      if (!this.$page.path) {
        return "NotFound";
      }

      return "Layout";
    }
  }
};
</script>

<style lang="stylus" scoped>
#global-layout {
  display: grid;
  grid-template-rows: 45vh 1fr 120px;
  min-height: 100vh;
}
</style>
