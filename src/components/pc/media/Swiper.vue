<template>
  <div
  class="var"
  :style="{
       '--paginationSize': myItem.propValues[paginationSizeIndex].value + 'px',
     }"
  >
  <div class="topSelect" @click="switchIndex"></div>

    <transition name="el-fade-in">
      <swiper
        v-if="u"
        ref="mySwiper"
        :options="swiperOptions"
        class="swiper"
        :style="style"
      >
        <swiper-slide
          v-for="(v, i) in myItem['propValues'][dataIndex]['value']['data']"
          :key="i"
        >
          <img
            :src="v.url"
            :alt="v.name"
            :style="{ width: 100 + '%' }"
            mode="widthFix"
          />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </transition>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

export default {
  props: {
    myItem: {
      type: Object,
      default: {},
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      u: true,
      dataIndex: 0,
      heightIndex: 1,
      widthIndex: 2,
      effectIndex: 3,
      paginationSizeIndex: 4,

    };
  },
  methods: {
    forceUpdate() {
      this.u = false;
      this.$nextTick(() => {
        this.u = true;
      });
    },
    switchIndex: function () {
      console.log("switchIndex");
      if (this.animateClass == "myBounceOutRight") {
        // 右边面板由收缩状态变为展开状态
        this.$store.commit("rightPanelFold");
      }

      this.$store.commit("updateMyItem", this.myItem);
    },
    
  },
  computed: {
    style() {
      return {
        height:
          this.myItem.propValues[this.heightIndex].value.num +
          this.myItem.propValues[this.heightIndex].value.unit,
        width:
          this.myItem.propValues[this.widthIndex].value.num +
          this.myItem.propValues[this.widthIndex].value.unit,
      };
    },
    getEffectType() {
      this.forceUpdate();
      return this.myItem.propValues[this.effectIndex]["value"]["chooseValue"];
    },
    swiperOptions() {
      return {
        effect: this.getEffectType,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // type: "fraction"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };
    },
  },
};
</script>

<style>
.var {
  --paginationSize: 20px
}
.swiper-pagination-bullet {
  width:  var(--paginationSize);
  height: var(--paginationSize);
}

.topSelect {
  width: 100%;
  height: 8px;
  background-color: lightblue;
}
.topSelect:hover {
  background-color: blue;
}
</style>
