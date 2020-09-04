## watch语法

### vm.$watch( expOrFn, callback, [options\] )

- **参数**：

  - `{string | Function} expOrFn`

  - `{Function | Object} callback`

  - `{Object} [options]`
- `{boolean} deep`
  
  - `{boolean} immediate`
  
- **返回值**：`{Function} unwatch`

- **用法**：

  观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。



例如我们在某种获取搜索列表的场景就相当适合使用

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
</head>

<body>
    <div id="app">
        <input type="text" v-model="searchWord">
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                searchWord: ''
            },
            created() {
                // 获取搜索列表
                this.getSearchList()
            },
            watch: {
                // 监听数据变化获取搜索列表
                searchWord(oldVal, newVal) {
                    this.getSearchList(oldVal, newVal)
                }
            },
            methods: {
                getSearchList(oldVal, newVal) {
                    console.log('获得值: ', oldVal, newVal)
                    console.log('getSearchList')
                }
            }
        })
    </script>
</body>

</html>
```

我们可以优化成

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
</head>

<body>
    <div id="app">
        <input type="text" v-model="searchWord">
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                searchWord: ''
            },
            watch: {
                // 监听数据变化获取搜索列表
                searchWord: {
                    handler: 'getSearchList',
                    immediate: true,
                    deep: true
                }
            },
            methods: {
                getSearchList(oldVal, newVal) {
                    console.log('获得值: ', oldVal, newVal)
                    console.log('getSearchList')
                }
            }
        })
    </script>
</body>

</html>
```

1. `handler` 声明调用方法名
2. `immediate` 表示组件创建的时候立即执行一次(效果等同create生命周期内调用)
3. `deep` 为了发现对象内部值的变化,数组不需要添加




## 组件生命周期钩子函数执行顺序

加载过程

> 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted



更新过程

> 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated



销毁过程

> 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed






## 响应式数据(2.6.0新增)

我们习惯于用Vuex去解决状态的共享问题,但是在小项目中使用就会有增大代码体积和将代码复杂化的烦恼,所以在后来的版本中Vue新增

```
Vue.observable( object )
```

让一个对象可响应,Vue 内部会用它来处理 data 函数返回的对象。

返回的对象可以直接用于`渲染函数`和 `计算属性` 内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：



#### 官方示例

```
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```







## 长静态列表性能优化

我们都知道Vue2.x版本是利用`Object.definedProperty`对数据进行劫持达到视图响应变化的效果,但是大多数时候我们不需要变动的数据类似列表页基本不存在这个需求,我们就可以利用`object.freeze`将其 "冻结"禁止修改.

即可以减少劫持数据的性能损耗,但不影响其重新赋值,例如

```
var app = new Vue({
    el: '#app',
    data: {
        list: []
    },
    async created() {
        const list = await this.getData()
        this.list = Object.freeze(list)
    },
    methods: {
        handleChange() {
            this.list[0].id = 1 // 无效
            this.list = [] // 可以修改
        }
    }
})
```





## 函数式组件

如果有学过React的话应该就能发现一些相同的烦恼,在默写很简单的组件如果都必须实例化一遍是相当烦恼的操作,所以在一些简单并且**不需要任何生命周期处理**的组件我们可以将状态作为传参这么写

```
// List组件
<template functional>
    <ul>
        <li v-for="item in props.list" @click="props.handleChange">{{item}}</li>
    </ul>
</template>

// 父组件调用方式
<div>
	<List :list="list" :handle-change="handleChange" />
</div>
```





## 监听组件生命周期

在某些需要监听组件生命周期的场景中可能大部分人都是通过传递方法然后在组件生命周期内调用,其实还有一种方法可以直接在父组件就进行调用方式---`hook`

