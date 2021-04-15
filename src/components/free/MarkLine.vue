<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      :key="line"
      class="line"
      :class="line.includes('x') ? 'xline' : 'yline'"
      :ref="line"
      v-show="lineStatus[line] || false"
    >
      <div class="tip"></div>
      <div class="subLine"></div>
    </div>
  </div>
</template>
<script>
import curList from "@/mixins/curList";
import { getComponentRotatedStyle } from "@/utils/style";
import eventBus from "@/utils/eventBus";
export default {
  mixins: [curList],
  data() {
    return {
      lines: ["xt", "xc", "xb", "yl", "yc", "yr"],
      diff: 3, // 相距diff像素自动吸附
      lineStatus: {
        xt: false,
        xc: false,
        xb: false,
        yl: false,
        yc: false,
        yr: false,
      },
    };
  },
  mounted() {
    eventBus.$on("move", (isDownward, isRightward) => {
      this.showLine(isDownward, isRightward);
    });
    eventBus.$on("unmove", () => {
      this.hideLine();
    });
  },
  methods: {
    hideLine() {
      Object.keys(this.lineStatus).forEach((line) => {
        this.lineStatus[line] = false;
      });
    },
    showLine(isDownward, isRightward) {
      const lines = this.$refs;
      console.log(lines);
      const components = this.curList;
      const curComponentStyle = getComponentRotatedStyle(
        this.currentData.mStyle
      );
      console.log("curComponentStyle:" + JSON.stringify(curComponentStyle));
      const curComponentHalfwidth = curComponentStyle.width / 2;
      const curComponentHalfHeight = curComponentStyle.height / 2;

      this.hideLine();

      components.forEach((component) => {
        if (component == this.currentData) return;
        const componentStyle = getComponentRotatedStyle(component.mStyle);
        console.log("componentStyle:" + JSON.stringify(componentStyle));
        const { top, left, bottom, right } = componentStyle;
        const componentHalfwidth = componentStyle.width / 2;
        const componentHalfHeight = componentStyle.height / 2;
        console.log("componentHalfHeight:" + componentHalfHeight);

        const conditions = {
          top: [
            {
              isNearly: this.isNearly(curComponentStyle.top, top),
              lineNode: lines.xt[0], // xt
              line: "xt",
              dragShift: top,
              lineShift: top,
              tip: this.caculateTopTip(curComponentStyle, componentStyle),
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, top),
              lineNode: lines.xt[0], // xt
              line: "xt",
              dragShift: top - curComponentStyle.height,
              lineShift: top,
              tip: this.caculateTopTip(curComponentStyle, componentStyle),
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(
                curComponentStyle.top + curComponentHalfHeight,
                top + componentHalfHeight
              ),
              lineNode: lines.xc[0], // xc
              line: "xc",
              dragShift: top + componentHalfHeight - curComponentHalfHeight,
              lineShift: top + componentHalfHeight,
              tip: this.caculateTopTip(curComponentStyle, componentStyle),
            },
            {
              isNearly: this.isNearly(curComponentStyle.top, bottom),
              lineNode: lines.xb[0], // xb
              line: "xb",
              dragShift: bottom,
              lineShift: bottom,
              tip: this.caculateTopTip(curComponentStyle, componentStyle),
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, bottom),
              lineNode: lines.xb[0], // xb
              line: "xb",
              dragShift: bottom - curComponentStyle.height,
              lineShift: bottom,
              tip: this.caculateTopTip(curComponentStyle, componentStyle),
            },
          ],
          left: [
            {
              isNearly: this.isNearly(curComponentStyle.left, left),
              lineNode: lines.yl[0], // yl
              line: "yl",
              dragShift: left,
              lineShift: left,
              // tip: {value: '22', pos: 55}
              tip: this.caculateLeftTip(curComponentStyle, componentStyle),
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, left),
              lineNode: lines.yl[0], // yl
              line: "yl",
              dragShift: left - curComponentStyle.width,
              lineShift: left,
              tip: this.caculateLeftTip(curComponentStyle, componentStyle),
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(
                curComponentStyle.left + curComponentHalfwidth,
                left + componentHalfwidth
              ),
              lineNode: lines.yc[0], // yc
              line: "yc",
              dragShift: left + componentHalfwidth - curComponentHalfwidth,
              lineShift: left + componentHalfwidth,
              tip: this.caculateLeftTip(curComponentStyle, componentStyle),
            },
            {
              isNearly: this.isNearly(curComponentStyle.left, right),
              lineNode: lines.yr[0], // yr
              line: "yr",
              dragShift: right,
              lineShift: right,
              tip: this.caculateLeftTip(curComponentStyle, componentStyle),
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, right),
              lineNode: lines.yr[0], // yr
              line: "yr",
              dragShift: right - curComponentStyle.width,
              lineShift: right,
              tip: this.caculateLeftTip(curComponentStyle, componentStyle),
            },
          ],
        };
        const needToShow = [];
        const { rotate } = this.currentData.mStyle;
        Object.keys(conditions).forEach((key) => {
          conditions[key].forEach((condition) => {
            if (!condition.isNearly) return;
            console.log("markline执行updateMyItemSingleStyle");
            this.$store.commit("updateMyItemSingleStyle", {
              key,
              value:
                rotate != 0
                  ? this.translatecurComponentShift(
                      key,
                      condition,
                      curComponentStyle
                    )
                  : condition.dragShift,
            });
            // console.log("lineNode:" + condition.lineNode.children[0]);
            condition.lineNode.children[0].innerHTML = condition.tip.value;
            if (key == "top") {
              condition.lineNode.children[0].style["left"] =
                condition.tip.pos + "px";

              let subLine = condition.lineNode.children[1];
              console.log(subLine);
              subLine.style.width = condition.tip.subLine.unit + "px";
              subLine.style.marginLeft = condition.tip.subLine.start + "px";
            }
            if (key == "left") {
              console.log("condition:" + JSON.stringify(condition));
              condition.lineNode.children[0].style["top"] =
                condition.tip.pos + "px";

              let subLine = condition.lineNode.children[1];
              console.log(subLine);
              subLine.style.height = condition.tip.subLine.unit + "px";
              subLine.style.marginTop = condition.tip.subLine.start + "px";
            }

            condition.lineNode.style[key] = `${condition.lineShift}px`;
            needToShow.push(condition.line);
          });
        });
        // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
        // 同一方向上的线只显示一条，例如多条横条只显示一条横线
        if (needToShow.length) {
          this.chooseTheTureLine(needToShow, isDownward, isRightward);
        }
      });
    },
    caculateTopTip(curComponentStyle, componentStyle) {
      let retObj = { value: "0", pos: 0 };
      let pos = 0;
      let diffLeft = curComponentStyle.left - componentStyle.left;
      let subLine = { start: 0, unit: 0 };
      if (diffLeft < 0) {
        // 当前组件在对比组件左边
        diffLeft = diffLeft + curComponentStyle.width;
        diffLeft = Math.abs(diffLeft);
        pos = Math.round(curComponentStyle.right + diffLeft / 2);
        subLine.start = curComponentStyle.right;
        subLine.unit = diffLeft;
      } else {
        // 当前组件在对比组件右边
        diffLeft = diffLeft - componentStyle.width;
        pos = Math.round(componentStyle.right + diffLeft / 2);
        subLine.start = componentStyle.start;
        subLine.unit = diffLeft;
      }
      diffLeft = Math.round(diffLeft);
      retObj.value = diffLeft;
      retObj.pos = pos;
      retObj.subLine = subLine;
      return retObj;
    },
    caculateLeftTip(curComponentStyle, componentStyle) {
      console.log(
        "caculateLeftTip-curComponentStyle:" + JSON.stringify(curComponentStyle)
      );
      console.log(
        "caculateLeftTip-componentStyle:" + JSON.stringify(componentStyle)
      );
      let retObj = { value: "0", pos: 0, subLine: {} };
      let subLine = { start: 0, unit: 200 };
      let pos = 0;
      let diffTop = curComponentStyle.top - componentStyle.top;
      if (diffTop < 0) {
        // 当前选择的组件在对比组件的上方
        diffTop = diffTop + curComponentStyle.height;
        diffTop = Math.abs(diffTop);
        pos = Math.round(curComponentStyle.bottom + diffTop / 2);

        subLine.start = curComponentStyle.bottom;
        subLine.unit = diffTop;
      } else {
        // 当前选择的组件在对比组件的下方
        diffTop = diffTop - componentStyle.height;
        pos = Math.round(componentStyle.bottom + diffTop / 2);

        subLine.start = componentStyle.bottom;
        subLine.unit = diffTop;
      }

      diffTop = Math.round(diffTop);
      retObj.value = diffTop;
      retObj.pos = pos;
      retObj.subLine = subLine;

      return retObj;
    },
    isNearly(dragvalue, targetValue) {
      return Math.abs(dragvalue - targetValue) <= this.diff;
    },
    chooseTheTureLine(needToShow, isDownward, isRightward) {
      // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
      // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
      if (isRightward) {
        if (needToShow.includes("yr")) {
          this.lineStatus.yr = true;
        } else if (needToShow.includes("yc")) {
          this.lineStatus.yc = true;
        } else if (needToShow.includes("yl")) {
          this.lineStatus.yl = true;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (needToShow.includes("yl")) {
          this.lineStatus.yl = true;
        } else if (needToShow.includes("yc")) {
          this.lineStatus.yc = true;
        } else if (needToShow.includes("yr")) {
          this.lineStatus.yr = true;
        }
      }

      if (isDownward) {
        if (needToShow.includes("xb")) {
          this.lineStatus.xb = true;
        } else if (needToShow.includes("xc")) {
          this.lineStatus.xc = true;
        } else if (needToShow.includes("xt")) {
          this.lineStatus.xt = true;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (needToShow.includes("xt")) {
          this.lineStatus.xt = true;
        } else if (needToShow.includes("xc")) {
          this.lineStatus.xc = true;
        } else if (needToShow.includes("xb")) {
          this.lineStatus.xb = true;
        }
      }
    },
    translatecurComponentShift(key, condition, curComponentStyle) {
      const { width, height } = this.currentData.mStyle;
      if (key == "top") {
        return Math.round(
          condition.dragShift - (height - curComponentStyle.height) / 2
        );
      }
      return Math.round(
        condition.dragShift - (width - curComponentStyle.width) / 2
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.mark-line {
  height: 100%;
  width: 100%;
}
.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
  .tip {
    position: absolute;
    background-color: white;
    color: red;
    font-size: 13px;
  }
}
.xline {
  width: 100%;
  height: 1px;
  .subLine {
    background: red;
    width: 0px;
    height: 1px;
    margin-left: 0px;
  }
}
.yline {
  width: 1px;
  height: 100%;
  .subLine {
    background: red;
    width: 1px;
    height: 0px;
    margin-top: 0px;
  }
}
</style>