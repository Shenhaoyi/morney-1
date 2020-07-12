import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';  //相当于./router/index.ts。如果是目录的话自动找下面的index文件
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch();
window.createTag = () => {
  const tagName = window.prompt('请输入标签名');
  if (tagName === '') {
    window.alert('标签名不能为空');
  }else if (tagName === null){
    return
  } else {
    const message = tagListModel.create(tagName);
    if (message === 'duplicated') {
      window.alert('标签名重复了');
    }
  }
};
window.removeTag =(tag: Tag)=>{
    return tagListModel.remove(tag.id);
}
window.updateTag=(id: string,name: string)=>{
  return tagListModel.update(id, name);
}
window.findTag=(id: string)=>{
  const result = window.tagList.filter(tag => tag.id === id)[0];
  console.log(result);
  return window.tagList.filter(tag => tag.id === id)[0]; //filter返回数组

}
new Vue({
  router, //router:router的缩写
  store,
  // components: {Nav:Nav},
  render: h => h(App)
}).$mount('#app');
