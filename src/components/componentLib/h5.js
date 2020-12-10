/**
 * @description: Custom add components
 *
 *  You can add your own components to existing classes
 *
 *  Every component is a object of the class
 *
 *  {
 *    name:      // component name
 *    id:        // Is it unique key
 *    propValues: [    // Setting options owned by this component (onject)
 *                  {
 *                     label:   // setting name
 *                     key:     // setting key
 *                     componentName:  // the component you create in h5
 *                     type:    // setting type ( iconList | color | imageStore | hidden | ... )
 *                     value:   // setting value (it can be object or string)
 *                     isModel: // v-model  ( True | False )
 *                  }
 *                ]
 *  }
 */

export const basicCompoents = [
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
        type: "text"
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
              label: "主要按钮"
            },
            {
              value: "info",
              label: "信息按钮"
            },
            {
              value: "default",
              label: "默认按钮"
            },
            {
              value: "warning",
              label: "警告按钮"
            },
            {
              value: "danger",
              label: "危险按钮"
            }
          ]
        }
      },
      {
        label: "按钮颜色",
        key: "color",
        type: "color",
        value: "#656262"
      }
    ]
  },
  {
    name: "布局",
    id: "唯一值",
    componentName: "VanLayout",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "列配置项",
        key: "col",
        value: "正真的值在cols中",
        type: "col"
      }
    ],
    cols: [
      {
        span: 8,
        list: []
      },
      {
        span: 8,
        list: []
      },
      {
        span: 8,
        list: []
      }
    ]
  },
  {
    name: "单元格",
    id: "唯一值",
    componentName: "VanCell",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "标题",
        key: "title",
        value: "标题",
        type: "text"
      },
      {
        label: "内容",
        key: "content",
        value: "内容",
        type: "text"
      }
    ]
  },
  {
    name: "图标",
    id: "唯一值",
    componentName: "VanIcon",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "图标列表",
        key: "icon",
        value: "chat-o",
        type: "iconList"
      },
      {
        label: "颜色",
        key: "color",
        value: "",
        type: "color"
      },
      {
        label: "大小",
        key: "size",
        value: "30",
        type: "num"
      }
    ]
  },
  {
    name: "图片",
    id: "唯一值",
    componentName: "VanImage",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "图片",
        key: "image",
        value: "",
        type: "imageStore"
      },
      {
        label: "宽度",
        key: "width",
        value: {
          num: 100,
          unit: "%"
        },
        type: "numUnit"
      },
      {
        label: "高度",
        key: "height",
        value: {
          num: 100,
          unit: "px"
        },
        type: "numUnit"
      }
    ]
  }
];

export const formCompoents = [
  {
    name: "日历",
    id: "唯一值",
    componentName: "VanCalendar",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "日期类型",
        key: "dateType",
        type: "select",
        value: {
          chooseValue: "single",
          data: [
            {
              value: "single",
              label: "单个日期"
            },
            {
              value: "multiple",
              label: "多个日期"
            },
            {
              value: "range",
              label: "日期区间"
            }
          ]
        }
      },
      {
        label: "快捷选择",
        key: "kjxz",
        type: "switch",
        value: false
      },
      {
        label: "颜色",
        key: "color",
        type: "color",
        value: ""
      },
      {
        label: "数据绑定",
        key: "data",
        isModel: true,
        value: ""
      }
    ]
  },
  {
    name: "复选框",
    id: "唯一值",
    componentName: "VanCheckbox",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "默认是否选中",
        key: "checked",
        type: "switch",
        value: false,
        // isModel代表属性为v-model的属性
        isModel: true
      }
    ]
  },
  {
    name: "输入框",
    id: "唯一值",
    componentName: "VanField",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "默认输入值",
        key: "model",
        type: "text",
        value: "",
        isModel: true
      },
      {
        label: "标题",
        key: "label",
        type: "text",
        value: "标题"
      },
      {
        label: "提示",
        key: "placeholder",
        type: "text",
        value: "提示"
      }
    ]
  }
];

export const feebackCompoents = [
  {
    name: "分享面板",
    id: "唯一值",
    componentName: "VanShareSheet",
    mStyle: {},
    mClass: [],
    description: "双击可进行预览",
    propValues: [
      {
        label: "数据列表",
        key: "data",
        type: "table",
        isModel: true,
        value: {
          // 数据结构 (结构中第一个元素为该table组件列表中显示的名称)
          struct: [
            {
              label: "名称",
              key: "name",
              type: "text"
            },
            {
              label: "图标",
              key: "icon",
              type: "imageStore"
            }
          ],
          //数据
          data: [
            { name: "微信", icon: "wechat" },
            { name: "微博", icon: "weibo" },
            { name: "复制链接", icon: "link" },
            { name: "分享海报", icon: "poster" },
            { name: "二维码", icon: "qrcode" }
          ]
        }
      },
      {
        label: "隐藏标签",
        key: "showShare",
        type: "hidden",
        value: false,
        isModel: true
      }
    ]
  }
];

export const showCompoents = [
  {
    name: "通知栏",
    id: "唯一值",
    componentName: "VanNoticebar",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "显示文本",
        key: "title",
        value: "默认显示文本",
        type: "text"
      },
      {
        label: "文本颜色",
        key: "color",
        type: "color",
        value: "#656262"
      }
    ]
  },
  {
    name: "轮播",
    id: "唯一值",
    componentName: "VanSwiper",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "数据列表",
        key: "data",
        type: "table",
        value: {
          // 数据结构 (结构中第一个元素为该table组件列表中显示的名称)
          struct: [
            {
              label: "名称",
              key: "name",
              type: "text"
            },
            {
              label: "图片链接",
              key: "url",
              type: "imageStore"
            }
          ],
          //数据
          data: [
            {
              name: "test1",
              url:
                "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            },
            {
              name: "test2",
              url:
                "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            },
            {
              name: "test3",
              url:
                "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            }
          ]
        }
      },
      {
        label: "高度",
        key: "height",
        value: {
          num: 150,
          unit: "px"
        },
        type: "numUnit"
      }
    ]
  }
];

export const navCompoents = [
  {
    name: "宫格",
    id: "唯一值",
    componentName: "VanGrid",
    mStyle: {},
    mClass: [],
    propValues: [
      {
        label: "数据列表",
        key: "data",
        type: "table",
        value: {
          // 数据结构 (结构中第一个元素为该table组件列表中显示的名称)
          struct: [
            {
              label: "名称",
              key: "name",
              type: "text"
            },
            {
              label: "图标",
              key: "icon",
              type: "imageStore"
            }
          ],
          //数据
          data: [
            { name: "文字", icon: "" },
            { name: "文字", icon: "" },
            { name: "文字", icon: "" },
            { name: "文字", icon: "" }
          ]
        }
      }
    ]
  }
];

export const businessCompoents = [
  {
    name: "商品规格",
    id: "唯一值",
    componentName: "VanSku",
    mStyle: {},
    mClass: [],
    propValues: []
  }
];
