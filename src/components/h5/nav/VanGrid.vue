<template>
  <div>
    <van-grid>
      <van-grid-item v-for="(item, i) in myItem.propValues[dataIndex].value.data" :key="i" :icon="item.icon" :text="item.name" />
    </van-grid>
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
    };
  },
};
</script>