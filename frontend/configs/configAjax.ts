import Vue, { CreateElement } from 'vue';
import cacheInstance from 'internal/cache/cache';
import { AxiosRequestConfig } from 'axios';
import { UserTokenCache } from 'configs/cache';

export const ConfigAjax = () => {
  Vue.$configAjax(function (AxiosConfig) {
    AxiosConfig.defaults.baseURL = process.env._API_URL;
    AxiosConfig.filter.validateAjax = function (config: AxiosRequestConfig) {
      if (cacheInstance().get(UserTokenCache)) {
        return true;
      } else {
        return false;
      }
    }
    AxiosConfig.filter.beforeAjax = function (options: AxiosRequestConfig) {
      let loginCache = cacheInstance().get(UserTokenCache);
      if (loginCache) {
        options.headers['Authorization'] = loginCache.token;
      }
    }
  })
}


import { CommonResponseCode, CommonResponse } from 'configs/responses/common';


export const redirectToLogin = (vm: Vue) => {
  let goLogin = () => {

  }
  Vue.$configAjax((AxiosConfig) => {
    AxiosConfig.filter.afterAjax = (data: CommonResponse) => {
      if (data.code == CommonResponseCode.INVALID_TOKEN) {
        goLogin();
        return true;
      }
      return false;
    }
    AxiosConfig.onRequestError.push((error) => {
      if (error.response && error.response.status == 401) {
        goLogin();
        return true;
      }
      return false;
    })
  })
}
