import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import 'default-passive-events'


import 'echarts';
import ECharts from 'vue-echarts';


// import '@/assets/font/font.css';



// import AVPlugin from 'vue-audio-visual'
// Vue.use(AVPlugin);

Vue.component('ECharts', ECharts);


import $ from 'jquery'
Vue.use(ElementUI);
Vue.config.productionTip = false


// axios.defaults.withCredentials=true
Vue.prototype.$axios = axios 


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
