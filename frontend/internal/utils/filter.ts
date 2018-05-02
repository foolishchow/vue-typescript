/*
 * @Author: zhoupeng 
 * @Date: 2017-12-04 13:40:33
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-23 09:16:04
 */

import Vue from 'vue'


export function lastUpdateTime(day: number | string) {
  let days = parseInt(<string>day)
  if (days <= 1) {
    return '今天更新'
  } else if (days <= 7) {
    return days + '天前更新'
  } else if (days <= 30) {
    return '1周前更新'
  } else {
    return '1个月前更新'
  }
}
