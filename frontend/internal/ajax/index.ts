/*
 * @Author: zhoupeng
 * @Date:   2017-11-14 16:03:29
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-24 22:57:12
 */

import Vue, { PluginFunction } from 'vue';
import AxiosConfig, { AxiosConfigType } from './config'
import Ajax from './ajax'
const PluginStatus = {
  installed: false
}
const install: PluginFunction<{}> = (Vue, /* eslint-disable */ options /* eslint-enable */) => {
  if (PluginStatus.installed) return
  PluginStatus.installed = true

  Object.defineProperties(Vue.prototype, {
    $ajax: {
      get() {
        return Ajax;
      }
    }
  })

  Object.defineProperties(Vue, {
    $configAjax: {
      get() {
        return function (callBack: (config: AxiosConfigType) => void) {
          callBack(AxiosConfig)
        }
      }
    }
  })
}

export type AjaxUriItem<Response = any, Data=any, Format=any> = string & {
  response?: Response;
  data?: Data;
  format?: Format;
}

export type AjaxGetUriItem<Response = any, Data=any, Format=any> = AjaxUriItem<Response, Data, Format> & {
  type?: 'get'
}

export type AjaxPostUriItem<Response = any, Data=any, Format=any> = AjaxUriItem<Response, Data, Format> & {
  type?: 'post'
}
declare module "vue/types/vue" {
  interface Vue {
    readonly $ajax: typeof Ajax;
  }
  interface VueConstructor {
    $configAjax: (callBack: (config: AxiosConfigType) => void) => void;
  }
}


export default install;
