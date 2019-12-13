
/* (function () {
  var arr = [1, 3, 4, 6, [7, 8, 9]]
  var copyArr = JSON.parse(JSON.stringify(arr))
  copyArr.push = function (arg) {
    console.log('dddd', arg)
  }
  copyArr.push(123) //
  arr.push(10) // push函数不会受影响，push函数不是引用类型？
  console.log('arr', arr)
  // 然后再去理解Object.create();
  var obj = {
    id: 'yys',
    name: '严燕姗',
    parents: {
      id: 'luo',
      name: '罗秀宁'
    }
  }
  let copyObj = Object.create(obj)
  copyObj.age = 26
  copyObj.parents.age = 55
  console.log('原始对象', obj)
  console.log('新对象', copyObj) // copyObj只有一个age属性，其他属性原型链上读取，原型对象的引用属性parents的属性被修改（即添加）
})();
(function () {
  var obj = {
    id: 'yys',
    name: '严燕姗',
    parents: {
      id: 'luo',
      name: '罗秀宁'
    }
  }
  let copyObj = Object.create(obj)
  copyObj.age = 26
  copyObj.parents.age = 55
  console.log('原始对象', obj)
  console.log('新对象', copyObj)
})()


(function() {
  // Object.create(obj)的实质是什么？
  Object.create = function (o) {
    function F () {
    }
    F.prototype = o
    return new F()
  }
  // new关键字做了些什么？

  new Array = function (Array){
    let newObj = new Object();
    newObj.__proto__ = Array.prototype;
    Array.call(newObj)

  }
})()
 */

 (function(){
   (function(){
    function F(){
      this.age =15;
      this.name = "yys";
      this.parent = {age:55,name:"luo"};
    }
 
    let obj = new F();
    console.log(obj);
   })();

   (function(){
    function F(){
      this.age =15;
      this.name = "yys";
      this.parent = {age:55,name:"luo"};
    }
 
    let obj = new Object();
    // obj[[prototype]] = F.prototype;
    F.call(obj)
    console.log(obj);
   })();

  
   function Father(){
    this.name = "yys";
    this.age = 50;
  }
  Father.prototype.sayName = function() {
      console.log(this.name)
  }
  function Child(){
    this.myname = 'www';
  }
  var b = new Father(); 
  Child.prototype = b;
  var a = new Child()
  // a.age;
  console.log('a',a)
  console.log("a.age",a.age)
  console.log('b',b)
 })()