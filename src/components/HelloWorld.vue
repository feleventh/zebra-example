<template>
  <div class="hello">
    <zb-row v-bind:gutter="20">
      xx
      <zb-col :span="20">hello</zb-col> 
    </zb-row>
  </div>
</template>

<script>
import ZbRow from './row/index'
import ZbCol from './col/index'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    ZbRow, ZbCol
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
