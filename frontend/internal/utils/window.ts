/*
 * @Author: zhoupeng 
 * @Date: 2017-12-05 09:34:22
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-23 09:16:24
 */

const win = {
  get width() {
    return window.innerWidth || window.screen.width
  },
  get height() {
    return window.innerHeight || window.screen.height
  },
  get scrollTop() {
    if (window.pageYOffset) {
      return window.pageYOffset
    }
    if (window.scrollY) {
      return window.scrollY
    }
    if (document.documentElement.scrollTop) {
      return document.documentElement.scrollTop
    }
    if (document.body.scrollTop) {
      return document.body.scrollTop
    }
    return 0
  },
  scrollTo(_target: string | number, times: number = 0) {
    times++
    let target = ~~parseInt(<string>_target)
    const y = win.scrollTop
    const temp = Math.floor(y * 0.9 + target * 0.1)
    window.scrollTo(0, temp)
    return window.setTimeout(() => {
      if (temp != Math.floor(target) && times < 50) {
        win.scrollTo(target.toString(), times)
      }
    }, 10)
  }
}

export default win;