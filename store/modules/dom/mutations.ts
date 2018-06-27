import { MutationModule, StoreMutations } from "../..";
import { DomState } from "./state";
import { getMutatationName } from "vue-typescript-util";


type DomMutations = {
  setActive: number
}
export const mutations: MutationModule<DomMutations, DomState> = {
  setActive(state, payload) {
    state.active = payload;
  }
}

