<template>
  <div class="star-energy">
    <div class="container" :class="[class2 ? `allup`: '']">
      <div v-for="(item,index) in list" :key="index" :class="[ 'ball',  `item-${index}`, class1 ? `active-${index}-down`: '']">
      </div>
    </div>
    <button @click="tegeter" style="margin-left:30px">down</button>
    <div>dghskjgkdjglgj </div>
    <button @click="tegeter1">up</button>
  </div>
</template>
<script>
export default {
  name: 'StarStoneCenter',
  data () {
    return {
      list: [
        {
          value: 1
        },
        {
          value: 1
        }
      ],
      class1: 0,
      class2: 0
    }
  },
  mounted () {
  },
  methods: {
    tegeter () {
      this.class1 = 1
      setTimeout(() => {
        // this.class1 = ''
        this.class2 = 1
      }, 3000)
    },
    tegeter1 () {
      this.class2 = 1
    }
  }
}
</script>
<style lang="scss" scoped>
$imgBaseUrl: $imageFolderPath + '/starEnergy';
.container{
  margin-top: 200px;
  width: 100vw;
  height: 568px;
  background: cornflowerblue;
  position: relative;
  &.allup{
      transform: translateY(-1000px);
      transition: all 3s linear;
  }
  .ball{
    position: absolute;
    @include backgroundImage (130px,130px,$imgBaseUrl+'/starStone.png');
    &.item-0{
      top:48px;
      left: 310px;
    }
    &.active-0-down{
      transform: translateY(195px);
      transition: all 3s linear;
    }

    &.active-1-down{
      transform: translateY(65px);
      transition: all 3s linear;
    }
    &.item-1{
      top:178px;
      left: 310px;
    }
    &.item-2{
      top:244px;
      left: 50px;
    }
    &.item-3{
      top:308px;
      left: 310px;
    }
    &.item-4{
      top:438px;
      left: 310px;
    }
    &.item-5{
      top:244px;
      left: 50px;
    }
    &.item-5{
      top:178px;
      left: 180px;
    }
  }
  @keyframes item0 {
    20%{
      transform: translate(39px);
    }
    40%{
      transform: translate(78px);
    }
    60%{
      transform: translate(117px);
    }
    80%{
      transform: translate(195px);
    }
    100%{
      transform: translate(-200px);
    }
  }
}
</style>
