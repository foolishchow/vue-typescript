import { MakeVuexModule } from "vue-typescript-util";
import { registeActions, registeMutations } from "../..";
import { actions } from "./actions";
import { DomGetters, getters } from "./getters";
import { mutations } from "./mutations";
import { DomState, state } from "./state";


declare module "../.." {
  interface AppStoreStates {
    dom: DomState
  }
  interface AppStoreMutations {
    dom: typeof DomModel.mutations
  }
  interface AppStoreActions {
    dom: typeof DomModel.actions
  }
  interface AppStoreGetters {
    dom: DomGetters
  }
}
const domModuleInstance = {
  state,
  getters,
  mutations,
  actions
}
const DomModel = MakeVuexModule(domModuleInstance, 'dom', true);
export const ModuleMutations = DomModel.moduleMutations;

registeActions(DomModel.actions, 'dom');
registeMutations(DomModel.mutations, 'dom');


export default DomModel.module;