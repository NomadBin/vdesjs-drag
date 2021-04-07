<template>
  <div class="item" @dragstart="handleDragStart" @dragend="handleDragEnd" draggable>
    <div class="module">
        <img :src="Logos[item.componentName]" class="box" />
        <p style="font-size: 14px">{{name}}</p>
    </div>
  </div>
</template>
<script>
import basicsMixin from "@/common/js/free/importBasics";
import cloneDeep from 'lodash/cloneDeep'

export default {
  mixins: [basicsMixin],
  created: function () {
    console.log(JSON.stringify(this.name));
  },
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: {},
    },
  },
  computed: {
    globalId() {
      return this.$store.state.globalId;
    },
  },
  methods: {
    handleDragStart(e) {
      this.$store.commit("globalIdInc");
      
      var obj = cloneDeep(this.item);

      obj.id = this.globalId;
      obj.mode = "free";
      obj.groupStyle = {}

      // console.log("startDrag:" + JSON.stringify(obj))
      e.dataTransfer.setData("item", JSON.stringify(obj));
    },
    handleDragEnd(e) {
      console.log("清除拖拽数据")
      e.dataTransfer.clearData()
    }
  }
};
</script>
<style scoped>
.box {
  width: 30px;
  height: 30px;
  background-color: lightgray;
}
.item {
  width: 50%;
}
.module {
  border: 1px solid transparent;
  transition: border 0.3s;
}
.module:hover {
  border: 1px solid blue;
}
</style>