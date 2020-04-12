// 还有有缺陷的跑马灯

<template>
    <div class="my-outbox">
        <div class="my-inbox" ref='box'  v-if='sendVal'>
            <div class="my-list" v-for="(item,index) in sendVal" :key='index'>
               {{item.place}}<span class="my-uname">{{item.name}}</span>刚刚购买了产品
            </div>
            <div class="my-list" v-for="(item,index) in sendVal" :key='(index+1)*100'>
                {{2}}<span class="my-uname">{{}}</span>刚刚购买了产品
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'my-marquee-left',
        props:{        
            sendVal:Array,
             default: () => []
        },
        data() {
            return {
    
            }
        }, 
        mounted:function(){
        this.$nextTick(() => {
            var that = this;
            var target = this.$refs.box; 
            var initLeft = 0;
            setInterval(function(){
                initLeft ++;
                if(initLeft >= target.offsetWidth / 2 ){
                    initLeft = 0;
                }
                target.style = 'transform: translateX(-'+ initLeft +'px)';                
            },16)
        })        

        }
    }
</script>

<style lang="less" scoped>
    .my-outbox{
        color: #D7BC8D;
        overflow: hidden;
        height: 35px;
        background: #422b02;
        position: relative;
        .my-inbox{
            white-space: nowrap;
            position: absolute;
            font-size: 0;
            .my-list{
                margin-right: 25px;
                display: inline-block;
                font-size: 13px;
                height: 35px;
                line-height: 35px;
                .my-uname{
                    color: #FF8900;
                }
            }
        }
    }
</style>