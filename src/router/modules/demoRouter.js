/**
 * demo测试
 */
export default [
  {
    path: '/demo',
    component: resolve => require(['@/views/vueCliDemo/index'], resolve),
    meta: {
      title: '搭建vue-cli',
      keepAlive: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: resolve => require(['@/views/vueCliDemo/home'], resolve),
        meta: {
          title: '主页'
        }
      },
      {
        path: 'webpackTest',
        name: 'webpackTest',
        component: resolve => require(['@/views/vueCliDemo/webpackTest'], resolve),
        meta: {
          title: 'webpack详解'
        }
      },
      {
        path: 'bableTest',
        name: 'bableTest',
        component: resolve => require(['@/views/vueCliDemo/bableTest'], resolve),
        meta: {
          title: 'bable使用'
        }
      }
    ]
  }
]
