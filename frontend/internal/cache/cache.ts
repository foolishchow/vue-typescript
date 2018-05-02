/*
* @Author: zhoupeng
* @Date:   2017-11-14 16:35:34
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-04-26 18:22:41
*/
/**
 * cache
 */

declare type CacheResult = string | JSON | null;
export interface CacheInstance {
  set<T=(string | JSON)>(key: CacheItem<T>, value: T, expires?: number): void;
  get<T=(string | JSON)>(key: CacheItem<T>): T | null;
  remove(key: string | string[]): void;
}
//global expires form cookie
const expires = (<any>new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000)).toGMTString()

const storageInstance = {
  get support() {
    /* eslint-disable */
    if (!('localStorage' in window)) return false;
    /* eslint-enable */
    const testKey: string = (+new Date()).toString(),
      storage = window.localStorage
    try {
      storage.setItem(testKey, 'testValue')
      storage.removeItem(testKey)
      return true
    } catch (error) {
      return false
    }
  },
  get<T=(string | JSON)>(key: CacheItem<T>): T | null {
    key = key.replace(/^\s|\s$/gi, '')
    let result = localStorage.getItem(key)
    if (result == null) return null;
    if (/^is-JSON;/.test(result)) {
      return JSON.parse(result.replace(/^is-JSON;/, ''))
    }
    return result as any as T
  },
  set<T=(string | JSON)>(key: CacheItem<T>, value: T, expires?: number) {
    key = key.replace(/^\s|\s$/gi, '')
    let __val: any = { value };
    let _val = JSON.stringify(__val);
    localStorage.setItem(key, _val)
  },
  remove(key: string | string[]) {
    if (key instanceof Array) {
      key.map(k => {
        k = k.replace(/^\s|\s$/gi, '')
        localStorage.removeItem(k)
      })
    } else {
      key = key.replace(/^\s|\s$/gi, '')
      localStorage.removeItem(key)
    }
  }
}

const cookieInstance = {
  get expires() {
    return expires
  },
  set<T=(string | JSON)>(key: CacheItem<T>, value: T, expires?: number) {
    key = key.replace(/^\s|\s$/gi, '')
    let __val: any = { value };
    let _expires = expires;
    if (expires != undefined) {
      console.info((<any>new Date((new Date).getTime() + parseInt(expires.toString()) * 1000)).toGMTString())
      _expires = (<any>new Date((new Date).getTime() + parseInt(expires.toString()) * 1000)).toGMTString();
    }
    let _value = JSON.stringify(__val);
    document.cookie = `${key}=${(<any>window).escape(_value)};expires=${expires}`
  },
  get<T=(string | JSON)>(key: CacheItem<T>): T | null {
    if (document.cookie.length == 0) return null
    key = key.replace(/^\s|\s$/gi, '')
    let result: T | null = null
    if (document.cookie.length > 0) {
      let index = document.cookie.indexOf(`${key}=`)
      if (index != -1) {
        index = index + key.length + 1
        let index_end = document.cookie.indexOf(";", index)
        if (index_end == -1) index_end = document.cookie.length
        let v = (<any>window).unescape(document.cookie.substring(index, index_end));
        result = JSON.parse(v).value;
      }
    }
    return <T | null>result as any
  },
  remove(key: string | string[]) {
    if (key instanceof Array) {
      key.map(k => {
        k = k.replace(/^\s|\s$/gi, '')
        document.cookie = `${k}=${(<any>window).escape('')};expires=${(<any>new Date()).toGMTString()}`
      })
    } else {
      key = key.replace(/^\s|\s$/gi, '')
      document.cookie = `${key}=${(<any>window).escape('')};expires=${(<any>new Date()).toGMTString()}`
    }
  }
}

const storage = function (): CacheInstance {
  if (storageInstance.support) {
    return storageInstance
  }
  return cookieInstance
}
export type CacheItem<T> = string & {
  data?: T
}
export default storage
