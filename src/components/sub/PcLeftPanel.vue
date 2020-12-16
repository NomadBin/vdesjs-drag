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
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i></span>
        <h5>多媒体组件</h5>
        <draggable
          class="Component"
          :list="mediaComponents"
          :clone="cloneCompoents"
          :options="{
            sort: false,
          }"
          :group="{ name: 'components', pull: 'clone', put: false }"
        >
          <component-container
            v-for="(item, i) in mediaComponents"
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
              value: "25",
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
              value: "16",
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
                  { name: "导航项1", url: "http://www.baidu.com" },
                  { name: "导航项2", url: "http://www.baidu.com" },
                ],
              },
            },
          ],
        },
        {
          name: "图文",
          id: "唯一值",
          componentName: "ImageText",
          propValues: [
            {
              label: "数据列表",
              key: "data",
              type: "table",
              value: {
                struct: [
                  {
                    label: "标题",
                    key: "name",
                    type: "text",
                  },
                  {
                    label: "描述",
                    key: "desc",
                    type: "text",
                  },
                  {
                    label: "图片",
                    key: "imageUrl",
                    type: "imageStore",
                  },
                ],
                data: [
                  {
                    name: "标题1",
                    desc: "这是描述",
                    imageUrl:
                      "https://gitee.com/static/images/logo-black.svg?t=158106664",
                  },
                  {
                    name: "标题2",
                    desc: "这是描述",
                    imageUrl:
                      "https://gitee.com/static/images/logo-black.svg?t=158106664",
                  },
                  {
                    name: "标题3",
                    desc: "这是描述",
                    imageUrl:
                      "https://gitee.com/static/images/logo-black.svg?t=158106664",
                  },
                ],
              },
            },
            {
              label: "图文项背景",
              key: "boxBg",
              type: "color",
              value: "#fff",
            },
            {
              label: "列数选择",
              key: "colNum",
              type: "num",
              value: "3",
            },
          ],
          templates: {
            chooseKey: "sxpl",
            data: [
              {
                // 预览图
                previewImg:
                  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
                // 根据这个字段判断模板类型
                key: "sxpl",
                name: "上下排列",
              },
              {
                // 预览图
                previewImg:
                  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
                // 根据这个字段判断模板类型
                key: "zypl",
                name: "左右排列",
              },
            ],
          },
          events: [
           
          ],
        },
        {
          name: "板块",
          id: "唯一值",
          componentName: "Plate",
          mStyle: {},
          mClass: [],
          propValues: [
            {
              label: "内边距",
              key: "padding",
              type: "distance",
              // 上右下左
              value: [5, 5, 5, 5],
            },
            {
              label: "高度",
              key: "height",
              type: "numUnit",
              value: {
                num: 500,
                unit: "px",
              },
            },
            {
              label: "背景图片",
              key: "bgImage",
              type: "imageStore",
              value: "",
            },
          ],

          // 板块中的组件存放
          cols: [
            {
              list: [],
            },
          ],
        },
        {
          name: "布局",
          id: "唯一值",
          componentName: "PcLayout",
          mStyle: {},
          mClass: [],
          propValues: [
            {
              label: "列配置项",
              key: "col",
              value: "正真的值在cols中",
              type: "col",
            },
          ],
          cols: [
            {
              span: 4,
              list: [],
            },
            {
              span: 4,
              list: [],
            },
            {
              span: 4,
              list: [],
            },
          ],
        },
        {
          name: "富文本",
          id: "唯一值",
          componentName: "RichText",
          mStyle: {},
          mClass: [],
          propValues: [
            {
              label: "富文本中的html",
              key: "htmlValue",
              value: "",
              type: "hidden",
            },
          ],
        },
      ],
      mediaComponents: [
        {
          name: "轮播图",
          id: "唯一值",
          componentName: "Swiper",
          jsCode: true,
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
                    type: "text",
                  },
                  {
                    label: "图片链接",
                    key: "url",
                    type: "imageStore",
                  },
                ],
                //数据
                data: [
                  {
                    name: "test1",
                    url:
                      "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                  },
                  {
                    name: "test2",
                    url:
                      "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                  },
                  {
                    name: "test3",
                    url:
                      "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                  },
                ],
              },
            },
            {
              label: "轮播图容器高度",
              key: "swiperHeight",
              type: "numUnit",
              value: {
                num: 21,
                unit: "rem",
              },
            },
            {
              label: "轮播图容器宽度",
              key: "swiperWidth",
              type: "numUnit",
              value: {
                num: 100,
                unit: "%",
              },
            },
            {
              label: "轮播图切换效果",
              key: "effect",
              type: "select",
              value: {
                chooseValue: "fade",
                data: [
                  {
                    value: "fade",
                    label: "fade",
                  },
                  {
                    value: "cube",
                    label: "cube",
                  },
                  {
                    value: "coverflow",
                    label: "coverflow",
                  },
                  {
                    value: "flip",
                    label: "flip",
                  },
                ],
              },
            },
            {
              label: "轮播点大小",
              key: "paginationSize",
              type: "num",
              value: "15",
            },
          ],
        },
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
      newObj.mode = this.cMode;
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
