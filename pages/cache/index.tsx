import { BasicInfo, BasicLogin } from "configs/inteface";
import { CreateElement } from "vue";
import { Component } from "vue-property-decorator";
import { VueComponent } from "vue-typescript-util";
import { AppStore } from "../../store";

export type CachePageProps = {};

@Component
export class CachePage extends VueComponent<CachePageProps, AppStore>{

  private render(h: CreateElement) {
    return (<div class=""></div>)
  }

  private mounted() { }

  private created() {

  }

  cache() {
    //type the Following code you will see type check
    /*
    let cache = this.$cache.get(UserTokenCache);
    if (cache != null) {
      console.info(cache.token);
      console.info(cache.user)
    }
    */
  }

  ajax() {
    // Following will has Erorr
    // this.$ajax.get(BasicLogin)
    this.$ajax.post(BasicLogin, {
      clientId: "pc",
      loginName: '',
      password: '',
      validateCode: '',
      validateToken: ''
    }).then(res => {
      /* res.code;
      res.msg;
      res.success;
      res.data; */
    })
    // this.$ajax.post(BasicInfo)
    this.$ajax.get(BasicInfo, { token: '' }).then(res => {
      /* res.code;
      res.msg;
      res.success; */
    })
  }



}