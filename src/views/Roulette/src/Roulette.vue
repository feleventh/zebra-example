<template>
  <div style="position: relative;width:400px;height:400px;">
    <canvas ref="canvas" width="400" height="400"></canvas>
    <div ref="spin_button" style="position: absolute;left: 175px;top: 175px;width: 50px;height: 50px;line-height: 50px;text-align: center;background: yellow;border-radius: 100%;cursor: pointer"
         @click="handleRotate">旋转</div>
  </div>
</template>
<script>
  const OUTSIDE_RADIUAS = 200
  const INSIDE_RADIUAS = 0
  const TEXT_RADIUAS = 160
  let CENTER_X
  let CENTER_Y
  let awards = [               // 转盘内的奖品个数以及内容
    '大保健', '话费10元', '话费20元', '话费30元', '保时捷911', '缅甸山区游', 'iphone 20', '火星7日游'
  ]
  let startRadian = 0
  let awardRadian = (Math.PI * 2) / awards.length
  let duration = 4000 // 旋转事件
  let velocity = 10 // 旋转速率
  let spinningTime = 0  // 旋转当前时间
  let spinTotalTime  // 旋转时间总长
  let spinningChange  // 旋转变化值的峰值
  export default {
    props: {
      // awards: {
      //   type: Array,
      //   required: true
      // }
    },
    data: () => {
      return {
        // duration: 4000,    // 旋转事件
        // velocity: 10,     // 旋转速率
        // spinningTime: 0   // 旋转当前时间
      }
    },
    mounted () {
      this.drawRouletteWheel(this.$refs['canvas'])
    },
    methods: {
      handleRotate () {
        spinningTime = 0                               // 初始化当前时间
        spinTotalTime = Math.random() * 3 + duration    // 随机定义一个时间总量
        spinningChange = Math.random() * 10 + velocity  // 随机顶一个旋转速率
        this.rotateWheel()
      },
      /**
       * 缓动函数，由快到慢
       * @param {Num} t 当前时间
       * @param {Num} b 初始值
       * @param {Num} c 变化值
       * @param {Num} d 持续时间
       */
      easeOut (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b
        return -c / 2 * ((--t) * (t - 2) - 1) + b
      },
      /**
       * 绘制转盘
       */
      drawRouletteWheel (canvas) {
        CENTER_X = canvas.width / 2
        CENTER_Y = canvas.height / 2
        let context = canvas.getContext('2d')
        // ----- ① 清空页面元素，用于逐帧动画
        context.clearRect(0, 0, canvas.width, canvas.height)
        // -----

        for (let i = 0; i < awards.length; i++) {
          let _startRadian = startRadian + awardRadian * i  // 每一个奖项所占的起始弧度
          let _endRadian = _startRadian + awardRadian     // 每一个奖项的终止弧度

          // ----- ② 使用非零环绕原则，绘制圆盘
          context.save()
          if (i % 2 === 0) {
            context.fillStyle = '#FF6766'
          } else {
            context.fillStyle = '#FD5757'
          }
          context.beginPath()
          context.arc(canvas.width / 2, canvas.height / 2, OUTSIDE_RADIUAS, _startRadian, _endRadian, false)
          context.arc(canvas.width / 2, canvas.height / 2, INSIDE_RADIUAS, _endRadian, _startRadian, true)
          context.fill()
          context.restore()
          // -----

          // ----- ③ 绘制文字
          context.save()
          context.font = 'bold 16px Helvetica, Arial'
          context.fillStyle = '#FFF'
          context.translate(
            CENTER_X + Math.cos(_startRadian + awardRadian / 2) * TEXT_RADIUAS,
            CENTER_Y + Math.sin(_startRadian + awardRadian / 2) * TEXT_RADIUAS
          )
          context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2)
          context.fillText(awards[i], -context.measureText(awards[i]).width / 2, 0)
          context.restore()
          // -----
        }

        // ----- ④ 绘制指针
        context.save()
        context.beginPath()
        context.moveTo(CENTER_X, CENTER_Y - OUTSIDE_RADIUAS + 8)
        context.lineTo(CENTER_X - 10, CENTER_Y - OUTSIDE_RADIUAS)
        context.lineTo(CENTER_X - 4, CENTER_Y - OUTSIDE_RADIUAS)
        context.lineTo(CENTER_X - 4, CENTER_Y - OUTSIDE_RADIUAS - 10)
        context.lineTo(CENTER_X + 4, CENTER_Y - OUTSIDE_RADIUAS - 10)
        context.lineTo(CENTER_X + 4, CENTER_Y - OUTSIDE_RADIUAS)
        context.lineTo(CENTER_X + 10, CENTER_Y - OUTSIDE_RADIUAS)
        context.closePath()
        context.fill()
        context.restore()
      },
      /**
       * 开始旋转
       */
      rotateWheel () {
        // 当 当前时间 大于 总时间，停止旋转，并返回当前值
        spinningTime += 20
        if (spinningTime >= spinTotalTime) {
          this.$message('转盘结果：' + this.getValue())
          return
        }

        // let _spinningChange = (spinningChange - this.easeOut(spinningTime, 0, spinningChange, spinTotalTime)) * (Math.PI / 180)
        let _spinningChange = (spinningChange - Math.sin(spinningChange)) * (Math.PI / 180)
        startRadian += _spinningChange
        this.drawRouletteWheel(this.$refs['canvas'])
        window.requestAnimationFrame(this.rotateWheel)
      },
      /**
       * 旋转结束，获取值
       */
      getValue () {
        let startAngle = startRadian * 180 / Math.PI       // 弧度转换为角度
        let awardAngle = awardRadian * 180 / Math.PI
        let pointerAngle = 90                        // 指针所指向区域的度数，该值控制选取哪个角度的值
        let overAngle = (startAngle + pointerAngle) % 360  // 无论转盘旋转了多少圈，产生了多大的任意角，我们只需要求到当前位置起始角在360°范围内的角度值
        let restAngle = 360 - overAngle                   // 360°减去已旋转的角度值，就是剩下的角度值
        let index = Math.floor(restAngle / awardAngle)     // 剩下的角度值 除以 每一个奖品的角度值，就能得到这是第几个奖品
        return awards[index]
      }
    }
  }
</script>
// https://juejin.im/entry/57144d4a5bbb500050ed979d