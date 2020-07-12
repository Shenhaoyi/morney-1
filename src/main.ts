import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';  //相当于./router/index.ts。如果是目录的话自动找下面的index文件
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

new Vue({
  router, //router:router的缩写
  store,
  render: h => h(App)
}).$mount('#app');
