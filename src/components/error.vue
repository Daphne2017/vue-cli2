<template>
  <div class="tipsBox">
    <img src="@/assets/icon/no-list.png">
     <p>{{tipsTxt}} </p>
    <span v-if="tipsTxt === '无法获取网络内容'">别紧张，请刷新下网络</span>
    <div class="footer">
      <div @click="f5">刷新网络</div>
      <!-- <button class="button" @click="clearCache">清空缓存</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tipsTxt: this.$route.query.tips ? this.$route.query.tips : '无法获取网络内容',
      redirectUrl: this.$route.query.redirect
    }
  },
  methods: {
    clearCache: function () {
      localStorage.clear()
      alert('已清空')
    },
    f5 () {
      this.$router.push(this.redirectUrl ? this.redirectUrl : '/')
    }
  },
  created () {
  },
  mounted: function () {

  }
}
</script>

<style lang="less" scoped>
.tipsBox {
  text-align: center;
}

.tipsBox img {
  display: inline-block;
  width: 114px;
  height: 114px;
  margin-top: 120px;
  margin-bottom: 20px;
}

.tipsBox p {
  height: 34px;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  color: rgba(0, 0, 0, 0.85);
  line-height: 34px;
}
.tipsBox span {
  color: rgba(140, 140, 140, 1);
  font-size: 14px;
  display: block;
  margin: 4px auto 30px;
}
.footer {
  div {
    width: 180px;
    height: 40px;
    text-align: center;
    color: rgba(41, 121, 208, 1);
    font-size: 15px;
    line-height: 40px;
    border: 1px solid rgba(41, 121, 208, 1);
    margin: 0 auto;
  }
}
</style>
