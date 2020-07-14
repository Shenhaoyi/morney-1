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


window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 200);
  }, 0);
};



//使用二维码的方案
// if (document.documentElement.clientWidth > 500) {
//   window.alert('请使用手机打开本页面，以保证浏览效果')
//   const img = document.createElement('img')
//   img.src='./qrcode.png'
//   img.style.position ='fixed'
//   img.style.left ='50%'
//   img.style.top ='50%'
//   img.style.transform='translate(-50%,-50%)'
//   img.style.boxShadow='0 0 10px rgba(0,0,0,0.25)'
//   document.body.appendChild(img)
// }