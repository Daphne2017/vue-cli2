// // 什么是函数的arguments对象？
// // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/arguments
// console.log('typeof arguments', typeof arguments);// 'undefined'
// (function () {
//   console.log(typeof arguments) // 'object'
//   // arguments 对象只能在函数内使用
//   function test (a) {
//     console.log(a, Object.prototype.toString.call(arguments)) // '[object Arguments]'
//     console.log(arguments[0], arguments[1])
//     console.log(typeof arguments[0])
//   }
//   test(1)
// })();
// (function () {
//   // arguments 对象只能在函数内使用
//   /*
//   当非严格模式中的函数没有包含剩余参数、默认参数和解构赋值，
//   那么arguments对象中的值会跟踪参数的值（反之亦然）。看下面的代码
//   */
//   function func (a) {
//     a = 99 // 更新了a 同样更新了arguments[0]
//     console.log(arguments[0])
//   }
//   func(10) // 99
// })();
(function () {
  // arguments 对象只能在函数内使用
  /*
  当非严格模式中的函数有包含剩余参数、默认参数和解构赋值，
  那么arguments对象中的值不会跟踪参数的值（反之亦然）。相反, arguments反映了调用时提供的参数
  */
//  1、默认参数
  // function func (a = 100) {
  //   a = 99 // 含有默认参数，参数的值改变，不会更新arguments[0]
  //   console.log(a) // 99
  //   console.log(arguments[0]) // 依然是10
  // }
  // func(10)

  // //  2、解构赋值
  // function func1 ([a]) {
  //   arguments[0] = 99 // 99
  //   console.log(a) // 依然是10
  //   console.log(arguments[0]) // 99
  // }
  // func1([10])

  //  3、剩余参数
  function func2 (...a) {
    arguments[0] = [99] // 99
    console.log(a) // 依然是10
    console.log(arguments[0]) // 99
  }
  func2(10)
})()
