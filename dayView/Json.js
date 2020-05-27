// toJSON 方法
// 我们有一个叫 toJSON 的方法，它可以作为任意对象的属性。JSON.stringify 返回这个函数的结果并对其进行序列化，而不是将整个对象转换为字符串。参考下面的例子。
const user = {
  firstName: 'Prateek',
  lastName: 'Singh',
  age: 26,
  toJSON () {
    return {
      // fullName: `${this.firstName} + ${this.lastName}`
      yys: 'yys+yys'
    }
  }
}
console.log(JSON.stringify(user))

// 结果
// "{ "fullName" : "Prateek Singh"}"
