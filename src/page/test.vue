<template>
  <div>
    <van-row>
      <van-col span="8">
        <van-cell title="显示分享面板" @click="showShare2 = true" />
        <van-share-sheet
          v-model="showShare2"
          title="立即分享给好友"
          :options="data2.data"
          @select="onSelect2"
        />
      </van-col>

      <van-col span="8"> </van-col>

      <van-col span="8"> </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: {
        struct: [
          { label: "名称", key: "name", type: "text" },
          { label: "图标", key: "icon", type: "imageStore" },
        ],
        data: [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      },
      showShare1: false,
    };
  },
  methods: {
    onSelect2(option) {
      console.log(option.name);
      this.showShare2 = false;
    },
  },
};
</script>
