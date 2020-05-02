<template>
  <ul v-if="sns">
    <li 
      v-for="(item, index) of sns" 
      :key="index"
      :style="style"
    >
      <a target="_blank" :href="item.link">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i :class="`fa ${map[item.account][0]} fa-stack-1x fa-inverse`">{{map[item.account][1]}}</i>
        </span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      map: {
        'jianshu': ['','简'],
        'weibo': ['fa-weibo', ''],
        'zhihu': ['', '知'],
        'github': ['fa-github','']
      }
    }
  },
  mounted() {
    var headHTML = document.getElementsByTagName('head')[0].innerHTML;
    headHTML += '<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
    document.getElementsByTagName('head')[0].innerHTML = headHTML;
  },
  props: {
    size: {
      type: String,
      default: ""
    }
  },
  computed: {
    sns() {
      return this.$themeConfig.sns || null
    },
    style() {
      return {
        'font-size': `${this.size}px`
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

ul 
  display inline-flex
  list-style none
  box-sizing border-box
  padding 5px
  li 
    display inline
    padding 0 10px
    a > i 
      color #fff
    &:hover
      color $accentColor
</style>