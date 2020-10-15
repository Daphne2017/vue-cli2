<template>
  <div class="page-container">
    <!-- 抽奖banar -->
    <div class="title-box">
      <div class="title"></div>
      <div class="rule" @click="showRuleMask = true"><span>活动规则</span></div>
    </div>
    <!-- 抽奖轮播 -->
    <div class="lottery-box">
      <div class="content">
        <div v-for="(item,i) in prizeList" :key="i" :class="['lottery-item', `parize-${i}`, {'active': prizeParams.currentIndex == i}]">
        </div>
        <div class="current-bonus">
          <div class="box">
            <span class="my-bonus">{{ userInfo.selfCash }}</span>
            <span class="distance-withdrawal">距离提现还差<span>{{ userInfo.toTarget }}</span>元</span>
          </div>
        </div>
        <div class="broadcast">
          <div class="box">
            <span class="horn"></span>
            <span class="split-line">|</span>
            <MarqueeY class="marquee-y" :list="margueeList"></MarqueeY>
          </div>
        </div>
        <div class="btn-box"  ref="parentBtn" @click="startLottery">
          <div :class="btnStatusClass"></div>
        </div>
      </div>
    </div>
    <!-- 规则说明 -->
    <div class="bottom-box">
      <div class="box">
        抽奖规则：每次抽奖消耗20星石，每天限参与游戏10次。提升用户等级、分享活动可获得额外抽奖机会。
      </div>
    </div>
    <!-- 中奖弹框/规则弹框 -->
    <Alert
      v-bind="{
        prizeList,
        prizeIndex: prizeParams.prizeIndex,
        showRuleMask,
        showPrizeMask,
        userInfo,
        ruleParams
      }"
      v-on="{
        hidePrizeMask: ()=>{showPrizeMask = false},
        hideRuleMask: ()=>{showRuleMask = false},
        childBtnClick:startLottery,
      }"
    />
  </div>
</template>

