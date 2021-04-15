中文 | [English](./README.en.md)

<h1 align="center">vdesjs</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.1-blue.svg" />
  <a href="https://www.jianshu.com/c/061d0ea33f2d" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## 介绍 :loudspeaker: :loudspeaker:

> vdesjs是一款基于vue技术栈，可视化拖拽，代码生成工具。我们提供详细的文档来帮助您理解我们工具的实现原理，并且您可以方便的基于vdesjs来扩展您自己的代码生成组件。

<img src="./src/assets/showHow.gif" alt="演示动图" />


## 技术选型 :computer: :computer:
| 技术                                                             | 描述                                                                                                                           |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)     | 基于 Sortable.js 的 Vue 拖放组件                                                                                               |
| vuex                                                             | 状态管理工具(简单理解就是维护vue的公共变量，供全局使用)                                                                        |
| [clipboard.js](https://github.com/zenorocha/clipboard.js)        | 将文本复制到剪贴板的插件                                                                                                       |
| [element-ui](https://element.eleme.cn/#/zh-CN)                   | 基于Vue.js 2.0 的桌面端UI框架                                                                                                  |
| [vant](https://vant-contrib.gitee.io/vant/)                      | 有赞前端团队开源的移动端组件库 (我们选择部分vant组件，将其作为vdesjs左侧拖拽组件)                                              |
| [handlebars](https://github.com/handlebars-lang/handlebars.js)   | js模板引擎 (vdesjs左侧拖拽组件的代码生成模板选择handlebars作为模板引擎。如果想自己编写生成模板，可参照handlerbars语法进行编写) |
| [vue-codemirror](https://github.com/surmon-china/vue-codemirror) | 代码编辑器(用其作为vdesjs代码显示的编辑器)                                                                                     |
|[file-save.js](https://github.com/eligrey/FileSaver.js)| 将代码下载至本地 |
|[js-beautify](https://github.com/beautify-web/js-beautify)| 对生成的代码进行格式美化 |
## 项目目录结构
``` html

vdesjs
├── build
├── config
├── docs vuepress文档
│   ├── cooperation
│   └── guide
├── src
│   ├── assets 资源存放目录
│   │   ├── h5 h5模式
│   │   │   ├── basics 基础组件资源
│   │   │   ├── business 业务组件资源
│   │   │   ├── feeback 反馈组件资源
│   │   │   ├── form 表单组件资源
│   │   │   ├── nav 导航组件资源
│   │   │   └── show 展示组件资源
│   │   ├── icon
│   │   └── pc pc模式
│   │       └── basics
│   ├── common
│   │   ├── css 公共css
│   │   └── js 公共js
│   │       ├── h5
│   │       └── pc
│   ├── components 组件目录
│   │   ├── componentLib 左侧面板json数据存放
│   │   ├── h5 h5模式组件
│   │   │   ├── basics 左侧拖拽面板中的基础组件
│   │   │   ├── business 左侧拖拽面板中的业务组件
│   │   │   ├── feeback ...
│   │   │   ├── form ...
│   │   │   ├── nav ...
│   │   │   └── show ...
│   │   ├── pc pc模式组件
│   │   │   ├── basics
│   │   │   └── media
│   │   ├── pcomp 右侧属性栏独立组件
│   │   └── sub 实现vdesjs的子组件
│   ├── handlebars 模板代码存放目录
│   │   ├── helpers handlebars自定义helper
│   │   └── template
│   │       ├── h5 h5模式模板
│   │       └── pc pc模式模板
│   ├── mixins 混入
│   ├── page 路由页面
│   ├── preview 用于预览模式的组件
│   ├── router 路由配置
│   └── store vuex配置
└── static

```

## 扩展组件步骤 :electric_plug: :electric_plug:
* 1.编写左侧组件json数据结构
* 2.编写组件，引入组件。
* 3.编写代码生成模板
* 如需详细步骤请参阅vdesjs官网

## 参考文档 :notebook: :notebook:
官方文档： http://china-bin.gitee.io/vdesjs/
预览地址： http://china-bin.gitee.io/vdesjs/demo/#/

## 持续升级
项目会持续维护升级，如您在使用中与到任何bug，或者关于本项目有任何好的建议都可以联系作者。


## 技术反馈交流群 :telephone_receiver: :telephone_receiver:
<img src="./src/assets/qqConcat.JPG" alt="1125390832" />

* qq群号: 1125390832


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
## 已完成功能
1. 清空画布
2. 生成vue代码
3. h5端vant组件可拖拽
4. 生成JSON代码
5. h5模式预览
6. 完成扩展pc响应式布局组件
7. 下载html文件至本地
8. 制作vdesjs官网与演示demo
9. 添加自由画布模式（自由画布模式可自由拖拽更改组件大小、布局、并且有标线对齐功能、历史记录、组合组件等功能）

## 加入计划功能 (欢迎补充提交建议)


## 使用场景描述
1. 假如我想基于vant组件开发移动端h5页面，但是我又不想一个个的写代码，那么就可以使用vdesjs从左侧拖拽组件并编辑属性。点击生成vue代码。这个代码就可以复制到我们的项目中。（这个生成代码应该是非常便于开发的，理论上跟我们手写的代码相差无几，如果这个生成的代码有问题，都可以根据handlebars模板语法去自己手动修改组件所对应的代码模板）

## 开源地址
* [Gitee](https://gitee.com/china-bin/vdesjs)
* [github](https://github.com/china-bin/vdesjs)
