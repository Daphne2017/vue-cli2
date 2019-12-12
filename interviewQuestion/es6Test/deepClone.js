// https://www.cnblogs.com/panrui1994/p/9378696.html  深浅拷贝迭代递归法

var deepCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是一个对象
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    // 遍历obj,并且判断是obj的属性才拷贝,这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
    if (obj.hasOwnProperty(key)) {
      // 判断属性值的类型，如果是对象递归调用深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

// 一、数组的拷贝
// 1、浅拷贝

/* var arr = [{name:"yys",age:25},{name:"weyi",age:28}]
var arr1 = arr.slice()
arr1[1].name = 'xie'
console.log('arr1 === arr:', arr === arr1)// arr1 === arr: false
console.log('arr[1].name:', arr[1].name)// arr[1].name: xie
console.log('arr1[1].name:', arr1[1].name) // arr1[1].name: xie */

// 2、浅拷贝
/* 
var arr = [{ name: "yys", age: 25 }, { name: "weyi", age: 28 }]
var arr1 = arr.concat()
arr1[1].name = 'xie'
console.log('arr1 === arr:', arr === arr1)// arr1 === arr: false
console.log('arr[1].name:', arr[1].name)// arr[1].name: xie
console.log('arr1[1].name:', arr1[1].name) // arr1[1].name: xie
*/
// 3、浅拷贝

/* var arr = [{ name: "yys", age: 25 }, { name: "weyi", age: 28 }]
var arr1 = [...arr]
arr1[1].name = 'xie'
console.log('arr1 === arr:', arr === arr1)// arr1 === arr: false
console.log('arr[1].name:', arr[1].name)// arr[1].name: xie
console.log('arr1[1].name:', arr1[1].name) // arr1[1].name: xie */

// 4、深拷贝
/* var arr = [{ name: "yys", age: 25 }, { name: "weyi", age: 28 }]
var arr1 = JSON.parse(JSON.stringify(arr))
arr1[1].name = 'xie'
console.log('arr1 === arr:', arr === arr1)// arr1 === arr: false
console.log('arr[1].name:', arr[1].name)// arr[1].name: weyi 没有改变arr
console.log('arr1[1].name:', arr1[1].name) // arr1[1].name: xie */

// 二、对象的拷贝
// 1、浅拷贝
/* var obj = {
  name:"yys",
  age:25,
  mom:{
    name:"luo",
    age:50
  }
}
var obj1 = Object.assign({},obj)
obj1.age = 26
obj1.mom.age = 55;
console.log("obj === obj1:", obj === obj1) 
console.log("obj.age:", obj.age)
console.log("obj1.age:", obj1.age)
console.log("obj.mom:", obj.mom)
console.log("obj1.mom:", obj1.mom) */

// obj === obj1: false
// obj.age: 25
// obj1.age: 26
// obj.mom: { name: 'luo', age: 55 }
// obj1.mom: { name: 'luo', age: 55 }
// 2、浅拷贝
/* 
var obj = {
  name: "yys",
  age: 25,
  mom: {
    name: "luo",
    age: 50
  }
}
var obj1 = { ...obj}
obj1.age = 26
obj1.mom.age = 55;
console.log("obj === obj1:", obj === obj1)
console.log("obj.age:", obj.age)
console.log("obj1.age:", obj1.age)
console.log("obj.mom:", obj.mom)
console.log("obj1.mom:", obj1.mom) 
// obj === obj1: false
// obj.age: 25
// obj1.age: 26
// obj.mom: { name: 'luo', age: 55 }
// obj1.mom: { name: 'luo', age: 55 } */

// 3、深拷贝
/* var obj = {
  name: "yys",
  age: 25,
  mom: {
    name: "luo",
    age: 50
  }
}
var obj1 = JSON.parse(JSON.stringify(obj))
obj1.age = 26
obj1.mom.age = 55;
console.log("obj === obj1:", obj === obj1)
console.log("obj.age:", obj.age)
console.log("obj1.age:", obj1.age)
console.log("obj.mom:", obj.mom)
console.log("obj1.mom:", obj1.mom) 
// obj === obj1: false
// obj.age: 25
// obj1.age: 26
// obj.mom: { name: 'luo', age: 50 }
// obj1.mom: { name: 'luo', age: 55 } */
