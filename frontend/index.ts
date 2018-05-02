
import Vue, { CreateElement } from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
import VueRouter from 'vue-router';

import './internal/index'
import './styles/index.scss';

import { ConfigAjax, redirectToLogin } from 'configs/configAjax';
ConfigAjax();

import store from './store'
import AppRouter, { RouteName } from 'configs/router'
import AppWrap from './pages/wraper/index'

const App = new Vue({
  store,
  router: AppRouter,
  name: 'app',
  beforeCreate() {
    redirectToLogin(this);
  },
  render(h) {
    return h(AppWrap)
  },
  created() {

  }
});
App.$mount('#app')





