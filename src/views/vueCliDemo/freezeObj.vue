<template>
<div>
  <p v-for="(item,index) in list" :key="index">{{ item.value }}</p>
<button @click="changeList">仅仅改变值</button>
<button @click="changeList1">改变数组的索引</button>

</div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      list: Object.freeze([
        { value: 1 },
        { value: 2 }
      ])
      // list: [
      //   { value: 1 },
      //   { value: 2 }
      // ]
    }
    // vue不会对list里的object做getter、setter绑定
  },
  mounted () {
    // 界面不会有响应
    this.list[0].value = 100

    // 下面两种做法，界面都会响应
    // this.list = [
    //   { value: 100 },
    //   { value: 200 }
    // ]
    // this.list = Object.freeze([
    //   { value: 100 },
    //   { value: 200 }
    // ])
  },
  methods: {
    changeList () {
      this.list[1].value = 10000
    },
    changeList1 () {
      this.list = Object.freeze([
        { value: 100 },
        { value: 200 }
      ])
    }
  }
}
// freeze翻译成汉语有冻结的意思使用 ,Object.freeze()，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化。
// 如果你有一个巨大的数组或Object，并且确信数据不会修改，使用Object.freeze()可以让性能大幅提升。在我的实际开发中，这种提升大约有5~10倍，倍数随着数据量递增,
// 对于纯展示的大数据，都可以使用Object.freeze提升性能。
// Object.freeze()冻结的是值，你仍然可以将变量的引用替换掉。举个例子：
/*
vue会通过 object.defineProperty对数据进行劫持，来实现视图响应数据的变化，但有的数据不会有任何改变，不需要 vue来劫持我们的数据，这样的数据很多的时候，禁止 vue数据劫持，可以明显减少组件初始化的时间，通过 object.freeze方法来冻结一个对象，对象一旦被冻结就再也不能被修改了。这里的冻结指的是值不能被修改，但引用是可以被修改的。

作者：没了提心吊胆的稗子
链接：https://www.jianshu.com/p/c3a994c5c913
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
</script>
