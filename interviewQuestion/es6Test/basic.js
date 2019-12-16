/* (function () {
  {
  let a = "aaa"; // let是块级作用域
  var b = "bbb"
  }
  console.log('aa',a) // 访问不到
  console.log('aa',b)
  const ccc; // const也是块级作用域，声明的是常量，不能只声明，不赋值则报错
  // const声明一个只读的常量。一旦声明，常量的值就不能改变。
  // const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不能改变
  //
  console.log('ccc')
  ES6 声明变量的六种方法
    ES5 只有两种声明变量的方法：var命令和function命令。
    ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。

})() */
// (function(){
// 解构赋值
/*
  1。什么是解构？
  解构赋值语法是JavaScript的一种表达方式，可以方便的从数组或者对象中快速的提取赋值给定义的变量。
  一、快速获取数组中的值
  1。从数组中获取值并赋值到变量中，变量中的顺序和数组中对象的顺序对应。 */
/*
  var foo = ["one", "two", "three", "four"];
  var [one, two, three, four] = foo;//对数组foo进行结构

  // 2。如果想忽略某些值，可以这样写
  var [first, , , four] = foo;

  // 3。也可以先定义变量，然后赋值
  var a, b;
  [a, b] = [1, 2];

  // 4.如果没有从数组中获取到值，可以为变量赋一个默认值。
  var a, b;
  [a = 5, b = 7] = [1];

  // 5.通过结构，可以方便交换两个变量的值。
  var a = 1; var b = 2;
  [a, b] = [b, a];

  // 6.与扩展运算符一起使用
  var arr = [1, 2, 3];
  var [x, y] = arr;
  console.log(x);
  console.log(y);
  var [first, ...rest] = arr;
  console.log(rest);//[2,3]
  console.log(...rest)//2,3
  console.log([...rest])//[2,3] */

/*   二、获取对象的值

  1.解构对象中的属性值到对应的变量中。 */
/*  const student = {
    name：“ming”，
    age：“18”，
    city：“shanghai”
  };
  const { name, age, city } = student;

  const { name, city } = student;

  2。设置默认值，解构赋默认值。
  const { name = "hong", age = "15" } = {};
  console.log(name);
  console.log(age);

  3.如果变量名和属性不一致。
  let { foo: baz } = { foo: "aaa", bar: "bbb" };
  console.log(baz)//aaa;
  //实际上
  let { foo, bar } = { foo: "aaa", bar: "bbb" };
  是
  let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" }; 的简写

  4。对象解构和扩展运算符一起使用
  const student = {
    name：“ming”，
    age：“18”，
    city：“shanghai”
  };
  const { name, age, city } = student;
  const { name, ...others } = student;
  console.log(others);//{age:"18",city:"shanghai"};
  console.log(...others)//报错，
  //因为普通对象在原生上没有部署iterator遍历器，扩展运算符...会调用默认的iterator接口。
  而
  console.log({ ...others })//{age:"18",city:"shanghai"};
  //在构造对象时，会将对象表达式按照key-value的方式展开，属于浅复制一个对象。

  2。什么是拓展运算符？
  一、数组的扩展运算符
  1。数组的扩展运算符用于将一个数组转为用逗号分隔的参数序列。
  console.log(...[1, 2, 3]); 1, 2, 3
  //数组在原生上部署可遍历器接口

  2。浅复制数组
  const a1 = [1, 2];
  const a2 = [...a1]; //a2是一个新的数组，实际上是浅复制数组a1;
  const [...a2] = a1;//a2是也是一个数组，是a1的浅复制。

  3。合并数组，合并arr1，arr2，arr3
  [...arr1,...arr2,...arr3];

  4.与解构赋值一起使用，生成子数组

  const [first, ...rest] = [1, 2, 3, 4, 5];
  //rest是一个子数组，即[2,3,4,5];

  二、对象的扩展运算符
  1。对象的扩展运算符(...)用于取出参数对象的所有可遍历属性，
  let obj = { a: 3, b: 4 };
  let newObj = { ...obj }; //浅拷贝一个对象

  2。过滤对象某些不需要的属性。
  var student = {
    name："Ming",
    age: "18",
    city: "shanghai"
  }

  var { name, ...other } = student;
  //other是一个对象，相当于student目标对象将自身可遍历的，但尚未读取的属性，
  //分配到指定的对象上面，所有的键和它们的值，都会拷贝到新对象上面。
  console.log(...studnet);//出错，没有部署遍历器接口
 */

