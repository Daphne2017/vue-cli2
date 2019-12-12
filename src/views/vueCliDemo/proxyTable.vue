<template>
  <div class="tipsBox">
    <div v-html="htmlWebpack"></div>
    <divider>华丽的分割线</divider>
    <div v-html="bableHtml"></div>

  </div>
</template>

<script>
import demoApi from '@/api/demoApi'
import { Divider } from 'vux'
export default {
  name: 'proxyTable',
  components: {
    Divider
  },
  data () {
    return {
      htmlWebpack: '',
      bableHtml: ''

    }
  },
  methods: {
    // 请求的是代理的url
    getProxyData1 () {
      this.$http.get(demoApi.getWebpack).then(res => {
        console.log('打印输出代理的数据1', res)
        this.htmlWebpack = res.data
        console.log('htmlWebpack', this.htmlWebpack)
      })
    },
    // 请求的是代理的url
    getProxyData2 () {
      this.$http.get(demoApi.getBalbel).then(res => {
        console.log('打印输出代理的数据2', res)
        this.bableHtml = res.data
      })
    }
  },
  mounted () {
    this.getProxyData1()
    this.getProxyData2()
  }
}
</script>

<style lang="less" scoped>
</style>
