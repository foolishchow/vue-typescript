import { AbstractActionModule, AbstractGetterModule, AbstractMutationModule, InjectStore, ActionNames, BindToRootActions, MutationNames, BindToRootMutation } from "vue-typescript-util";
import Vuex from 'vuex';
import Vue from "vue";
export { StoreActions, StoreMutations } from './modules/root';
import dom from './modules/dom';
import event from './modules/event';
import { VueComponent } from "vue-typescript-util";
import { StoreActions, StoreMutations } from "./modules/root";
export type GetterModule<Typedef, State> = AbstractGetterModule<Typedef, State, AppStoreStates, AppStoreGetters>;
export type MutationModule<Typedef, State> = AbstractMutationModule<Typedef, State>;
export type ActionModule<Typedef, State, Getters> = AbstractActionModule<Typedef, State, Getters, AppStoreStates, AppStoreGetters>;

export interface AppStoreStates { }
export interface AppStoreGetters { }
export interface AppStoreActions { }
export interface AppStoreMutations { }
export interface AppStore extends InjectStore<AppStoreStates, AppStoreGetters> { }

Vue.use(Vuex)
const store: AppStore = new Vuex.Store({
  modules: {
    dom,
    event
  }
}) as any;
InjectStore(store);
export { store }

export function registeActions<Actions = any>(actions: ActionNames<Actions>, namespace: string) {
  BindToRootActions(actions, namespace, StoreActions)
}
export function registeMutations<Mutations = any>(mutations: MutationNames<Mutations>, namespace: string) {
  BindToRootMutation(mutations, namespace, StoreMutations);
}
export interface PageComponent<Props = {}> extends VueComponent<Props, AppStore> { }
export class PageComponent<Props = {}> extends VueComponent<Props, AppStore>{ }