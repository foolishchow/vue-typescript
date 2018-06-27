
import { ConfigAjax, redirectToLogin } from 'configs/configAjax';
import AppRouter from 'configs/router';
import Vue from 'vue';
import Vuex from 'vuex';
import './internal/index';
import AppWrap from './pages/wraper/index';
import { store } from './store';
import './styles/index.scss';
Vue.use(Vuex);

ConfigAjax();

const App = new Vue({
  extends: AppWrap,
  store,
  router: AppRouter,
  name: 'app',
  beforeCreate() {
    redirectToLogin(this);
  },
  created() {

  }
});
App.$mount('#app')





