<template>
  <div>
    <van-icon :name="myItem.propValues[iconIndex].value" :size="myItem.propValues[sizeIndex].value" :color="myItem.propValues[colorIndex].value" />
  </div>
</template>
<script>
export default {
    props: {
    myItem: {},
  },

  data() {
    return {
      iconIndex: 0,
      colorIndex:1,
      sizeIndex:2,
    };
  },
};
</script>