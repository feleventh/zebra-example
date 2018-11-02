<template>
  <div id="app">
    <zb-menu id="nav">
      <zb-menu-item path="/" pathName="Home"></zb-menu-item> |
      <zb-menu-item path="/about" pathName="About"></zb-menu-item> |
      <zb-menu-item path="/lottery" pathName="Lottery"></zb-menu-item>
    </zb-menu>
    <router-view/>
  </div>
</template>

<script>
import ZbMenu from '@/components/menu'
import ZbMenuItem from '@/components/menuItem'
import Lottery from '@/views/Lottery/src/Lottery.vue'
export default {
  components: {
    ZbMenu, ZbMenuItem, Lottery
  }
}
</script>


<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
