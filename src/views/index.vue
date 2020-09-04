<template>
  <div>
    <div>
      路由连接：
      <ul class="router-link">
        <router-link
          class="link-item"
          :to="`/demo/${item.link}`"
          tag="li"
          v-for="(item, index) of linklist"
          :key="index"
        >
          <span>{{item.name}}</span>
        </router-link>
      </ul>
    </div>
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
        },
        {
          link: 'virtualList',
          name: 'virtualList虚拟列表的使用'
        },
        {
          link: 'lazyLoadImages',
          name: 'lazyLoadImages图片懒加载'
        },
        {
          link: 'virtualDom',
          name: 'virtualDom的diff算法的理解，以及就地复用'
        },
        {
          link: 'freezeObj',
          name: '如何使用冻结对象'
        },
        {
          link: 'marquee',
          name: '跑马灯的实现'
        },
        {
          link: 'uploadImage',
          name: '图片上传'
        },
        {
          link: 'canvasCard',
          name: 'canvas画图'
        }
      ]
    }
  },
  mounted: function () { }
}
</script>
<style lang="less">
  ul.router-link{
    display: flex;
    list-style: none;
    color: #06afd8;
    flex-wrap: wrap;
    li{
      margin-right: 25px;
    }
  }
</style>
