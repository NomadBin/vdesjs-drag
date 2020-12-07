<template>
  <div>
    <van-cell title="显示分享面板" @dblclick.native="showShare = true" />
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="myItem.propValues[tableIndex].value.data"
      @select="onSelect"
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
      showShare: false,
      tableIndex: 0,
    };
  },
  methods: {
    onSelect(option) {
      console.log(option.name);
      this.showShare = false;
    },
  },
};
</script>