<script>
import MarqueeY from './components/MarqueeY'
import Alert from './components/Alert'
import { getUserToken } from '@/utils/index'
import { LotteryDrawApi, getLotteryDetailApi, lotteryConfigApi, LotteryShareApi } from '@/api/starStoneLottery'
export default {
  name: 'HelpFeedBack',
  components: {
    MarqueeY,
    Alert,
  },
  data () {
    const initPrizeParams = {
      currentIndex: -1, // 起点位置
      prizeCount: 6, // 总共有多少种奖品
      timer: 0, // 每次转动定时器
      speed: 200, // 初始转动速度
      currentTimes: 0, // 当前转动次数
      baseTimes: 5, // 基本转动次数
      prizeIndex: -1, // 中奖位置，接口返回

    }
    return {
      userInfo: {
        token: '',
        userId: '',
        starStone: 0,
        residueCount: 0, // 剩余抽奖次数
        selfCash: '?', // 用户累计中奖金额
        toTarget: '?',
        isShare: false, // 是否已分享过
      }, // 用户信息
      margueeList: [], // 中奖播报列表
      prizeList: [], // 奖品1-6
      initPrizeParams,
      prizeParams: JSON.parse(JSON.stringify(initPrizeParams)),
      lotterying: false, // 是否正在抽奖标识
      showPrizeMask: false,
      showRuleMask: false,
      prizeInfo: {}, // 中奖接口返回后不能立马更新用户账户，等待中奖弹框弹出后才更新
      ruleParams: {
        maxCount: 0,
        expend: 0,
      },
    }
  },
  mounted () {
    this.setShareInfo()
    this.initPage()
  },
  watch: {
    /* 监听当前中奖弹框 */
    async showPrizeMask (value) {
      if (!value) { // 关闭中奖弹框
        this.prizeParams = JSON.parse(JSON.stringify(this.initPrizeParams))
      } else { // 中奖后更新用户账户信息
        this.updateUserInfo('prize') // 中奖更新用户累计红包信息、按钮、播报列表
      }
    },
  },
  computed: {
    /* 切换按钮状态 */
    btnStatusClass () {
      const { residueCount, isShare, token } = this.userInfo
      let btnClass = ''
      if (token) {
        if (residueCount > 0) {
          btnClass = 'lottery-start' // 星石抽奖
        } else if (!isShare) {
          btnClass = 'lottery-share' // 分享抽奖（例如：新用户）
        } else {
          btnClass = 'lottery-limit' // 抽奖已达上限
        }
      } else {
        if (!isShare) {
          btnClass = 'non-login' // 非登录状态下
        }
      }
      return btnClass
    },
  },
  methods: {
    setShareInfo (resourceUrl) {
    /* 提供给APP的分享信息 */
      this.$root.store.setShareInfoAction({
        shareTitle: '千元红包等你来拿！',
        shareDesc: '抽奖红包拿到手软，满一千元可提现',
        shareLink: 'https://www.huoxingtang.com',
        shareImgUrl: 'https://static.huoxingtang.com/admin/uploaded-files/production/richTextImage/2020-09-28T17-19-30-2ccb.png',
      })
    },
    /* 初始化页面 */
    async initPage () {
      const userInfo = await getUserToken()
      this.userInfo.token = userInfo.token
      if (userInfo.token) {
        const res = await getLotteryDetailApi(this.userInfo.token) // 初始化用户中奖信息
        this.prizeInfo = res || {}
      }
      this.updateUserInfo('init') // 页面初始化
    },
    /**
     * 更新用户累计红包信息
     *  @param { Boolean } type 是否是分享过后的更新标识init:页面初始化，prize:'中奖更新'，share：'分享后更新'
     */
    async updateUserInfo (type) {
      const token = this.userInfo.token
      const { residueCount = 0, isShare = false, selfInfo = {} } = this.prizeInfo || {}
      this.userInfo.residueCount = residueCount // 更新剩余抽奖次数
      this.userInfo.isShare = isShare // 更新是否已分享
      if (Object.keys(selfInfo).length === 0 && type === 'share') return // 如果是分享后调用updateUserInfo('share')，只更新按钮状态即可

      const { selfCash = 0, withdrwaTarget = 0 } = selfInfo || {} // 更新用户中奖累计
      this.userInfo.selfCash = token ? (+selfCash / 100).toFixed(0) : '?' // 非登陆状态下显示“？”
      this.userInfo.toTarget = token ? ((+withdrwaTarget - selfCash) / 100).toFixed(0) : '?' // 非登陆状态下显示“？”
      const configInfo = await lotteryConfigApi()
      this.margueeList = (configInfo && configInfo.prizeInfo) || [] // 更新中奖播报列表

      if (type !== 'init') { return } // 初始化中奖配置信息
      this.prizeList = (configInfo && configInfo.lotteryConfig) || [] // 中奖信息配置
      this.ruleParams.maxCount = configInfo.maxCount || 0 // 每日抽奖次数
      this.ruleParams.expend = configInfo.expend || 0 // 每次抽奖消耗
    },
    /* 抽奖前的校验 */
    async startLottery () {
      this.showPrizeMask = false // 先关闭中奖弹框
      if (this.lotterying) {
        this.$toast('正在抽奖中，请勿重复点击')
        return
      }
      if (this.btnStatusClass === 'non-login') { // 非登陆状态下
        window.open('https://www.huoxingtang.com')
        return
      }
      if (this.btnStatusClass === 'lottery-limit') {
        this.$toast('抽奖次数已达上限，明天再来吧 ！')
        return
      }
      if (this.btnStatusClass === 'lottery-share') { // 分享好友可以免费抽一次
        const shareLottery = async () => {
          const res = await LotteryShareApi(this.userInfo.token)
          this.prizeInfo = res || {}
          await this.updateUserInfo('share') // 分享成功后要即刻更新按钮的状态
        }
        window.HXAppWeb.callNative('toSharePage', {}, 'shareLottery', shareLottery)
      } else {
        this.lotterying = true
        await this.getPrizeIndex()
      }
    },
    /* 获取中奖位置 */
    async getPrizeIndex () {
      try {
        // 中奖信息，接口返回，注意：中奖后，不能立马更新按钮的状态，要等中奖弹框出来后再更新，所以先用this.prizeInfo存放着
        this.prizeInfo = await LotteryDrawApi(this.userInfo.token)
        const { award = {} } = this.prizeInfo || {}
        this.prizeParams.prizeIndex = this.prizeList.findIndex(item => item.confId === award.confId); // 当前中奖位置，至关重要
        (this.prizeParams.prizeIndex > 5) && (this.prizeParams.prizeIndex = 5); // 容错处理
        (this.prizeParams.prizeIndex < 0) && (this.prizeParams.prizeIndex = 0)
        this.startRoll()
      } catch (error) {
        this.$alert('达到等级2之后才可抽奖 完成每日任务可以提升等级哦~')
        return false
      }
    },
    /* 抽奖轮播开始 */
    async startRoll () {
      this.prizeParams.currentTimes += 1
      this.oneRoll()
      const { currentTimes, baseTimes, prizeIndex, currentIndex } = this.prizeParams
      if ((currentTimes > baseTimes + 10) && prizeIndex === currentIndex) {
        clearTimeout(this.prizeParams.timer) // 清除转动定时器，停止转动
        setTimeout(() => {
          this.showPrizeMask = true // 弹出中奖红包
          this.lotterying = false // 恢复可点击抽奖
        }, 500)
      } else {
        if (currentTimes < baseTimes) { // 还没达到基本转动次数再次点击加快则转动速度
          this.prizeParams.speed -= 10 // 加快转动速度
        } else if ((currentTimes > baseTimes + 10) && ((prizeIndex === 0 && currentIndex === 5) || prizeIndex === currentIndex + 1)) {
          this.prizeParams.speed += 110 // 抽奖即将结束，放慢转动速度
        } else {
          this.prizeParams.speed += 20
        }
        (this.prizeParams.speed < 40) && (this.prizeParams.speed = 40) // 最低速度
        this.prizeParams.timer = setTimeout(this.startRoll, this.prizeParams.speed)
      }
    },
    /* 每一轮转动 */
    oneRoll () {
      let index = this.prizeParams.currentIndex
      index += 1;
      (index > this.prizeParams.prizeCount - 1) && (index = 0)
      this.prizeParams.currentIndex = index // 激活当前位置
    },
  },
}
</script>

