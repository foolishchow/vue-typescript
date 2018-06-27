import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import { VuexPage } from 'pages/vuex/index';

export enum RouteName {
  Vuex = 'vuex'
}
const RouterConfig = [
  {
    name: RouteName.Vuex,
    path: '/',
    component: VuexPage
  }
];
const AppRouter = new VueRouter({
  routes: RouterConfig
})
export default AppRouter;