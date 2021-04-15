<template>
  <div class="phone-s">
    <div class="phone">
      <div class="phone-top">
        <el-row>
          <el-col :span="5" class="xh"
            ><i class="vdejsfont vdesjsxinhao"></i
          ></el-col>
          <el-col :span="14" class="time">{{ time }}</el-col>
          <el-col :span="5" class="dl"
            ><i class="vdejsfont vdesjs80dianliang"></i
          ></el-col>
        </el-row>
      </div>
      <div
        class="draggableDiv"
        id="freeFrame"
      >

        <shape
          :defaultStyle="item.mStyle"
          :style="getShapeStyle(item.mStyle)"
          :active="item === currentData"
          :myItem="item"
          v-for="item in curList"
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

      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import basicsMixin from "@/common/js/h5/importBasics";
import { getStyle, getComponentRotatedStyle } from "@/utils/style";
import curList from "@/mixins/curList";
import Shape from '../components/free/Shape.vue';

export default {
  mixins: [basicsMixin, curList],
  components: {
    draggable,
    Shape
  },

      computed: {
    animateClass() {
      return this.$store.state.rightPanelClass.animateClass;
    },
    time() {
      return this.dateFormat("HH:MM", new Date());
    },
  },
  data() {
    return {};
  },
  methods: {
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
    switchIndex: function (index) {
      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }

      this.$store.commit("swithIndex", index);
    },
    test: function () {
      console.log("PhoneFrame test");
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
  },
  mounted() {
    this.$store.commit('selectDevice', "free")
    this.$store.commit(
      "initList",
      JSON.parse(localStorage.getItem(this.$route.query.id))
    );
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
  background-color: #ecebeb;
  overflow: hidden;
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
  overflow: hidden;
}
.phone-top {
}

</style>