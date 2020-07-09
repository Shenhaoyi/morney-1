import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '@/views/Home.vue';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  //只需要改这部分
  {
    //默认路径
    path: '/',
    redirect: '/Money'
  },
  {
    //一般path都用小写，组件首字母大写,按照选项按回车会自动import
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  }
];

const router = new VueRouter({
  routes
});

export default router;
