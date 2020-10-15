<template>
  <div class="page-container">
    <div class="stone-center-banner">
      <div class="stone-left">
        <div class="stone"></div>
        <div class="split-line"></div>
        <div class="stone-des">「 若星之恒，若石之坚 」</div>
        <div class="stone-small"></div>
        <div class="stone-value">{{ userInfo.starStone }}</div>
      </div>
      <div class="stone-right">
        <div class="stone-circle"></div>
        <div class="stone-big"></div>
      </div>
    </div>
    <div class="stone-center-content">
      <div class="lottery" @click="$router.push(`/starStoneCenter/lottery`)">
      </div>
      <div class="more-activity">更多活动敬请期待</div>
    </div>
  </div>
</template>

<script>
import { getStarStonesApi } from '@/api/starStoneLottery'
import { getUserToken } from '@/utils/index'
export default {
  name: 'StarStoneCenter',
  data () {
    return {
      userInfo: {
        token: '',
        userId: '',
        starStone: 0,
      }, // 用户信息
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    async initPage () {
      const userInfo = await getUserToken()
      this.userInfo.token = userInfo.token
      const res = await getStarStonesApi(this.userInfo.token)
      this.userInfo.starStone = res.wealth
    },
  },
}
</script>

<style lang="less" scoped>
@import './styles/index.scss';
.page-container {
  background-color:#f5f5f5;
  height: 100vh;
  .stone-center-banner {
    position: relative;
    @include backgroundImage(
      100%,
      500px,
      $imgBaseUrl + "/stone-center-banner.png",
      contain
    );
    .stone-right{
       animation: bounce 3s ease-in infinite;
        @keyframes bounce {
        0% { transform:translateY(0px) }
        50%{ transform:translateY(14px) }
        100%{ transform:translateY(0px) }
      }
      .stone-circle{
        animation: transOpacity 3s ease-in infinite;
        @include positionWithBg(absolute,328px,318px,92px,402px,'/stone-circle.png');
        @keyframes transOpacity {
          0% { opacity: 0.7 }
          50% { opacity: 1 }
          100%{ opacity: 0.7 }
        }
      }
      .stone-big{
        @include positionWithBg(absolute,184px,186px,150px,475px,'/stone-big.png')
      }
    }
    .stone-left{
      .stone{
        @include positionWithBg(absolute,124px,72px,148px,66px,'/stone-text.png')
      }
      .split-line{
        position: absolute;
        width:262px;
        top: 226px;
        left: 48px;
        border: 1px #6859A3 solid;
      }
      .stone-des{
        @include position(absolute,282px,24px);
        color: white;
        top: 252px;
        left: 38px;
         @include fontSet(24px, #FFFFFF, 36px,400);
      }
      .stone-small{
         @include positionWithBg(absolute,40px,40px,315px,54px,'/stone-small.png')
      }
      .stone-value{
        position: absolute;
        height: 40px;
        color: white;
        top: 310px;
        left: 114px;
         @include fontSet(40px, #FFFFFF, 48px,500);
      }
    }
  }
  .stone-center-content {
    @include position(relative,100%,740px);
    margin-top: -30px;
    background: #f5f5f5;
    border-radius: 32px 32px 0px 0px;
     @include flexBox(normal, center,column);
    .lottery {
      margin-top: 60px;
      border-radius: 24px;
      @include backgroundImage(686px,300px,$imgBaseUrl + "/stone-lottery-bg.png");
    }
    .more-activity{
      margin: auto;
      margin-top: 62px;
      @include fontSet(24px, #999999, 36px,400);
    }
  }
}
</style>
