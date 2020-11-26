import Vue from 'vue'
import Router from 'vue-router'
import editor from '@/page/editor'
import test from '@/page/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: editor
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
  ]
})
