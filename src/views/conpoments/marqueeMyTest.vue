<template>
  <div class="my-outbox">
    <div
      class="my-inbox"
      ref='box'
    >
      <!-- <div class="my-list" >
                {{1}}<span class="my-uname">{{1}}</span>刚刚购买了产品
            </div>
            <div class="my-list" >
                {{2}}<span class="my-uname">{{2}}</span>刚刚购买了产品
            </div>
            <div class="my-list" >
                {{3}}<span class="my-uname">{{3}}</span>刚刚购买了产品
            </div>
                <div class="my-list" >
                {{4}}<span class="my-uname">{{4}}</span>刚刚购买了产品
            </div>
            <div class="my-list" >
                {{5}}<span class="my-uname">{{5}}</span>刚刚购买了产品
            </div>
                        <div class="my-list" >
                {{6}}<span class="my-uname">{{6}}</span>刚刚购买了产品
            </div>
            <div class="my-list" >
                {{7}}<span class="my-uname">{{7}}</span>刚刚购买了产品
            </div>
            <div class="my-list" >
                {{8}}<span class="my-uname">{{8}}</span>刚刚购买了产品
            </div>             -->
      <div
        class="my-list"
        v-for="(item,index) in msg"
        :key='index'
      >
        {{item.place}}<span class="my-uname">{{item.name}}</span>刚刚购买了产品
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'my-marquee-left',
  props: {
    sendVal: Array
  },
  data () {
    return {
      msg: [{
        "place": "来自烟台市的",
        "name": "1许先生"
      }, {
        "place": "来自东莞市的",
        "name": "2曹先生"
      }, {
        "place": "来自郑州市的",
        "name": "3邹女士"
      }, {
        "place": "来自海口市的",
        "name": "4戚先生"
      }, {
        "place": "来自南京市的",
        "name": "5陈先生"
      },
      {
        "place": "来自烟台市的",
        "name": "6许先生"
      }, {
        "place": "来自东莞市的",
        "name": "7曹先生"
      }, {
        "place": "来自郑州市的",
        "name": "8邹女士"
      }, {
        "place": "来自海口市的",
        "name": "9戚先生"
      }, {
        "place": "来自南京市的",
        "name": "10陈先生"
      }],
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      var that = this;
      var target = this.$refs.box;
      var initLeft = 0;
      setInterval(function () {
        initLeft++;
        if (initLeft >= target.offsetWidth / 2) {
          initLeft = 0;
        }
        target.style = 'transform: translateX(-' + initLeft + 'px)';
      }, 16)
    })

  }
}
</script>

<style lang="less" scoped>
.my-outbox {
  color: #d7bc8d;
  overflow: hidden;
  height: 35px;
  background: #422b02;
  position: relative;
  .my-inbox {
    white-space: nowrap;
    position: absolute;
    font-size: 0;
    .my-list {
      margin-right: 25px;
      display: inline-block;
      font-size: 13px;
      height: 35px;
      line-height: 35px;
      .my-uname {
        color: #ff8900;
      }
    }
  }
}
</style>