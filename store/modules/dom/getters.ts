import { GetterModule } from "../..";
import { DomState } from "./state";

export type DomGetters = {
  hasActive: boolean;
}
export const getters: GetterModule<DomGetters, DomState> = {
  hasActive(state) {
    return state.active != 0
  }
}

