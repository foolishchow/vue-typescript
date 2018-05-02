/*
* @Author: zhoupeng
* @Date:   2017-12-04 13:35:19
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-04-14 16:21:55
*/

declare global {
  export interface Date {
    Format(fmt?: string): string;
  }
}

Date.prototype.Format = function (fmt: string = 'yyyy-MM-dd hh:mm:ss') { // author: meizz
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? ((<any>o)[k]) : (('00' + (<any>o)[k]).substr(('' + (<any>o)[k]).length)))
  }
  return fmt
}


export const formatDate = function (date: number | Date, format?: string) {
  format = format || 'yyyy-MM-dd hh:mm:ss';
  if (date instanceof Date) {
    return date.Format(format);
  }
  return new Date(date).Format(format)
}
