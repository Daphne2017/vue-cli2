<template>
<div>
  <div>{{copyText}}</div>
  <button v-copy="copyText">点击复制</button>
  <button v-longpress="longpress">长按</button>
  <button v-debounce="debounceClick">防抖</button>
  <input type="text" v-model="note" v-emoji />
  <img v-LazyLoad="'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg'" height="100" width="100"/>
  <div class="btns">
  <!-- 显示 -->
  <button v-permission="'1'">权限按钮1</button>
  <!-- 不显示 -->
  <button v-permission="'10'">权限按钮2</button>
   <div v-waterMarker="{text:'lzg版权所有',textColor:'rgba(180, 180, 180, 0.4)'}" style="width:100;height:200px"></div>
   <div style="position:absolute;width:100px;height:200px">
      <div v-draggable style="width:20;height:20px;position:relative">123456</div>
   </div>
</div>
</div>

</template>

<script>
export default {
  data () {
    return {
      copyText: 'a copy directives',
      note: ''
    }
  },
  methods: {
    longpress () {
      alert('长按指令生效')
    },
    debounceClick () {
      console.log('疯狂点击，但是触发一次')
    }
  }
}
</script>
