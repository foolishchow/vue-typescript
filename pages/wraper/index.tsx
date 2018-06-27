import { RouteName } from 'configs/router';
import { AppStore } from 'store';
import { CreateElement } from "vue";
import { Component, Watch } from "vue-property-decorator";
import { VueComponent } from 'vue-typescript-util';
import './index.scss';

@Component
export default class AppWrap extends VueComponent<any, AppStore> {

  pageName: RouteName = RouteName.Vuex;

  render(h: CreateElement) {
    return <div>
      <div class="app-router-name">
        page => {this.pageName}
        <span class="app-router-name__btns">
          <button on-click={() => { this.pageName = RouteName.Vuex }}>vuex</button>
        </span>
        <p>location:'pages/{this.pageName}/index.tsx'</p>
      </div>
      <div class="app-page">
        <router-view />
      </div>

    </div>
  }

  @Watch('pageName')
  pageNameChange(val: RouteName) {
    this.$router.push({ name: val })
  }

}