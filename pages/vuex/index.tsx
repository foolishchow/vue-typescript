import { PageComponent, StoreActions, StoreMutations } from 'store';
import { CreateElement } from "vue";
import { Component } from "vue-property-decorator";
import './index.scss';

export type VuexPageProps = {};

@Component
export class VuexPage extends PageComponent {

  render(h: CreateElement) {
    return (<div>
      <section class="app-section">
        <div class="title">namespaced module (store/module/dom)</div>
        <div class="body">
          <p><span class="subtitle"> mapstate </span>Active: {this.Active}  </p>
          <p><span class="subtitle">mapgetter</span>hasActive: {this.hasActive}  </p>
          <p>
            <span class="subtitle">mutations</span>
            <button on-click={() => { this.Active++ }}>add Active</button>
          </p>
          <p>
            <span class="subtitle">action</span>
            <button on-click={() => this.clearActive(true)}>clear ( do commit from root )</button>
            &nbsp;&nbsp;
            <button on-click={() => this.clearActive()}>clear ( do commit from module ) </button>
          </p>
        </div>
      </section>
      <section class="app-section">
        <div class="title">common module (store/module/event)</div>
        <div class="body">
          <p><span class="subtitle"> mapstate </span>name: <input type="text" v-model={this.name} />  </p>
          <p><span class="subtitle">mapgetter</span>length: {this.nameLength}  </p>
          <p>
            <span class="subtitle">action</span>
            <button on-click={() => this.clearName(true)}>clear ( do commit from root )</button>
            &nbsp;&nbsp;
            <button on-click={() => this.clearName()}>clear ( do commit from module ) </button>
          </p>
        </div>
      </section>
    </div>)
  }

  // mapgetter
  get hasActive() {
    return this.$store.Getters.dom.hasActive;
  }

  // mapstate
  get Active() {
    return this.$store.state.dom.active;
  }

  // commit
  set Active(val: number) {
    this.$store.Commit(StoreMutations.dom.setActive, val)
  }

  // action dispatch
  clearActive(root: boolean = false) {
    this.$store.Dispatch(StoreActions.dom.clearActive, root);
  }

  get name() {
    return this.$store.state.event.name;
  }

  set name(val: string) {
    this.$store.Commit(StoreMutations.event.setName, val)
  }

  get nameLength() {
    return this.$store.Getters.nameLength;
  }

  clearName(root: boolean = false) {
    this.$store.Dispatch(StoreActions.event.clearName, root);
  }
}