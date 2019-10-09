<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-31 19:28:26
 * @LastEditTime: 2019-09-02 11:10:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="noData">
    <img
      src="../assets/icon/fixed.png"
      alt=""
    >
    <p>页面找不到了</p>
    <div class="tc p30 mt30">
      <button
        type="button"
        class="ft_primary_btn"
        @click="jumpHome"
      >返回首页</button>
    </div>
  </div>
</template>
<script>
// import dictionary from '@/js/mixins/dictionary'
export default {
  /**
   * 404页面
   */
  // mixins: [dictionary],
  data () {
    return {}
  },
  methods: {
    toIndex () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="less" scoped>
.noData {
  padding-top: 104px;
  text-align: center;
  background-color: #fff;
  img {
    height: 90px;
  }
  p {
    padding-top: 10px;
    color: #797979;
  }
}
</style>
