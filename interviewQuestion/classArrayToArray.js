(function () {
  var classArr = {
    0: '100',
    1: '200',
    2: '300',
    3: '400',
    length: 4
  };

  /*
  哪些数据结构属于类数组？
  例如：
  （比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。
  转换为类数组后，便可以使用类数组的方法了
*/
  /*
  注意：鲜为人知的事实：Array.prototype 本身也是一个 Array。
  Array.isArray(Array.prototype); // true
  */
  (function (classArr) {
    let arr = Array.from(classArr)
    console.log('arr', arr)
  })(classArr);

  (function (classArr) {
    //  【注意】扩展运算符背后调用的是遍历器接口（ Symbol.iterator ），如果一个对象没有部署这个接口，就无法转换。
    // 类数组的对象调用数组的Symbol.iterator,即可以使用...扩展运算符来转为数组
    classArr[Symbol.iterator] = Array.prototype[Symbol.iterator] //
    let arr = [...classArr]
    console.log('arr', arr)
  })(classArr);

  (function (classArr) {
    // slice方法可以用来将一个类数组（Array - like）对象 / 集合转换成一个新数组。你只需将该方法绑定到这个对象上。
    // 一个函数中的arguments就是一个类数组对象的例子。除了使用,你也可以简单的使用来代替。
    // Array.prototype.slice.call(arguments)或者[].slice.call(arguments)
    let arr = Array.prototype.slice.call(classArr)
    console.log('arr', arr)
  })(classArr)
})()
