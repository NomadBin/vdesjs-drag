<template>
  <div class="tips" :style="{ wdith: width }" v-show="visible">
    <div class="bell">
      <i class="el-icon-question"></i>
    </div>
    <el-carousel
      indicator-position="none"
      height="20"
      arrow="never"
      :interval="3000"
      style="height: 20px; overflow: hidden"
    >
      <el-carousel-item
        style="height: 20px"
        v-for="(tip, index) in tips"
        :key="index"
      >
        <div class="el-carousel-item" v-html="tip"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="close" @click="close">
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>
<script>
const tips = ["提示1.......", "提示2........", "提示3........."];
export default {
  data() {
    return {
      tips: tips,
      width: 500,
      visible: true,
    };
  },
  mounted() {},
  methods: {
    close() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.tips {
  height: 20px;
  padding-left: 26px;
  position: relative;
  
  .bell {
    position: absolute;
    left: 6px;
    top: 2px;
    font-size: 14px;
    color: black;
  }

  .close {
    position: absolute;
    right: 0px;
    top: 2px;
    font-size: 14px;
    color: black;
    z-index: 4;
  }

  .el-carousel-item {
    padding-left: 0;
    padding-right: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: black;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>