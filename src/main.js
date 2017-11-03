// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import store from './store/index'
import 'muse-ui/dist/muse-ui.css'
import './assets/theme.less'
import 'font-awesome/css/font-awesome.css'
import VueVideoPlayer from 'vue-video-player'
import VueImg from 'v-img';
Vue.use(VueImg)
Vue.use(MuseUI)
Vue.use(VueVideoPlayer)
require('swiper/dist/css/swiper.css')
Vue.config.productionTip = false

/* eslint-disable no-new */
// document.addEventListener('deviceready', function() {
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
//   window.navigator.splashscreen.hide()
// }, false);
