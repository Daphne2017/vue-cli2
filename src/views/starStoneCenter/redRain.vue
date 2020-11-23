<template>
  <div class="ser_home">
    <ul class="red_packet" ref="redPacket" id="red_packet">
      <template v-for="(item, index) in liParams">
        <li
          :style="{
            left: item.left,
            animationDuration: item.durTime,
          }"
          :class="item.class"
          @animationend="removeDom"
          @click="(e)=> showMask(e,item.value)"
          :key="index"
        >
            <i
              :style="{
                transform: item.transforms,
              }"
            ></i>
        </li>
      </template>
    </ul>
    <div class="mask" v-if="countDown">
      <div class="content">
        <span>
          {{ countDown }}
        </span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      liParams: [],
      timer: null,
      duration: 20000, // 定义时间
      countDown: 3,
      redPacketNums: 30
    }
  },
  mounted () {
    const inter = setInterval(() => {
      this.countDown--
      if (this.countDown <= 0) {
        clearInterval(inter)
        this.startRedPacket()
        setTimeout(() => {
        // 多少时间结束
          clearTimeout(this.timer)
        }, this.duration)
      }
    }, 1000)
  },
  methods: {
    /**
     * 开启动画
     */
    startRedPacket () {
      const win = document.documentElement.clientWidth || document.body.clientWidth
      const left = parseInt(Math.random() * (win - 50) + 0)

      const rotate = parseInt(Math.random() * (45 - -45) - 45) + 'deg' // 旋转角度
      const scales = (Math.random() * (12 - 8 + 1) + 8) * 0.1 // 图片尺寸
      const durTime = (Math.random() * (2.5 - 1.2 + 1) + 1.2) + 's' // 时间 1.2和1.2这个数值保持一样 // 时间 1.2和1.2这个数值保持一样
      this.liParams.push({
        left: left + 'px',
        class: 'drop',
        transforms: 'rotate(' + rotate + ') scale(' + scales + ')',
        durTime: durTime,
        value: Math.random() * 10
      })
      this.timer = setTimeout(() => {
        this.startRedPacket()
      }, this.duration / this.redPacketNums)
    },
    showMask (e, value) {
      this.$toast('已领取')
      this.$refs.redPacket.removeChild(e.currentTarget)
    },
    /**
     * 回收dom节点
     */
    removeDom (e) {
      this.$refs.redPacket.removeChild(e.currentTarget)
      if (this.$refs.redPacket.childNodes.length === 0) {
        this.$alert('红包雨结束,恭喜获得100星石')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './styles/index.scss';
.red_packet {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  i {
    width: 48px;
    height: 69px;
    display: block;
    background: url($imgBaseUrl + '/stone-big.png') no-repeat;
    background-size:contain ;
  }
  li {
    position: absolute;
    animation: all 2s linear;
    top: -100px;
    z-index: 10;
    &.drop {
      -webkit-animation: aim_move 5s linear 1 forwards;
      animation: aim_move 5s linear 1 forwards;
    }
  }
}
@keyframes aim_move {
    0%{
        opacity: 0;
    }
    20%{
        opacity: 1;
    }
    90%{
        opacity: 1;

    }
    95%{
      opacity: 0;
    }
    100%{
        transform: translate3d(10px,120vh,-10px);
    }
}
.mask{
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: red;
    span{
      font-size: 100px;
      color: white;;
    }
  }
}
//  自身居中
.center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.center1{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.center2{
    position: relative;
    margin: auto;
}
// 子级居中
 .parent{
    display: flex;
    justify-content: center;
    align-items: center;
    .div{
        color: white;
    }
 }

</style>
