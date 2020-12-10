<template>
  <div class="richText">
    <div ref="editor" @dblclick="dbEditor" class="text"></div>

    <div v-show="showToolBar" ref="toolbar" class="toolbar"></div>
    <div v-show="showToolBar" @click="hideToolBar" class="toolbar_modal"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  props: {
    myItem: {},
  },
  data() {
    return {
      editor: null,
      showToolBar: false,
      htmlValueIndex: 0,
    };
  },
  methods: {
    dbEditor() {
      console.log("双击");
      if (this.showToolBar == true) {
        this.showToolBar = false;
      } else {
        this.showToolBar = true;
      }
    },
    hideToolBar() {
      this.showToolBar = false;
    },
  },
  mounted() {
    this.editor = new E(this.$refs.toolbar, this.$refs.editor);
    this.editor.config.zIndex = 6;
    // 配置菜单
    this.editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
      "fullscreen", // 全屏
    ];
    let that = this;
    this.editor.config.onchange = function (val) {
      that.myItem.propValues[that.htmlValueIndex].value = val;
      console.log(that.value);
    };
    // 取消自动 focus
    this.editor.config.focus = false;

    this.editor.create();
    this.editor.txt.html(this.myItem.propValues[this.htmlValueIndex].value);
  },
};
</script>
<style>
.richText .toolbar_modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
}
.richText .toolbar {
  background-color: #4b4a4a;
  color: white;
  font-weight: bolder;
  position: absolute;
  z-index: 7;
}
</style>