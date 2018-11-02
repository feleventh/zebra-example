<template>
  <div class="lottery">
    <button id="freshBtn" @click="randomText">刷新彩票</button>
    <label>已刮开 <span id="drawPercent">{{percent}}%</span> 区域。</label>
    <div id="lotteryContainer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Lottery from './lottery'

export default {
  name: 'lottery',
  data () {
    return {
      percent: 0,
      lottery: {}
    }
  },
  mounted () {
    this.lottery = new Lottery('lotteryContainer', '#CCC', 'color', 300, 100, this.drawPercent)
    this.lottery.init('http://www.baidu.com/img/bdlogo.gif', 'image')
  },
  methods: {
    randomText () {
      console.log('xx')
      this.percent = 0
      this.lottery.init(this.getRandomStr(10), 'text')
    },
    drawPercent (percent) {
      this.percent = percent
    },
    getRandomStr (len) {
      var text = ""
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      for( var i=0; i < len; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length))
      return text
    }
  }
}
</script>
<style scoped>
  #lotteryContainer {
    position:relative;
    width: 300px;
    height:100px;
  }
  #drawPercent {
    color:#F60;
  }
</style>

