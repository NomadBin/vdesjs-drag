<template>
  <div class="layout">
    <div class="topSelect" @click="switchIndex"></div>
    <van-row>
      <van-col
        v-for="(col, colIndex) in myItem.cols"
        :key="colIndex"
        :span="col.span"
      >
        <draggable :list="col.list" group="components" class="colDraggable">
          <component
            v-for="(item, colDataIndex) in col.list"
            :key="colDataIndex"
            :is="item.componentName"
            :myItem="item"
            @click.native="swithChildIndex(colIndex, colDataIndex)"
          ></component>
        </draggable>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import basicsMixin from "@/common/js/h5/importBasics";
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
  computed: {
    animateClass() {
      return this.$store.state.rightPanelClass.animateClass;
    },
  },
  components: {
    draggable,
  },
  data() {
    return {};
  },
  props: {
    myItem: {
      type: Object,
    },
  },
  methods: {
    switchIndex: function () {
      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }

      this.$store.commit("updateMyItem", this.myItem);
    },
    swithChildIndex: function (myItem) {
      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }

      this.$store.commit("updateMyItem", myItem);
    },
  },
};
</script>
<style scoped>
.van-col {
  border: 1px solid lightgray;
}
.colDraggable {
  min-height: 60px;
}
.topSelect {
  width: 100%;
  height: 5px;
  background-color: lightblue;
}
.topSelect:hover {
  background-color: blue;
}
</style>