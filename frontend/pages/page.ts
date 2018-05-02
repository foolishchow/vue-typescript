import Vue, { CreateElement } from "vue";
import { Component, Provide, Prop } from "vue-property-decorator"
import { VueComponent } from "internal/declare";
import { AppStore } from "store";

@Component
export class VuePageMixins extends Vue {
  activated() {
    console.info(this.$route.path + ' activated!')
  }

  deactivated() {
    // console.info(this.$route.path + ' deactivated!')
  }
}

export interface VuePage {
  $store: AppStore;
}
export class VuePage extends Vue {

}
