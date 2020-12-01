<template>
  <div class="item">
    <div class="module">
        <img :src="Logos[componentName]" class="box" />
        <p style="font-size: 14px">{{name}}</p>
    </div>
  </div>
</template>
<script>
import basicsMixin from "@/common/js/pc/importBasics";

export default {
  mixins: [basicsMixin],
  created: function () {
    console.log(JSON.stringify(this.name));
  },
  data() {
    return {};
  },
  props: {
    componentName: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "basics",
    },
  },
};
</script>
<style scoped>
.box {
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