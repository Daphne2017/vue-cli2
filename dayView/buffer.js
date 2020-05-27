
/* Buffer是一个像Array的对象，但它主要用于操作字节，也就是二进制数据，它的元素为16进制的两位数，即0到255的数值。（欲想较为深入了解，看《深入浅出nodejs》） */
// const b = Buffer.from('abcdefghijk', 'ascii') // 用ascii将字符串abcdefghijk编码成二进制
/* console.log('b', b); // <Buffer 61 62 63 64 65 66 67 68 69 6a 6b>
const B = b.toString('ascii')
console.log('B', B); // 解码成功
const bb = b.toString() // 默认是以utf8（默认）解码
console.log('bb', bb); // 解码成功 */
/* demo1中我们用ascii将字符串abcd编码成二进制，用toString方法解码成字符串
编码成功
用ascii和utf8（默认）都能解码成功，因为utf8是兼容ascii的
utf16le解码失败，因为utf16不兼容ascii */

/* const b = Buffer.from('ab中文', 'ascii')
console.log('b', b);
const B = b.toString('ascii')
console.log('B', B); // 解码失败
demo2中我们用ascii将两个汉字编码成二进制
虽然生成了Buffer实例，但是“中文”两个字编码是错误的，因为ascii不支持中文的编码
解码自然也就无法成功 */

/* const b = Buffer.from('ab中文')
console.log('b', b);
const B = b.toString()
console.log('B', B); // 解码成功
const bb = b.toString('utf16le') // 解码失败,乱码
console.log('bb', bb); */
/* demo3中我们用默认的utf8编码方式
编码成功，utf8支持中文编码
utf8（默认）解码成功
utf16le解码失败，因为utf8和utf16是完全不同的两种编码方式，也不兼容
这个例子换成utf16le编码，用utf8解码也一样会失败，道理是一样的 */



/* base64和latin1编解码
这两种方式在应用中都是将二进制转化为字符串的 */
/* const b = Buffer.from('ab中文')
console.log('b', b);
const B = b.toString('base64')
console.log('B', B); // 解码成功
const bb = b.toString('latin1') // 解码失败,乱码
console.log('bb', bb); */
/* 编码成功，目标就是把字符串变成二进制，用ascii、utf8或者utf16都可以
base64和latin1将二进制转化为字符串成功（必定会成功，前者在字节数不是3的倍数时会用0和等号填充，后者又是单字节编码）
作者：做前端的蜗牛 */

/* 在Buffer中也可以用base64和latin1将字符串转化为二进制， */
/* const b = Buffer.from('YWLkuK3mloc=', 'base64')
console.log('b', b);
const B = Buffer.from('abä¸­æ', 'latin1')
console.log('B', B); // 解码成功 */
/* demo5将demo4中字符串又转化为了二进制，如果字符串超出了它们的字符索引表的范围，
作者：做前端的蜗牛 */
// demo5将demo4中字符串又转化为了二进制，如果字符串超出了它们的字符索引表的范围，它们是无法转化成功的，如下：
/* const b = Buffer.from('ab中文', 'base64')
console.log('b', b);
const B = b.toString('base64');
console.log('B', B); // 解码成功 */


/* 总结
在Buffer中使用编码有如下规则：
将字符串转化为二进制时，字符串不能超出编码方式的范围，否则转化会失败，所以选择合适的编解码方式很重要；
编码和解码的方式最好是一致的（至少需要兼容），否则会失败
ascii、utf8和utf16主要是将字符串转化为二进制，base64、latin1和hex主要是将二进制转化为字符串（反转也是可以的）
下一篇文章我们开始聊一聊Buffer中提供的方法！
作者：做前端的蜗牛
https://www.bilibili.com/read/cv4770271/
出处： bilibili */

/* Node.js 不深也不浅得了解下编码
base64utf-8encodingnode.js编码
发布于 2015-05-22   约 9 分钟
背景：目前，在开发基于微信的Web App应用，也就是借助微信所有资源，如公众号，账号系统和扫描JS-JDK等。后端是用node做中间件，依赖API服务（坑爹的是，API服务是用base64保存图片...）。现需实现一功能：用户选择图片，然后调用微信JS-JDK API，再上传至微信服务器（不能直接从微信里发送选择的图片），最后重微信服务器下载下来保存至我们自己服务器里。（下载下来后，需要转成data URIs） */
https://segmentfault.com/a/1190000002787763 Node.js 不深也不浅得了解下编码

  /**
 * 根据图片url转成base64
 * @param {String} url 图片url
 * @param {String} ctx 拿到ctx
 */
/* async getBase64(url, ctx) {
    const result = await ctx.curl(url)
    if (result.status !== 200) {
      return ''
    }
    if (!result.headers['content-type'].includes('image')) {
      return ''
    }
    // 处理响应，编码成base64
    const type = result.headers['content-type']
    const prefix = `data:${type};base64,`
    return `${prefix}${result.data.toString('base64')}`
  },
} */