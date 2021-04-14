<template>
  <div class="phone-s" >
    <div class="phone">
      <div class="phone-top"></div>
      <div
        class="draggableDiv"
        @drop="handleDrop"
        @dragover="handleDragover"
        @mousedown="handleMousedown"
        id="freeFrame"
      >
      <!-- 网格线 -->
      <Grid></Grid>
      
        <shape
          :defaultStyle="item.mStyle"
          :style="getShapeStyle(item.mStyle)"
          :active="item === currentData"
          :myItem="item"
          v-for="(item) in curList"
          :key="item.id"
        >
          <component
            class="compoent"
            :is="item.componentName"
            :myItem="item"
            :style="getComponentStyle(item.mStyle)"
            :id="'component' + item.id"
            :propValues="item.propValues"
          ></component>
        </shape>

        <mark-line></mark-line>
        <!-- 选中区域 -->
        <Area
          :start="start"
          :width="width"
          :height="height"
          v-show="isShowArea"
        />
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import basicsMixin from "@/common/js/free/importBasics";
import curList from "@/mixins/curList";
import Shape from "@/components/free/Shape.vue";
import Group from"@/components/free/Group.vue"
import Grid from"@/components/free/Grid.vue"
import { getStyle, getComponentRotatedStyle } from "@/utils/style";
import MarkLine from "../free/MarkLine.vue";
import Area from "../free/Area.vue";
import eventBus from "@/utils/eventBus";
import {$} from "@/utils/utils"

export default {
  mixins: [basicsMixin, curList],
  components: {
    draggable,
    Shape,
    Group,
    MarkLine,
    Area,
    Grid,
   
  },

  computed: {
    list() {
      return this.$store.state.list;
    },
    animateClass() {
      return this.$store.state.rightPanelClass.animateClass;
    },
  },
  data() {
    return {
      start: {
        // 选中区域的起点
        x: 0,
        y: 0,
      },
      width: 0,
      height: 0,
      isShowArea: false,
    };
  },
  mounted() {
    // 获取自由画布
    this.$store.commit("getFreeFrame");
    eventBus.$on("hideArea", () => {
      this.hideArea();
    });
  },
  methods: {
    hideArea() {
      this.isShowArea = 0;
      this.width = 0;
      this.height = 0;
    },
    getShapeStyle(style) {
      const result = {};
      ["width", "height", "top", "left", "rotate"].forEach((attr) => {
        if (attr != "rotate") {
          result[attr] = style[attr] + "px";
        } else {
          result.transform = "rotate(" + style[attr] + "deg)";
        }
      });

      return result;
    },
    getComponentStyle(style) {
      return getStyle(style, ["top", "left", "rotate", "width", "height"]);
    },
    handleDragover(e) {
      e.preventDefault();
      console.log("dragover");
    },
    handleMousedown(e) {
      // 防止触发drop事件
      e.preventDefault();
      this.hideArea();
      // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
      const rectInfo = this.freeFrame.getBoundingClientRect();
      this.editorX = rectInfo.x;
      this.editorY = rectInfo.y;
      const startX = e.clientX;
      const startY = e.clientY;
      this.start.x = startX - this.editorX;
      this.start.y = startY - this.editorY;
      console.log(this.start);

      // 展示选中区域
      this.isShowArea = true;

      const move = (moveEvent) => {
        this.width = Math.abs(moveEvent.clientX - startX);
        this.height = Math.abs(moveEvent.clientY - startY);
        if (moveEvent.clientX < startX) {
          this.start.x = moveEvent.clientX - this.editorX;
        }

        if (moveEvent.clientY < startY) {
          this.start.y = moveEvent.clientY - this.editorY;
        }
      };

      const up = (e) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);

        if (e.clientX == startX && e.clientY == startY) {
          this.hideArea();
          return;
        }

        this.createGroup();
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    hideArea() {
      this.isShowArea = 0;
      this.width = 0;
      this.height = 0;
      this.$store.commit('cleanAreaData')
    },
    createGroup() {
      // 获取选中区域的组件数据
      const areaData = this.getSelectArea();
      console.log("areaDataLength: " + areaData.length);
      if (areaData.length <= 1) {
        this.hideArea();
        return;
      }

      // 根据选中区域中每个组件的位移信息来创建group组件
      // 要便利选择区域的每个组件，获取它们的left top right bottom
      let top = Infinity,
        left = Infinity;
      let right = -Infinity,
        bottom = -Infinity;
      areaData.forEach((component) => {
        let style = {};
        if (component.componentName == "Group") {
          component.propValues.forEach((item) => {
            const rectInfo = $(`#component${item.id}`).getBoundingClientRect();
            style.left = rectInfo.left - this.editorX;
            style.top = rectInfo.top - this.editorY;
            style.right = rectInfo.right - this.editorX;
            style.bottom = rectInfo.bottom - this.editorY;

            if (style.left < left) left = style.left;
            if (style.top < top) top = style.top;
            if (style.right > right) right = style.right;
            if (style.bottom > bottom) bottom = style.bottom;
          });
        } else {
          style = getComponentRotatedStyle(component.mStyle);
        }
        if (style.left < left) left = style.left;
        if (style.top < top) top = style.top;
        if (style.right > right) right = style.right;
        if (style.bottom > bottom) bottom = style.bottom;
      });
      this.start.x = left;
      this.start.y = top;
      this.width = right - left;
      this.height = bottom - top;

      console.log("start:" + JSON.stringify(this.start));
      console.log("wdithAndHeight:" + this.width + ":" + this.height);

      // 设置选中区域位移大小信息和区域内组件数据
      this.$store.commit("setAreaData", {
        style: {
          left,
          top,
          width: this.width,
          height: this.height,
        },
        components: areaData,
      });
    },
    getSelectArea() {
      const result = [];
      // 区域起点坐标
      const { x, y } = this.start;
      // 计算所有的组件数据，判断是否在选中区域内
      this.curList.forEach((component) => {
        if (component.isLock) return;

        const { left, top, width, height } = component.mStyle;
        if (
          x <= left &&
          y <= top &&
          left + width <= x + this.width &&
          top + height <= y + this.height
        ) {
          result.push(component);
        }
      });

      // 返回在选中区域内的所有
      return result;
    },
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("handleDrop");

      var item = JSON.parse(e.dataTransfer.getData("item"));
      item.mStyle = Object.assign(item.mStyle, {
        left: e.offsetX,
        top: e.offsetY,
        rotate: 0,
        opacity: 1,
        
      });
      console.log(item.mStyle);

      this.$store.commit("listPusn", item);
      this.$store.commit('recordSnapshot')
    },
  },
};
</script>
<style lang="scss" scoped>
$phoneWidth: 375px;
$phoneHeight: 667px;

// .phone-top {
//   height: 10px;
//   background-color: blue;
// }
.compoent {
  width: 100%;
  height: 100%;
}
.draggableDiv {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  width: $phoneWidth;
  height: $phoneHeight;
  // display:flex;
  // flex-wrap: wrap;
  // align-items: flex-start;
  // align-content: flex-start;
}
.phone-s {
  width: $phoneWidth;
  height: $phoneHeight;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}
.phone {
  width: $phoneWidth;
  height: $phoneHeight;
  background-color: white;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
}
</style>
