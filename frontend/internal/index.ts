/*
 * @Author: zhoupeng
 * @Date:   2017-12-04 13:41:40
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-05-02 18:00:46
*/
import Vue from 'vue'
import './styles/base.scss';
import './styles/reset.scss';

import CollapaseTranisition from './collapase-transition/index'
Vue.component(<string>CollapaseTranisition.name, CollapaseTranisition)

import CahceManager from './cache/index'
Vue.use(CahceManager)

import eventCenter from './event-center'
Vue.use(eventCenter)

import utils from './utils/plugin-install'
Vue.use(utils)

import Ajax from './ajax'
Vue.use(Ajax);

import ResizeHandler from './resize'
Vue.use(ResizeHandler)







