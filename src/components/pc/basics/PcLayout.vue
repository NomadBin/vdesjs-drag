<template>
  <div>
    <div class="topSelect" @click="switchIndex"></div>
    <div class="container-fluid">
    <div class="row">
      <div
        v-for="(col, colIndex) in myItem.cols"
        :key="colIndex"
        class="van-col"
        :class="'col-sm-' + col.span"
      >
        <draggable :list="col.list" group="components" class="colDraggable">
          <div v-for="(item, colDataIndex) in col.list" :key="colDataIndex">
            <pc-layout
              v-if="item.componentName == 'PcLayout'"
              :myItem="item"
            ></pc-layout>
            <component
              v-else
              :is="item.componentName"
              :myItem="item"
              @click.native="swithChildIndex(item)"
            ></component>
          </div>
        </draggable>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import basicsMixin from "@/common/js/pc/importBasics";
export default {
  name: "PcLayout",
  mixins: [basicsMixin],
  components: {
    draggable,
  },
  props: {
    myItem: {
      type: Object,
    },
  },
  computed: {
    animateClass() {
      return this.$store.state.rightPanelClass.animateClass;
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
  mounted: function () {
    console.log("hello world");
  },
};
</script>
<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
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
