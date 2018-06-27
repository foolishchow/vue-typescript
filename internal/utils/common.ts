/*
 * @Author: zhoupeng 
 * @Date: 2017-12-04 13:34:19
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-04-23 21:44:08
 */

export function hash(length: number = 6) {
  let hash = Math.random().toString(36).substring(2)
  while (hash.length < length) {
    hash += Math.random().toString(36).substring(2)
  }
  return hash.substring(0, length)
}

export function merge(target: any, ...args: any[]) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
}

export function trim(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function clearNull(val: any) {
  const obj: any = {}
  for (const key in val) {
    if (val[key] != undefined && val[key] != null && trim(val[key]) != '') { //eslint-disable-line
      obj[key] = trim(val[key])
    }
  }
  return obj
}

export function toQuery(val: any, withOutNull: boolean = true) {
  const obj = []
  for (const key in val) {
    if (withOutNull) {
      if (val[key] != undefined && val[key] != null && trim(val[key]) != '') {
        obj.push(`${key}=${trim(val[key])}`)
      }
    } else {
      obj.push(`${key}=${trim(val[key])}`)
    }
  }
  return obj.join('&')
}


export function FullScreen(el: HTMLElement) {
  var isFullscreen = (document as any).fullScreen || (document as any).mozFullScreen || document.webkitIsFullScreen;
  if (!isFullscreen) {//进入全屏,多重短路表达式
    (el.requestFullscreen && el.requestFullscreen()) ||
      ((el as any).mozRequestFullScreen && (el as any).mozRequestFullScreen()) ||
      (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
      ((el as any).msRequestFullscreen && (el as any).msRequestFullscreen());

  } else {	//退出全屏,三目运算符
    document.exitFullscreen ? document.exitFullscreen() :
      (document as any).mozCancelFullScreen ? (document as any).mozCancelFullScreen() :
        document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
  }
}
