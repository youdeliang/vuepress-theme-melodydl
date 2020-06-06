<template>
  <header
    class="header-container"
    :style="style"
  >
    <MyNavbar />

    <TransitionSlide>
      <div
        :key="$page.path"
        class="header-title"
      >
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>
    </TransitionSlide>
  </header>
</template>

<script>
import TransitionSlide from '@theme/components/TransitionSlide.vue'
import MyNavbar from '@theme/components/MyNavbar.vue'
export default {
  name: 'MyHeader',
  components: {
    MyNavbar,
    TransitionSlide,
  },
  computed: {
    title () {
      return this.$frontmatter.title || null
    },
    subtitle () {
      return this.$frontmatter.subtitle || null
    },
    backgroundImg () {
      return this.$frontmatter.headerImage || this.$themeConfig.header.postHeaderImg
    },
    style () {
      if (this.backgroundImg) {
        let url = this.backgroundImg
        if (Array.isArray(url)) {
          url = this.randomArr(url)
        }
        return {
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-attachment': 'scroll',
          'background-image': `url(${url})`,
        }
      }
      return {}
    },
  },
  methods: {
    randomArr (arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    },
  },
}
</script>

<style lang="stylus" scoped>
@require "~@theme/styles/variables.styl"

.header-container
  color #fff
  position relative
  width auto
  &::after
    content ""
    position absolute
    z-index -20
    top 0
    left 0
    height 100%
    width 100%
    z-index 1
    background rgba(0, 0, 0, 0.5)
  .header-title
    position absolute
    height 100%
    width 100%
    display flex
    z-index 9
    justify-content center
    align-items center
    flex-direction column
    h1
      font-size 5rem
    p
      font-size 1.2rem
      margin-top 10px
    @media (max-width $MQMobile - 1)
      padding-top $navbarHeight
      & h1
        font-size 1.5rem
      & p
        font-size 1rem

</style>
