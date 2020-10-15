<template>
    <div class="my-outbox" ref='outbox'>
        <div class="my-inbox" ref='movebox'>
            <div class="my-listbox" v-for="(item,index) in sendVal" :key='index'>
                <div class="my-title">
                    {{item.name}}<text class="my-utel">{{item.mobile}}</text>
                    <text class="my-addr">{{item.place}}</text>
                </div>
                <div class="my-content">{{item.content}}</div>
            </div>
            <div v-if='isShow'>
                <div class="my-listbox" v-for="(item,index) in sendVal" :key='(index+1)*100' >
                    <div class="my-title">
                        {{item.name}}<text class="my-utel">{{item.mobile}}</text>
                        <text class="my-addr">{{item.place}}</text>
                    </div>
                    <div class="my-content">{{item.content}}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'my-marquee-top',
  props: {
    sendVal: Array
  },
  data () {
    return {
      isShow: true
    }
  },
  mounted: function () {
    var moveTarget = this.$refs.movebox
    var outbox = this.$refs.outbox
    if (outbox.offsetHeight > (moveTarget.offsetHeight / 2)) {
      this.isShow = false
      return
    }
    var initTop = 0
    const timer = setInterval(function () {
      initTop++
      if (initTop >= moveTarget.offsetHeight / 2) {
        initTop = 0
      }
      moveTarget.style = 'transform: translateY(-' + initTop + 'px)'
    }, 16)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  }

}
</script>

<style lang="less" scoped>
    .my-outbox{
        color: #FEE7B1;
        height:300px;
        margin: 20px;
        background: #FEE7B1;
        overflow: hidden;
        border: 2px solid #C46302;
        .my-inbox{
            margin: 0 45px;
            .my-listbox{
                padding: 20px 0;
                font-size: 18px;
                border-bottom: 1px solid #C7BEB1;
                .my-title{
                    color: #DB7000;
                    margin-bottom: 10px;
                    clear: both;
                    overflow:hidden;
                    .my-utel{
                        font-size: 16px;
                        margin-left: 20px;
                    }
                    .my-addr{
                        font-size: 16px;
                        float: right;
                    }
                }
                .my-content{
                    text-align: justify;
                    word-break: break-all;
                    font-size: 14px;
                    color: #53565D;
                }
            }
        }
    }
</style>
