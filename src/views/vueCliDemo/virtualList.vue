<template>
  <div class="tipsBox">
    <button @click="add">增加</button>
    <div class="container" ref="container">
        <div class="scroll-wrapper" :style="style">
            <div v-for="(item, index) in scrollList" :key="index" class="item">{{item}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import demoApi from '@/api/demoApi'
export default {
  name: 'virtualList',
  data () {
    return {
      list: [
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
      this.allHeight = valLen * 30
      this.paddingBottom = this.allHeight - 210 // 初始化的padding-bottom
    }
  },
  methods: {
    add () {
      let arr = new Array(500).fill(0)
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
    container.addEventListener('scroll', () => {
      const top = container.scrollTop
      this.startIndex = Math.floor(top / 30)
      this.endIndex = this.startIndex + 7

      this.paddingTop = top
      if (this.endIndex >= this.list.length) {
        this.paddingBottom = 0
        return
      }
      this.paddingBottom = this.allHeight - 210 - top //
    })
  }
}
</script>

<style lang="less" scoped>
  .container {
      width: 300px;
      height: 210px;
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
