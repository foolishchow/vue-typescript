/*
* @Author: zhoupeng
* @Date:   2017-11-27 13:58:47
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-05-02 17:55:05
*/
import { Module } from 'vuex'
export type State = {
  userName: string;
  isLogin: boolean;
}
const state: State = {
  userName: '',
  isLogin: false
}

export type USERINFOPL = {
  type: 'USERINFO',
  userName: string,
  isLogin: boolean;
}
export type PayLoad = USERINFOPL;
const mutations = {
  USERINFO(state: State, info: USERINFOPL) {
    state.userName = info.userName;
    state.isLogin = info.isLogin;
  }
}

export default {
  state,
  mutations
};
