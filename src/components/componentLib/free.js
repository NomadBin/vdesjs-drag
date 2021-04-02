export const basicCompoents = [
    {
      name: "按钮",
      id: "唯一值",
      componentName: "VanButton",
      mStyle: {
        width: 100,
        height: 100,
      },
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
      name: "单元格",
      id: "唯一值",
      componentName: "VanCell",
      mStyle: {
        width: 100,
        height: 100,
      },
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
      mStyle: {
        width: 100,
        height: 100,
      },
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
      mStyle: {
        width: 100,
        height: 100,
      },
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