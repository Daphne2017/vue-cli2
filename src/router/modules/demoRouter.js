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
        path: 'mock',
        name: 'mock',
        component: resolve => require(['@/views/vueCliDemo/mock'], resolve),
        meta: {
          title: 'mock的demo'
        }
      },
      {
        path: 'proxyTable',
        name: 'proxyTable',
        component: resolve => require(['@/views/vueCliDemo/proxyTable'], resolve),
        meta: {
          title: 'webpack的proxyTable的代理使用'
        }
      },
      {
        path: 'qsPlugin',
        name: 'qsPlugin',
        component: resolve => require(['@/views/vueCliDemo/qsPlugin'], resolve),
        meta: {
          title: 'qs插件的使用'
        }
      },
      {
        path: 'quillEditor',
        name: 'quillEditor',
        component: resolve => require(['@/views/vueCliDemo/quillEditor'], resolve),
        meta: {
          title: '富文本编辑器的使用'
        }
      },
      {
        path: 'echarts',
        name: 'echarts',
        component: resolve => require(['@/views/vueCliDemo/echarts'], resolve),
        meta: {
          title: 'echarts的使用'
        }
      },
      {
        path: 'virtualList',
        name: 'virtualList',
        component: resolve => require(['@/views/vueCliDemo/virtualList'], resolve),
        meta: {
          title: 'virtualList的使用'
        }
      }
    ]
  }
]
