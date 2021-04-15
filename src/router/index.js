import Vue from 'vue'
import Router from 'vue-router'
import editor from '@/page/editor'
import phonePreview from '@/page/phonePreview'
import pcPreview from '@/page/pcPreview'
import freePreview from '@/page/freePreview'
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
      path: '/phonePreview',
      name: 'phonePreview',
      component: phonePreview
    },
    {
      path: '/pcPreview',
      name: 'pcPreview',
      component: pcPreview
    },
    {
      path: '/freePreview',
      name: 'freePreview',
      component: freePreview
    },

    {
      path: '/test',
      name: 'test',
      component: test
    },
  ]
})
