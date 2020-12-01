<template>
  <el-row>
    <el-col :span="16">
      <div class="contentLogo">
        <h2>vdesjs</h2>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="device">
        <el-select size="mini" v-model="deviceMode" @change="selectDevice">
          <el-option value="h5">h5</el-option>
          <el-option value="pc">pc响应式</el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="3">
      <div class="contentLink">
        <el-link href="https://gitee.com/china-bin/vdesjs" target="_blank" type="primary"
          >码云</el-link
        >
        <el-link href="https://github.com/china-bin/vdesjs" target="_blank" type="primary"
          >Github</el-link
        >
      </div>
    </el-col>

    
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      deviceMode: "h5",
    };
  },
  components: {
  },
  methods: {
    selectDevice(val) {
      console.log(val)
      this.$store.commit("selectDevice", val)

    },
  },
};
</script>
<style scoped>
.contentLogo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
}

.device {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  margin-left: 60px;
}
.el-link {
  margin-left: 10px;
  margin-right: 10px;
}
.contentLink {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
}

</style>