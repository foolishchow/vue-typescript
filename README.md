# vue-typescript

-----
> 使用typescript搭建的vue全家桶项目

- cache 缓存配置   
  解决缓存key多而乱的问题，实现缓存存取的type check
  ```typescript
  // configs/cache.ts 配置
  import { CacheItem } from 'internal/cache/cache';
  export const UserTokenCache: CacheItem<{ user: string; token: string }> = 'user-token';

  // 任意页面
  import CacheManager from 'internal/cache'
  CacheManager.get(UserTokenCache) // { user: string; token: string }|null
  CacheManager.set(UserTokenCache,{user: string; token: string})

  //vue component
  import CacheManager from 'internal/cache'
  let cache = this.$cache.get(UserTokenCache);
  ```

- ajax 接口配置    
  实现请求与返回类型的绑定，实现数据请求的type check
  ```typescript
  // configs/interface.ts
  import { AjaxGetUriItem, AjaxPostUriItem } from 'internal/ajax';
  import { LoginResponse, LoginParam } from './responses/login';

  export const BasicLogin: AjaxPostUriItem<LoginResponse, LoginParam> = "/user-login";

  // vue component
  this.$ajax.get(BasicLogin) // Argument of type 'AjaxPostUriItem<LoginResponse, LoginParam, any>' is not assignable to parameter of type 'AjaxGetUriItem<LoginResponse, LoginParam, any>'.
  this.$ajax.post(BasicLogin)//ok
  this.$ajax.post(BasicLogin,data).then(res=>{}) // res is typed
  ```

- sass & BEM 实现   
  首先这段代码抄来的。  
  源代码在[element/packages/theme-chalk/src/mixins](https://github.com/ElemeFE/element/tree/dev/packages/theme-chalk/src/mixins)   
  BEM配置在`internal/styles/mixin/config.scss`
  ```
  $namespace: 'app'; //namespace 前缀
  $element-separator: '__'; // element 间隔
  $modifier-separator: '--'; // modifier 间隔
  $state-prefix: 'is-'; // state|when  前缀
  ```
  webpack中已经配置了alias
  ```json
  //package.json
  "alias": {
    "sass": "internal/styles",
    "scss": "internal/styles"
  }
  ```
  直接在scss中使用`@import '~s(c|a)ss/mixins';`就可以使用了

- webpack 配置    
  内置的http服务器是从网上copy的,但是现在也不记得在哪了.[找到补上]   
  使用了`webpack-chain`来配置,配置文件是`.webpackrc.ts`    
  至于如何加载和打包,代码实现在`.webpack`下   
  很多的配置写在`package.json`了,具体实现在`.webpackrc.ts`中。

- vuex 类型推导
  使用了本人写的一个简单的module[`vue-typescript-util`](https://github.com/foolishchow/vue-typescript-util)     
  具体实现可以看`store`目录下或者[移步](https://github.com/foolishchow/vue-typescript-util/demo)

## 目录结构
```
.
├── components   //组件目录
├── configs
│   ├── cache.ts  //存放cache key 配置文件
│   ├── configAjax.ts  // ajax 拦截以及参数配置
│   ├── index.html    // html-webpack-plugin 模板文件
│   ├── inteface.ts   // ajax 请求配置文件  照着示例可以在pages/cache/index.tsx 看到效果
│   ├── responses
│   │   ├── common.ts // ajax 请求常用的数据类型定义
│   │   └── login.ts  // ajax 请求常用的数据类型定义
│   └── router.ts   // vue-router 定义页面
├── images
├── index.ts   // entry
├── internal  //内置的一些
│   ├── ajax  //ajax 简单的封装
│   │   ├── ajax.ts
│   │   ├── config.ts
│   │   └── index.ts
│   ├── cache  //cookie和localstorage的adapter
│   │   ├── cache.ts
│   │   └── index.ts //=> expose cacheInstance
│   ├── declare.ts // declares 文件集合
│   ├── declares  // 存放一些没有declration的module 声明文件
│   │   ├── countup.js.d.ts
│   │   ├── index.d.ts
│   │   ├── vue-lazyload.d.ts
│   │   └── vue-swipe.d.ts
│   ├── index.ts
│   ├── styles //常用的样式 sass
│   │   ├── base.scss           // 基础移动端rem实现
│   │   ├── mixin               //sass mixins  copyed from element-ui
│   │   │   ├── config.scss     // BEM config
│   │   │   ├── function.scss   // BEM mixins  utils
│   │   │   └── var.scss        // sass 全部变量
│   │   ├── mixins.scss         // BEM mixins 实现
│   │   ├── reset-plat.scss     // resetcss  pc
│   │   └── reset.scss          // resetcss mobile
│   └── utils       //工具类
│       ├── common.ts
│       ├── data.ts
│       ├── date.js
│       ├── date.ts
│       ├── debounce.ts
│       ├── dom.ts
│       ├── enviroment.ts
│       ├── filter.ts
│       ├── index.ts
│       ├── plugin-install.ts
│       └── window.ts
├── jsx.d.ts                    //typescript jsx 基础类型配置 [important]
├── package.json
├── pages                       //router页面
│   ├── cache
│   │   └── index.tsx           //ajax 和 cache 代码效果页面
│   ├── vuex
│   │   ├── index.scss
│   │   └── index.tsx           //vuex 效果页面
│   └── wraper
│       ├── index.scss
│       └── index.tsx
├── store                       //vuex store config
│   ├── index.ts
│   └── modules
│       ├── dom
│       │   ├── actions.ts
│       │   ├── getters.ts
│       │   ├── index.ts
│       │   ├── mutations.ts
│       │   └── state.ts
│       ├── event
│       │   └── index.ts
│       └── root.ts
├── styles
│   ├── animation.scss
│   └── index.scss
├── tsconfig.json
└── yarn.lock
```
