<template>
  <div id="app">
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
  mounted: function () {}
}
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less'; //~ 代表依赖的根目录 node_modules
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fff;
    #app {
      background-color: #fff;
      width:100%;
      height:100%;
    }
  }
  html,body{
    width: 100%;
    height: 100%;
    // overflow: hidden;
  }

  .noListContentTips{
    padding: 15px 0;
    text-align: center;
    font-size: 12px;
    color: #999;
  }

</style>
