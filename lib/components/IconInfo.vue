<script>
import Icon from '@theme/components/Icon.vue'

export default {
  name: 'IconInfo',

  functional: true,

  components: {
    Icon,
  },

  props: {

    href: {
      type: String,
      required: false,
      default: null,
    },

    type: {
      type: String,
      require: true,
      default: '',
    },

    size: {
      type: String,
      require: false,
      default: '1em',
    },
  },

  render (h, { props: { type, size, href }, children }) {
    const Component = href ? 'a' : 'span'
    return (
      <Component href={href}>
        <Icon
          class="info-icon"
          name={type}
          size={size}
        />

        <span class="info-text">
          { children }
        </span>
      </Component>
    )
  },
}
</script>
