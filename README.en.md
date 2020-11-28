[中文](./README.md) | English

<h1 align="center">vdesjs</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg" />
  <a href="https://www.jianshu.com/c/061d0ea33f2d" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## Introduction :loudspeaker: :loudspeaker:

> vdesjs is a visual drag and drop, code generation tool based on vue technology stack. We provide detailed documentation to help you understand the implementation principles of our tools, and you can easily extend your own code generation components based on vdesjs.

<img src="./src/assets/showHow.gif" alt="show animation" />

## Technical Selection :computer: :computer:
| Technology | Description |
| ------------------------------------------------- --------------- | ---------------------------------- -------------------------------------------------- ------------------------------------------ |
| [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable) | Vue drag and drop component based on Sortable.js |
| vuex | State management tool (a simple understanding is to maintain vue's public variables for global use) |
| [clipboard.js](https://github.com/zenorocha/clipboard.js) | A plugin to copy text to the clipboard |
| [element-ui](https://element.eleme.io/#/en-US) | Desktop UI framework based on Vue.js 2.0 |
| [vant](https://vant-contrib.gitee.io/vant/) | Youzan front-end team open source mobile terminal component library (we select some vant components and use them as drag components on the left of vdesjs) |
| [handlebars](https://github.com/handlebars-lang/handlebars.js) | js template engine (the code generation template of the drag-and-drop component on the left of vdesjs select handlebars as the template engine. If you want to write your own template, you can Refer to the handlerbars grammar for writing) |
| [vue-codemirror](https://github.com/surmon-china/vue-codemirror) | Code editor (use it as an editor for vdesjs code display) |

## Project directory structure
<pre>
vdesjs
├── build
├── config
├── src
│ ├── assets resource storage directory
│ │ ├── basics basic component resources
│ │ ├── business business component resources
│ │ ├── feeback feedback component resources
│ │ ├── form form component resource
│ │ ├── nav navigation component resources
│ │ └── show Show component resources
│ ├── common common code
│ │ ├── css public css
│ │ └── js public js
│ ├── components catalog
│ │ ├── basics basic components in the left drag panel
│ │ ├── business components in the drag panel on the left
│ │ ├── feeback The feedback component in the left drag panel
│ │ ├── form components in the drag panel on the left side of the form
│ │ ├── nav The navigation component in the left drag panel
│ │ ├── pcomp right property bar independent component
│ │ ├── show display components in the drag panel on the left
│ │ └── sub implements subcomponents of vdesjs
│ ├── handlebars template code storage directory
│ │ └── template
│ │ ├── basic basic component template code
│ │ ├── feeback feedback component template code
│ │ ├── form form component template code
│ │ ├── methods method template code under methods script tag
│ │ ├── nav navigation component template code
│ │ └── show show component template code
│ ├── page routing page
│ ├── router routing configuration
│ └── store vuex configuration
└── static
</pre>

## Steps to extend components :electric_plug: :electric_plug:
* 1. Write the json data structure of the left component
* 2. Write components and introduce components.
* 3. Write code to generate templates
* For detailed steps, please refer to the reference document below: [vdesjs extends its own components](https://www.jianshu.com/p/e22f7158b863)

## Reference documents :notebook: :notebook:
* [vdesjs realization principle](https://www.jianshu.com/p/8b28e71e3d12)
* [vdesjs extends its own components](https://www.jianshu.com/p/e22f7158b863)


## Continuous upgrade
The project will continue to be maintained and upgraded. If you encounter any bugs in use, or have any good suggestions about this project, you can contact the author.


## Technical feedback exchange group :telephone_receiver: :telephone_receiver:
<img src="./src/assets/qqConcat.JPG" alt="1125390832" />

* qq group number: 1125390832


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