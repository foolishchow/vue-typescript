/*
* @Author: zhoupeng
* @Date:   2017-11-14 16:03:29
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2018-04-08 14:46:41
*/
import Vuex, { StoreOptions, ModuleTree, Store } from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
import user, { State as UserState, PayLoad as UserPL } from './modules/user'

export declare type AppStoreState = {
  user: UserState,
}

export type AppStore = Store<AppStoreState>;

const store: AppStore = new Vuex.Store({
  modules: {
    user,
  }
});

declare module "vuex" {
  export interface Store<S> {
    COMMIT(payload: UserPL, options?: any): void;
  }
}
store.COMMIT = function (payload: UserPL, options?: any) {
  store.commit(payload, options)
}

export default store
