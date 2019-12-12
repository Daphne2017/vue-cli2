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
      },
      {
        path: 'lazyLoadImages',
        name: 'lazyLoadImages',
        component: resolve => require(['@/views/vueCliDemo/lazyLoadImages'], resolve),
        meta: {
          title: '图片懒加载的使用'
        }
      },
      {
        path: 'virtualDom',
        name: 'virtualDom',
        component: resolve => require(['@/views/vueCliDemo/virtualDom'], resolve),
        meta: {
          title: 'virtualDom的diff算法的理解，以及就地复用'
        }
      },
      {
        path: 'freezeObj',
        name: 'freezeObj',
        component: resolve => require(['@/views/vueCliDemo/freezeObj'], resolve),
        meta: {
          title: '冻结对象'
        }
      }
    ]
  }
]
