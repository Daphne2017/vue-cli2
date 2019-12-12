/* 
1.浏览器都有一个同源策略，其限制之一就是第一种方法中我们说的不能通过ajax的方法去请求不同源中的文档。 
2.它的第二个限制是浏览器中不同域的框架之间是不能进行js的交互操作的。
注意：Cookie的同源策略和javascript略有不同，就是Cookie忽略了协议这一项，所以https://blog.csdn.net/yanical和http://blog.csdn.net/yanical的Cookie是共享的。
 有一点需要说明，不同域的框架之间（父子或同辈），是能够获取到彼此的window对象的，但不能使用获取到的window对象的属性和方法
(html5中的postMessage方法是一个例外，还有些浏览器比如ie6也可以使用top、parent等少数几个属性) ，总之，你可以当做是只能获取到一个几乎无用的window对象。
*/
/*
一、 1.HTML5 XMLHttpRequest 有一个API，postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。
比如A页面中嵌入一个不同域的iframe，如何给不同域的iframe页面传数据？
解析：在A页面中通过 ifwin = document.createElement("iframe").contentWindow获取到iframe的window对象，
语法: ifwin.postMessage(message, targetOrigin)，向iframe对象传数据，参数message为要发送的消息，
ifwin.postMessage(JSON.stringify(obj), 'http://www.jesse.com'); //ifwin为要接收消息的那一个window对象
分析：
调用postMessage方法的window对象是指要接收消息的那一个window对象，该方法的第一个参数message为要发送的消息，
参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符 *

而在iframe页面就可以监听window的message事件
window.addEventListener('message',function(e){
    if(e.source!=window.parent) return;
    var color=container.style.backgroundColor;
    window.parent.postMessage(color,'*');
},false);
MessageEvent对象判断了一下消息源，消息事件对象的属相有几个：
有几个重要属性
data：顾名思义，是传递来的message
source：发送消息的窗口对象
origin：发送消息窗口的源（协议+主机+端口号）
*/

/* 
二、WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据，
连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了，因此可以跨域。
 */
/* 
三.window.name + iframe：在同一个窗口的生命周期内，窗口载入的所有页面（包括不同域）都是共享一个window.name的(读取和设置这个值)。
并且可以支持非常长的 name 值，我们可以利用这个特点进行跨域。
（A页面想请求一个跨域的接口怎么办？即：在A页面用iframe通过src属性加载一个跨域的B页面并携带参数，
而B页面获取url中参数作为请求接口的参数，然后请求一个和B页面同域的接口，接口返回的数据放在iframe的window.name中。最后把iframe的src又改为和A页面的同域，
那么A页面就可以通过document.createElement("iframe").contentWindow.name就可以读取到iframe窗口中的name值，就可以拿到数据了）。
 */

// 四、location.hash + iframe：a.html欲与c.html跨域相互通信，通过中间页b.html来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。
/* 
五.

document.domain + iframe：然这种办法只能解决主域相同(一级域名)而二级域名不同的情况，比如 a.test.com 和 b.test.com 适用于该方式，
我们只需要给页面添加 document.domain = 'test.com' 设计为同一一级域名实现跨域，两个页面都通过js强制设置document.domain为基础主域，就实现了同域。、
document.domain的设置是有限制的，我们只能把document.domain设置成自身或更高一级的父域，且主域必须相同
对于主域相同而子域不同的例子，可以通过设置document.domain的办法来解决。
（主域名：由两个或两个以上的字母构成，中间由点号隔开，整个域名只有1个点号
比如：csdn.net
子域名：
是在主域名之下的域名，域名内容会有多个点号
比如：blog.csdn.net => csdn.net是主域，blog是子域


不同框架可以获取到彼此的window对象，但是不同源的话就不能使用获取到window对象的属性和方法，此时可以通过设置为同样的document.domain，就能访问相应的属性和方法
news.baidu.com下的news.html页面：
<script>
    document.domain = 'baidu.com';
    var ifr = document.createElement('iframe');
    ifr.src = 'map.baidu.com/map.html';
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
    ifr.onload = function(){
        var doc = ifr.contentDocument || ifr.contentWindow.document;
        // 这里可以操作map.baidu.com下的map.html页面
        var oUl = doc.getElementById('ul1');
        alert(oUl.innerHTML);
        ifr.onload = null;
    };
</script>

map.baidu.com下的map.html页面：

<ul id="ul1">我是map.baidu.com中的ul</ul>
<script>
    document.domain = 'baidu.com';
</script>
*/

/* 六、通过jsonp跨域 原理：利用script标签可以跨域链接资源的特性。利用<script>标签不受同源策略限制的特性进行跨域操作。
 动态创建script标签，script标签的src属性指向要请求的资源，并传递一个回调函数名作为参数，
请求返回的是一段调用指定回调函数的javascript代码（函数实参为请求跨域接口返回的data）

通过动态创建script标签进行跨域
<script type="text/javascript">
  // 得到航班信息查询结果后的回调函数
  var flightHandler = function(data){
      alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
  };
    // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值
    //都是一段执行指定函数的javascript代码片段）
  var url = "http://flightQuery.com/jsonp/flightResult.aspx?
      code=CA1998&callback=flightHandler";
    // 创建script标签，设置其属性
  var script = document.createElement('script');
  script.setAttribute('src', url);
  // 把script标签加入head，此时调用开始
  //  document.getElementsByTagName('head')[0].appendChild(script);
</script>
所以JSONP将访问跨域请求变成了执行远程JS代码，服务端不再返回JSON格式的数据，而是返回了一段将JSON数据作为传入参数的函数执行代码
例如服务器返回：
callback({

  "data": {
    "name": "xiaohong",
    "age": "18"
  }
})

ajax请求受同源策略影响，不能通过ajax的方法去请求不同源中的文档不允许进行跨域请求，Web页面上调用js文件时则不受是否跨域的影响
（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如 < script >、<img>、<iframe>）；
而script标签src属性中的链接却可以访问跨域的js脚本，
如下图所示：<script>标签src属性中的链接访问了不同域的js脚本。利用这个特性，服务端不再返回JSON格式的数据，而是返回一段调用某个函数的js代码，在src中进行了调用，这样实现了跨域。

jsonp的缺点：
只支持get请求（因为<script>标签只能get）
有安全性问题，容易遭受xss攻击
需要服务端配合jsonp进行一定程度的改造
 */

//  常见的跨域
/* 
一、跨域资源共享
CORS背后的原理是：使用自定的HTTP头部与服务器进行沟通，从而由服务器决定响应是否成功。
如何使用CORS？
使用CORS需要客户端和服务端两者配合。
服务器只需要在响应头部中设置Access-Control-Allow-Origin即可让客户端访问
 */

// https://juejin.im/post/5c23993de51d457b8c1f4ee1#heading-19  九种跨域方案