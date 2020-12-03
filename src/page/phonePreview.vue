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
      <draggable :list="list" group="components" class="draggableDiv">
        <div v-for="(item, i) in list" :key="i" class="content">
          <div v-if="item.componentName == 'VanLayout'">
            <van-layout :listIndex="i"></van-layout>
          </div>
          <component
            @click.native="switchIndex(i)"
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
import basicsMixin from "@/common/js/h5/importBasics";
import VanLayout from "@/preview/VanLayout";
import formMixin from "@/common/js/h5/importForm";
import feebackMixin from "@/common/js/h5/importFeeback";
import showMixin from "@/common/js/h5/importShow";
import navMixin from "@/common/js/h5/importNav";
import businessMixin from "@/common/js/h5/importBusiness";
export default {
  mixins: [
    basicsMixin,
    formMixin,
    feebackMixin,
    showMixin,
    navMixin,
    businessMixin,
  ],
  components: {
    draggable,
    VanLayout,
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
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
.xh {
  text-align: left;
}
.dl {
  text-align: right;
}
.time {
  text-align: center;
  font-size: 14px;
  margin-top: 2px;
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
  background-color: #f9f8f8;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
}
.hoverborder {
  border: 1px solid transparent;
}
.hoverborder:hover {
  border: 1px solid blue;
}
.content {
  padding: 1px;
}
</style>