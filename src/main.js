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
import Vue from 'vue'
import App from './App'
import router from './router'
import Mock from './mock' // 刚刚手写的mock.js文件
import axios from 'axios' // axios http请求库

import {
// AlertPlugin,
// ToastPlugin,
// LoadingPlugin,
// Flexbox,
// FlexboxItem,
// XButton,
// XSwitch,
// XInput,
// Toast,
// Group,
// AjaxPlugin
// WechatPlugin,
// DatetimePlugin,
// PopupPicker,
// XAddress,
// TransferDom,
// Radio
} from 'vux' // 针对这种写法必须引入 vux-loader
// 官网地址：vux-loader https://doc.vux.li/zh-CN/vux-loader/install.html
// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)
// Vue.use(LoadingPlugin)
// Vue.use(AjaxPlugin)
// Vue.use(WechatPlugin)
// Vue.use(DatetimePlugin)
// Vue.use(Toast)
// Vue.component('flexbox', Flexbox)
// Vue.component('flexbox-item', FlexboxItem)
// Vue.component('x-button', XButton)
// Vue.component('x-switch', XSwitch)
// Vue.component('x-input', XInput)
// Vue.component('Radio', Radio)
// Vue.component('group', Group)
// Vue.component('popup-picker', PopupPicker)
// Vue.component('x-address', XAddress)
// Vue.directive('transfer-dom', TransferDom)
Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url
Vue.prototype.$http = axios // //把 `axios` 加到 `Vue` 的原型中，在组件上可以直接使用this.$http访问替代 axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
