<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <img :src="cardUrl" alt="">
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>

</template>

<script>
import {drawCard} from '../../utils/card-tools'
// https://www.runoob.com/jsref/dom-obj-canvas.html  canvas学习路径
// https://www.runoob.com/tags/ref-canvas.html
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }

  },
  data () {
    return {
      dialogVisible: false,
      cardUrl: ''
    }
  },
  mounted () {
    this.initCard()
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async initCard () {
      const {
        rankNum = 100,
        liveClassesNum = 100,
        liveStudyNum = 100,
        liveFansNum = 100,
        totalDay = 100,
        headImg = ``,
        userName = '测试画图工具'
      } = this.data
      const cardWidth = 750
      const cardHeight = 1327
      const contents = []

      // 头像
      contents.push({
        type: 'image',
        url: headImg,
        style: {
          left: 42,
          top: 250,
          width: 118,
          height: 118,
          isClip: true,
          x: 42,
          y: 250,
          w: 118,
          h: 118,
          r: 60, // 圆弧半径60
          bdWidth: 8,
          bdColor: '#FEDEB4',
          bgcolor: 'rgba(255, 255, 255, 1)'
        }
      })
      // 用户名
      contents.push({
        type: 'singleText',
        text: userName,
        style: {
          top: 300, // 文字的位置
          left: 179,
          font: 33, // 这里指fontSize
          color: '#fff', // 文字的颜色
          align: 'center',
          fontWeight: 'bold' // 是否加粗
        }
      })
      // 领路人
      contents.push({
        type: 'image',
        url: `https://img.qlchat.com/qlLive/activity/image/PJIEXODP-I9E9-O9FG-1584699004729-849OD85AE25K.png`,
        style: {
          top: 325,
          left: 176,
          width: 162,
          height: 49
        }
      })

      contents.push({
        type: 'singleText',
        text: '我是百度第',
        style: {
          top: 515,
          left: 42,
          font: 33,
          color: '#fff',
          fontWeight: 'bold',
          suffix: {
            lSpace: 10,
            text: rankNum,
            font: 56,
            color: '#FFB315',
            fontWeight: 'bold',
            suffix: {
              lSpace: 10,
              text: '位讲师',
              font: 33,
              color: '#fff',
              fontWeight: 'bold'
            }
          }
        }

      })

      contents.push({
        type: 'singleText',
        text: '已经教学',
        style: {
          top: 600,
          left: 42,
          font: 33,
          color: '#fff',
          fontWeight: 'bold',
          suffix: {
            lSpace: 10,
            text: totalDay,
            font: 56,
            color: '#FFB315',
            fontWeight: 'bold',
            suffix: {
              lSpace: 10,
              text: '天',
              font: 33,
              color: '#fff',
              fontWeight: 'bold'
            }
          }
        }
      })

      contents.push({
        type: 'singleText',
        text: '累计开设',
        style: {
          top: 685,
          left: 42,
          font: 33,
          color: '#fff',
          fontWeight: 'bold',
          suffix: {
            lSpace: 10,
            text: liveClassesNum,
            font: 56,
            color: '#FFB315',
            fontWeight: 'bold',
            suffix: {
              lSpace: 10,
              text: '门课程',
              font: 33,
              color: '#fff',
              fontWeight: 'bold'
            }
          }

        }
      })
      contents.push({
        type: 'singleText',
        text: '帮助',
        style: {
          top: 820,
          left: 42,
          font: 33,
          color: '#fff',
          fontWeight: 'bold',
          suffix: {
            lSpace: 10,
            text: liveStudyNum,
            font: 56,
            color: '#FFB315',
            fontWeight: 'bold',
            suffix: {
              lSpace: 10,
              text: '名学员',
              font: 33,
              color: '#fff',
              fontWeight: 'bold'
            }
          }

        }
      })
      // contents.push({
      //   type: 'singleText',
      //   text: '收获',
      //   style: {
      //     top: 905,
      //     left: 42,
      //     font: 33,
      //     color: '#fff',
      //     fontWeight: 'bold',
      //     suffix: {
      //       lSpace: 10,
      //       text: liveFansNum,
      //       font: 56,
      //       color: '#FFB315',
      //       fontWeight: 'bold',
      //       suffix: {
      //         lSpace: 10,
      //         text: '名铁杆粉丝',
      //         font: 33,
      //         color: '#fff',
      //         fontWeight: 'bold'
      //       }
      //     }
      //   }
      // })
      // left, top, width, maxLine, lineHeight, font, color, fontWeight, bolder

      contents.push({
        type: 'multiText',
        text: '测试多行多行多行 多行测试多行 多行多行多行',
        style: {
          top: 905,
          left: 42,
          width: 300,
          maxLine: 3,
          font: 33,
          color: '#fff',
          fontWeight: 'bold'
        }
      })
      // 二维码
      const qrUrl = 'https://img.qlchat.com/qlLive/activity/image/5EVQTJXA-W4CR-M457-1584965536988-EHOE8C527KSY.png'

      contents.push({
        type: 'image',
        url: qrUrl,
        style: {
          top: 1075,
          left: 535,
          width: 174,
          height: 174
        }
      })
      this.cardUrl = drawCard({
        bgUrl: 'https://img.qlchat.com/qlLive/activity/image/5EVQTJXA-W4CR-M457-1584965536988-EHOE8C527KSY.png', // 海报背景
        cardWidth, // 背景图铺满整个canvas
        cardHeight,
        contents,
        cb: (url) => {
          this.cardUrl = url
        }

      })
    }
  }
}
</script>
