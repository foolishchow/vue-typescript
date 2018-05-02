/*
 * @Author: zhoupeng 
 * @Date: 2017-12-04 14:20:09
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-04-26 18:28:24
 */
const env = {
  get ENV() {
    let host = window.location.host;
    return /^localhost/.test(host) ? 'prod' : 'dev';
  },
  get isProd() {
    return env.ENV == 'prod';
  },
  get isDev() {
    return env.ENV == 'dev';
  }
}

export default env;