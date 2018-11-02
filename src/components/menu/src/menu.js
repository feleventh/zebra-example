// import './row.scss'
export default {
  name: 'ZbMenu',
  componentName: 'ZbMenu',
  computed: {
  },
  render (h) {
    return h('div', {
      class: 'zb-menu'
    }, this.$slots.default)
  }
}
