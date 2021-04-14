<template>
  <div class="shape" :class="{ active }" @mousedown="handleMouseDownOnShape">
    <span
      class="iconfont icon-xiangyouxuanzhuan"
      v-show="isActive()"
      @mousedown="handleRotate"
    ></span>
    <div
      class="shape-point"
      v-for="item in isActive() ? pointList : []"
      :key="item"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import curList from "@/mixins/curList";
import { mod360 } from "@/utils/translate";
import calculateComponentPositonAndSize from "@/utils/calculateComponentPositonAndSize";
import eventBus from "@/utils/eventBus";

export default {
  mixins: [curList],
  data() {
    return {
      pointList: ["lt", "t", "rt", "r", "rb", "b", "lb", "l"], // 八个方向
      initialAngle: {
        // 每个点的初始角度
        lt: 0,
        t: 45,
        rt: 90,
        r: 135,
        rb: 180,
        b: 225,
        lb: 270,
        l: 315,
      },
      angleToCursor: [
        // 每个范围角度对应的光标
        { start: 338, end: 23, cursor: "nw" },
        { start: 23, end: 68, cursor: "n" },
        { start: 68, end: 113, cursor: "ne" },
        { start: 113, end: 158, cursor: "e" },
        { start: 158, end: 203, cursor: "se" },
        { start: 203, end: 248, cursor: "s" },
        { start: 248, end: 293, cursor: "sw" },
        { start: 293, end: 338, cursor: "w" },
      ],
      cursors: {},
    };
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    defaultStyle: {
      require: true,
      type: Object,
    },
    myItem: {
      require: true,
      type: Object,
    },
  },
  methods: {
    isActive() {
      return this.active;
    },
    handleMouseDownOnShape(e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }
      this.$store.commit("updateMyItem", this.myItem);

      this.cursors = this.getCursor(); //根据旋转角度获取光标位置
      const pos = { ...this.defaultStyle };
      const startY = e.clientY;
      const startX = e.clientX;

      const startTop = Number(pos.top);
      const startLeft = Number(pos.left);

      let hasMove = false;
      const move = (moveEvent) => {
        hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        pos.top = curY - startY + startTop;
        pos.left = curX - startX + startLeft;

        this.$store.commit("updatemyItemStyle", pos);

        // curY - startY > 0 true 表示向下移动 false 表示向上移动
        // curX - startX > 0 true 表示向右移动 false 表示向左移动
        eventBus.$emit("move", curY - startY > 0, curX - startX > 0);
      };

      const up = () => {
        // 触发元素停止移动事件， 用于隐藏标线
        eventBus.$emit("unmove");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        
        hasMove && this.$store.commit("recordSnapshot");
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },

    handleMouseDownOnPoint(point, e) {
      e.stopPropagation();
      e.preventDefault();

      const style = { ...this.defaultStyle };
      console.log("移动前:" + JSON.stringify(style));

      // 组件宽高比
      const proportion = style.width / style.height;

      // 组件中心点
      const center = {
        x: style.left + style.width / 2,
        y: style.top + style.height / 2,
      };

      // 获取画布位移信息
      const editorRectInfo = this.freeFrame.getBoundingClientRect();
      console.log(editorRectInfo);

      // 当前点击坐标
      const curPoint = {
        x: e.clientX - editorRectInfo.left,
        y: e.clientY - editorRectInfo.top,
      };

      // 获取对称点的坐标
      const symmetricPoint = {
        x: center.x - (curPoint.x - center.x),
        y: center.y - (curPoint.y - center.y),
      };

      // 是否需要保存快照
      let needSave = false;
      let isFirst = true;

      const needLockProportion = this.isNeedLockProportion();
      const move = (moveEvent) => {
        // 第一次点击时出发move， 所以会有 “刚点击组件但未移动，组件的大小却改变了的情况发生
        // 因此第一次点击时不触发move事件
        if (isFirst) {
          isFirst = false;
          return;
        }
        needSave = true;
        const curPosition = {
          x: moveEvent.clientX - editorRectInfo.left,
          y: moveEvent.clientY - editorRectInfo.top,
        };

        calculateComponentPositonAndSize(
          point,
          style,
          curPosition,
          proportion,
          needLockProportion,
          {
            center,
            curPoint,
            symmetricPoint,
          }
        );
        this.$store.commit("updatemyItemStyle", style);
        console.log("移动后:" + JSON.stringify(style));
      };

      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },

    // 处理旋转
    handleRotate(e) {
      e.preventDefault();
      e.stopPropagation();
      // 初始坐标和初始角度
      const pos = { ...this.defaultStyle };
      const startY = e.clientY;
      const startX = e.clientX;
      const startRotate = pos.rotate;

      // 获取元素中心点位置
      const rect = this.freeFrame.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 旋转前的角度
      const rotateDegreeBefore =
        Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);

      // 如果元素没有移动，则不保存快照
      let hasMove = false;
      const move = (moveEvent) => {
        console.log('执行move开始')
        hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        // 旋转后的角度
        const rotateDegreeAfter =
          Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
        // 获取旋转的角度值
        pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore;
        // 修改当前组件样式
        this.$store.commit("updatemyItemStyle", pos);
      };

      const up = () => {
        console.log('执行up开始')
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        this.cursors = this.getCursor(); // 根据旋转角度获取光标位置
        console.log('执行up结束')
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },

    getPointStyle(point) {
      const { width, height } = this.defaultStyle;
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      let newLeft = 0;
      let newTop = 0;

      if (point.length === 2) {
        //四个角的点
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
      } else {
        if (hasT || hasB) {
          // 上下两点，宽度居中
          newLeft = Math.floor(width / 2);
          newTop = hasT ? 0 : height;
        }

        if (hasL || hasR) {
          // 左右两边的点，高度居中
          newLeft = hasL ? 0 : width;
          newTop = Math.floor(height / 2);
        }
      }

      const style = {
        marginLeft: "-4px",
        marginTop: "-4px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: this.cursors[point],
      };
      return style;
    },

    getCursor() {
      const { angleToCursor, initialAngle, pointList, currentData } = this;
      const rotate = mod360(currentData.mStyle.rotate);
      const result = {};
      let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个， 降低时间复杂度

      pointList.forEach((point) => {
        const angle = mod360(initialAngle[point] + rotate);
        const len = angleToCursor.length;
        while (true) {
          console.log('循环:' + lastMatchIndex)
          lastMatchIndex = (lastMatchIndex + 1) % len;
          const angleLimit = angleToCursor[lastMatchIndex];
          if (angle < 23 || angle >= 338) {
            result[point] = "nw-resize";
            return;
          }
          if (angleLimit.start <= angle && angle < angleLimit.end) {
            result[point] = angleLimit.cursor + "-resize";
            return;
          }
        }
      });
      return result;
    },

    isNeedLockProportion() {
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}
.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
.icon-xiangyouxuanzhuan {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 600;
  cursor: grab;
  color: #59c7f9;
  font-size: 20px;
  font-weight: 600;

  &:active {
    cursor: grabbing;
  }
}
</style>