<template>
  <div class="pc-s">
    <!-- <div>
      <img :src="phoneIcon" alt="手机" class="icon" />
      <img :src="surfaceIcon" alt="平板" class="icon" />
      <img :src="pcIcon" alt="电脑" class="icon" />
    </div> -->
    <div class="pc">
      <div class="pc-top">
        <el-row>
          <el-col :span="3">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div
          ></el-col>
          <el-col :span="15"> <div class="browser-address"></div></el-col>
        </el-row>
      </div>
      <draggable :list="list" group="components" class="draggableDiv">
        <div v-for="(item, i) in curList" :key="i" class="content">
          <div v-if="item.componentName == 'PcLayout'">
            <pc-layout :myItem="item"></pc-layout>
          </div>
          <div v-else-if="item.componentName == 'Plate'">
            <plate :myItem="item"></plate>
          </div>
          <component
            @click.native="switchIndex(item)"
            v-else
            class="hoverborder"
            :is="item.componentName"
            :myItem="item"
          ></component>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import basicsMixin from "@/common/js/pc/importBasics";
import layoutMixin from "@/common/js/pc/importLayout";
import curList from "@/mixins/curList";

import phoneIcon from "@/assets/icon/手机.png";
import surfaceIcon from "@/assets/icon/平板.png";
import pcIcon from "@/assets/icon/电脑.png";

export default {
  mixins: [basicsMixin, layoutMixin, curList],
  components: {
    draggable,
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
    animateClass() {
      return this.$store.state.rightPanelClass.animateClass;
    },
  },
  watch: {
    list() {
      this.$nextTick(function () {
        {
          var domList = {};
          for (let i = 0; i < this.list.length; i++) {
            const item = this.list[i];
            // domList[item.componentName + item.id] =this.$refs[item.componentName + item.id]
            // domList[item.componentName + item.id].style.animationDuration = "2s"

            // this.$refs[item.componentName + item.id].style.animationDuration = "2s"

          }
          console.log(domList)
        }
      });
    },
  },
  data() {
    return {
      phoneIcon: phoneIcon,
      surfaceIcon: surfaceIcon,
      pcIcon: pcIcon,
    };
  },
  methods: {
    switchIndex: function (myItem) {
      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }
      this.$store.commit("updateMyItem", myItem);
    },
    test: function () {
      console.log("pcFrame test");
    },
  },
  mounted() {
    // console.log("refs:" + JSON.stringify())
    // console.log(this.$store.state.domList['ImageText1'].style.backgroundColor = "blue ")
  },
};
</script>


<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
$pcWidth: 100%;
$pcHeight: 98%;
.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.circle {
  background: #cacedb;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin: 0 4px;
  float: left;
}
.browser-address {
  height: 20px;
  margin-top: 3px;
  border: 1px solid #e6e7f0;
  border-radius: 10px;
  padding: 4px 8px;
}

.draggableDiv {
  position: absolute;
  top: 25px;
  bottom: 0;
  left: 0;
  right: 0;

  // display:flex;
  // flex-wrap: wrap;
  // align-items: flex-start;
  // align-content: flex-start;
}
.pc-s {
  width: $pcWidth;
  height: $pcHeight;
  position: relative;
  // margin-left: auto;
  // margin-right: auto;
  overflow: hidden;
}
.pc {
  width: $pcWidth;
  // max-width: calc(100% - 140px);
  height: $pcHeight;
  background-color: white;
  position: relative;
  // margin-left: auto;
  // margin-right: auto;
  overflow-x: hidden;
  overflow-y: scroll;
}
.hoverborder {
  border: 1px solid transparent;
}
.hoverborder:hover {
  border: 1px solid blue;
}
.content {
  // padding: 1px;
}
</style>
