<template>
  <nav
    class="navbar"
    :style="navbarStyle"
  >
    <RouterLink
      class="navbar-link"
      :to="$localePath"
      :class="{
        'fontColor': fixed
      }"
    >
      {{ navtitle }}
    </RouterLink>

    <ul
      v-if="navList"
      class="navbar-links"
      :class="{
        'show': isNavBtn,
        'fontColor': fixed
      }"
    >
      <li
        v-for="(item, index) of navList"
        :key="index"
      >
        <a
          v-if="item.type=='url'"
          :href="item.link"
          target="_blank"
        >
          {{ item.text }}
        </a>

        <RouterLink
          v-else
          tag="a"
          :to="item.link"
          @click.native="isNavBtn = false"
        >
          {{ item.text }}
        </RouterLink>
      </li>
    </ul>

    <!-- @media nav button -->
    <div
      id="nav-icon"
      :class="navbtnShow"
      @click="isNavBtn = !isNavBtn"
    >
      <span
        v-for="count in 3"
        :key="count"
      />
    </div>
  </nav>
</template>

<script>
import throttle from 'lodash.throttle'
export default {
  data () {
    return {
      fixed: false,
      isNavBtn: false, // @media nav is button
      scrollHeight: 0,
      scrollListener: throttle(() => {
        this.fixed = this.getScrollTop() - this.scrollHeight < 0
          ? !!this.getScrollTop()
          : false
        this.scrollHeight = this.getScrollTop()
      }, 100),
    }
  },
  computed: {
    navbtnShow () {
      return this.isNavBtn ? 'open' : null
    },
    navtitle () {
      return this.$themeConfig.title
    },
    navList () {
      return this.$themeConfig.nav
    },
    navbarStyle () {
      return {
        position: this.fixed ? 'fixed' : 'absolute',
        background: this.fixed ? '#fff' : null,
        'box-shadow': this.fixed ? 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.239216) 0px 1px 4px' : null,
        color: this.fixed ? '#404040' : null,
        opacity: this.fixed ? '0.8' : '1',
        transition: 'all 0.5s ease-in-out',
      }
    },
  },
  mounted () {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollListener)
  },
  methods: {
    randomArr (arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    },
    getScrollTop () {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || null
    },
  },
}
</script>

<style lang="stylus">
@require '~@theme/styles/variables'

$gutter = 0.7rem
$lineHeight = $navbarHeight - ($gutter * 2)

.navbar
  position absolute
  top 0
  left 0
  right 0
  z-index 99
  height $navbarHeight
  display flex
  align-items center
  justify-content space-between
  @media (max-width $MQMobile - 1)
    background-color alpha($navbarColor, 0.8)
  .navbar-link
    font-size 18px
    padding 0 20px
    color $headerTitleColor
    &:hover
      color $accentColor
    @media (min-width $MQMobile)
      &.fontColor
        color $accentColor
    @media (max-width $MQMobile - 1)
      color $accentColor
  .navbar-links
    font-weight 800
    display inline-flex
    line-height $lineHeight
    padding 0 20px
    color $navbarColor
    & > li
      padding 0 1rem
      list-style none
      &:hover
        color $accentColor
    @media (min-width $MQMobile)
      &.fontColor
        color $textColor
    @media (max-width $MQMobile - 1)
      display none
      &.show
        display block
        width 50%
        text-align center
        position absolute
        top $navbarHeight
        right 0
        padding 1rem
        color $textColor
        background-color alpha($navbarColor, 0.8)

  /* nav button css */
  #nav-icon
    display none
    width 25px
    margin-right 20px
    height 25px
    position relative
    -webkit-transform rotate(0deg)
    -moz-transform rotate(0deg)
    -o-transform rotate(0deg)
    transform rotate(0deg)
    -webkit-transition 0.5s ease-in-out
    -moz-transition 0.5s ease-in-out
    -o-transition 0.5s ease-in-out
    transition 0.5s ease-in-out
    cursor pointer
    @media (max-width $MQMobile - 1)
      display inline-block

    span
      position absolute
      height 4px
      width 100%
      background $accentColor
      border-radius 9px
      opacity 1
      left 0
      -webkit-transform rotate(0deg)
      -moz-transform: rotate(0deg)
      -o-transform: rotate(0deg)
      transform: rotate(0deg)
      -webkit-transition 0.25s ease-in-out
      -moz-transition 0.25s ease-in-out
      -o-transition 0.25s ease-in-out
      transition 0.25s ease-in-out
  #nav-icon span:nth-child(1)
    top calc(50% - 8px)

  #nav-icon span:nth-child(2)
    top 50%

  #nav-icon span:nth-child(3)
    top calc(50% + 8px)

  #nav-icon.open span:nth-child(1)
    top 50%
    -webkit-transform rotate(135deg)
    -moz-transform rotate(135deg)
    -o-transform rotate(135deg)
    transform rotate(135deg)

  #nav-icon.open span:nth-child(2)
    opacity 0
    left -60px

  #nav-icon.open span:nth-child(3)
    top 50%
    -webkit-transform rotate(-135deg)
    -moz-transform rotate(-135deg)
    -o-transform rotate(-135deg)
    transform rotate(-135deg)
</style>
