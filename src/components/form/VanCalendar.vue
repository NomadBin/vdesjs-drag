<template>
  <div class="calendar">
    <div v-if="myItem.propValues[dateTypeIndex].value.chooseValue == 'single'">
      <van-cell title="选择单个日期" :value="date" @click="show = true" />
      <van-calendar
        :show-confirm="myItem.propValues[kjxzIndex].value"
        :color="myItem.propValues[colorIndex].value"
        v-model="show"
        @confirm="onConfirm"
      />
    </div>

    <div
      v-if="myItem.propValues[dateTypeIndex].value.chooseValue == 'multiple'"
    >
      <van-cell title="选择多个日期" :value="date" @click="show = true" />
      <van-calendar
        :show-confirm="myItem.propValues[kjxzIndex].value"
        :color="myItem.propValues[colorIndex].value"
        v-model="show"
        type="multiple"
        @confirm="onConfirmMultiple"
      />
    </div>

    <div v-if="myItem.propValues[dateTypeIndex].value.chooseValue == 'range'">
      <van-cell title="选择日期区间" :value="date" @click="show = true" />
      <van-calendar
        :show-confirm="myItem.propValues[kjxzIndex].value"
        :color="myItem.propValues[colorIndex].value"
        v-model="show"
        type="range"
        @confirm="onConfirmRange"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    myItem: {},
  },
  data() {
    return {
      date: "",
      show: false,
      dateTypeIndex: 0,
      kjxzIndex: 1,
      colorIndex: 2,
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    onConfirmMultiple(date) {
      this.show = false;
      this.date = `选择了 ${date.length} 个日期`;
    },
    onConfirmRange(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
  },
};
</script>