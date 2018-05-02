import './index.scss'
import Vue, { CreateElement, VNode } from "vue";
import { Provide, Component, Watch } from "vue-property-decorator"
import { AppStore } from 'store';
import { RouteName } from 'configs/router';
import { UserTokenCache } from 'configs/cache';

@Component
export default class AppWrap extends Vue {

  render(h: CreateElement) {
    return <div class="vas-wrap">
      <keep-alive include={[RouteName.Index]}>
        <router-view />
      </keep-alive>
    </div>
  }

  get isLogin() {
    return (this.$store as AppStore).state.user.isLogin;
  }

  mounted() {
  }

  created() {

  }

}