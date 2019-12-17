// 变量提升？
/*
 ES6 声明变量的六种方法
ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。

1）函数声明会置顶
2）变量声明也会置顶
3）函数声明比变量声明更置顶 //重点
4）变量和赋值语句一起书写，在js引擎解析时，会将其拆成声明和赋值2部分，声明置顶，赋值保留在原来的位置
5）声明过的变量不会重复声明
 */
// https://note.youdao.com/web/#/file/WEB1445932a0585c9f4f4867da5cc24f6b6/note/WEBdb96a08d5a70ff23677aab4616698ca6/
(function () {
  a = 100
  function demo (e) {
    function e () { }
    console.log(e)
    arguments[0] = 2
    console.log(e) // 2
    if (a) {
      var b = 123
      function c () { }
    }
    var c
    a = 10
    var a
    console.log(b) // undefined
    f = 123
    console.log(c) // undefined
    console.log(a) // 10
  }
  var a
  demo(1)
  console.log(a) // 100
  console.log(f) // 123
})();

(function (f) {
  function f () {}
  console.log('f', f)
  arguments[0] = 2
  console.log('f', f)
})(100);
(function () {
  var a = 1
  function b () {
    a = 10 // b函数作用域里边原本的函数a赋值为10

    function a () {
      console.log(a)
    }
  }
  b()
  console.log(a) // 1
})()
