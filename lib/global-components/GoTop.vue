<template>
  <div>
    <el-button
      class="goTop-btn"
      @click="goTop"
      v-show="isShow"
      :class="{show: isShow}"
      type="primary"
      circle
    >
      <i class="el-icon-arrow-up"></i>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "GoTop",
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.hasShow()
  },
  methods: {
    goTop() {
      window.scrollTo({top: 0, behavior: "smooth"})
    },
    hasShow() {
      const _this = this
      window.addEventListener("scroll", function(e) {
        let h = _this.getScrollTop()
        h > 400 ? _this.isShow = true : _this.isShow = false
      })
    },
    getScrollTop() {
      var scrollPos
      if (typeof window === "undefined") return
      scrollPos = window.pageYOffset 
        ? window.pageYOffset
        : document.compatMode && document.compatMode !== "BackCompat"
          ? document.documentElement.scrollTop
          : document.documentElement.scrollTop
      return scrollPos
    }
  }
}
</script>

<style lang="stylus" scoped>
.goTop-btn
  transition 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
  position fixed
  right 50px
  bottom 30px
  z-index 69
  opacity 0
  transform scale(0)
  i
    font-size 1.5em
    font-weight 600
  box-shadow 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)
.show 
  opacity 1
  transform scale(1)
</style>