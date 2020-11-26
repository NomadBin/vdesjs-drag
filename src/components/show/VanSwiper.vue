<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item :style="{height: myItem.propValues[heightIndex].value.num + myItem.propValues[heightIndex].value.unit}" v-for="(image, index) in myItem.propValues[dataIndex].value.data" :key="index">
        <van-image :src="image.url" fit="contain" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  props: {
    myItem: {},
  },

  data() {
    return {
      dataIndex: 0,
      heightIndex: 1,
    };
  },
};
</script>
<style>
 /* .my-swipe .van-swipe-item {
    font-size: 20px;
    height: 150px;
    text-align: center;
    background-color: gray;
  } */
</style>