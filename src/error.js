try {
  setTimeout(() => {
    test() // 变成了未捕获的错误
  }, 0)
} catch (e) {
  console.log('error', e)
}
setTimeout(() => {
  console.log(1111111111)
}, 100)
