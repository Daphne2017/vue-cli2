var arr = [1, 2, 3, 4, 5]
// typeof 无法判断引用类型，除了null
console.log('是否是数组:', arr instanceof Array)
console.log('是否是数组:', arr.constructor === Array.prototype.constructor)
console.log('是否是数组:', Array.prototype.isPrototypeOf(arr))
console.log('是否是数组:', Object.getPrototypeOf(arr) === Array.prototype)
console.log('是否是数组:', Array.isArray(arr))
console.log('是否是数组:', Object.prototype.toString.call(arr) === '[object Array]')
