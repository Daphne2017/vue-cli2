// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 官网：https://cn.vuejs.org/v2/guide/plugins.html
// 插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：
// 添加全局方法或者属性。如: vue - custom - element
// 添加全局资源：指令 / 过滤器 / 过渡等。如 vue - touch
// 通过全局混入来添加一些组件选项。如 vue - router
// 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
// 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue - router
// 通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成。

// 官网：https://cn.vuejs.org/v2/api/#Vue-use
// Vue.use(plugin)
// 参数：
// { Object | Function } plugin
// 用法：
// 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
// 该方法需要在调用 new Vue() 之前被调用。
// 当 install 方法被同一个插件多次调用，插件将只会被安装一次

// 自己的理解
// 开发Vue.js 的插件应该暴露一个 install 方法。
// 1、不是为了vue写的插件(插件内要处理)不支持Vue.use()加载方式
// 2、非vue官方库不支持new Vue()方式
// 3、每一个vue组件都是Vue的实例，所以组件内this可以拿到Vue.prototype上添加的属性和方法。
// 关于Vue.use()详解 https://www.jianshu.com/p/89a05706917a

// Vue经典面试题: Vue.use和Vue.prototype.$xx有血缘关系吗?连接： https://www.jqhtml.com/46633.html
// use总结
// Vue的插件是一个对象, 就像Element.
//   插件对象必须有install字段.
//   install字段是一个函数.
//   初始化插件对象需要通过Vue.use().
// 扩展学习
// Vue.use()调用必须在new Vue之前.
//   同一个插件多次使用Vue.use()也只会被运行一次.
// Vue.prototype.$xx其实只不过是js中构造函数的显式原型的特性罢了:
//  构造函数的显式原型的属性 / 方法, 在函数实例化后, 可以在任意实例上读取



// 版本要求
// AjaxPlugin在vux@^ 2.1.0 - rc.20开始支持
// 引入
// main.js 入口文件中引入：
// import { AjaxPlugin } from 'vux'
// Vue.use(AjaxPlugin)
// 兼容性问题
// 需要注意的是axios是基于Promise的，因此如果你需要兼容低版本浏览器(caniuse) ，需要引入polyfill。
// Polyfill 推荐使用 es6 - promise
// require('es6-promise').polyfill()
// 全局使用
// Vue.http.post('/api').then()
// 组件中使用
// export default {
//   created() {
//     this.$http.post('/api').then(({ data }) => {
//       console.log(data)
//     })
//   }
// }
// babel-polyfill用正确的姿势安装之后，引用方式有三种：
// main.js中
// 1.require("babel-polyfill");
// 2.import "babel-polyfill";
// webpack.config.js中
// module.exports = {
//   entry: ["babel-polyfill", "./app/js"]
// };
// 注：第三种方法适用于使用webpack构建的同学，加入到webpack配置文件(webpack.config.js)entry项中
// 重新执行构建命令，在低版本的浏览器中就可以正常打开页面了。

// 为什么需要polyfill？
// 三：babel - polyfill
// Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，
// 以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
// 举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel - polyfill，为当前环境提供一个垫片。
// 安装命令----cnpm install--save babel - polyfill
// 因为这是一个 polyfill （它需要在你的源代码之前运行），我们需要让它成为一个 dependency,而不是一个 devDependency.
// 然后，在脚本头部，加入如下一行代码。
// import 'babel-polyfill';
// // 或者
// require('babel-polyfill');
// Babel默认不转码的API非常多，详细清单可以查看babel - plugin - transform - runtime模块的definitions.js文件。
// 原文链接：https://blog.csdn.net/chjj0904/article/details/79169821

// https://www.wandouip.com/t5i78133/ 解决白屏 解决白屏（vue） - webpace es6转es5
// https://blog.csdn.net/roamingcode/article/details/81975858
// 对babel-transform-runtime，babel-polyfill的一些理解于区别 https://www.jianshu.com/p/7bc7b0fadfc2
// babel 编译时只转换语法，几乎可以编译所有时新的 JavaScript 语法，但并不会转化BOM里面不兼容的API
// 比如 Promise, Set, Symbol, Array.from, async 等等的一些API
// 这时候就需要 polyfill 来转转化这些API
// babel polyfill 有三种：
//   * babel - runtime
//   * babel - plugin - transform - runtime
//   * babel - polyfill

// 为何 webpack + babel + transform - runtime, IE下提示Promise未定义？？？？
// 当使用了webpack的异步加载时，webpack要求原生支持Promise，刚好我们的代码有用到。至此，原因就找到了：
// webpack生成的new Promise相关代码, 超出babel的transform - runtime的控制范围，只有导出全局的Promise才能解决此问题
// 解决方案1
//    引入babel - polyfill导出全局Promise，这种方法并不好；不仅Promise被导出，还抛出大量其他的全局对象，可能存在冲突风险，同时文件体积比较大。
// 解决方案2
//  在js文件开头添加window.Promise = Promise这一句即可，示例代码：
//  import 'jquery'
//  import 'bootstrap/dist/css/bootstrap.css'
//  import 'bootstrap'
//  将Promise抛出为全局对象
//  window.Promise = Promise
// 原理：当babel检查到js的Promise时，transform - runtime会将Promise做转换，然后将其抛出为全局对象即可达到跟babel - polyfill一样的效果。
// 连接：https://www.cnblogs.com/pheye/p/7659910.html
import Vue from 'vue'
import App from './App'
import router from './router'
import Mock from './mock' // 刚刚手写的mock.js文件

import axios from 'axios' // axios http请求库 //需要注意的是axios是基于Promise的，因此如果你需要兼容低版本浏览器(caniuse)，需要引入polyfill。
import Qs from 'qs'
import {
  AlertPlugin,
  ToastPlugin,
  LoadingPlugin,
  Flexbox,
  FlexboxItem,
  XButton,
  XSwitch,
  XInput,
  Toast,
  Group,
  // AjaxPlugin, // 暂时不使用vue的Ajax插件，使用axios插件
  WechatPlugin,
  DatetimePlugin,
  PopupPicker,
  XAddress,
  TransferDom,
  Radio
} from 'vux' // 针对这种写法必须引入 vux-loader
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 官网地址：vux-loader https://doc.vux.li/zh-CN/vux-loader/install.html
// window.Promise = Promise  // 采用require('es6-promise').polyfill()
require('es6-promise').polyfill()
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
// Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(DatetimePlugin)
Vue.use(Toast)
Vue.use(VueQuillEditor) // 全局使用富文本编辑器 /// https://www.jianshu.com/p/1675bcd396a2
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-button', XButton)
Vue.component('x-switch', XSwitch)
Vue.component('x-input', XInput)
Vue.component('Radio', Radio)
Vue.component('group', Group)
Vue.component('popup-picker', PopupPicker)
Vue.component('x-address', XAddress)
Vue.directive('transfer-dom', TransferDom)

Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url
Vue.prototype.$http = axios // //把 `axios` 加到 `Vue` 的原型中，在组件上可以直接使用this.$http访问替代 axios，
Vue.prototype.$qs = Qs   // 添加qs到vue的显式原型上，通过this.$http.qs来使用

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
