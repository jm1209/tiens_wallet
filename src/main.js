import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import Fastclick from 'fastclick';
import VueI18n from 'vue-i18n';
import store from './store'

Vue.use(VueI18n);

import 'less/index.less';
import "swiper/dist/css/swiper.min.css";

Vue.config.productionTip = false;
Fastclick.attach(document.body);

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