<style lang="less" scoped>
@import './styles/index.scss';
.page-container{
   @include positionWithBg(relative,100%, 100vh, '', '','/background.png',cover);
  .title-box{
    @include position(relative,100%,285px);
    .title{
      @include positionBgCenter(absolute,578px,100%,35px,50%,'/title.png',contain, -50%, 0%);
    }
    .rule{
      width: 103px;
      height: 48px;
      padding: 5px 10px;
      background: #73104D;
      border-radius: 0px 0px 10px 10px;
      float: right;
      @include fontSet(20px, #FCB4D6, 29px,400);
      @include flexBox(center, center,column);
    }
  }
  .lottery-box{
    @include position(absolute,100%,912px);
    background: url($imgBaseUrl+'/lottery-circle.png');
    background-size: contain;
    left: 50%;
    top: 48%;;
    transform: translate(-50%,-50%);
    .content{
      position: relative;
      height: 100%;
      margin-top: 125px;
      .parize-0{
        @include positionWithBg(absolute,214px,186px,227px,6px,'/one.png');
        &.active{
          @include positionWithBg(absolute,214px,186px,227px,6px,'/one-active.png');
        }
      }
      .parize-1{
        @include positionWithBg(absolute,230px,230px,93px,58px,'/six.png');
          &.active{
            @include backgroundActive('/six-active.png');
        }
      }
      .parize-2{
        @include positionWithBg(absolute,190px,216px,39px,192px,'/eight.png');
        &.active{
          @include backgroundActive('/eight-active.png');
        }
      }
      .parize-3{
        @include positionWithBg(absolute,190px,216px,39px,372px,'/eighteen.png');
        &.active{
          @include backgroundActive('/eighteen-active.png');
        }
      }
      .parize-4{
        @include positionWithBg(absolute,230px,230px,93px,468px,'/eigthy-eight.png');
        &.active{
          @include backgroundActive('/eigthy-eight-active.png');
        }
      }
      .parize-5{
        @include positionWithBg(absolute,214px,186px,227px,532px,'/ten-stone.png');
        &.active{
          @include backgroundActive('/ten-stone-active.png');
        }
      }
      .current-bonus{
        @include positionCenter(absolute,352px,352px,233px,50%,-50%, 0%);
        .box{
          @include flexBox(center, center,column);
          @include backgroundImage(352px,352px, $imgBaseUrl + '/current-bonus.png');
          position: absolute;
          .my-bonus{
            @include fontSet(90px, #FF4A41, 140px,700);
            position: absolute;
            top: 80px;
          }
          .distance-withdrawal{
            position: absolute;
            top: 198px;
            @include fontSet(24px, #FF4A41, 34px,400);
          }
        }
      }
      .broadcast{
        @include positionCenter(absolute,610px,110px,479px,50%,-50%, 0%);
        .box{
          @include backgroundImage(610px, 110px, $imgBaseUrl + '/broadcast.png');
          position: absolute;
          .horn{
            display: inline-block;
            @include positionBgCenter(absolute,45px,45px,50%,72px,'/horn.png',contain, 0%,-50%);
          }
          .split-line{
            display: inline-block;
            position: absolute;
            left: 123px;
            top: 50%;
            color: #9DA1DA;
            transform: translate(0%,-50%);
          }
          .marquee-y{
            position: absolute;
            left: 140px;
            top: 50%;
            transform: translate(0%,-50%);
          }
        }
      }
      .btn-box{
        @include positionCenter(absolute,440px,126px,633px,50%,-50%, 0%);
        .lottery-start, .non-login{
          @include backgroundImage(100%, 100%, $imgBaseUrl + '/start-lottery.png');
        }
        .lottery-share{
          @include backgroundImage(100%, 100%, $imgBaseUrl + '/lottery-share.png');
        }
        .lottery-limit{
          @include backgroundImage(100%, 100%, $imgBaseUrl + '/lottery-limit.png');
        }
      }
    }
  }
  .bottom-box{
    @include backgroundImage(100%,236px, $imgBaseUrl + '/bottom-bg.png');
    position: absolute;
    bottom: 0px;
    .box{
      @include positionCenter(absolute,490px,52px,30%,50%,-50%, 0%);
       @include fontSet(20px,#A08EB5,29px,400);
    }
  }
}
</style>
