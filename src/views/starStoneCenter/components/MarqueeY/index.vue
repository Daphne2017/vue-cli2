<template>
<!-- 中奖播报列表 -->
    <div class="marquee-outbox" ref='outbox'>
        <div :class="`marquee-inbox ${reset === 0 ? 'no' : ''}`" ref='movebox' :style="{transform:  'translateY(-' + reset + 'px)'}">
            <div class="marquee-list" ref="list" v-for="(item,index) in list" :key='index'>
                <div class="item">
                    {{item.info}}
                </div>
            </div>
            <div v-if='isShow'>
                <div class="marquee-list" v-for="(item,index) in list" :key='(index+1)*100' >
                    <div class="item">
                        {{item.info}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'MarqueeY',
  props: {
    list: Array,
  },
  data () {
    return {
      isShow: true,
      initTop: 0,
      reset: 0,
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      const timer = setInterval(() => {
        this.set()
      }, 1500)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    },
    set () {
      if (this.reset >= this.$refs.movebox.offsetHeight / 2) {
        this.initTop = 0
      } else {
        this.initTop++
      }
      this.reset = this.initTop * ((this.$refs.list && this.$refs.list[0].offsetHeight) || 0)
      if (this.reset === 0) {
        this.$nextTick(() => {
          this.initTop++
          this.reset = this.initTop * ((this.$refs.list && this.$refs.list[0].offsetHeight) || 0)
        })
      }
    },
  },
}
</script>
<style lang="less" scoped>
.marquee-outbox{
    height:34px;
    width: 366px;
    overflow: hidden;
    .marquee-inbox{
      transition: .5s linear;
      &.no{
        transition: 0s linear;
      }
        .marquee-list{
            font-size: 18px;
            .item{
              @include fontSet(24px,#BCC0E5,34px,400);
              @include ellipsisBasic(1);
            }
        }
    }
}
</style>
