// 1.函数使用function关键字来定义，可以使用函数定义表达式或者函数声明语句。
// 两种形式中，函数定义都是从function关键字开始。其后跟随：函数名称标识符（函数名称是函数声明语句必需的部分；
// 对于函数定义表达式来说，
// 这个名字是可选的：如果存在，该名字只存在于函数体中，并指代该函数对象本身，它是只读，不可修改。

(function () {
  var a = 100;
  (function a () {
    a = 99
    console.log('a', a) // [Function a]
  })()
})();
/*
(function () {
  var b = 200
  var func = function b () {
    b = 88
    console.log('b', b) // [Function b]
  }()  // 函数表达式后面可以直接加括号执行函数
})()
 */
// 二、函数的调用有几种方式？
// 作为函数调用、作为方法调用、作为构造函数调用和通过函数的apply()和call()方法调用。
/*
1.作为函数调用，ES3和非严格模式下ES5规定，this的值是全局对象；严格模式下，this则是undefined
2.作为方法调用，方法是保存在对象属性里的函数。谁作为拥有者调用它就指向谁，切记this指向的是最终执行该函数的对象
3.作为构造函数，this指向对象本身。
4.call谁就是谁，apply谁就是谁，其实bind就是通过call和apply实现的。
 */
(function () {
  var o = {
    m: function () {
      console.log(this === o) // true
      var self = this
      f() // 作为函数调用，没有拥有者，直接调用，就指向window
      function f () {
        console.log(this === o) // false
        console.log(self === o) // true
      }
    }
  }
  o.m()
})()
