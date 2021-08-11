/**
 * demo测试
 */
export default [
  {
    path: '/demo',
    component: resolve => require(['@/views/index'], resolve),
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
      },
      {
        path: 'fourth',
        name: 'fourAnnivisity',
        component: resolve => require(['@/views/fourthAniversitity/activity'], resolve),
        meta: {
          title: '四周年活动'
        }
      },
      {
        path: 'canvasCard',
        name: 'canvasCard',
        component: resolve => require(['@/views/vueCliDemo/canvasCard'], resolve),
        meta: {
          title: 'canvas画图'
        }
      },
      {
        path: 'uploadImage',
        name: 'uploadImage',
        component: resolve => require(['@/views/vueCliDemo/uploadImage'], resolve),
        meta: {
          title: '图片上传'
        }
      },
      {
        path: 'directives',
        name: 'directives',
        component: resolve => require(['@/views/directives/index'], resolve),
        meta: {
          title: '使用指令'
        }
      }
    ]
  }
]
