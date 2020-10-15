<template>
  <div>
    <div class="lottery-box">
    <div class="lottery">
      <div class="lottery-item">

        <ul>
          <li v-for="(item,i) in list" :key="i" :class="['item' + (i), {'active': index == i}]">
            <div class="box">
              <img :src="item.img" alt />
              <p>{{item.title}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
      <!-- 中奖弹窗 -->
      <div class="mask" v-if="showToast"></div>
      <div class="lottery-alert" v-if="showToast">
        <h1>恭喜您</h1>
        <p>
          <img src="@/assets/image/starStoneLottery/j2.png" alt />
        </p>
        <h2>获得{{list[index].title}}</h2>
        <div class="btnsave" @click="showToast=false">确定</div>
      </div>
    </div>
    <div class="lottery-start">
    <div class="box" @click="startLottery" v-if="isStart===1">
      <button>
        开始抽奖，消耗{{score}}星石
      </button>
    </div>
  </div>
  </div>

</template>
<script>
// import { getQuestionListApi } from '@/api/helpFeedBack'
export default {
  name: 'Lottery',
  props: {
    list: Array,
  },
  data () {
    return {
      isStart: 1,
      score: 10, // 消耗积分
      index: -1, // 当前转动到哪个位置，起点位置
      count: 6, // 总共有多少个位置
      timer: 0, // 每次转动定时器
      speed: 200, // 初始转动速度
      times: 0, // 转动次数
      cycle: 5, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1, // 中奖位置，接口返回
      number_of_draws: 0, // 限制每天抽奖次数，接口返回
      click: true,
      showToast: false, // 显示中奖弹窗
    }
  },
  mounted () {},

  methods: {
    async startLottery () {
      console.log('开始时间', new Date())
      // if (this.number_of_draws === 0) {
      //   this.$toast('今日抽奖次数已用完,明天再来吧')
      //   return
      // }
      if (!this.click) {
        this.$toast('正在抽奖中，请勿重复点击')
        return
      } // 点击了一次抽奖，继续点击则无效
      this.showToast = false
      this.speed = 200 // 初始化转动速率
      this.click = false
      // const res = await getQuestionListApi() // 中奖信息，接口返回
      // console.log('res', res)
      // this.prize = parseInt(Math.random() * 10, 0) || 0  // 什么时机开始请求中奖信息？待定中……
      this.startRoll()
    },
    // 开始转动
    async startRoll () {
      this.times += 1 // 当前转动次数
      this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if ((this.times > this.cycle + 10) && this.prize === this.index) {
        clearTimeout(this.timer) // 清除转动定时器，停止转动
        this.prize = -1 // 重置中奖位置
        this.times = 0 // 重置转动次数
        console.log('中奖时间', new Date())

        setTimeout(() => {
          this.showToast = true // 弹出中间弹框
          this.click = true // 恢复可点击
        }, 500)
      } else {
        if (this.times < this.cycle) { // 还没达到基本转动次数再次点击加快则转动速度
          this.speed -= 10 // 加快转动速度
        } else if (this.times === this.cycle) { // 在当前转动次数刚好等于基本转动次数时，设置中奖位置，至少转动多少次才进入抽奖环节？
          // const res = await getQuestionListApi()
          // for (let i = 0; i < 1000000000; i++) {

          // }
          // console.log('res', res)
          const prize = parseInt(Math.random() * 10, 0) || 0; // 随机获得一个中奖位置
          this.prize = prize > 5 ? 5 : prize
          console.log('中奖的位置：', this.prize);
          (this.prize > 5) && (this.prize = 5)
        } else if ((this.times > this.cycle + 10) && ((this.prize === 0 && this.index === 5) || this.prize === this.index + 1)) {
          this.speed += 110 // 抽奖即将结束，放慢转动速度
        } else {
          this.speed += 20
        }
        (this.speed < 40) && (this.speed = 40)
        this.timer = setTimeout(this.startRoll, this.speed)
      }
    },

    // 每一次转动
    oneRoll () {
      let index = this.index // 当前转动到哪个位置
      index += 1;
      (index > this.count - 1) && (index = 0)
      this.index = index
    },
  },
}
</script>

<style lang="less" scoped>
$imgBaseUrl: $imageFolderPath + '/starStoneLottery';
ul, li {
  list-style-type: none;
}
.lottery-box {
  overflow: hidden;
  .title{
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
  color: #fff;
  }
  .lottery {
    animation: changeBg .5s ease infinite; // 盒子外边的那一圈bling动画替换
    overflow: hidden;
    padding: 20px;
    width: 600px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .lottery-item {
      height: 400px;
      position: relative;
      margin-top: 5px;
      margin-left: 5px;
      ul{
        li{
          width: 33%;
          position: absolute;
          .box {
            height: 125px;
            position: relative;
            text-align: center;
            overflow: hidden;
            background: url($imgBaseUrl + '/bg2.png') no-repeat center;
            background-size: 100% 100%;
            margin: 15px;
            p{
              color: #708ABF;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 14px;
            }
            img{
              display: block;
              height: 50px;
              margin: 0 auto;
              margin-top: 10px;
              margin-bottom: 5px;
            }
          }
        }
        .item0 {
          &.active{
            .box {
              background: url($imgBaseUrl + '/bg1.png') no-repeat center;
              background-size: 100% 100%;
              p{
                color: #fff;
              }
            }
          }
        }
        .item1 {
          left: 33%;
          &.active{
            .box {
              background: url($imgBaseUrl + '/bg1.png') no-repeat center;
              background-size: 100% 100%;
              p{
                color: #fff;
              }
            }
          }
        }
        .item2 {left: 66%;
          &.active{
            .box {
              background: url($imgBaseUrl + '/k1.png') no-repeat center;
              background-size: 100% 100%;
              p{
                color: #fff;
              }
            }
          }
        }
        .item3 {left: 66%;top: 150px;
          &.active{
            .box {
              background: url($imgBaseUrl + '/bg1.png') no-repeat center;
              background-size: 100% 100%;
              p{
                color: #fff;
              }
            }
          }
        }
        .item4 {left: 33%;top: 150px;
          &.active{
            .box {
              background: url($imgBaseUrl + '/bg1.png') no-repeat center;
              background-size: 100% 100%;
              p{
                color: #fff;
              }
            }
          }
        }
        .item5 {top: 150px;
          &.active{
            .box {
              background: url($imgBaseUrl + '/k2.png') no-repeat center;
              background-size: 100% 100%;
              p{
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  @keyframes changeBg {
    0% {
    background-image:url($imgBaseUrl + '/k1.png');
    }
    100% {
    background-image:url($imgBaseUrl + '/k2.png');
    }
  }

}
.mask {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    overflow: hidden;
    z-index: 222;
    top: 0;
    left: 0;
}
.lottery-alert {
    max-width: 400px;
    text-align: center;
    z-index: 10000;
    border-radius: 10px;
    background: #fff;
    padding: 20px;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    h1{
      font-size: 18px;
      font-weight: bold;
      color: #D92B2F;
    }
    img{
    display: block;
    height: 120px;
    margin: 0 auto;
    }
    h2 {
      font-weight: normal;
      color: #D92B2F;
      font-size: 15px;
      padding-top: 15px;
    }
    P{
      color: #666;
      font-size: 16px;
      padding-top: 5px;
    }
    .btnsave {
      border-radius: 3px;
      box-shadow: none;
      height: 40px;
      cursor: pointer;
      line-height: 40px;
      color: #fff;
      margin-top: 12px;
      background: linear-gradient(180deg, rgba(213,60,63,1) 0%, rgba(201,20,24,1) 100%);
      font-size: 16px;
    }
}
</style>
