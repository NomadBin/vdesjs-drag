<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>bootstrap组件</h5>
        <draggable
          class="Compoent"
          :list="basicCompoents"
          :clone="cloneCompoents"
          :options="{
            sort: false,
          }"
          :group="{ name: 'components', pull: 'clone', put: false }"
        >
          <component-container
            v-for="(item, i) in basicCompoents"
            :key="i"
            :componentName="item.componentName"
            :name="item.name"
          >
          </component-container>
        </draggable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ComponentContainer from "@/components/pc/ComponentContainer.vue";

import curList from "@/mixins/curList";


export default {
  mixins: [curList],
  components: {
    draggable,
    ComponentContainer,
  },
  data() {
    return {
      basicCompoents: [
        {
          name: "导航栏",
          id: "唯一值",
          componentName: "Navbar",
          mStyle: {},
          mClass: [],
          propValues: [
            {
              label: "导航栏背景颜色",
              key: "navbarBg",
              type: "color",
              value: "#eee",
            },
            {
              label: "导航栏高度",
              key: "navbarHeight",
              type: "numUnit",
              value: {
                num: 75,
                unit: "px",
              },
            },
            {
              label: "导航项颜色",
              key: "itemBg",
              type: "color",
              value: "#000000",
            },
            {
              label: "导航项悬停颜色",
              key: "itemHoverBg",
              type: "color",
              value: "#303BB3",
            },
            {
              label: "logo图片",
              key: "logo",
              type: "imageStore",
              value:
                "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            },
            {
              label: "logo图片大小",
              key: "logoSize",
              type: "num",
              value: "25"
            },
            {
              label: "logo右间距",
              key: "logoRightSpace",
              type: "numUnit",
              value: {
                num: 6,
                unit: "px",
              },
            },
            {
              label: "导航项间距",
              key: "navItemSpace",
              type: "numUnit",
              value: {
                num: 1,
                unit: "px",
              },
            },
            {
              label: "导航项顶部间距",
              key: "navItemTopSpace",
              type: "numUnit",
              value: {
                num: 0,
                unit: "px",
              },
            },
            {
              label: "字体大小",
              key: "fontSize",
              type: "num",
              value: "16"
            },
            {
              label: "数据列表",
              key: "data",
              type: "table",
              value: {
                struct: [
                  {
                    label: "导航栏名称",
                    key: "name",
                    type: "text",
                  },
                  {
                    label: "导航栏地址",
                    key: "url",
                    type: "text",
                  },
                ],
                data: [
                  {name: '导航项1', url: 'http://www.baidu.com'},
                  {name: '导航项2', url: 'http://www.baidu.com'},
                ]
              }
            }
          ],
        },
        {
          name: "图文",
          id: "唯一值",
          componentName: "ImageText",
          propValues: [
            {
              label: "模板",
              key: "template",
              type: "template",
              value: [
                {
                  // 预览图
                  previewImg: "",
                  // 根据这个字段判断模板类型
                  key: "",
                  name: "名称"
                }
              ]
            }
          ]
        }
      ],
    };
  },

  computed: {
    globalId() {
      return this.$store.state.globalId;
    },
  },

  methods: {
    cloneCompoents: function (cloneObj) {
      let newObj = JSON.parse(JSON.stringify(cloneObj));
      this.$store.commit("globalIdInc");
      newObj.id = this.globalId;
      newObj.mode = this.cMode
      console.log(JSON.stringify(cloneObj));
      return newObj;
    },
  },
};
</script>
<style>
.Compoent {
  display: flex;
  flex-wrap: wrap;
}
</style>
