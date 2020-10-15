<template>
  <div class="alert-mask" v-if="showPrizeMask || showRuleMask">
    <!-- 中奖弹窗 -->
    <div class="lottery-alter-mask" v-if="showPrizeMask">
      <div
        :class="['lottery-alter' , showPrizeMask ? 'showMaskFadeIn':'showMaskFadeOut']"
      >
        <div class="blings"></div>
        <div class="close" @click="$emit('hidePrizeMask')"></div>
        <div class="red-envelope">
          <div class="prize">{{prizeList[prizeIndex] | prizeText}}</div>
          <span class="unit">{{prizeList[prizeIndex] | unitText}}</span>
          <div class="des">奖品已放入你的账户,满1千元即可提现哦！</div>
        </div>
        <div class="btn-box" @click="$emit('childBtnClick')">
          <div :class="btnStatusClass"></div>
        </div>
      </div>
    </div>
    <!-- 规则弹框 -->
    <div class="activity-rule-mask" v-if="showRuleMask">
      <div
        :class="['activity-rule-wrap' , showRuleMask ? 'showMaskFadeIn':'showMaskFadeOut']"
      >
        <div class="alert-content-box">
          <div class="content">
            <div>
              <span class="margin-right-10">活动时间：</span>
              <span>本活动为长期有效，具体在线时间以页面呈现为准</span>
            </div>
            <div>抽奖规则：</div>
            <p>1、每次抽奖需要扣除<span class="red"> {{ ruleParams.expend }} </span>个星石，扣除的星石不退还，每天限参与游戏<span class="red"> {{ ruleParams.maxCount }} </span>次；</p>
            <p>2、星石奖品直接到账，所有奖品将会在2小时内到账；</p>
            <p>3、活动过程中如发现有碍其他用户公平参加本活动或违反本活动目的之行为的(包括但不限于作弊领取、机器刷奖、恶意套现等)，火星堂将有权取消您参加本次活动的资格，或您因参加活动所获商品或因此享有的所有利益。</p>
          </div>
        </div>
        <div class="rule-close" @click="$emit('hideRuleMask')"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Alert',
  props: {
    prizeList: {
      type: Array,
      default: () => [],
    },
    prizeIndex: {
      type: Number,
      default: -1,
    },
    showRuleMask: {
      type: Boolean,
      default: false,
    },
    showPrizeMask: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
    ruleParams: {
      type: Object,
      default: () => {},
    },

  },
  data () {
    return {
      isShow: true,
    }
  },
  filters: {
    prizeText ({ awardAssets = {} }) {
      const { value = 0, type } = awardAssets
      const val = type === 1 ? value : (value / 100).toFixed(0)
      return val
    },
    unitText ({ awardAssets = {} }) {
      return awardAssets.type === 2 ? '元' : '星石'
    },
  },
  computed: {
    /* 切换按钮状态 */
    btnStatusClass () {
      const { residueCount = 0, isShare = 0 } = this.userInfo
      let btnClass = ''
      if (residueCount > 0) {
        btnClass = 'lottery-again' // 星石抽奖
      } else if (!isShare) { // 分享抽奖
        btnClass = 'lottery-share'
      } else { // 抽奖已达上限
        btnClass = 'lottery-limit'
      }
      return btnClass
    },
  },
}
</script>
<style lang="less" scoped>
@import '../../styles/index.scss';
.alert-mask{
  .lottery-alter-mask{
    @include position(fixed,100%,100%);
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    overflow: hidden;
    z-index: 1000;
    .lottery-alter{
      .blings{
        position: fixed;
        top: 0;
        @include backgroundImage(750px,800px, $imgBaseUrl+'/blings.png');
      }
      .close{
        @include positionWithBg(fixed,20px,20px, 264px,590px,'/close.png');
        z-index: 1001;
      }
      .red-envelope {
        @include positionWithBg(fixed,584px, 660px, 158px,0,'/red-envelope.png');
        right: 0;
        margin: auto;
        .prize{
          @include positionCenter(absolute,144px,168px,356px,174px);
          @include fontSet(120px, #FEEA4E, 168px, 500);
          text-align: center;
        }
        .unit{
          @include positionCenter(absolute, 57px,40px,440px,325px);
          @include position(absolute, 57px,40px);
          @include fontSet(29px, #FEEA4E, 40px, 600);
        }
        .des{
          @include positionCenter(absolute, 240px,68px,544px,166px);
          @include fontSet(24px, #A91A1A, 34px, 400);
        }
      }
      .btn-box{
        @include position(fixed,440px,126px);
        top: 918px;
        left: 0;
        right: 0;
        margin: auto;
        // z-index: 1000;
        .lottery-again{
          @include backgroundImage(100%, 100%, $imgBaseUrl + '/lottery-again.png');
        }
        .lottery-limit{
          @include backgroundImage(100%, 100%, $imgBaseUrl + '/lottery-limit.png');
        }
        .lottery-share{
          @include backgroundImage(100%, 100%, $imgBaseUrl + '/lottery-share.png');
        }

      }
    }
  }
  .activity-rule-mask{
    @include position(fixed,100%,100%);
    background: rgba(0,0,0,0.8);
    overflow: hidden;
    z-index: 1000;
    top: 0;
    left: 0;
    @include flexBox(center,center,column,nowrap);
    .activity-rule-wrap{
      @include position(fixed,626px,911px);
      @include flexBox(center,center,column,nowrap);
      z-index: 1000;
      .alert-content-box{
        @include flexBox(center,center,column,nowrap);
        @include backgroundImage(626px,785px, $imgBaseUrl+'/rule-background.png');
        @include fontSet(29px, #F8F5E8, 44px, 400);
        .content{
           padding: 0 50px;
           .red{
             color: #E6A23C;
           }
        }
      }
      .rule-close{
        @include backgroundImage(56px,56px, $imgBaseUrl+'/close-icon.png');
      }
    }
  }
}
</style>
