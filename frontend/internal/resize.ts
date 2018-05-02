import Vue, { PluginObject } from 'vue';
import utils from './utils'
class ResizeProvider {
  private eventsHandler = new Vue();
  constructor() {
    let Resizer = utils.debounce(() => {
      let win = {
        height: utils.win.height,
        width: utils.win.width
      }
      this.eventsHandler.$emit('resize', win)
    }, 50);
    window.addEventListener('resize', Resizer)
  }

  active(callback: (win: { height: number, width: number }) => void) {
    this.eventsHandler.$on('resize', callback)
  }

  del(callback: (win: { height: number, width: number }) => void) {
    this.eventsHandler.$off('resize', callback);
  }

}

const resizeProvider = new ResizeProvider()
const ResizeManager: PluginObject<{}> = {
  installed: false,
  install(vue: typeof Vue, options) {
    if (ResizeManager.installed) return
    ResizeManager.installed = true
    Object.defineProperties(Vue.prototype, {
      $resize: {
        get() {
          return resizeProvider;
        }
      }
    })
  }
}

declare module "vue/types/vue" {
  export interface Vue {
    readonly $resize: ResizeProvider;
  }
}

export default ResizeManager
