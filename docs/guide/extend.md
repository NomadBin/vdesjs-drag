## 编写左侧组件json数据结构
左侧拖拽组件中需要编写数据结构，前往commoents/sub/LeftPanel.vue的data中可以看到挂载的组件json结构，这里以基础组件的按钮json对象为例：
```javascript
 basicCompoents: [
        {
          name: "按钮",
          id: "唯一值",
          componentName: "VanButton",
          mStyle: {},
          mClass: [],
          propValues: [
            {
              label: "标题",
              key: "title",
              value: "按钮",
              type: "text",
            },
            {
              label: "按钮类型",
              key: "type",
              type: "select",
              value: {
                chooseValue: "",
                data: [
                  {
                    value: "primary",
                    label: "主要按钮",
                  },
                  {
                    value: "info",
                    label: "信息按钮",
                  },
                  {
                    value: "default",
                    label: "默认按钮",
                  },
                  {
                    value: "warning",
                    label: "警告按钮",
                  },
                  {
                    value: "danger",
                    label: "危险按钮",
                  },
                ],
              },
            },
            {
              label: "按钮颜色",
              key: "color",
              type: "color",
              value: "#656262",
            },
          ],
        },
        
      ],
```
上述代码解析
* name 设置组件左侧面板中的展示名称
* componentName 设置组件的名称
* propValues 设置右侧面板的可以配置属性。每个项中的type属性决定右侧面板的类型。
  
### propsValues中的type类型
| 类型       | 描述                                                |
| ---------- | --------------------------------------------------- |
| text       | 文本框                                              |
| num        | 数值框                                              |
| select     | 选择框                                              |
| color      | 颜色选择器                                          |
| col        | 列配置项（为布局组件设置列的分配）                  |
| iconList   | 图标选择                                            |
| imageStore | 图片选择                                            |
| numUnit    | 用于宽度或者高度的选择，含有px、百分比、rem单位选择 |
| switch     | 开关切换                                            |
| table      | 数据列表（用户多资源列表配置）                      |
| hidden      | 不想右侧面板进行配置，但是代码生成需要                     |

## 编写组件，引入组件。
### 编写组件
组件的代码可以放入components中，这里按分类放入，比如基础组件放入 compoents/basics 下。这里以按钮组件为例，其代码如下:
```javascript
<template>
  <van-button
    :type="myItem.propValues[typeIndex].value.chooseValue"
    :color="myItem.propValues[colorIndex].value"
    >{{ myItem.propValues[titleIndex].value }}</van-button
  >
</template>
<script>
export default {
  props: {
    myItem: {},
  },

  data() {
    return {
      titleIndex: 0,
      typeIndex: 1,
      colorIndex: 2,
    };
  },
};
</script>
<style>
</style>
```
上述代码注意： 其中myItem是由父组件传入的对应其组件的json对象。

### 引入组件
在common/js下有improt*.js的文件，如为基础组件则是importBasics.js中引入。
importBasics.js的代码如下所示:
```javascript

import VanButton from"@/components/basics/VanButton.vue"
import VanButtonLogo from "@/assets/basics/按钮.png"

import VanCell from"@/components/basics/VanCell.vue"
import VanCellLogo from "@/assets/basics/单元格.png"

import VanIcon from"@/components/basics/VanIcon.vue"
import VanIconLogo from "@/assets/basics/图标.png"

import VanImage from"@/components/basics/VanImage.vue"
import VanImageLogo from "@/assets/basics/图片.png"




let basics = {
    components: {
        VanButton,
        VanCell,
        VanIcon,
        VanImage
    },
    data() {
        return {
            Logos: {
                "VanButton": VanButtonLogo,
                "VanCell": VanCellLogo,
                "VanIcon": VanIconLogo,
                "VanImage": VanImageLogo
            }
        }

    }
        
   
}

export default basics
``` 
参照上述结构即可引入组件。


## 扩展右侧属性面板类型
可能propsValues的type类型在vdesjs中并没有想要的，那么您可以自己扩展您需要的类型。 
* 右侧面板代码在 compoents/sub/RightPanel.vue下，其中包含对组件的判断，如要扩展组件需要先添加。
* 如果扩展的类型较为复杂，需要自定义子组件，则可放入compoents/pcomp下。
  
## 编写代码生成模板
代码生成选择了handlerbars作为模板引擎，用于将json数据根据每个组件对应编写的模板代码转换成可使用的代码。代码生成模板放在handlebars/template下，并且加入新增模板需要在handlebars/index.js下新增代码。



如需了解handlerbars语法可前去[handlebars中文网](https://www.handlebarsjs.cn/)。

这里展示编写vdesjs代码模板所必须的模板语法：

* 数据获取
```javascript    
    {{myItem.propValues.[1].value}}

    //
  ```
上述代码注意:  数据获取通过{{}}包围起来获取变量的值， 其中数组是通过.[index] 的方式来获取

* 循环
```javascript
{{#each myItem.propValues.[0].value.data}}
        <van-grid-item icon="{{icon}}" text="{{name}}" />
{{/each}}

```
上述代码注意： 注意在each中是有对应的上下文的，如果在each中想使用外部的上下文，可通过 ../ 来获取， 如
```
 {{../myItem.propValues.[1].value.num}}
```
 这样的形式。

* 判断
```javascript
  {{#compare myItem.propValues.[0].value.chooseValue '==' 'multiple'}}
  <van-cell title="选择多个日期" :value="date{{myItem.id}}" @click="show = true" />
    <van-calendar
      show-confirm="{{myItem.propValues.[1].value}}"
      color="{{myItem.propValues.[2].value}}"
      v-model="show{{myItem.id}}"
      type="multiple"
      @confirm="onConfirmMultiple{{myItem.id}}"
    />
  {{/compare}}
```
上述代码注意: handlebars原始是不支持判断语法的，vdesjs中是通过自定义helper来扩展判断的。

### 特殊情形
一般代码生成通过上述语法编写即可。但有一些特殊情形：

#### 需要生成v-model下的代码。需要在data下面去挂载变量。
* 在propValues对应属性的项下需要添加 isModel: ture，代表其是Model属性，那么vdesjs会将其属性挂载进代码生成的data{}中，如果v-mdoel属性并不需要由右侧面板配置，那么type可以设置为null。在代码生成模板下即可这样编写 
```
{{myItem.propValues.[0].key}}{{myItem.id}}
```
其中加入myItem.id是为了防止变量名重复。
#### 生成的代码包含methods
* 如果生成的代码包含methods方法，那么需要单独编写methods模板，模板放入handlebars/template/methods中，具体编写可自己阅读vdesjs中此文件夹下的代码，并且需要在handlebars/index.js引入这个methods.


