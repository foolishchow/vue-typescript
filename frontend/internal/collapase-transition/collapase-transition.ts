/*
* @Author: zhoupeng
* @Date:   2017-11-14 16:03:29
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-23 09:37:46
*/
import utils from 'internal/utils'
import { DirectiveOptions, Component, ComponentOptions ,CreateElement, FunctionalComponentOptions, RenderContext} from 'vue';

class Transition {
  beforeEnter (el:HTMLElement) {
    /* eslint-disable */
    console.info('beforeEnter')
    /* eslint-enable */
    utils.addClass(el, 'collapse-transition')
    if (!el.dataset) (<any>el).dataset = {};

    (<any>el).dataset.oldPaddingTop = el.style.paddingTop;
    (<any>el).dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.height = '0'
    el.style.paddingTop = '0'
    el.style.paddingBottom = '0'
  }

  enter (el:HTMLElement) {
    /* eslint-disable */
    console.info('enter');
    /* eslint-enable */
    (<any>el).dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = (<any>el).dataset.oldPaddingTop
      el.style.paddingBottom = (<any>el).dataset.oldPaddingBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = (<any>el).dataset.oldPaddingTop
      el.style.paddingBottom = (<any>el).dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden'
  }

  afterEnter (el:HTMLElement) {
    /* eslint-disable */
    console.info('afterEnter')
    /* eslint-enable */
    // for safari: remove class then reset height is necessary
    utils.removeClass(el, 'collapse-transition')
    el.style.height = ''
    el.style.overflow = (<any>el).dataset.oldOverflow
  }

  beforeLeave (el:HTMLElement) {
    /* eslint-disable */
    console.info('beforeLeave')
    /* eslint-enable */
    if (!el.dataset) (<any>el).dataset = {};
    (<any>el).dataset.oldPaddingTop = el.style.paddingTop;
    (<any>el).dataset.oldPaddingBottom = el.style.paddingBottom;
    (<any>el).dataset.oldOverflow = el.style.overflow;

    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  }

  leave (el:HTMLElement) {
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      utils.addClass(el, 'collapse-transition');
      el.style.height = '0'
      el.style.paddingTop = '0'
      el.style.paddingBottom = '0'
    }
  }

  afterLeave (el:HTMLElement) {
    utils.removeClass(el, 'collapse-transition')
    el.style.height = ''
    el.style.overflow = (<any>el).dataset.oldOverflow;
    el.style.paddingTop = (<any>el).dataset.oldPaddingTop;
    el.style.paddingBottom = (<any>el).dataset.oldPaddingBottom;
  }
}

const Directive: FunctionalComponentOptions = {
  name: 'CollapseTransition',
  functional: true,
  render(h: CreateElement, context:RenderContext) {
    let children = context.children;
    const data = {
      on: new Transition()
    }
    return h('transition', <any>data, children)
  }
}


export default  Directive;