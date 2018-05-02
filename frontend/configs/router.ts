import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import { IndexPage } from 'pages/index/index';

export enum RouteName {
  Index = 'index'
}
const RouterConfig = [
  {
    name: RouteName.Index,
    path: process.env.NODE_ENV == "production" ? '/' : '/index',
    component: IndexPage
  }
];
const AppRouter = new VueRouter({
  // mode:'history',
  // history:false,
  routes: RouterConfig
})
export default AppRouter;