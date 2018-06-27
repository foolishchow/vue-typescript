# vue-typescript

-----
> 使用typescript搭建的vue全家桶项目

- webpack   模块化开发
- cache 缓存配置  解决缓存key多而乱的问题，实现缓存存取的type check
- ajax 接口配置  实现请求与返回类型的绑定，实现数据请求的type check

## 目录结构
```
.
├── components   //组件目录
├── configs
│   ├── cache.ts  //存放cache key 配置文件
│   ├── configAjax.ts  // ajax 拦截以及参数配置
│   ├── index.html    // html-webpack-plugin 模板文件
│   ├── inteface.ts   // ajax 请求配置文件  照着示例可以在pages/cache/index.tsx 看到效果
│   ├── responses
│   │   ├── common.ts // ajax 请求常用的数据类型定义
│   │   └── login.ts  // ajax 请求常用的数据类型定义
│   └── router.ts   // vue-router 定义页面
├── images
├── index.ts   // entry
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
