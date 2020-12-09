<template>
  <div class="phone-s">
    <div class="phone">
      <div class="phone-top"></div>
      <draggable
        :list="list"
        group="components"
        class="draggableDiv"
      >
        <div
          v-for="(item, i) in curList"
          :key="i"

          class="content"
        >
        <div v-if="item.componentName == 'VanLayout'">
            <van-layout  :listIndex="i" :myItem="item"></van-layout>
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
import basicsMixin from "@/common/js/h5/importBasics";
import layoutMixin from "@/common/js/h5/importLayout";
import formMixin from "@/common/js/h5/importForm";
import feebackMixin from "@/common/js/h5/importFeeback";
import showMixin from "@/common/js/h5/importShow";
import navMixin from "@/common/js/h5/importNav";
import businessMixin from "@/common/js/h5/importBusiness";
import curList from "@/mixins/curList";


export default {
  mixins: [basicsMixin, layoutMixin, formMixin, feebackMixin, showMixin, navMixin, businessMixin,curList],
  components: {
    draggable
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
    return {};
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
      console.log("PhoneFrame test")

    }
  },
};
</script>
<style lang="scss" scoped>
$phoneWidth: 375px;
$phoneHeight: 667px;

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
.hoverborder {
  border: 1px solid transparent;
}
.hoverborder:hover {
  border: 1px solid blue;
}
.content{
  padding: 1px;
}
</style>
