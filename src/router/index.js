import Vue from 'vue'
import Router from 'vue-router'
import notFound from '@/components/notFound'
import error from '@/components/error'
import HelloWorld from '@/components/HelloWorld'
import demoRouter from './modules/demoRouter'

Vue.use(Router) // 其他组件中，this.$router了
let routes = [
  ...demoRouter,
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '*',
    component: notFound
  },
  {
    path: '/error',
    name: 'error',
    component: error
  }
]
const router = new Router({ routes })
// 全局设置路由
router.beforeEach((to, from, next) => {
  let that = router.app
  if (to.matched.length === 0) {
    next({ path: '/404' })
    that.$vux.toast.text('正在建设中...', 'middle')
  } else if (to.name === 'error') {
    next()
  } else {
    next()
  }
})
export default router
