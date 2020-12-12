<template>
  <div class="richText">
    <div ref="editor"  class="text"></div>
    <el-dialog title="插入图片" :visible.sync="dialogImageVisible">
      <div class="content">
        <el-row>
          <el-col class="Mylabel" :span="6">
            <div>图片:</div>
          </el-col>
          <el-col :span="7">
            <el-image
              style="width: 100px; height: 100px"
              :src="chooseImage"
              fit="fill"
            ></el-image>
          </el-col>
          <el-col class="control" :span="7">
            <image-store @complete="completeChoseImageStore"></image-store>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogImageVisible = false">取 消</el-button>
        <el-button type="primary" @click="completeChoseImage">确 定</el-button>
      </span>
    </el-dialog>

    <div v-show="showToolBar" ref="toolbar" class="toolbar"></div>
    <div v-show="showToolBar" @click="hideToolBar" class="toolbar_modal"></div>
  </div>
</template>
<script>
import E from "wangeditor";
// import MyImage from "@/common/js/pc/weext/MyImage"
import ImageStore from "@/components/pcomp/ImageStore";
export default {
  components: { ImageStore },
  props: {
    myItem: {},
  },
  data() {
    return {
      dialogImageVisible: false,
      editor: null,
      showToolBar: false,
      htmlValueIndex: 0,
      chooseImage: "",
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
    switchIndex: function () {
      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }

      this.$store.commit("updateMyItem", this.myItem);
    },
    completeChoseImageStore(obj) {
      console.log(JSON.stringify(obj));
      this.chooseImage = obj[0].url;
    },
    completeChoseImage() {
      this.editor.cmd.do(
        "insertHTML",
        '<img src="' +
          this.chooseImage +
          '" style="max-width: 100%;" draggable="false">'
      );
      this.dialogImageVisible = false;
      this.chooseImage = "";
    },
  },
  mounted() {
    const { PanelMenu } = E;
    let that = this;
    class MyImage extends PanelMenu {
      constructor(editor) {
        const $elem = E.$(
          `<div class="w-e-menu"><i class="w-e-icon-image"></i></div>`
        );
        super($elem, editor);
        this.editor = editor;
      }
      clickHandler() {
        that.dialogImageVisible = true;
        console.log(this.editor.$toolbarElem.elems[0]);
        console.log(E.$(this.editor.$toolbarElem.elems[0]));
      }
      tryChangeActive() {}
    }

    this.editor = new E(this.$refs.toolbar, this.$refs.editor);
    this.editor.config.zIndex = 6;
    this.editor.menus.extend("myImage", MyImage);
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
      "myImage", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
      "fullscreen", // 全屏
    ];

    this.editor.config.onchange = function (val) {
      that.myItem.propValues[that.htmlValueIndex].value = val;
      console.log(that.myItem.propValues[that.htmlValueIndex].value);
    };
    // 取消自动 focus
    this.editor.config.focus = false;

    this.editor.create();
    this.editor.txt.html(this.myItem.propValues[this.htmlValueIndex].value);
  },
};
</script>
<style scoped>
.richText .toolbar_modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
}
.richText .text {
  background-color: transparent;
}
.richText .toolbar {
  background-color: #4b4a4a;
  color: white;
  font-weight: bolder;
  position: absolute;
  z-index: 7;
}
.topSelect {
  cursor: pointer;
  width: 100%;
  height: 5px;
  background-color: lightblue;
}
.topSelect:hover {
  background-color: blue;
}
</style>