<template>
   <div class="footer">
    <IconSns size="20"/>
    <div class="copyright">
      <span class="custom" v-html="custom" />
      <iframe
        v-if="gitbtn"
        :src="gitbtn.repository"
        class="footer-btn"
        style="margin-left: 2px; margin-bottom:-5px;"
        :frameborder="gitbtn.frameborder"
        :scrolling="gitbtn.scrolling"
        :width="gitbtn.width"
        :height="gitbtn.height"
      />
    </div>
  </div>
</template>

<script>
import IconSns from '@theme/components/IconSns.vue'
export default {
  components: {
    IconSns
  },
  computed: {
    custom () {
      return this.$themeConfig.footer.custom || null
    },
    gitbtn() {
      return this.$themeConfig.footer.gitbtn
    },
  },
}
</script>
<style lang="stylus" scoped>
@requier '~@theme/styles/variables'
.footer
  font-color #fff
  text-align center
  .copyright 
    font-size 16px
    line-height 1.5rem
    // color $grayTextColor
    padding-bottom 15px
    box-sizing border-box
    .custom
      color $grayTextColor
      a 
        color $accentColor !important
</style>