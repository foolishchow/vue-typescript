/*
* @Author: zhoupeng
* @Date:   2017-11-16 09:09:35
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-22 20:46:59
*/
import Vue, { PluginFunction } from 'vue'

const pluginStatus = {
  installed:false
}
const install:PluginFunction<{}> = (Vue, options) => {
  if (pluginStatus.installed) return
  pluginStatus.installed = true

  Object.defineProperties(Vue.prototype, {
    $eventBus: {
      get() {
        return globalBus
      }
    }
  })
}
export type GlobalBus = {
  on(name: string, ...argv: any[]): void;
  emit(...argv: any[]): void;
  once(...argv: any[]): void;
  off(...argv: any[]): void;
}
type GlobalBusInstace = GlobalBus&{
  _bus: Vue | null;
  readonly bus: any;
  install: PluginFunction<{}>
}
const globalBus: GlobalBusInstace = {
  install,
  _bus:null,
  get bus(){
    if (this._bus == null) {
      this._bus = new Vue()
    }
    return this._bus;
  } ,
  on(name:string,...argv:any[]) {
    this.bus.$on(name,...argv)
  },
  emit(...argv: any[]) {
    this.bus.$emit(...argv)
  },
  once(...argv: any[]) {
    this.bus.$once(...argv)
  },
  off(...argv: any[]) {
    this.bus.$off(...argv)
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $eventBus: GlobalBus;
  }
}

export default globalBus
