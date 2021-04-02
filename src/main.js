// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css' 
import "@/common/css/myAnimate.css"
import Vant from 'vant';
import 'vant/lib/index.css';
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import $ from 'jquery'

import 'bootstrap/dist/js/bootstrap.min'

import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.use(animated)
Vue.use(ElementUI);
Vue.use(Vant)
Vue.use(VueCodeMirror)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
