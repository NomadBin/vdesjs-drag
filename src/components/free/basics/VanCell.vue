<template>
  <van-cell
    :title="myItem.propValues[titleIndex].value"
    :value="myItem.propValues[contentIndex].value"
    size="large"
  />
</template>
<script>
export default {
  props: {
    myItem: {},
  },

  data() {
    return {
      titleIndex: 0,
      contentIndex: 1,
    };
  },
};
</script>