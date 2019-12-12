/*
如何实现数组去重？
对象数组怎么去重？
*/
// 一、普通数组

(function () {
  // 一、数值数组
  var numArrs = [1, 1, 2, 3, 4, 5, 6, 7];
  (function (numArrs) {
    let uniqueArr = []
    for (const num of numArrs) {
      if (!uniqueArr.includes(num)) {
        uniqueArr.push(num)
      }
    }
    console.log('uniqueArr0', uniqueArr)
  })(numArrs)
  // 二、对象数组
  var objArrs = [{ id: 'yys', name: '严燕姗' }, { id: 'zhangsan', name: '张三' }, { id: 'zhangsan', name: '张三1' }];

  (function (objArrs) {
    // 1.使用一个空对象
    let obj = {}
    let uniqueArr = []
    for (const item of objArrs) {
      if (!obj[item.id]) {
        uniqueArr.push(item)
        obj[item.id] = 1
      }
    }
    console.log('uniqueArr1', uniqueArr)
  })(objArrs);

  (function (objArrs) {
    // 2.使用数组的reduce方法；
    var reducer = function (all, current) {
      let filerArr = all.map((item) => item.id)
      if (!filerArr.includes(current.id)) {
        return all.concat(current)
      }
      return all
    }
    let uniqueArr = objArrs.reduce(reducer, [])
    console.log('uniqueArr2', uniqueArr)
  })(objArrs)
})()
