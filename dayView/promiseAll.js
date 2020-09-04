/* Promise的all的用法，平时都看见别人这么用，自己从来页没有用过
现在写一个例子
注意:在实际的项目中，可能会遇到需要从前两个接口中的返回，获取第三个接口的请求参数的这种情况。也就是需要等待两个/多个异步事件完成后，再进行回调。
你可以在async函数中执行多个await进行请求接口，然后再拿到前两个接口的返回，作为第三个接口的请求参数。
例如： */
// 这个是第一种方式：
async function testFun () {
  let myName = await new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'yanshan')
  })
  let surName = await new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'yan')
  })
  console.log('fullName', `${surName}${myName}`)
}
testFun()

// 那么是不是可以使用第二种方式Promise.All呢？

let promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'yanshan')
})
let promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'yan')
})

Promise.all([promise1, promise2]).then(res => {
  console.log('resres', res)
  console.log('fullName11', `${res}`)
})
/* 在实际项目中，可能会遇到 需要从前两个接口中的返回结果获取第三个接口的请求参数这种情况。 也就是需要等待两个/多个异步事件完成后，再进行回调。
对于异步回调，首先想到的就会是使用Promise封装，然后使用.then()来触发回调。那么对于两个或多个异步事件均完成后再触发回调可以使用Promise.all()方法。
**Promise.all(iterable)** 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。 */
var promise11 = Promise.resolve(3)
var promise22 = 42
var promise33 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 1001, 'foo')
})

Promise.all([promise11, promise22, promise33]).then(function (values) {
  console.log(values)
})
// expected output: Array [3, 42, "foo"]

/* 作者：飞鱼Toi
链接：https://www.jianshu.com/p/5ad8ea974c3d
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
 */
/**
   * 更新菜单信息(批量)
   */
async function updateMenu () {
  const { ctx } = this
  ctx.validate({
    data: { require: true, type: 'array' }
  })
  const data = await Promise.all( // Promise.all返回一个promise对象
    ctx.request.body.data.map(item => { // map函数返回一个promise对象组成的数组
      return this.service.adminManage.hxAdminMenu.updateMenu(item) // 返回一个promise对象
    })
  )
  this.success({ data })
}

/**
   * 删除菜单(批量),
   * promise.all可以让接口并发执行的。
   */
async function deleteMenu () {
  const { ctx } = this
  ctx.validate({
    data: { require: true, type: 'array' }
  })
  const data = await Promise.all(
    ctx.request.body.data.map(item => {
      return this.service.adminManage.hxAdminMenu.deleteMenu(item)
    })
  )
  this.success({ data })
}
