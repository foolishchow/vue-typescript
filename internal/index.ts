/*
 * @Author: zhoupeng
 * @Date:   2017-12-04 13:41:40
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-06-27 15:34:34
*/
import Vue from 'vue'
import './styles/base.scss';
import './styles/reset.scss';

import CahceManager from './cache/index'
Vue.use(CahceManager)

import utils from './utils/plugin-install'
Vue.use(utils)

import Ajax from './ajax'
Vue.use(Ajax);









