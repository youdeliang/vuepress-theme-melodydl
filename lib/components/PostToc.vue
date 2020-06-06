<template>
  <div
    class="post-toc"
    :style="style"
  >
    <h4>- CATALOG</h4>
    <TOC class="post-nav-toc" />
  </div>
</template>

<script>
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
export default {
  name: 'PostToc',
  data () {
    return {
      width: 0,
      fixed: false,
      scrollListener: throttle(() => {
        this.fixed = this.infoCardDom.getBoundingClientRect().bottom < 0
      }, 100),
      resizeListener: debounce(() => {
        this.width = this.getWidth()
      }, 100),
    }
  },
  computed: {
    navbarHeight () {
      return document.querySelector('.navbar').clientHeight
    },
    infoCardDom () {
      return document.querySelector('#app .info-card')
    },
    style () {
      return {
        position: this.fixed ? 'fixed' : 'relative',
        top: this.fixed ? `${this.navbarHeight}` : 0,
        width: `${this.width}px`,
      }
    },
  },
  mounted () {
    this.width = this.getWidth()
    window.addEventListener('scroll', this.scrollListener)
    window.addEventListener('resize', this.resizeListener)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollListener)
    window.removeEventListener('resize', this.resizeListener)
  },

  methods: {
    getWidth () {
      return this.infoCardDom.clientWidth
    },
  },
}
</script>

<style lang="stylus">
.post-toc
  padding 1rem
  color $grayTextColor
  word-break break-all
  line-height 160%
  &:first-child
    font-weight 600
  .post-nav-toc
    ul
      list-style none
      padding-left 0.4rem
      word-break normal
      margin 0.5rem 0
      & > li
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
</style>
