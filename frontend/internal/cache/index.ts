/*
* @Author: zhoupeng
* @Date:   2017-11-14 16:03:29
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-22 20:44:34
*/
import CacheInst,{CacheInstance} from './cache'
import Vue,{ PluginObject } from 'vue';
const CacheManager:PluginObject<{}>= {
  installed: false,
  install (vue:typeof Vue, options) {
    if (CacheManager.installed) return
    CacheManager.installed = true
    Object.defineProperties(Vue.prototype, {
      $cache: {
        get () {
          return CacheInst()
        }
      }
    })
  }
}

declare module "vue/types/vue" {
  export interface Vue {
    readonly $cache: CacheInstance
  }
}

export default CacheManager
