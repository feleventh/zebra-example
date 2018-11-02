import './row.scss'
export default {
  name: 'ZbRow',
  componentName: 'ZbRow',
  props: {
    gutter: Number
  },
  computed: {
    style () {
      let ret = {}
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret
    }
  },
  render (h) {
    return h('div', {
      class: 'zb-row',
      style: this.style
    }, this.$slots.default)
  }
}
