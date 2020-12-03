<template>
  <div>
    <van-notice-bar
      left-icon="volume-o"
      :text="myItem.propValues[titleIndex].value"
      :color="myItem.propValues[colorIndex].value"
    />
  </div>
</template>
<script>
export default {
  props: {
    myItem: {},
  },

  data() {
    return {
      titleIndex: 0,
      colorIndex: 1,
    };
  },
};
</script>
