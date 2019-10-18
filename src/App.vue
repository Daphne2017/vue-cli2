<template>
  <div id="app">
    <header class="commonHead">
      <img src="./assets/logo.png">
      <h2>vue-cli</h2>   
    <div>
      路由连接：
      <ul >
        <router-link class="link-item"
          :to="`/demo/${item.link}`"
          tag="li" v-for="(item, index) of linklist" :key="index">
          <span>{{item.name}}</span>
        </router-link>
      </ul>
    </div>         
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
      linklist: [
        {
          link: 'mock',
          name: 'mock的demo'
        },
        {
          link: 'proxyTable',
          name: 'proxyTable的demo'
        },
        {
          link: 'qsPlugin',
          name: 'qsPlugin的demo'
        },
        {
          link: 'quillEditor',
          name: '富文本编辑器的使用'
        },
        {
          link: 'echarts',
          name: 'echarts的使用'
        }
      ]
    }
  },
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
