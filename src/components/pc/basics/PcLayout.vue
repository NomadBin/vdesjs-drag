<template>
  <div>
    <div class="topSelect" @click="switchIndex"></div>
    <van-row>
      <van-col v-for="(col, colIndex) in cols" :key="colIndex" :span="col.span">
        <draggable :list="col.list" group="components" class="colDraggable">
          <component
            v-for="(item, colDataIndex) in col.list"
            :key="colDataIndex"
            :is="item.componentName"
            :myItem="item"
            @click.native="swithChildIndex(item)"
          ></component>
        </draggable>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import basicsMixin from "@/common/js/pc/importBasics";
export default {
  // name: "PcLayout",
  mixins: [basicsMixin],
  components: {
    draggable,
  },
  props: {
    cols: {
      type: Array,
    },
    myItem: {
      type: Object,
    }
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