```
<!DOCTYPE html>
<html lang="en">

<body>
    <div id="app">
        <child @mounted="doSomethings">child</child>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.component('child', {
            mounted() {
                this.$emit("mounted");
            },
            render(createElement) {
                return createElement('p', this.$slots.default)
            }
        })
        var app = new Vue({
            el: '#app',
            data: {
                status: 0
            },
            methods: {
                doSomethings() {
                    console.log('doSomethings')
                }
            }
        })
    </script>
</body>

</html>
```





## 动态组件

以下面的一组状态判断按钮为例,我们很容易就下意识地在模板内写下这种代码

```
<button v-if="status === 1" class="btn1" :class="status === 1" @click="">未开始</button>
<button v-if="status === 2" class="btn2" :class="status === 2" @click="">进行中</button>
<button v-if="status === 3" class="btn3" :class="status === 3" @click="">可领取</button>
<button v-if="status === 4" class="btn4" :class="status === 4" @click="">已领取</button>
```



但是如果我们利用渲染函数可以将上面的代码抽取成优雅的使用组件

```
<!DOCTYPE html>
<html lang="en">

<body>
    <div id="app">
        <child :status="status"></child>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.component('child', {
            props: {
                status: {
                    type: Number,
                    required: true
                }
            },
            render(createElement) {
                const innerHTML = ['未开始', '进行中', '可领取', '已领取'][this.status]
                return createElement('button', {
                    class: {
                        active: this.status
                    },
                    attrs: {
                        id: 'btn'
                    },
                    domProps: {
                        innerHTML
                    },
                    on: {
                        click: () => console.log(this.status)
                    }
                })
            }
        })
        var app = new Vue({
            el: '#app',
            data: {
                status: 0
            }
        })
    </script>
</body>

</html>
```

我们将所有的逻辑封装进渲染函数内,外部只需要传递一个状态参数即可改变

```
<child :status="status"></child>
```



## 路由缓存

假设我们有一个详情路由,我们从 **/detail/a** 跳转到 **/detail/b** ,但是因为`vue-router` 认为这是同一个组件,所以不会重新执行 `created`内的代码,我们一般的解决办法是监听 **$router** 的变化执行代码

```
created() {
    this.init()
},
watch: {
    '$route'() {
        this.init()
    }
},
methods: {
    init() {}
}
```

但是我们其实可以在路由组件设置唯一的 `key` 解决缓存问题

```
<router-view :key="$route.fullpath"></router-view>
```

注意这个方法会增加额外消耗



## 刷新当前路由

原始方法有几种: 

####location.reload()

重新加载页面,弊端也很明显,重新运行所有流程,所有数据不作特殊处理会丢失,有可能被重定向到其他路由



#### this.$router.go(0)

有些浏览器会原路由刷新,有些浏览器会返回首页,具体原因没去探究



#### 跳转回当前路由API

页面不会进行刷新,但是可以结合上面的路由缓存做处理



#### provide / inject

 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。 

```
<router-view v-if="isRouterAlive" />

// 父级组件提供 'foo'
var Provider = {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['reload'],
  created () {
    this.reload()
  }
  // ...
}
```







## 高阶组件

我们在父子组件进行 **props** 传递时,通常需要声明一大堆属性

```
//父组件
<BaseInput 
  :value="value"
  label="密码"
  placeholder="请填写密码"
  @input="handleInput"
  @focus="handleFocus>
</BaseInput>

//子组件
<template>
 <label>
  {{ label }}
  <input
   :value="value"
   :placeholder="placeholder"
   @focus=$emit('focus', $event)"
   @input="$emit('input', $event.target.value)"
  >
 </label>
</template>
```



#### inheritAttrs

默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 `inheritAttrs` 到 `false`，这些默认行为将会被去掉。而通过 (同样是 2.4 新增的) 实例属性 `$attrs` 可以让这些特性生效，且可以通过 `v-bind` 显性的绑定到非根元素上。

注意：这个选项**不影响** `class` 和 `style` 绑定。



#### $attrs

