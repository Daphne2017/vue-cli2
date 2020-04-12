/**
 * marquee测试
 */
/**
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
            path: 'marquee',
            component: resolve => require(['@/views/marqueeTest/marquee'], resolve),
            meta: {
              title: 'marquee',
              keepAlive: true
            },
          
        }
       
      ]
    }
  ]
  

  