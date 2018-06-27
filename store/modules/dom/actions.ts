import { ActionModule } from "../..";
import { DomGetters } from "./getters";
import { DomState } from "./state";
import { StoreMutations } from "../root";
import { ModuleMutations } from ".";

type DomActions = {
  clearActive: boolean
}

export const actions: ActionModule<DomActions, DomState, DomGetters> = {
  clearActive(context, payload) {
    if (payload) {
      // commit from root
      context.commit(StoreMutations.dom.setActive, 0, { root: true })
    } else {
      // commit from module
      context.commit(ModuleMutations.setActive, 0)
      console.info(`commit from module`)
    }
  }
}