我们可以利用以下方式 `$attrs` 将原生属性直接传递给子组件

```
<input
   v-bind="$attrs"
   :value="value"
   @focus=$emit('focus', $event)"
   @input="$emit('input', $event.target.value)"
>
```

这是Vue在`2.4.0`新增的属性,包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。





#### $listeners

```
<input
  :value="value"
  v-bind="$attrs"
  v-on="listeners"
>
----------------------------------------------------------------------
computed: {
 listeners() {
  return {
   ...this.$listeners,
   input: event => 
    this.$emit('input', event.target.value)
  }
 }
}
```

包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"`传入内部组件——在创建更高层次的组件时非常有用。




## 利用webpack自动注册组件

当项目规模和组件化达到一定程度的时候,我们最常开始的准备工作就是引入组件模块 -> 声明组件

如果我们利用webpack 解析 `require()` 调用，然后提取出如下一些信息：

```
Directory: ./template
Regular expression: /^.*\.ejs$/
```

生成一个 context module(上下文模块)。它包含**目录下的所有模块**的引用，是通过一个 request 解析出来的正则表达式，去匹配目录下所有符合的模块，然后都 require 进来。此 context module 包含一个 map 对象，会把 request 中所有模块翻译成对应的模块 id。

例如

```
{
  "./table.ejs": 42,
  "./table-row.ejs": 43,
  "./directory/folder.ejs": 44
}
```

此 context module 还包含一些访问这个 map 对象的 runtime 逻辑。

这意味着 webpack 能够支持动态地 require，但会导致所有可能用到的模块都包含在 bundle 中。

我们可以通过 `require.context()` 函数来创建自己的 context。

```
require.context(directory, useSubdirectories = false, regExp = /^\.\//);
```

可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。

webpack 会在构建中解析代码中的 `require.context()` 。

```
/* 
  搜索当前目录及其所有子目录下vue后缀结尾文件,并返回webpack上下文函数如下
  webpackContext(req) {
    var id = webpackContextResolve(req);
    return __webpack_require__(id);
  } 
*/
const requireComponent = require.context('./', true, /\.vue$/)

// 获取requireComponent的索引值得到模块路径数组,例如 ['./A.vue', './B.vue', ...]
const components = requireComponent.keys()
// 遍历注册模块组件
components.forEach(filePath => {
  // 组件路径
  const config = requireComponent(filePath)
  // 提取文件名, filePath: ./A.vue -> fileName: B
  const fileName = validateFileName(filePath)
  const name =
    fileName.toLowerCase() === 'index'
      ? capitalizeFirstLetter(config.default.name) // 组件自定义name为注册名,例如 name: helloWorld -> HelloWorld
      : fileName // 否则用文件名

  // 调用Vue的API注册组件,第二个参数就是组件的配置,类似 {data: ƒ, computed: {…}, activated: ƒ, deactivated: ƒ, methods: {…}, …}
  Vue.component(name, config.default || config)
})

// 拼凑大写开头单词
function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 提取文件名
function validateFileName (str) {
  return (
    // 	匹配任何非空白字符的vue文件并提取匹配值
    /^\S+\.vue/.test(str) && str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => $1)
  )
}
```
# 1. vuex的概述

**1.1 组件之间共享数据的方式**<br />**父向子传值：v-bind 属性绑定**<br />**子向父传值：v-on 事件绑定**<br />**兄弟之间共享数据：EventBus**

- **$on 接受数据的那个组件**
- **$emit 发送数据的那个组件**

