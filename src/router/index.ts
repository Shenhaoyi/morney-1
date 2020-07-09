import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';

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
  },
  {
    // 会匹配所有路径
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
