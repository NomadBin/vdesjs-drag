<template>
<div class="distance">
    <div>
      <el-input type="number" @input="changeVal" v-model="currentPropValue[0]" style="width:50px"  ></el-input>
    </div>
    <div>
      <el-input type="number" @input="changeVal" v-model="currentPropValue[3]" style="width:50px"  ></el-input>
      <div  style="width:20px; height:40px; display:inline-block"><i class="vdejsfont vdesjslianjie" :class="lockFlag" @click="lock"></i></div>
      <el-input type="number" @input="changeVal" v-model="currentPropValue[1]" style="width:50px"  ></el-input>
    </div>
    <div>
      <el-input type="number" @input="changeVal" v-model="currentPropValue[2]" style="width:50px"  ></el-input>
    </div>
</div>
</template>
<script>
export default {
  props: {
    propIndex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    currentPropValue() {
      return this.$store.getters.currentData.propValues[this.propIndex].value;
    }
  },
  data() {
    return {
      top: 1,
      // '' or 'lock'
      lockFlag: '',
    }
  },
  methods: {
    changeVal(val) {
      console.log(val)
      if (this.lockFlag == 'lock') {
        // 同时更改选项值
        this.currentPropValue[0] = val
        this.currentPropValue[1] = val
        this.currentPropValue[2] = val
        this.currentPropValue[3] = val
      }
    },

    lock() {
      if(this.lockFlag == '') {
        // lock
        this.lockFlag = 'lock'
      } else {
        // unlock
        this.lockFlag = ''
      }
    }
  }
};
</script>
<style>

.distance .el-input__inner {
  padding: 0!important;
}
.distance .lock {
  color: red;
}

</style>