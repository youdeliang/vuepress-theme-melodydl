<script>
import Icon from '@theme/components/Icon.vue'

export default {
  name: 'IconSns',

  functional: true,

  components: {
    Icon,
  },

  props: {
    account: {
      type: String,
      require: false,
      default: '',
    },

    size: {
      type: String,
      require: true,
      default: '40px',
    },

    name: {
      type: String,
      require: true,
      default: '',
    },
  },

  render (h, { props: { name, account, size } }) {
    return (
      <span class='sns-icon'>
        <Icon
          name={name}
          size={size}
        />
      </span>
    )
  },
}
</script>

<style lang="stylus">
@require "~@theme/styles/variables";

.sns-link
  margin 0 0.1em
  .sns-icon
    padding 5px
    color $grayTextColor
    transition all 0.5s ease-out
    &:hover
      color $accentColor
      .icon
        fill $accentColor
        transition all 0.5s ease-out
</style>
