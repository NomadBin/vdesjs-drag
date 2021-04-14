<template>
  <div class="poster-ruler">
    <template v-if="referenceLineOpened">
      <!-- 纵向参考线 -->
      <div
        v-for="(item, index) in referenceLine.col"
        :key="'col' + index + item"
        class="reference-line column"
        :style="{ left: item + 'px' }"
        @dblclick="removeReferenceLine({ type: 'col', index })"
        @mousedown="colHandleDown($event, index)"
      />
      <!-- 横向参考线 -->
      <div
        v-for="(item, index) in referenceLine.row"
        :key="'row' + index + item"
        class="reference-line row"
        :style="{ top: item + 'px', ...rowElPositionFix }"
        @dblclick="removeReferenceLine({ type: 'row', index })"
        @mousedown="rowHandleDown($event, index)"
      />
    </template>
    <!-- 顶部标尺 -->
    <div
      ref="topRuler"
      class="top-ruler"
      @mouseenter="topMouseEnter"
      @mousemove="topMouseMove"
      @mouseleave="topMouseLeave"
      @mouseup="topMouseUp"
    >
      <div
        v-if="topMoving"
        class="reference-line column"
        :style="{ left: columnX + 'px' }"
      >
        <div class="tip" draggable="false" ondragstart="return false">
          {{ columnXInRuler }}
        </div>
      </div>
    </div>

    <!-- 左侧标尺 -->
    <div
      ref="leftRuler"
      class="left-ruler"
      :style="rowElPositionFix"
      @mouseenter="leftMouseEnter"
      @mousemove="leftMouseMove"
      @mouseleave="leftMouseLeave"
      @mouseup="leftMouseUp"
    >
      <div
        v-if="leftMoving"
        class="reference-line row moving"
        :style="{ top: rowY + 'px' }"
      >
        <div class="tip" draggable="false" ondragstart="return false">
          {{ rowYInRuler }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import curList from "@/mixins/curList";
import ruler from "@/utils/canvasRuler";
import eventBus from "@/utils/eventBus";
import { getComponentRotatedStyle } from "@/utils/style";

const LEFT_SIDE_WIDTH = 300; // 左侧边栏的宽度
const TOP_SIDE_HEIGHT = 60; // 顶部工具栏的高度
const TOP_RULER_HEIGHT = 20; // 顶部标尺高度
const LEFT_RULE_WIDHT = 20; //左边标尺宽度

const ROW_START_GAP = TOP_RULER_HEIGHT; // 顶部行标尺开始绘制位置
const COL_START_GAP = 30 + ROW_START_GAP; //左边列标尺开始绘制位置
export default {
  mixins: [curList],
  data() {
    return {
      diff: 3, // 相距diff像素自动吸附
      referenceLineOpened: true,
      topMoving: false,
      leftMoving: false,
      colHandleMoveReady: false,
      rowHandleMoveReady: false,
      columnX: 0,
      mainPanelScrollY: 0,
      rowY: 0,

      maxColumX: 0,
      maxRowY: 0,
    };
  },
  computed: {
    columnXInRuler() {
      return this.columnX - TOP_RULER_HEIGHT;
    },
    rowYInRuler() {
      return this.rowY - COL_START_GAP;
    },
    rowElPositionFix() {
      return {
        transform: `translateY(${this.mainPanelScrollY}px)`,
      };
    },
  },
  mounted() {
    const topRuler = this.$refs.topRuler;
    const leftRuler = this.$refs.leftRuler;
    this.initRow(topRuler);
    this.initColumn(leftRuler);
    let that = this;
    window.onresize = function () {
      console.log("window.onresize");
      that.initRow(topRuler);
      that.initColumn(leftRuler);
    };

    eventBus.$on("move", (isDownward, isRightward) => {
      this.alignRuler();
    });
  },
  methods: {
    isNearly(dragvalue, targetValue) {
      return Math.abs(dragvalue - targetValue) <= this.diff;
    },
    // 对齐标尺
    alignRuler() {
      const curComponentStyle = getComponentRotatedStyle(
        this.currentData.mStyle
      );
      // 获取画布位移信息
      const editorRectInfo = this.freeFrame.getBoundingClientRect();
      console.log("editorRectInfo:" + JSON.stringify(editorRectInfo));

      // 画布的坐标与标尺的坐标之间的差值
      const diffPoint = {
        x: editorRectInfo.left - LEFT_SIDE_WIDTH,
        y: editorRectInfo.top - TOP_SIDE_HEIGHT,
      };
      console.log("diffPoint:" + JSON.stringify(diffPoint));
      console.log('curComponentStyle:' + JSON.stringify(curComponentStyle))
      const { rotate } = this.currentData.mStyle;
       const curComponentHalfwidth = curComponentStyle.width / 2;
      const curComponentHalfHeight = curComponentStyle.height / 2;
      
      this.referenceLine.col.forEach((item) => {
        console.log("画布x:" + (item - diffPoint.x));
        // 当前标尺线所在的画布x坐标
        const lineX = item - diffPoint.x;
        // 左边对齐竖标线
        if (this.isNearly(curComponentStyle.left, lineX)) {
          this.$store.commit("updateMyItemSingleStyle", {
            key: "left",
            value: rotate != 0 ? this.translatecurComponentShift('left', lineX, curComponentStyle) : lineX,
          });
        }
        // 右边对齐竖标线
        if (this.isNearly(curComponentStyle.right, lineX)) {
          console.log('右边标线对齐')
          this.$store.commit("updateMyItemSingleStyle", {
            key: "left",
            value: rotate != 0 ? this.translatecurComponentShift('left', lineX - curComponentStyle.width, curComponentStyle) : lineX - curComponentStyle.width,
          });
        }
         // 中间对齐竖标线
        if (this.isNearly(curComponentStyle.left + curComponentHalfwidth, lineX)) {
          this.$store.commit("updateMyItemSingleStyle", {
            key: "left",
            value: rotate != 0 ? this.translatecurComponentShift('left', lineX - curComponentHalfwidth, curComponentStyle) : lineX - curComponentHalfwidth, 
          });
        }

      });
      this.referenceLine.row.forEach((item) => {
        console.log("画布y:" + (item - diffPoint.y));

        // 当前标尺所在的画布y坐标
        const lineY = item - diffPoint.y;
        // 顶部对齐横标线
        if (this.isNearly(curComponentStyle.top, lineY)) {
          this.$store.commit("updateMyItemSingleStyle", {
            key: "top",
            value: rotate != 0 ? this.translatecurComponentShift('top', lineY, curComponentStyle) : lineY,
          });
        }

        // 中间对齐横标线
        if (this.isNearly(curComponentStyle.top + curComponentHalfHeight, lineY)) {
          this.$store.commit("updateMyItemSingleStyle", {
            key: "top",
            value: rotate != 0 ? this.translatecurComponentShift('top', lineY - curComponentHalfHeight, curComponentStyle) : lineY - curComponentHalfHeight,
          });
        }

         // 底部对齐横标线
        if (this.isNearly(curComponentStyle.bottom, lineY)) {
          this.$store.commit("updateMyItemSingleStyle", {
            key: "top",
            value: rotate != 0 ? this.translatecurComponentShift('top', lineY - curComponentStyle.height, curComponentStyle) : lineY - curComponentStyle.height,
          });
        }

      });
    },
    translatecurComponentShift(key, line, curComponentStyle) {
      const { width, height } = this.currentData.mStyle;
      if (key == "top") {
        return Math.round(line - (height - curComponentStyle.height) / 2);
      }
      return Math.round(line - (width - curComponentStyle.width) / 2);
    },
    initRow(topRuler) {
      let rowObj = ruler.initRow({
        el: topRuler,
        height: TOP_RULER_HEIGHT,
        color: "#959595",
        background: "#f8f8f8",
        startGap: ROW_START_GAP,
      });
      this.maxColumX = rowObj.width;
    },
    initColumn(leftRuler) {
      let colObj = ruler.initColumn({
        el: leftRuler,
        width: LEFT_RULE_WIDHT,
        color: "#959595",
        background: "#f8f8f8",
        startGap: COL_START_GAP,
      });
      this.maxRowY = colObj.height;
    },
    removeReferenceLine(obj) {
      this.$store.commit("removeReferenceLine", obj);
    },

    addColumn() {
      this.$store.commit("addReferenceLine", {
        type: "col",
        position: this.columnX,
      });
    },
    addRow() {
      this.$store.commit("addReferenceLine", {
        type: "row",
        position: this.rowY,
      });
    },
    colHandleDown(e, index) {
      this.colHandleMoveReady = true;
      let invoke = false;
      document.body.style.cursor = "col-resize";
      const mouseMoveFn = (_e) => {
        if (!invoke) {
          this.removeReferenceLine({ type: "col", index });
          this.topMouseEnter(_e);
          invoke = true;
        }
        this.topMouseMove(_e);
      };
      const mouseUpFn = (_e) => {
        if (invoke) {
          console.log("this.columnX:" + this.columnX);
          if (this.columnX >= this.maxColumX || this.columnX < 0) {
            console.log("超过范围, 删除当前竖向标线");
          } else {
            this.addColumn();
          }
        }
        this.colHandleMoveReady = false;
        this.topMouseLeave();
        document.removeEventListener("mouseup", mouseUpFn);
        document.removeEventListener("mousemove", mouseMoveFn);
        document.body.style.cursor = "initial";
      };
      document.addEventListener("mousemove", mouseMoveFn);
      document.addEventListener("mouseup", mouseUpFn);
    },
    rowHandleDown(e, index) {
      this.rowHandleMoveReady = true;
      let invoke = false;
      document.body.style.cursor = "row-resize";
      const mouseMoveFn = (_e) => {
        if (!invoke) {
          this.removeReferenceLine({ type: "row", index });
          this.leftMouseEnter(_e);
          invoke = true;
        }
        this.leftMouseMove(_e);
      };
      const mouseUpFn = (_e) => {
        if (invoke) {
          if (this.rowY >= this.maxRowY || this.rowY < 0) {
            console.log("超过范围, 删除当前横向标线");
          } else {
            this.addRow();
          }
        }
        this.rowHandleMoveReady = false;
        this.leftMouseLeave();
        document.removeEventListener("mousemove", mouseMoveFn);
        document.removeEventListener("mouseup", mouseUpFn);
        document.body.style.cursor = "initial";
      };
      document.addEventListener("mousemove", mouseMoveFn);
      document.addEventListener("mouseup", mouseUpFn);
    },
    topMouseEnter(e) {
      this.topMoving = true;
      this.columnX = e.pageX - LEFT_SIDE_WIDTH;
      console.log(this.columnX);
    },
    topMouseMove(e) {
      this.columnX = e.pageX - LEFT_SIDE_WIDTH;
    },
    topMouseLeave(e) {
      if (this.colHandleMoveReady) {
        return;
      }
      this.topMoving = false;
    },
    topMouseUp(e) {
      if (this.colHandleMoveReady) {
        return;
      }
      this.addColumn();
    },
    leftMouseEnter(e) {
      this.leftMoving = true;
    },
    leftMouseMove(e) {
      this.rowY = e.pageY - this.mainPanelScrollY - TOP_SIDE_HEIGHT;
    },
    leftMouseLeave() {
      if (this.rowHandleMoveReady) {
        return;
      }
      this.leftMoving = false;
    },
    leftMouseUp() {
      if (this.rowHandleMoveReady) {
        return;
      }
      this.addRow();
    },
  },
};
</script>
<style lang="scss" scoped>
.poster-ruler {
  z-index: 10;
}
.top-ruler {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 100%;
  /* border-bottom: 1px solid #bac3c9; */
  z-index: 100;
  cursor: col-resize;
}
.left-ruler {
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 100%;
  z-index: 99;
  /* border-right: 1px solid #bac3c9; */
  cursor: row-resize;
  transition: 0.5s;
}
.reference-line {
  /* background-color: #ff0000; */
  position: absolute;
  z-index: 99;
  .tip {
    padding: 4px 6px;
    border-radius: 4px;
    background-color: rgba($color: #000000, $alpha: 0.6);
    color: #fff;
    font-size: 13px;
    position: absolute;
    user-select: none;
    pointer-events: none;
  }
  &.column {
    width: 3px;
    height: 5000px;
    margin-left: -2px;
    top: 0;
    cursor: col-resize;
    background-color: #53ebef;
    background: linear-gradient(
      90deg,
      transparent 33.3%,
      #eceef0 0,
      #53ebef 66.6%,
      transparent 0
    );
    .tip {
      top: 30px;
      left: 10px;
    }
  }
  &.row {
    width: 5000px;
    height: 3px;
    margin-top: -2px;
    left: 0;
    cursor: row-resize;
    transition: 0.1s;
    background: linear-gradient(
      0deg,
      transparent 33.3%,
      #eceef0 0,
      #53ebef 66.6%,
      transparent 0
    );
    .tip {
      top: -30px;
      left: 30px;
    }
    &.moving {
      transition: none;
    }
  }
}
</style>