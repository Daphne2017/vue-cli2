// 什么是函数的arguments对象？
// arguments对象的描述，https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/argument

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
// })()
