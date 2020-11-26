<template>
  <van-button
    :type="myItem.propValues[typeIndex].value.chooseValue"
    :color="myItem.propValues[colorIndex].value"
    >{{ myItem.propValues[titleIndex].value }}</van-button
  >
</template>
<script>
export default {
  props: {
    myItem: {},
  },

  data() {
    return {
      titleIndex: 0,
      typeIndex: 1,
      colorIndex: 2,
    };
  },
};
</script>
<style>
</style>