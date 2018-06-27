/*
 * @Author: zhoupeng
 * @Date:   2017-11-14 16:03:29
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-04-14 17:57:07
 */

import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosError } from 'axios'
axios.defaults.baseURL = `http://${window.location.host}`
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

declare type AjaxConfigFilter = {
  beforeAjax?: (requestConfig: AxiosRequestConfig) => void;
  afterAjax?: (data: any) => boolean;
  validateAjax?: (requestConfig: AxiosRequestConfig) => boolean;
}
export declare type AxiosConfigType = {
  filter: AjaxConfigFilter;
  defaults: AxiosRequestConfig;
  onRequestError: ((error: AxiosError) => boolean)[];
}

const AxiosConfig: AxiosConfigType = {
  filter: {
    beforeAjax: undefined,

  },
  onRequestError: [],
  get defaults() {
    return axios.defaults
  }
}

export default AxiosConfig;