import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as utils from "./utils"

Vue.use(ElementUI);

Vue.prototype.$utils=utils;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