**1.2 vuex是什么**<br />**Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享**<br />**![image.png](https://cdn.nlark.com/yuque/0/2020/png/152804/1593488321682-61a96c85-a1f6-4ef5-9db2-5a7030d9d5d5.png#align=left&display=inline&height=322&margin=%5Bobject%20Object%5D&name=image.png&originHeight=322&originWidth=697&size=139813&status=done&style=none&width=697)**<br />**1.3 使用vuex统一管理状态的好处**<br />**①能够在vuex中集中处理共享的数据，易于开发和后期维护**<br />**②能够高效的实现组件之间数据的共享，提高开发效率**<br />**③存储在vuex中的数据都是响应式的，能够实时的保持数据和页面的同步**<br />**1.4 什么样的数据适合存储在vuex中**<br />**一般情况下，只有组件之间共享的数据，才有必要存储到vuex中，对于组件的私有数据，依旧存储在组件自身的data中即可**<br />**<br />**2. vuex的基本使用**<br />**1.安装vuex的依赖包**<br />**`npm install vuex --save`**<br />**2.导入vuex包**<br />`import Vuex from 'vuex'`<br />`Vue.use(Vuex)`<br />**3.创建store对象**<br />`**const store = new Vuex.Store（{**`<br />`**//state中存放的就是全局共享的数据**`<br />`**state：{ count：0 }**`<br />`**}）**```<br />**4.将store对象挂载到vue实例中**<br />`**new vue（{**`<br />`**el：'#app',**`<br />`**render: h => h(app),**`<br />`**router,**`<br />`**// 将创建的共享数据对象，挂载到vue的实例中**`<br />`// 所有的组件，就可以直接从store中读取共享的数据了`<br />`**store,**`<br />`**}）**```<br />**3. vuex的主要核心概念**

- **State**
- **Mutation**
- **Action**
- **getter**

**3.2 State**<br />**s****tate提供唯一的公共数据源，所有共享的数据都要统一放到Store的State中进行存储**<br />`创建Store数据源，提供唯一公共数据`<br />`const store = new Vuex Store({`<br />`state: { count:0 }`<br />`})`<br />**组件访问State中的数据的第一种方式**<br />`this.$store.state.全局数据名称`<br />**组件访问State中的数据的第二种方式**<br />`// 1.从vuex中按需导入mapState函数`<br />`import { mapState } from 'vuex'`<br />**通过刚才导入的mapState函数，将当前组件需要的全局数据，映射为当前组件的computed计算属性**：<br />`// 将全局数据映射为当前组件的计算属性`<br />`computed：{`<br />`...mapState(['count'])`<br />`}`<br />**3.3 Mutation**<br />**Mutation用于变更store中的数据**<br />**①只能通过Mutation变更Store中的数据，不可以直接操作Store中的数据**<br />**②通过这种方式虽然操作起来繁琐一些，但是可以集中监听所有数据的变化**<br />`// 定义Mutation`<br />`const store = new Vuex Store({`<br />`state: { count:0 },`<br />`mutations: {`<br />`add(state){`<br />`// 变更状态`<br />`state.count++`<br />`}`<br />`}`<br />`})`<br />
<br />`// 触发Mutation`<br />`methods：{`<br />`handle（）{`<br />`// 触发Mutation的第一种方式`<br />`this.$store.commit('add')`<br />`}`<br />`}`<br />**可以在触发mutation时传递参数**<br />`// 定义Mutation`<br />`const store = new Vuex Store({`<br />`state: { count:0 },`<br />`mutations: {`<br />`addN(state,step){`<br />`// 变更状态`<br />`state.count += step`<br />`}`<br />`}`<br />`})`<br />`// 触发Mutation`<br />`methods：{`<br />`handle（）{`<br />`// 触发Mutation的第一种方式`<br />`this.$store.commit('addN',3)`<br />`}`<br />`}`<br />**this.$store.commit('addN',3) 是触发Mutation的第一种方式，触发mutation的第二种方式**<br />`1。从vuex中按需导入mapMutations 函数`<br />`import mapMutations from 'vuex'`<br />通过刚才导入的mutation函数，映射为当前组件的methods方法：    <br />`// 将指定的mutations函数，``映射为当前组件的methods函数`<br />`methods：{`<br />`...``mapMutations (['add','addN'])``,`<br />`}`
