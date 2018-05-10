import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'home',
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/order',
      name: 'order',
      component: resolve => require(['../components/pages/my-order.vue'], resolve),
    },
  ]
})
