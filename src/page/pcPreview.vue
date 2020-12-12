<template>
  <div class="pc-s">
    <!-- <div>
      <img :src="phoneIcon" alt="手机" class="icon" />
      <img :src="surfaceIcon" alt="平板" class="icon" />
      <img :src="pcIcon" alt="电脑" class="icon" />
    </div> -->
    <div class="pc">
      <div v-for="(item, i) in list" :key="i" class="content">
        <div v-if="item.componentName == 'VanLayout'">
          <van-layout :listIndex="i"></van-layout>
        </div>
        <div v-if="item.componentName == 'Plate'">
          <plate :listIndex="i"></plate>
        </div>

        <component
          @click.native="switchIndex(i)"
          v-else
          :is="item.componentName"
          :myItem="item"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import Plate from "@/preview/Plate.vue"
import Navbar from "@/components/pc/basics/Navbar.vue";
import ImageText from "@/components/pc/basics/ImageText.vue";
import Swiper from "@/components/pc/media/Swiper.vue";
import RichText from "@/preview/RichText.vue";
import PcLayout from "@/preview/PcLayout.vue";

import phoneIcon from "@/assets/icon/手机.png";
import surfaceIcon from "@/assets/icon/平板.png";
import pcIcon from "@/assets/icon/电脑.png";

export default {
  mixins: [],
  components: {
    draggable,
    Plate,
    Navbar,
    ImageText,
    Swiper,
    RichText,
    PcLayout
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
      phoneIcon: phoneIcon,
      surfaceIcon: surfaceIcon,
      pcIcon: pcIcon,
    };
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
      console.log("pcFrame test");
    },
  },
  mounted() {
    console.log(localStorage.getItem(this.$route.query.id));
    this.$store.commit(
      "initList",
      JSON.parse(localStorage.getItem(this.$route.query.id))
    );
  },
};
</script>


<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
$pcWidth: 100%;
$pcHeight: 100%;
.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.circle {
  background: #cacedb;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin: 0 4px;
  float: left;
}
.browser-address {
  height: 20px;
  margin-top: 3px;
  border: 1px solid #e6e7f0;
  border-radius: 10px;
  padding: 4px 8px;
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
.pc-s {
  width: $pcWidth;
  height: $pcHeight;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
.pc {
  width: $pcWidth;
  height: $pcHeight;
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
.content {
  // padding: 1px;
}
</style>