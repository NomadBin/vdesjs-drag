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
import Navbar from "@/components/pc/basics/Navbar.vue";
import ImageText from "@/components/pc/basics/ImageText.vue";
import Swiper from "@/components/pc/media/Swiper.vue";
import RichText from "@/preview/RichText.vue";
import PcLayout from "@/preview/PcLayout.vue";
export default {
  mixins: [],
  components: {
    draggable,
    Navbar,
    ImageText,
    Swiper,
    RichText,
    PcLayout,
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
      heightIndex: 1,
      bgImageIndex: 2,
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

  background-color: lightgrey;
  height: 400px;
  height: var(--height);
  background-image: var(--bgImage);
  background-repeat: no-repeat;
  background-size: cover;
}
.topSelect {
  width: 100%;
  height: 8px;
  background-color: lightblue;
  transition: all 0.5s ease-in-out 0s;
}
.topSelect:hover {
  background-color: blue;
}
</style>