"use strict";
/*
* @Author: zhoupeng
* @Date:   2017-12-04 13:35:19
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-03-23 09:15:19
*/
Object.defineProperty(exports, "__esModule", { value: true });
Date.prototype.Format = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
    const o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
    return fmt;
};
exports.formatDate = function (date, format) {
    format = format || 'yyyy-MM-dd hh:mm:ss';
    if (date instanceof Date) {
        return date.Format(format);
    }
    return new Date(date).Format(format);
};
