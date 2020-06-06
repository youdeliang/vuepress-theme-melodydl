<script>
export default {
  name: 'Icon',

  functional: true,

  props: {
    color: {
      type: String,
      required: false,
      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: false,
      default: null,
    },

  },

  render (h, { props: { color, name, size } }) {
    return (
      <svg
        class="icon"
        style={{
          fill: color,
          'font-size': size,
        }}
      >

        <use xlinkHref={`#icon-${name}`} />
      </svg>
    )
  },
}
</script>

<style lang="stylus">
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill #2c3e50
  overflow hidden
</style>
