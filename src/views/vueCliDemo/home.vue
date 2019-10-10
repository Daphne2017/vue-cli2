<template>
  <div class="tipsBox">
  dsyhfshsadoikfhsaodfjlsa;dkf;jlsa;df
  看不见我拉阿拉
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods: {
    // url拦截，获取模拟的数据
    getMockData () {
      this.$http.get('http://mockjs.com/api/posts').then(res => {
        console.log('输出模拟的数据了', res)
      })
      let deptData = {
        name: '严燕姗'
      }
      let _deptData = Object.assign({}, deptData)
      console.log('严燕姗严燕姗严燕姗', _deptData)
    },
    // 请求的是代理的url
    getProxyData1 () {
      this.$http.get('/api/a/1190000018704305').then(res => {
        console.log('打印输出代理的数据', res)
      })
    },
    // 请求的是代理的url
    getProxyData2 () {
      this.$http.get('/api/a/1190000018704305').then(res => {
        console.log('打印输出代理的数据', res)
      })
    }
  },
  mounted () {
    this.getMockData()
    this.getProxyData1()
    this.getProxyData2()
  }
}
</script>

<style lang="less" scoped>
</style>
