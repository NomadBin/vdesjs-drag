<template>
  <div>
    <transition name="el-fade-in">
      <swiper
        v-if="u"
        ref="mySwiper"
        :options="swiperOptions"
        class="swiper"
        :style="style"
      >
        <swiper-slide
          v-for="(v, i) in myItem['propValues'][getDataIndex]['value']['data']"
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
      cc: {
        effect: "cube",
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  methods: {
    forceUpdate() {
      this.u = false;
      this.$nextTick(() => {
        this.u = true;
      });
    },
  },
  computed: {
    getDataIndex() {
      return 0;
    },
    getHeightIndex() {
      return 1;
    },
    getWidthIndex() {
      return 2;
    },
    style() {
      return {
        height:
          this.myItem.propValues[this.getHeightIndex].value.num +
          this.myItem.propValues[this.getHeightIndex].value.unit,
        width:
          this.myItem.propValues[this.getWidthIndex].value.num +
          this.myItem.propValues[this.getWidthIndex].value.unit,
      };
    },
    getEffectIndex() {
      return 3;
    },
    getEffectType() {
      this.forceUpdate();
      return this.myItem.propValues[this.getEffectIndex]["value"][
        "chooseValue"
      ];
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
</style>
