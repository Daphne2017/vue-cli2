<template>
  <div id="app">
    <header class="commonHead">
      <h2>vue-cli</h2>
    </header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      test:''
    }
  },
  mounted: function () {}
}
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less'; //~ 代表依赖的根目录 node_modules
  @import '~vux/src/styles/reset.less';
  @import './css/test.less'; // vue-cli2全局引入less文件，全局使用，无需过多配置

  body {
    background-color: #fff;
    #app {
      background-color: #fff;
      width:100%;
      height:100%;
      .commonHead{
        text-align: center;
        .link-item{
          color:#2979D0;
          font-size: 16px;
        }
      }

    }
  }
  html,body{
    width: 100%;
    height: 100%;
    // overflow: hidden;
  }

</style>
