import { GetterModule, MutationModule, ActionModule, StoreMutations, registeActions, registeMutations } from "../..";
import { MakeVuexModule } from "vue-typescript-util";
export type EventState = {
  name: string;
}
const state = {
  name: ''
}

type EventGetters = {
  nameLength: number;
}
const getters: GetterModule<EventGetters, EventState> = {
  nameLength(state) {
    return state.name.length;
  }
}

type EventMutations = {
  setName: string
}
const mutations: MutationModule<EventMutations, EventState> = {
  setName(state, payload) {
    state.name = payload;
  }
}

type EventActions = {
  clearName: boolean
}

const actions: ActionModule<EventActions, EventState, EventGetters> = {
  clearName(context, payload) {
    if (payload) {
      // commit from root
      context.commit(StoreMutations.event.setName, '', { root: true })
    } else {
      // commit from module
      context.commit(ModuleMutations.setName, '')
      console.info(`commit from module`)
    }
  }
}

const moduleInstance = {
  state,
  getters,
  mutations,
  actions
}
const EventModule = MakeVuexModule(moduleInstance, 'event');
const ModuleMutations = EventModule.moduleMutations;
registeActions(EventModule.actions, 'event');
registeMutations(EventModule.mutations, 'event')
declare module "../.." {
  interface AppStoreStates {
    event: EventState
  }
  interface AppStoreGetters extends EventGetters { }
  interface AppStoreMutations {
    event: typeof EventModule.mutations
  }
  interface AppStoreActions {
    event: typeof EventModule.actions
  }
}

export default EventModule.module;



