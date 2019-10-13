<template>
  <div class="tipsBox">
 dgfdfgdfhfgdfgdfg

  </div>
</template>

<script>
import demoApi from '@/api/demoApi'
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
        name: '严燕姗',
        age:'27',
        height: '165',
        weight: '100'
      }
      console.log('输出deptData对象', deptData)
      console.log('使用JSON的stringify方法 JSON.stringify(deptData):', JSON.stringify(deptData))
      console.log('使用JSON的parse方法 JSON.parse( JSON.stringify(deptData)):', JSON.parse(JSON.stringify(deptData)))
      console.log('使用qs的stringify方法 this.qs.stringify(deptData):', this.$qs.stringify(deptData))
      console.log('使用qs的parse方法 this.qs.parse(deptData):', this.$qs.parse(this.$qs.stringify(deptData)))
      let _deptData = Object.assign({}, deptData)
      console.log('Object.assign({}, deptData)', _deptData)
    },
    // 请求的是代理的url
    getProxyData1 () {
      let deptData = {
        name: '严燕姗',
        age:'27',
        height: '165',
        weight: '100'
      }      
      this.$http.get(demoApi.getWebpack).then(res => {
        console.log('打印输出代理的数据1', res)
      })
    },
    // 请求的是代理的url
    getProxyData2 () {
      this.$http.get(demoApi.getBalbel).then(res => {
        console.log('打印输出代理的数据2', res)
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