// var foo = ["one", "two", "three", "four"];
// // var foo = [];
// // var [,...rest] = foo;
// // console.log('rest',rest)
// var [first='0',,,,...rest]= foo //设置默认值
// console.log('first', first)
// console.log('rest', rest)
// const { name = "hong", age = "15" } = {};
// console.log(name);
// console.log(age);
/*
  let obj = { hello: 'hello', world: 'world' };
  let { hello, world} = obj
  console.log('hello:',hello,'word:',world)
  let { hello: h, world: w} = obj;
  console.log('hello:', h, 'word:', w) */
/*   这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。
  let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
  也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。 */

// 嵌套解构
/* let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log('foo:',foo,'bar:',baz,)
var obj = {
  name:"yys",
  arr:[
    1,2,3
  ],
  objinner:{
    innerName:'innername',
    arr1:[1,2,3,4,5]
  }
}
// 对象的嵌套解构
let { objinner: { innerName,arr1}} = obj
console.log('innerName:', innerName, 'arr1:', arr1)
let { name, arr,objinner,objinner: { innerName,arr1}} = obj
console.log('name:', name, "arr:", arr, 'objinner:', objinner, 'innerName:', innerName, 'arr1:', arr1) */
// 用途：
// function myTest({name='yys',age=26} = {}) { // 调用函数的时候，没传的话，默认是传{}
//   console.log('name:',name,'age:',age)
// }
// myTest({ name: "weizhichang", age: 25 }) //name: weizhichang age: 25
// myTest({}) //name: yys age: 26
// myTest() // name: yys age: 26

// function myTest1({ name, age } = { name: 'yys', age: 26 }) { // 调用函数的时候，没传的话，默认是传{name: 'yys', age: 26}
//   console.log('name',name,'age',age)
// }
// myTest1()// name yys age 26
// myTest1({}) // name undefined age undefined // 传了参数，但是没对解构的name，和age赋默认值，所以是undefined
// function fn() {
//   return "Hello World";
// }

// console.log(`foo ${fn()} bar`)

// const library1property = Symbol("lib1");
// function lib1tag(obj) {
//   obj[library1property] = 42;
// }
// const library2property = Symbol("lib2");
// function lib2tag(obj) {
//   obj[library2property] = 369;
// }
// // foo Hello World bar
// // })()

//
(function () {
  // 函数参数的解构赋值
  function myTest ({ name = 'yys', age = 26 } = {}) { // 调用函数的时候，没传的话，默认是传{}
    console.log('name:', name, 'age:', age)
  }
  myTest({ name: 'weizhichang', age: 25 }) // name: weizhichang age: 25
  myTest({}) // name: yys age: 26
  myTest() // name: yys age: 26

  function myTest1 ({ name, age } = { name: 'yys', age: 26 }) { // 调用函数的时候，没传的话，默认是传{name: 'yys', age: 26}
    console.log('name', name, 'age', age)
  }
  myTest1()// name yys age 26
  myTest1({}) // name undefined age undefined // 传了参数，但是没对解构的name，和age赋默认值，所以是undefined

  function add ([x, ...y]) {
    return x + y
  }
  add([1, 2, 3, 4, 5]) //

  function foo (a = 100, b = 200, ...args) {
    console.log('a', a) // 1
    console.log('b', b) // 2
    console.log('args', args) // [3,4,5,6]
    return args
  }
  foo(1, 2, 3, 4, 5, 6)

  function fn () {
    return 'Hello World'
  }
  console.log(`foo ${fn()} bar`)

  // ES6的写法
  function f (x, y, z) {
    // ...
  }
  let args = [0, 1, 2]
  f(...args)
})();

(function () {
  // 函数默认参数
  function A (a, b = 1) {
    console.log(a + b)
  }
  A(1) // 2
  A(2 + 3) // 5
})()

// function test (a, b) {
//   console.log(a) // undifined
//   console.log(b) // undifined
//   var b = 234
//   console.log(b) // 234
//   a = 123
//   console.log(a) // 123
//   function a () { }
//   var a
//   b = 234
//   var b = function () { }
//   console.log(a) // 123
//   console.log(b) // function b(){}
// }
// test(1)

// var a; console.log(a); function a () { console.log('ddddddd') }
// var a; console.log('iii', a); a = 5; function a () { console.log('ddddddd') } a()
