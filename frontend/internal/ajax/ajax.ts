/*
 * @Author: zhoupeng
 * @Date:   2017-11-14 16:03:29
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-04-09 19:07:23
 */
import events from 'events';
import Vue, { PluginFunction } from 'vue';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import AxiosConfig, { AxiosConfigType } from './config'
import { AjaxUriItem, AjaxGetUriItem, AjaxPostUriItem } from '.'
const beforeAjax = (config: any) => {
  if (AxiosConfig.filter.beforeAjax) {
    config = AxiosConfig.filter.beforeAjax(config)
  }
  return config
}
const validateAjax = (config: any) => {
  if (AxiosConfig.filter.validateAjax) {
    return AxiosConfig.filter.validateAjax(config)
  }
  return true;
}
const afterAjax = (data: any) => {
  if (AxiosConfig.filter.afterAjax) {
    return AxiosConfig.filter.afterAjax(data)
  }
  return false;
}
const URI = function (name: string, ...props: any[]) {
  let url = name;
  if (props.length > 0) {
    url = url.replace(/\{(.*?)\}/gi, function (whole: string) {
      if (props.length > 0) {
        return props.shift()
      } else {
        return whole
      }
    })
  }
  return url
}

const parseUrl = function (Url: string | any[]) {
  let url = typeof Url === 'string' ? [Url] : Url;
  let name = url.shift()
  return URI(name, ...url)
}

type AjaxError = { resolved: boolean, error: AxiosError };
const request = function <T>(axiosInstance: AxiosPromise<T>) {
  return new Promise<T>(function (resolve, reject) {
    axiosInstance.then(function (d: AxiosResponse<T>) {
      const {
        data
      } = d;
      let hasResolved = afterAjax(data as any);
      if (hasResolved) {
        reject(data)
      } else {
        resolve(data)
      }
    }).catch(function (error: AxiosError) {
      let resolved = AxiosConfig.onRequestError.some(s => s(error))
      reject({
        resolved,
        error
      })
    })
  })
}

const Ajax = {
  getWithFormat<Response, Data, Format>(Url: AjaxUriItem<Response, Data, Format>, format: Format, data?: Data) {
    let url = parseUrl([Url, format])
    const options: AxiosRequestConfig = {
      headers: {},
      params: data
    }
    if (!validateAjax) return Promise.reject(null);
    beforeAjax(options)
    const instance = axios.get<Response>(url, options)
    return request(instance)
  },
  get<Response, Data>(Url: AjaxGetUriItem<Response, Data>, data?: Data) {
    const options: AxiosRequestConfig = {
      headers: {},
      params: data
    }
    if (!validateAjax) return Promise.reject(null);
    beforeAjax(options)
    const instance = axios.get<Response>(Url, options)
    return request(instance)
  },
  postWithFormat<Response, Data, Format>(Url: AjaxPostUriItem<Response, Data, Format>, format: Format, data?: Data) {
    let url = parseUrl([Url, format])
    const options = {
      headers: {}
    }
    if (!validateAjax) return Promise.reject(null);
    beforeAjax(options)
    const instance = axios.post<Response>(url, data, options)
    return request(instance)
  },
  post<Response, Data>(Url: AjaxPostUriItem<Response, Data>, data?: Data) {
    const options = {
      headers: {}
    }
    if (!validateAjax) return Promise.reject(null);
    beforeAjax(options)
    const instance = axios.post<Response>(Url, data, options)
    return request(instance)
  },

  uploadWithFormat<Response, Data, Format>(Url: AjaxPostUriItem<Response, Data, Format>, format: Format, data?: Data) {
    let url = parseUrl([Url, format])
    let progress = new events();
    let onProgress = function (cb: (progressEvent: ProgressEvent) => void) {
      progress.on('progress', cb)
    }
    const options: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: data,
      onUploadProgress(progressEvent: ProgressEvent) {
        if (progressEvent.lengthComputable) {
          progress.emit('progress', progressEvent)
        }
      }
    }
    if (!validateAjax) return {
      instance: Promise.reject(null),
      onProgress
    };
    beforeAjax(options)
    const instance = axios.post<Response>(url, data, options)
    return {
      instance: request(instance),
      onProgress
    }
  },
  upload<Response, Data>(Url: AjaxPostUriItem<Response, Data>, data?: Data) {
    let progress = new events();
    let onProgress = function (cb: (progressEvent: ProgressEvent) => void) {
      progress.on('progress', cb)
    }
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress(progressEvent: ProgressEvent) {
        if (progressEvent.lengthComputable) {
          progress.emit('progress', progressEvent)
        }
      }
    }
    if (!validateAjax) return {
      instance: Promise.reject(null),
      onProgress
    };
    beforeAjax(options)
    const instance = axios.post<Response>(Url, data, options)
    return {
      instance: request(instance),
      onProgress
    }
  }

}

export default Ajax;
