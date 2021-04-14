<template>
  <div class="editor">
    <el-container>
      <el-header>
        <t-header></t-header>
      </el-header>
      <el-main class="mainBlock">
        <el-container>
          <el-aside class="leftAside">
            <left-panel v-if="mode == 'h5'"></left-panel>
            <pc-left-panel v-if="mode == 'pc'"></pc-left-panel>
            <free-left-panel v-if="mode == 'free'"></free-left-panel>
          </el-aside>
          <el-main class="mainFrame">
            <phone-frame v-if="mode == 'h5'"></phone-frame>
            <pc-frame v-if="mode == 'pc'"></pc-frame>
            <free-frame v-show="mode == 'free'"></free-frame>
            <!-- 参考线 -->
            <ruler v-if="mode == 'free'"></ruler>
          </el-main>

          <el-aside class="rightAside">
            <div v-if="mode == 'h5'">
              <right-panel :class="animateClass"></right-panel>
              <div @click="fold" :class="foldClass">
                <i :class="iconClass" />
              </div>
            </div>
            <div v-if="mode == 'pc'">
              <pc-right-panel :class="animateClass"></pc-right-panel>
              <div @click="fold" :class="foldClass">
                <i :class="iconClass" />
              </div>
            </div>
            <div v-if="mode == 'free'">
              <free-right-panel :class="animateClass"></free-right-panel>
              <div @click="fold" :class="foldClass">
                <i :class="iconClass" />
              </div>
            </div>
          </el-aside>
        </el-container>
      </el-main>

      <el-footer class="footerBlock" height="20px">
        <tips></tips>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import THeader from "@/components/sub/header.vue";
import LeftPanel from "@/components/sub/LeftPanel.vue";
import PhoneFrame from "@/components/sub/PhoneFrame.vue";
import RightPanel from "@/components/sub/RightPanel.vue";
import PcFrame from "../components/sub/pcFrame.vue";
import PcLeftPanel from "../components/sub/PcLeftPanel.vue";

import PcRightPanel from "../components/sub/PcRightPanel.vue";
import Tips from "@/components/h5/Tips.vue";
import FreeLeftPanel from "../components/sub/FreeLeftPanel.vue";
import FreeFrame from "../components/sub/freeFrame.vue";
import FreeRightPanel from "../components/sub/FreeRightPanel.vue";

import Ruler from "@/components/free/Ruler.vue";

export default {
  components: {
    THeader,
    LeftPanel,
    PhoneFrame,
    RightPanel,
    PcFrame,
    PcLeftPanel,
    PcRightPanel,
    Tips,
    FreeLeftPanel,
    FreeRightPanel,
    FreeFrame,
    Ruler,
  },
  name: "editor",
  data() {
    return {};
  },
  computed: {
    animateClass() {
      return this.$store.state.rightPanelClass.animateClass;
    },
    iconClass() {
      return this.$store.state.rightPanelClass.iconClass;
    },
    foldClass() {
      return this.$store.state.rightPanelClass.foldClass;
    },
    mode() {
      return this.$store.state.mode;
    },
  },
  methods: {
    fold: function () {
      this.$store.commit("rightPanelFold");
    },
  },
  created: function () {},
};
</script>

<style>
#app,
body {
  overflow: hidden;
}
* {
  margin: 0;

  /* -webkit-tap-highlight-color: transparent; */
  /* z-index: 0; */
}
.footerBlock {
  box-shadow: 0 0px 3px 0px rgba(0, 0, 0, 0.12);
  /* 将光标改为透明色 */
  caret-color: rgba(0, 0, 0, 0);
}
.mainBlock {
  overflow: hidden;
  padding: 0px;
  margin: 0px;
  height: calc(100vh - 85px);
}
.leftAside {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.rightAside {
  background-color: #f8f8f8;
  overflow: hidden;
}
.rightFold {
  background-color: white;
  height: 80px;
  width: 20px;
  position: absolute;
  right: 300px;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
  /* 将光标改为透明色 */
  caret-color: rgba(0, 0, 0, 0);
}
.rightFold:hover {
  color: blue;
}
.leftFold {
  background-color: white;
  height: 80px;
  width: 20px;
  position: absolute;
  right: 0px;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
  /* 将光标改为透明色 */
  caret-color: rgba(0, 0, 0, 0);
}
.leftFold:hover {
  color: blue;
}

.el-header {
  background-color: white;
  line-height: 60px;
  text-align: center;
  border-bottom: #c8c7cc solid 1px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12); */
}
.el-aside {
  color: #333;
  text-align: center;
  /* height: calc(100vh - 60px); */
}
.editor {
  background-color: #f8f8f8;
}
.mainFrame {
  overflow: hidden;
  height: calc(100vh - 85px);
  position: relative;
}
</style>