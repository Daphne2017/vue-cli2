<template>
  <div class="tipsBox">
   <div style="position: absolute;left: 331px;top: 205px;">list长度：{{ list.length }}</div>
    <div class="container" ref="container">
        <div class="scroll-wrapper" :style="style">
            <div v-for="(item, index) in scrollList" :key="index" class="item" >{{`item-${item}`}}</div>
        </div>
    </div>
     <button @click="add" style="position: absolute;top: 239px;left: 143px;">每点击一次增加1000条数据</button>
  </div>
</template>

<script>
import demoApi from '@/api/demoApi'
export default {
  name: 'virtualList',
  data () {
    return {
      list: [
        0
      ],
      startIndex: 0,
      endIndex: 7,
      paddingTop: 0,
      paddingBottom: 0,
      allHeight: 0
    }
  },
  computed: {
    scrollList () {
      return this.list.slice(this.startIndex, this.endIndex)
    },
    style () {
      return {
        paddingTop: this.paddingTop + 'px',
        paddingBottom: this.paddingBottom + 'px'
      }
    }
  },
  watch: {
    list (val) {
      const valLen = val.length
      this.allHeight = valLen * document.getElementsByClassName('item')[0].offsetHeight
      this.paddingBottom = this.allHeight - this.$refs.container.clientHeight  // 初始化的padding-bottom
    }
  },
  methods: {
    add () {
      let arr = new Array(1000).fill(0)
      arr = arr.map((item, index) => {
        return index + this.list.length
      })
      this.list = [
        ...this.list,
        ...arr
      ]
    }

  },
  mounted () {
    const container = this.$refs.container
    this.endIndex = this.startIndex +  Math.floor(container.clientHeight / document.getElementsByClassName('item')[0].offsetHeight)
    container.addEventListener('scroll', () => {
      const top = container.scrollTop
      this.startIndex = Math.floor(top / document.getElementsByClassName('item')[0].offsetHeight) // 开始位置
      this.endIndex = this.startIndex +  Math.floor(container.clientHeight / document.getElementsByClassName('item')[0].offsetHeight)
      this.paddingTop = top
      if (this.endIndex >= this.list.length) {
        this.paddingBottom = 0
        return
      }
      this.paddingBottom = this.allHeight - container.clientHeight  - top //
    })
  }
}
</script>

<style lang="less" scoped>
  .container {
      width: 300px;
      height: 600px;
      overflow: auto;
      border: 1px solid;
      margin: 100px auto;
  }
  .item {
      height: 29px;
      line-height: 30px;
      border-bottom: 1px solid #aaa;
      padding-left: 20px;
  }
</style>
