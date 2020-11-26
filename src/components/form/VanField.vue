<template>
  <van-cell-group>
    <van-field v-model="myItem.propValues[modelIndex].value" :label="myItem.propValues[labelIndex].value" :placeholder="myItem.propValues[placeholderIndex].value" />
  </van-cell-group>
</template>
<script>
export default {
  props: {
    myItem: {},
  },
  data() {
    return {
      modelIndex: 0,
      labelIndex: 1,
      placeholderIndex: 2,
    }
  }
};
</script>