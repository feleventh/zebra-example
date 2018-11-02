import './col.scss'
export default {
  name: 'ZbCol',
  componentName: 'ZbCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    gutter () {
      let parent = this.$parent
      while (parent && parent.$options.componentName === 'ZbRow') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    }
  },
  render (h) {
    let classList = []
    let style = {}
    if (this.gutter) {
      style.paddingLeft = `${this.gutter / 2}px`
      style.paddingRight = style.paddingLeft
    }
    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `zb-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`
        )
      }
    })
    let sizes = ['xs', 'sm', 'md', 'lg', 'xl']
    // sizes.forEach(size => {
    //   console.log(size)
    // })
    sizes.forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`)
      } else if (typeof this[size] === 'object') {
        let props = this[size]
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          )
        })
      }
    })
    return h('div', {
      class: [`el-col`, classList],
      style
    }, this.$slots.default)
  }
}
