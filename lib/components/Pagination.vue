<template>
  <ul class="pagination">
    <li
      :class="{ disabled: onFirstPage }"
      class="page-item"
      @click.prevent="prevPage"
    >
      <span>&lt;</span>
    </li>

    <li
      v-for="paginator in paginators"
      :key="paginator.value"
      :class="{ active: paginator.value === currentPage, disabled: !paginator.enable}"
      class="page-item"
      @click.prevent="setPage(paginator.value)"
    >
      <span>{{ paginator.value }}</span>
    </li>

    <li
      :class="{ disabled: onLastPage }"
      class="page-item"
      @click.prevent="nextPage"
    >
      <span>&gt;</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    value: {
      type: Number,
      default: 1,
      validator: val => val > 0,
    },

    total: {
      type: Number,
      required: true,
      validator: val => val > 0,
    },

    eachSide: {
      type: Number,
      default: 1,
      validator: val => val >= 0,
    },
  },

  computed: {
    firstPage () {
      return 1
    },

    lastPage () {
      return this.total
    },

    onFirstPage () {
      return this.currentPage === this.firstPage
    },

    onLastPage () {
      return this.currentPage === this.lastPage
    },

    currentPage () {
      return this.value
    },

    paginators () {
      const paginators = []
      if (this.lastPage < this.eachSide * 2 + 4) {
        for (let i = this.firstPage; i < this.lastPage + 1; ++i) {
          paginators.push({
            value: i,
            enable: true,
          })
        }
      } else {
        if (this.currentPage - this.firstPage < this.eachSide + 2) {
          // if currentPage near firstPage
          for (let i = this.firstPage; i < Math.max(this.eachSide * 2 + 1, this.currentPage + this.eachSide + 1); ++i) {
            paginators.push({
              value: i,
              enable: true,
            })
          }
          paginators.push({
            value: '...',
            enable: false,
          })
          paginators.push({
            value: this.lastPage,
            enable: true,
          })
        } else if (this.lastPage - this.currentPage < this.eachSide + 2) {
          // if currentPage near lastPage
          paginators.push({
            value: this.firstPage,
            enable: true,
          })
          paginators.push({
            value: '...',
            enable: false,
          })
          for (let i = Math.min(this.lastPage - this.eachSide * 2 + 1, this.currentPage - this.eachSide); i < this.lastPage + 1; ++i) {
            paginators.push({
              value: i,
              enable: true,
            })
          }
        } else {
          // if currentPage in the middle
          paginators.push({
            value: this.firstPage,
            enable: true,
          })
          paginators.push({
            value: '...',
            enable: false,
          })
          for (let i = this.currentPage - this.eachSide; i < this.currentPage + this.eachSide + 1; ++i) {
            paginators.push({
              value: i,
              enable: true,
            })
          }
          paginators.push({
            value: '...',
            enable: false,
          })
          paginators.push({
            value: this.lastPage,
            enable: true,
          })
        }
      }
      return paginators
    },
  },

  methods: {
    nextPage () {
      this.setPage(this.currentPage + 1)
    },

    prevPage () {
      this.setPage(this.currentPage - 1)
    },

    setPage (targetPage) {
      if (targetPage <= this.lastPage && targetPage >= this.firstPage) {
        this.$emit('input', targetPage)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.pagination
  display flex
  flex-wrap wrap
  justify-content center
  list-style none
  margin auto
  padding 0
  .page-item
    min-width 30px
    height 28px
    line-height 28px
    border-radius 2px
    color $textColor
    font-size 13px
    background #fff
    margin 0 5px
    &.disabled
      pointer-events none
    &.active
      cursor default
      background $accentColor
      color #fff
      font-weight bold
    &:not(.active)
      color $textColor
      cursor pointer
      &:hover
        color $accentColor
</style>
