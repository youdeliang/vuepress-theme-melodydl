<template>
  <footer class="footer">
    <p
      v-if="sns"
      class="footer-sns-link"
    >
      <a
        v-for="(item, name) in sns"
        :key="name"
        target="_blank"
        :href="item.link"
        class="sns-link"
      >
        <IconSns
          :name="name"
          :account="item.account"
        />
      </a>
    </p>
    <!-- eslint-disable vue/no-v-html -->
    <div class="copyright">
      <span
        id="custom"
        v-html="custom"
      />
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
  </footer>
</template>

<script>
import IconSns from '@theme/components/IconSns.vue'
export default {
  components: {
    IconSns,
  },
  computed: {
    sns () {
      return this.$themeConfig.sns || null
    },
    custom () {
      return this.$themeConfig.footer.custom || null
    },
    gitbtn () {
      return this.$themeConfig.footer.gitbtn || null
    },
  },
}
</script>
<style lang="stylus">
@requier '~@theme/styles/variables'
.footer
  @media (max-width $MQMobile - 1) {
    margin-top 1.5rem
  }
  color $grayTextColor
  text-align center
  .copyright
    font-size 16px
    line-height 1.5rem
    padding-bottom 1rem
    box-sizing border-box
    #custom > a
      color $accentColor
</style>
