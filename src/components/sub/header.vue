<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="contentLogo">
          <h2>vdesjs</h2>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="tool">
          <tool-header v-if="mode == 'h5'"></tool-header>
          <pc-tool-header v-if="mode == 'pc'"></pc-tool-header>
          <free-tool-header v-if="mode == 'free'"></free-tool-header>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="device">
          <span>模式切换：</span>
          <el-select size="mini" v-model="deviceMode" @change="selectDevice">
            <el-option value="h5">h5</el-option>
            <el-option value="pc">pc响应式</el-option>
             <el-option value="free">自由画布</el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="contentLink">
          <el-link
            href="https://gitee.com/china-bin/vdesjs"
            target="_blank"
            type="primary"
            >码云</el-link
          >
          <el-link
            href="https://github.com/china-bin/vdesjs"
            target="_blank"
            type="primary"
            >Github</el-link
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ToolHeader from "@/components/sub/ToolHeader.vue";
import PcToolHeader from "@/components/sub/PcToolHeader.vue";
import FreeToolHeader from './FreeToolHeader.vue';

export default {
  components: {
    ToolHeader,
    PcToolHeader,
    FreeToolHeader,
  },
  data() {
    return {
      deviceMode: "h5",
    };
  },
  computed: {
    mode() {
      return this.$store.state.mode;
    },
  },
  methods: {
    selectDevice(val) {
      console.log(val);
      if (this.$store.state.list.length != 0) {
        this.$message('画布中有数据不能进行模式的切换，否则由于 v-if标签会产生缓存，导致出bug');
        console.log('画布中有数据不能进行模式的切换，否则由于 v-if标签会产生缓存，导致出bug')
        return false;
      } else {
        this.$store.commit("selectDevice", val);
      }
      
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
.tool {
  display: flex;
  align-items: center;
  height: 60px;
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