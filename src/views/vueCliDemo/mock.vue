<template>
  <div class="mockBox">
    <div class="content-wrap">
      <h5>随机生成的列表数据：</h5>
    <ul>
      <li class="random-item" v-for="item of  mockDatas" :key="item.id">
        <div class="custom-cell" style="{maxWidth: 85%}">
          <p class="title">Q :<span>{{ item.title || '问题标题' }}</span></p>
          <p class="author">A :<span>{{ item.author || '回复内容' }}</span></p>
          <img class="icon" :src="item.icon" alt="">
        </div>
        <div class="time">
          <span>时间 :<span class="name">{{ item.date}}</span></span>
        </div>
      </li>
    </ul>
  </div>
 

  </div>
</template>

<script>
import demoApi from '@/api/demoApi'
export default {
  name: 'home',
  data () {
    return {
      mockDatas: []
    }
  },
  methods: {
    // url拦截，获取模拟的数据
    getMockData () {
      this.$http.get('http://mockjs.com/api/posts').then(res => {
        console.log('输出模拟的数据了', res)
        if (res.data.code != 200) return this.$vux.toast.text('mock请求失败', 'middle')
        this.$vux.toast.text('mock数据成功', 'middle')
        this.mockDatas = res.data.posts
      })
    },

  },
  mounted () {
    this.getMockData()
  }
}
</script>

<style lang='less' scoped>
.mockBox {
  .content-wrap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .no-more{
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .random-item {
      width: 100%;
      background: #fff;
      padding: 15px;
      font-family: PingFangSC-Regular;
      margin-top: 15px;
      position: relative;
      .custom-cell {
        border-bottom: 1px solid #f4f4f4;
        padding-bottom: 10px;
        .title {
          max-height: 48px;
          font-size: 17px;
          color: #000;
          line-height: 24px;
          margin-bottom: 10px;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          span {
            margin-left: 10px;
          }
        }
        .author {
          font-size: 15px;
          color:rgba(140,140,140,1);
          max-height: 48px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          span {
            margin-left: 10px;
          }
        }
        .icon {
          height: 50px;
          width:50px;
        }
      }
      .time {
        width: 100%;
        display: flex;
        color:rgba(69,69,69,1);
        font-size: 14px;
        padding-top: 10px;
        line-height:20px;
      }
    }
  }
}
</style>
