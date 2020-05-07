import Iconfont from '@theme/components/Iconfont.vue'

export default ({ Vue }) => {
  Vue.component('Iconfont', {
    functional: true,

    render (h, { parent }) {
      if (parent._isMounted) {
        return h(Iconfont)
      } else {
        parent.$once('hook:mounted', () => {
          parent.$forceUpdate()
        })
      }
    },
  })
}
