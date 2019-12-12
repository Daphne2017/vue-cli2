<template>
 <div id="scrollBox">
    <div id="contentA">
      测试一些数据
      测试一些数据啦
      测试一些数据啦
      测试一些数据
      测试一些数据啦
      测试一些数据啦
      测试一些数据
      测试一些数据啦
      测试一些数据啦
    </div>
    <div id="contentB">
      开始出现在可视区了
    </div>
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
    lazyLoad () {
      var clientHeight = document.getElementById('scrollBox').clientHeight
      var scrollTop = document.getElementById('scrollBox').scrollTop
      var offsetTop = document.getElementById('contentB').offsetTop
      if (clientHeight + scrollTop >= offsetTop) {
        console.log('contentB我开始出现啦')
      }
    },
    // 是否滚动到底
    toBottom () {
      var scrollTop = document.getElementById('scrollBox').scrollTop
  var clientHeight = document.getElementById('scrollBox').clientHeight
  var scrollHeight = document.getElementById('scrollBox').scrollHeight
  if (scrollTop + clientHeight >= scrollHeight) {
        console.log('已经到底啦啦啦啦')
      } ;
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
#scrollBox{
  background-color:aqua;
  height: 200px;
  width: 50px;
  padding:20px 10px;
  margin-top:100px;
  border:red 30px solid;
  position: relative;
  overflow-y: scroll;
  /* overflow: scroll; */
  /* overflow: hidden; */
}
#contentB{
  margin-top:10px;
  padding-top:30px;
}
</style>
