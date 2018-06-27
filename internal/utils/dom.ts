/*
 * @Author: zhoupeng 
 * @Date: 2017-12-04 13:40:35
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-04-12 23:25:54
 */

import { trim } from "./common";
/* istanbul ignore next */
export function hasClass(el?: HTMLElement, cls?: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
export function addClass(el?: HTMLElement, cls?: string) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
export function removeClass(el?: HTMLElement, cls?: string) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

export function CStyle(el: Element) {
  return window.getComputedStyle(el)
}

export function trigger(name: string, target?: HTMLElement) {
  const e = document.createEvent('MouseEvents') // 创建事件对象
  e.initEvent('scroll', false, false); // 初始化事件对象initMouseEvent需要更多参数
  (<any>e).msg = ''; // 给事件对象添加属性
  (target || window).dispatchEvent(e) // 触发事件
}