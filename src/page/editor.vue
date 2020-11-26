<template>
  <div class="editor">
    <el-container>
      <el-header>
        <t-header></t-header>
      </el-header>
      <el-container>
        <el-aside>
          <left-panel></left-panel>
        </el-aside>
        <el-container>
          <el-main>
            <phone-frame></phone-frame>
          </el-main>
          <el-footer></el-footer>
        </el-container>
        <div >
          <right-panel :class="animateClass"></right-panel>
          <div @click="fold" :class="foldClass">
            <i :class="iconClass"/>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import THeader from "@/components/sub/header.vue";
import LeftPanel from "@/components/sub/LeftPanel.vue";
import PhoneFrame from "@/components/sub/PhoneFrame.vue";
import RightPanel from "@/components/sub/RightPanel.vue";

export default {
  components: {
    THeader,
    LeftPanel,
    PhoneFrame,
    RightPanel,
  },
  name: "editor",
  data() {
    return {
    };
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
  },
  methods: {
    fold: function() {
      this.$store.commit("rightPanelFold")
    }
  },
  created: function() {
  }
};
</script>

<style>
#app,body {
  overflow: hidden;
}
* {
  margin: 0;
  -webkit-tap-highlight-color: transparent;
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
}
.leftFold:hover{
  color: blue;
}


.el-header {
  background-color: white;
  line-height: 60px;
  text-align: center;
  border-bottom: #c8c7cc solid 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.editor {
  background-color: #f8f8f8 ;
}
</style>