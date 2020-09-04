(function () {
  // 数组的深浅拷贝

  /*
 什么是浅拷贝和深拷贝？
  答： 浅拷贝只拷贝数组和对象的一层，也就是拷贝的数组元素或者对象的属性如果属于引用类型，它们会共享一块内存的。
  深拷贝拷贝深层，新旧数组的引用类型元素或者新旧对象的引用类型属性它们是有各自的内存的，不共享。
*/

// 数组浅拷贝：arr.slice();arr.concat();arr.map((item)=>item);arr.filter((item)=>true);[...arr];
// 数组深拷贝：JSON.parse(JSON.stringify(arr));

// 对象浅拷贝：{..obj};Object.assign({},obj);
// 对象深拷贝：JSON.parse(JSON.stringify(obj));

// 实现一个数组深拷贝的方法？
  // var objTest = {
  //   id: 'yys',
  //   name: '严燕姗',
  //   parents: {
  //     id: 'luo',
  //     name: '罗秀宁'
  //   }
  // }
  // var deepClone = (obj) => {
  //   if (!(typeof obj === 'object')) return

  //   let newObj = obj instanceof Array ? [] : new Object()

  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
  //     }
  //   }
  //   return newObj
  // }

  // let copyObj = deepClone(objTest)
  // copyObj.age = 26
  // copyObj.parents.age = 55
  // console.log('objTest', objTest)
  // console.log('copyObj', copyObj)
  // (function () {
  //   var arr = [1, 3, 4, 6, [7, 8, 9]]
  //   let copyArr = arr.concat()
  //   copyArr[0] = 100
  //   copyArr[4].push(10)
  //   console.log('原始数组', arr)
  //   console.log('新数组', copyArr)
  // })();
  // (function () {
  //   var arr = [1, 3, 4, 6, [7, 8, 9]]
  //   let copyArr = arr.map((item) => item)
  //   copyArr[0] = 100
  //   copyArr[4].push(10)
  //   console.log('原始数组', arr)
  //   console.log('新数组', copyArr)
  // })();
  // (function () {
  //   var arr = [1, 3, 4, 6, [7, 8, 9]]
  //   let copyArr = arr.filter((item) => true)
  //   copyArr[0] = 100
  //   copyArr[4].push(10)
  //   console.log('原始数组', arr)
  //   console.log('新数组', copyArr)
  // })();
  // (function () {
  //   var arr = [1, 3, 4, 6, [7, 8, 9]]
  //   let copyArr = arr.slice()
  //   copyArr[0] = 100
  //   copyArr[4].push(10)
  //   console.log('原始数组', arr)
  //   console.log('新数组', copyArr)
  // })();
  // (function () {
  //   var arr = [1, 3, 4, 6, [7, 8, 9]]
  //   let copyArr = [...arr]
  //   copyArr[0] = 100
  //   copyArr[4].push(10)
  //   console.log('原始数组', arr)
  //   console.log('新数组', copyArr)
  // })();

  // // 深拷贝数组
  // (function () {
  //   var arr = [1, 3, 4, 6, [7, 8, 9]]
  //   let copyArr = JSON.parse(JSON.stringify(arr))
  //   copyArr[0] = 100
  //   copyArr[4].push(10)
  //   console.log('原始数组', arr)
  //   console.log('新数组', copyArr)
  // })();
  // 浅拷贝对象

  // (function () {
  //   var obj = {
  //     id: 'yys',
  //     name: '严燕姗',
  //     parents: {
  //       id: 'luo',
  //       name: '罗秀宁'
  //     }
  //   }
  //   let copyObj = Object.assign({}, obj)
  //   copyObj.age = 26
  //   copyObj.parents.age = 55
  //   console.log('原始对象1', obj)
  //   console.log('新对象1', copyObj)
  // })();
  (function () {
    var obj = {
      id: 'yys',
      name: '严燕姗',
      parents: {
        id: 'luo',
        name: '罗秀宁'
      }
    }
    let copyObj = {...obj}
    copyObj.age = 26
    copyObj.parents.age = 55
    console.log('原始对象2', obj)
    console.log('新对象2', copyObj)
  })();
  // // 对象的深拷贝
  // (function () {
  //   var obj = {
  //     id: 'yys',
  //     name: '严燕姗',
  //     parents: {
  //       id: 'luo',
  //       name: '罗秀宁'
  //     }
  //   }
  //   let copyObj = JSON.parse(JSON.stringify(obj))
  //   copyObj.age = 26
  //   copyObj.parents.age = 55
  //   console.log('原始对象3', obj)
  //   console.log('新对象4', copyObj)
  // })()

})()
