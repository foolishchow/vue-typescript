/*
* @Author: zhoupeng
* @Date:   2017-11-15 18:05:52
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-23 09:21:54
*/
import Vue, { PluginFunction } from 'vue';
import utils from '.'

const pluginStatus = {
  installed: false
}
const install: PluginFunction<{}> = function (Vue, options) { //eslint-disable-line
  if (pluginStatus.installed) return
  pluginStatus.installed = true

  Object.defineProperties(Vue.prototype, {
    $utils: {
      get() {
        return utils
      }
    }
  })
}

declare module "vue/types/vue" {
  export interface Vue {
    readonly $utils: typeof utils
  }
}

export default install
