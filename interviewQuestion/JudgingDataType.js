// 1、手写一个判断js数据类型的方法？

var getType = (data) => {
  if (data === null) return 'null'

  if (!(typeof data === 'object')) {
    return typeof data
  } else {
    return Object.prototype.toString.call(data).replace('[object ', '').replace(']', '').toLowerCase()
  }
}
var arr = []
console.log('数据类型是：', getType(arr))
console.log('数据类型是：', getType(123))
console.log('数据类型是：', getType('123'))
console.log('数据类型是：', getType(null))
console.log('数据类型是：', getType(undefined))
console.log('数据类型是：', getType({}))
