<template>
  <div class="qsPluginBox">
		<div>初始化的personInfo {{personInfo}}</div>
		<divider>华丽的分割线</divider>
		<div>使用JSON的stringify方法 JSON.stringify(this.personInfo):</div>
		{{JSON.stringify(personInfo)}}

		<divider>华丽的分割线</divider>

		<div>'使用JSON的parse方法 JSON.parse( JSON.stringify(this.personInfo)):'</div>
		 {{JSON.parse(JSON.stringify(personInfo))}}

		<divider>华丽的分割线</divider>
		<div>使用qs的stringify方法 this.qs.stringify(this.personInfo):</div>
		{{this.$qs.stringify(personInfo)}}
		<divider>华丽的分割线</divider>
		<div>使用qs的parse方法 this.qs.parse(this.personInfo):</div>
		{{this.$qs.parse(this.$qs.stringify(personInfo))}}

  </div>
</template>

<script>
import demoApi from '@/api/demoApi'
import { Divider } from 'vux'
export default {
  name: 'proxyTable',
  components:{
    Divider
  },
  data () {
    return {
        personInfo: {        
            name: '严燕姗',
            age:'27',
            height: '165',
            weight: '100'
        }
    }
  },
  methods: {
    // url拦截，获取模拟的数据
    qsPlugin () {


      console.log('输出this.personInfo对象', this.personInfo)
      console.log('使用JSON的stringify方法 JSON.stringify(this.personInfo):', JSON.stringify(this.personInfo))
      console.log('使用JSON的parse方法 JSON.parse( JSON.stringify(this.personInfo)):', JSON.parse(JSON.stringify(this.personInfo)))
      console.log('使用qs的stringify方法 this.qs.stringify(this.personInfo):', this.$qs.stringify(this.personInfo))
      console.log('使用qs的parse方法 this.qs.parse(this.personInfo):', this.$qs.parse(this.$qs.stringify(this.personInfo)))
    }
  },
  mounted () {
    this.qsPlugin()
  }
}
</script>

<style lang="less" scoped>
</style>
