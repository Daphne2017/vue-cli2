/*
一、图片为什么要转成base64？
1. 提升性能: 网页上的每一个图片，都是需要消耗一个 http 请求下载而来的, 图片的下载始终都要向服务器发出请求，要是图片的下载不用向服务器发出请求，base64可以随着 HTML 的下载同时下载到本地.减少https请求。

2. 加密: 让用户一眼看不出图片内容 , 只能看到编码。

3. 方便引用: 在多个文件同时使用某些图片时, 可以把图片转为base64格式的文件, 把样式放在全局中, 比如common.css, 以后在用的时候就可以直接加类名, 二不需要多层找文件路径, 会提升效率

一、图片转换成base64格式的优缺点

1. 优点

（1）base64格式的图片是文本格式，占用内存小，转换后的大小比例大概为1/3，降低了资源服务器的消耗；

（2）网页中使用base64格式的图片时，不用再请求服务器调用图片资源，减少了服务器访问次数。

2. 缺点

（1）base64格式的文本内容较多，存储在数据库中增大了数据库服务器的压力；

（2）网页加载图片虽然不用访问服务器了，但因为base64格式的内容太多，所以加载网页的速度会降低，可能会影响用户的体验。

（3）base64无法缓存，要缓存只能缓存包含base64的文件，比如js或者css，这比直接缓存图片要差很多，而且一般HTML改动比较频繁，所以等同于得不到缓存效益。
*/
/*

二、前端图片如何转成base64？

*/
/* getImgBase64(url) {
    return new Promise(function (resolve, reject) {
        let Img = new Image();
        let dataURL = '';
        Img.src = url;
        Img.onload = function () { //确保图片完整获取
            var canvas = document.createElement("canvas"),//创建canvas元素
                width = Img.width, //canvas的尺寸和图片一样
                height = Img.height;
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //绘制canvas
            dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
            resolve(dataURL);
        };
    });
} */
// https://jingyan.baidu.com/article/a3a3f8113185178da2eb8ae9.html
// http://www.qiutianaimeili.com/html/page/2019/12/dp43jvs13fo.html blob,DataURL,ObjectURL区别
URL.createObjectURL(item.file) // 获取文件url
// 前端方法new FileReader()待研究和node方法的fs.promises.readFile(file.filepath)的区别
// node: 根据url转成base64？nodejs抓取网络图片转换为base64编码的图片?
// 前端：根据图片url转成base64?
