 <template>
  <div>
    <!-- <marquee :send-val='msg' v-if='msg'/> -->
    <!-- <marqueeX :send-val='msg' v-if='msg'/> -->
    <marqueeY :send-val='comment' v-if='comment'/>
    <!-- <marqueeTest :send-val='msg' v-if='msg'/> -->

    <!-- 多个marquee组件一起使用msg会相互影响，因为传的值地址的引用
        var a = 100;
    var arr = [1,3,7];
    var arr1 = [1,2,3];
    function test(param1,params2,params3){
        param1 = 500
        params2 = [4,5,6]
        params3.push(4,5,6)
    };
    test(a,arr,arr1);
    console.log("a",a);
    console.log("arr",arr);
    console.log("arr1",arr1);
    a 100
    arr (3) [1, 3, 7]
    arr1 (6) [1, 2, 3, 4, 5, 6]

    -->
  </div>
</template>
<script>
import marquee from '../conpoments/marquee'
import marqueeTest from '../conpoments/marqueeMyTest'
import marqueeX from '../conpoments/marqueeX'
import marqueeY from '../conpoments/marqueeY'
export default {
  components: {
    marquee, marqueeX, marqueeY, marqueeTest
  },
  data () {
    return {
      msg: [{
        'place': '来自烟台市的',
        'name': '1许先生'
      }, {
        'place': '来自东莞市的',
        'name': '2曹先生'
      }, {
        'place': '来自郑州市的',
        'name': '3邹女士'
      }, {
        'place': '来自海口市的',
        'name': '4戚先生'
      }, {
        'place': '来自南京市的',
        'name': '5陈先生'
      },
      {
        'place': '来自烟台市的',
        'name': '6许先生'
      }, {
        'place': '来自东莞市的',
        'name': '7曹先生'
      }, {
        'place': '来自郑州市的',
        'name': '8邹女士'
      }, {
        'place': '来自海口市的',
        'name': '9戚先生'
      }, {
        'place': '来自南京市的',
        'name': '10陈先生'
      }],
      comment: [{
        'name': '冯先生',
        'mobile': '170****8441',
        'place': '重庆',
        'content': '从小跟着奶奶长大，她信了一辈子的佛了，我从以前的出了事都会拜佛到今天的每日一拜，已经是一种信仰了，只要多积德行善，下一世咱还是条好汉。'
      }, {
        'name': '姜女士',
        'mobile': '180****2717',
        'place': '包头',
        'content': '第三世的我是只萌萌的小白兔，果然兔兔那么可爱，千万不能吃兔兔。╮(๑•́ ₃•̀๑)╭'
      }, {
        'name': '曹女士',
        'mobile': '171****5347',
        'place': '辽阳',
        'content': '稀里糊涂点进来，还以为跟三生三世十里桃花一个性质的电视剧呢0.0，不过这个真的好准，我小时候和青年时代算的就跟结果说的一模一样。'
      }, {
        'name': '魏先生',
        'mobile': '151****3555',
        'place': '无锡',
        'content': '以前总听说因果循环报应不爽，但一直不明白是啥意思，看了我前四世的身份后我终于明白了，真实，简直太真实了。'
      }]
    }
  }

}
</script>
