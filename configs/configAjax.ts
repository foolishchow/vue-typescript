import { AxiosRequestConfig } from 'axios';
import { UserTokenCache } from 'configs/cache';
import { CommonResponse, CommonResponseCode } from 'configs/responses/common';
import cacheInstance from 'internal/cache/cache';
import Vue from 'vue';

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
      if (error.response && error.response.status == CommonResponseCode.UNLOGIN) {
        goLogin();
        return true;
      }
      return false;
    })
  })
}
