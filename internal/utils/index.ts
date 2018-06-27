/*
* @Author: zhoupeng
* @Date:   2017-11-15 18:05:52
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-31 22:22:32
*/
import Vue from 'vue';

import * as date from './date'
import * as common from './common'
import * as filter from './filter'
import win from './window'
import * as dom from './dom';
import env from './enviroment';
import * as data from './data'
import { debounce } from './debounce'

const utils = {
  filter,
  win,
  env,
  ...date,
  ...dom,
  ...common,
  data,
  debounce
}

export default utils;


