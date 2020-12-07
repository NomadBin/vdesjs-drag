<template>
  <div
    class="var"
    :style="{
      '--padding-top': myItem.propValues[paddingIndex].value[0] + 'px',
      '--padding-right': myItem.propValues[paddingIndex].value[1] + 'px',
      '--padding-bottom': myItem.propValues[paddingIndex].value[2] + 'px',
      '--padding-left': myItem.propValues[paddingIndex].value[3] + 'px',
    }"
    @click="switchIndex"
  >
    <draggable :list="list" group="components" class="plate">
      <component
        v-for="(item, i) in list"
        :key="i"
        :is="item.componentName"
        :myItem="item"
        @click.native.stop="swithChildIndex(0, i)"
      ></component>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import basicsMixin from "@/common/js/pc/importBasics";
export default {
  mixins: [basicsMixin],
  components: {
    draggable,
  },
  props: {
    listIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      paddingIndex: 0,
    };
  },
  computed: {
    myItem: function () {
      return this.$store.state.list[this.listIndex];
    },
    list: function () {
      return this.$store.state.list[this.listIndex].cols[0].list;
    },
  },
  methods: {
    switchIndex: function () {
      console.log("switchIndex");
      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }

      this.$store.commit("swithIndex", this.listIndex);
    },
    swithChildIndex: function (colIndex, colDataIndex) {
      console.log(this.listIndex + "," + colIndex + "," + colDataIndex);
      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }

      this.$store.commit("swithChildIndex", {
        listIndex: this.listIndex,
        colIndex: colIndex,
        colDataIndex: colDataIndex,
      });
    },
  },

  created() {
    console.log(this.listIndex);
  },
};
</script>
<style scoped>
.var {
  --padding-top: 0;
  --padding-right: 0;
  --padding-bottom: 0;
  --padding-left: 0;
}

.plate {
  width: 100%;
  height: 500px;
  background-color: lightgreen;
  padding-top: var(--padding-top);
  padding-right: var(--padding-right);
  padding-bottom: var(--padding-bottom);
  padding-left: var(--padding-left);
}
</style>