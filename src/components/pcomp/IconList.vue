<template>
  <div class="iconList">
    <span class="picker" v-for="(icon, i) in iconList" :key="i" @click="chooseIcon(icon.name)"><van-icon :name="icon.name"  size="25"/></span>
    <!-- 图标列表
    <input type="text" v-model="currentData.propValues[propIndex].value" /> -->
  </div>
</template>
<script>
export default {
  computed: {
    currentData() {
      return this.$store.getters.currentData;
    },
  },
  props: {
    propIndex: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      "iconList":[
        {
          name: "arrow"
        },
        {
          name: "arrow-left"
        },
        {
          name: "arrow-up"
        },
        {
          name: "arrow-down"
        },
        {
          name: "success"
        },
        {
          name: "cross"
        },
        {
          name: "plus"
        },
        {
          name: "minus"
        },
        {
          name: "fail"
        },
        {
          name: "location-o"
        },
        {
          name: "like-o"
        },
        {
          name: "star-o"
        },
      ]
    }
  },
  methods: {
    chooseIcon: function(name) {
      console.log("chooseIcon")
      this.currentData.propValues[this.propIndex].value=name
    }
  }
};
</script>
<style>
.iconList {
  display: flex;
  flex-wrap: wrap;
}
.picker {
  padding: 10px;
  border: 1px solid transparent;
  cursor: pointer;
}
.picker:hover{
  border: 1px solid blue;
}
</style>