// 原型链的那些事？
// Object.getPrototypeOf函数获得一个对象的[[prototype]]
// isPrototypeOf?干嘛用的？

function F() {

}
// 类似于

function Array(){

}

Array.__proto__ 

console.log(F.prototype.__proto__ === Object.prototype) // F作为构造器
console.log(Object.getPrototypeOf(F) === F.__proto__)  // 
console.log(F.__proto__ === Function.prototype) // F作为构造器对象
console.log(Object.getPrototypeOf(F) === Function.prototype)
Array 作为构造器对象


