import './index.scss';
import Vue, { CreateElement, VNode } from "vue";
import { Component, Prop } from "vue-property-decorator"
import { VueComponent } from "internal/declare";
import { UserTokenCache } from 'configs/cache';
import { RouteName } from 'configs/router';

export type IndexPageProps = {};

@Component
export class IndexPage extends VueComponent<IndexPageProps>{


  render(h: CreateElement) {
    return (<div class="vas-wrap is-index-page">
      page index
    </div>)
  }

  get isLogined() {
    return this.$cache.get(UserTokenCache) != null;
  }


  mounted() { }

  created() {
    // this.$resize.active(this.resize)
  }


}