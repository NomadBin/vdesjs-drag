中文 | [English](./README.en.md)

<h1 align="center">vdesjs</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg" />
  <a href="https://www.jianshu.com/u/4514d0e6249e" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## 介绍 :loudspeaker: :loudspeaker:

> vdesjs是一款基于vue技术栈，可视化拖拽，代码生成工具。我们提供详细的文档来帮助您理解我们工具的实现原理，并且您可以方便的基于vdesjs来扩展您自己的代码生成组件。

<img src="./src/assets/showHow.gif" alt="演示动图" />

## 技术选型
| 技术                                                             | 描述                                                                                                                           |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)     | 基于 Sortable.js 的 Vue 拖放组件                                                                                               |
| vuex                                                             | 状态管理工具(简单理解就是维护vue的公共变量，供全局使用)                                                                        |
| [clipboard.js](https://github.com/zenorocha/clipboard.js)        | 将文本复制到剪贴板的插件                                                                                                       |
| [element-ui](https://element.eleme.cn/#/zh-CN)                   | 基于Vue.js 2.0 的桌面端UI框架                                                                                                  |
| [vant](https://vant-contrib.gitee.io/vant/)                      | 有赞前端团队开源的移动端组件库 (我们选择部分vant组件，将其作为vdesjs左侧拖拽组件)                                              |
| [handlebars](https://github.com/handlebars-lang/handlebars.js)   | js模板引擎 (vdesjs左侧拖拽组件的代码生成模板选择handlebars作为模板引擎。如果想自己编写生成模板，可参照handlerbars语法进行编写) |
| [vue-codemirror](https://github.com/surmon-china/vue-codemirror) | 代码编辑器(用其作为vdesjs代码显示的编辑器)                                                                                     |

## 项目目录结构
<pre>
vdesjs
├── build
├── config
├── src
│   ├── assets 资源存放目录
│   │   ├── basics 基础组件资源
│   │   ├── business 业务组件资源
│   │   ├── feeback 反馈组件资源
│   │   ├── form 表单组件资源
│   │   ├── nav 导航组件资源
│   │   └── show 展示组件资源
│   ├── common 公共代码
│   │   ├── css 公共css
│   │   └── js 公共js
│   ├── components 组件目录
│   │   ├── basics 左侧拖拽面板中的基础组件
│   │   ├── business 左侧拖拽面板中的业务组件
│   │   ├── feeback 左侧拖拽面板中的反馈组件
│   │   ├── form 左侧拖拽面板中的表单组件
│   │   ├── nav 左侧拖拽面板中的导航组件
│   │   ├── pcomp 右侧属性栏独立组件
│   │   ├── show 左侧拖拽面板中的展示组件
│   │   └── sub 实现vdesjs的子组件
│   ├── handlebars 模板代码存放目录
│   │   └── template
│   │       ├── basic 基础组件模板代码
│   │       ├── feeback 反馈组件模板代码
│   │       ├── form 表单组件模板代码
│   │       ├── methods script标签下的methods方法模板代码
│   │       ├── nav 导航组件模板代码
│   │       └── show 展示组件模板代码
│   ├── page 路由页面
│   ├── router 路由配置
│   └── store vuex配置
└── static
</pre>

## 扩展组件步骤


## 参考文档
* [vdesjs实现原理](http)
* [vdejs扩展自己的组件](http)


## 持续升级
项目会持续维护升级，如您在使用中与到任何bug，或者关于本项目有任何好的建议都可以联系作者。


## 技术反馈交流群



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```