<template>
  <div
    class="var"
    :style="{
      '--padding-top': myItem.propValues[paddingIndex].value[0] + 'px',
      '--padding-right': myItem.propValues[paddingIndex].value[1] + 'px',
      '--padding-bottom': myItem.propValues[paddingIndex].value[2] + 'px',
      '--padding-left': myItem.propValues[paddingIndex].value[3] + 'px',
      '--height':
        myItem.propValues[heightIndex].value.num +
        myItem.propValues[heightIndex].value.unit,
      '--bgImage': 'url(' + myItem.propValues[bgImageIndex].value + ')',
    }"
    @click="switchIndex"
  >
    <div class="topSelect" @click="switchIndex"></div>

    <draggable :list="myItem.cols[0].list" group="components" class="plate">
      <div v-for="(item, i) in myItem.cols[0].list" :key="i">
        <pc-layout
          v-if="item.componentName == 'PcLayout'"
          :myItem="item"
          @click.native.stop
        ></pc-layout>

        <component
          v-else
          class="hoverborder"
          :is="item.componentName"
          :myItem="item"
          @click.native.stop="swithChildIndex(item)"
        ></component>
      </div>
    </draggable>

    <div style="height:15px">
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import basicsMixin from "@/common/js/pc/importBasics";
import PcLayout from "@/components/pc/basics/PcLayout.vue";
export default {
  mixins: [basicsMixin],
  components: {
    draggable,
    PcLayout,
  },
  props: {
    listIndex: {
      type: Number,
      default: 0,
    },
    myItem: {
      type: Object,
    }
  },
  data() {
    return {
      paddingIndex: 0,
      heightIndex: 1,
      bgImageIndex: 2,
    };
  },
  computed: {
    // myItem: function () {
    //   return this.$store.state.list[this.listIndex];
    // },
    // list: function () {
    //   return this.$store.state.list[this.listIndex].cols[0].list;
    // },
  },
  methods: {
    switchIndex: function () {
      console.log("switchIndex");
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

  created() {
    console.log(this.listIndex);
  },
};
</script>
<style scoped>
.var {
  /* margin-bottom: 200px; */

  --padding-top: 0px;
  --padding-right: 0px;
  --padding-bottom: 0px;
  --padding-left: 0px;
  --height: 500px;
  --bgImage: "";
}

.plate {
  max-width: calc(100% - 1px);

  padding-top: var(--padding-top);
  padding-right: var(--padding-right);
  padding-bottom: var(--padding-bottom);
  padding-left: var(--padding-left);

  background-color: peachpuff;
  height: var(--height);
  background-image: var(--bgImage);
  background-repeat: no-repeat;
  background-size: cover;
}
.topSelect {
  width: 100%;
  height: 8px;
  background-color: lightblue;
}
.topSelect:hover {
  background-color: blue;
}
.hoverborder {
  border: 1px solid transparent;
}
.hoverborder:hover {
  border: 1px solid blue;
}
</style>